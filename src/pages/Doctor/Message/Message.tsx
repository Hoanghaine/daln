import {
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  TextField,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  useGetChatListQuery,
  useGetChatQuery,
} from '../../../redux/api/api.caller'
import { useEffect, useRef, useState } from 'react'
import LazyLoading from '../../../components/LazyLoading'
// Mock data for messages
import { Stomp, CompatClient } from '@stomp/stompjs'
import CallIcon from '@mui/icons-material/Call'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
// Dữ liệu mẫu danh sách phòng chữa trị
interface ChatCardProps {
  username: string
  fullName: string
  lastMessage: string
  avatar?: string
  lastMessageTime: string
  onClick: () => void
}
const ChatCard = ({
  username,
  fullName,
  lastMessage,
  avatar,
  lastMessageTime,
  onClick,
}: ChatCardProps) => {
  return (
    <Stack
      onClick={onClick} // Handle click to load chat history for this user
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        padding: '16px 16px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F0F0F0',
        borderRadius: '16px ',
        cursor: 'pointer', // Make clickable
      }}
    >
      <Avatar src={avatar} />
      <Stack>
        <Typography variant='h6' color='initial'>
          {fullName || username}
        </Typography>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            flexWrap: 'nowrap',
          }}
        >
          <Typography
            variant='body1'
            color='initial'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {lastMessage}
          </Typography>
          <Typography
            variant='caption'
            color='textSecondary'
            sx={{
              flexShrink: 0,
            }}
          >
            {new Date(lastMessageTime).toLocaleTimeString()}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
interface MessageProps {
  content: string
  timestamp: string
  isOwnMessage: boolean
  avatar?: string
}
const Message = ({
  content,
  timestamp,
  isOwnMessage,
  avatar,
}: MessageProps) => {
  return (
    <Stack
      sx={{
        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
      }}
    >
      {!isOwnMessage ? <Avatar src={avatar}></Avatar> : ''}
      <Stack
        sx={{
          backgroundColor: isOwnMessage ? '#DCF8C6' : '#E0E0E0',
          padding: '8px 16px',
          borderRadius: '16px',
          marginBottom: '8px',
        }}
      >
        <Typography variant='body1'>{content}</Typography>
        <Typography
          variant='caption'
          sx={{ alignSelf: 'flex-end', color: '#888' }}
        >
          {timestamp}
        </Typography>
      </Stack>
    </Stack>
  )
}
function MessagePage() {
  const [selectedChatUser, setSelectedChatUser] = useState<string | null>(null)
  const stompClient = useRef<CompatClient | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const [receiverFullName, setReceiverFullName] = useState('')
  const [receiverAvatar, setReceiverAvatar] = useState('')
  const { data: chatListData, error, isLoading } = useGetChatListQuery({})
  const { data: chatData, isFetching } = useGetChatQuery(
    selectedChatUser || '',
    {
      skip: !selectedChatUser, // Không gọi API khi chưa chọn người dùng
    },
  )
  useEffect(() => {
    const setUserName = async () => {
      const userInfor = localStorage.getItem('userInfo')
      if (userInfor) {
        const userData = JSON.parse(userInfor)
        setUsername(userData.username) // Thiết lập username từ localStorage
      } else {
        console.error('User info not found')
      }
    }
    setUserName()
  }, [])

  useEffect(() => {
    const connectWebSocket = async () => {
      const token = localStorage.getItem('token')
      if (!token || !username) return

      // const client = Stomp.over(() => new WebSocket('wss://local.thinhtran.online/ws'))
      const client = Stomp.over(() => new WebSocket('ws://localhost:8080/ws'))

      client.connect(
        { Authorization: `Bearer ${token}` },
        () => {
          console.log('Connected')
          client.subscribe(`/user/${username}/root`, onPrivateMessageReceived)
        },
        (error: any) => {
          console.error('Connection lost. Retrying in 5 seconds...', error)
          setTimeout(connectWebSocket, 5000) // Tự động reconnect sau 5 giây
        },
      )
      stompClient.current = client
    }
    connectWebSocket()

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => console.log('Disconnected'))
      }
    }
  }, [username])
  useEffect(() => {
    if (chatData && chatData.data) {
      const messages = chatData.data.map((msg: any) => ({
        message: msg.message,
        timestamp: new Date(msg.timestamp).toLocaleTimeString(),
        isOwnMessage: msg.senderName === username,
        avatar: msg.avatar,
      }))
      setChatMessages(messages)
    }
  }, [chatData])
  useEffect(() => {
    console.log('chatListData:', chatListData)
    if (chatListData?.data?.length > 0) {
      const firstUsername = chatListData.data[0].username 

      // Call your function here if needed
      handleChatCardClick(firstUsername);
    }
  }, [chatListData])

  const onPrivateMessageReceived = (payload: any) => {
    try {
      const { message, senderName } = JSON.parse(payload.body)
      console.log('Received message:', message, senderName)

      displayMessage({ message, senderName, avatar: receiverAvatar })
    } catch (error) {
      console.error('Error parsing message payload:', error)
    }
  }

  interface ChatMessage {
    message: string
    timestamp: string
    isOwnMessage: boolean
    avatar?: string
  }

  interface DisplayMessageProps {
    message: string
    senderName: string
    avatar?: string
  }

  const displayMessage = ({
    message,
    senderName,
    avatar,
  }: DisplayMessageProps) => {
    setChatMessages(prev => [
      ...prev,
      {
        message,
        timestamp: new Date().toLocaleTimeString(),
        isOwnMessage: senderName === username,
        avatar: avatar,
      },
    ])
  }

  const sendPrivateMessage = () => {
    if (message && receiverName && stompClient.current) {
      const chatMessage = {
        senderName: username,
        receiverName: receiverName,
        message: message,
      }
      console.log('chatMessage:', chatMessage)

      stompClient.current.send(
        '/app/private-message',
        { Authorization: 'Bearer ' + localStorage.getItem('token') },
        JSON.stringify(chatMessage),
      )
      console.log('Sent message:', chatMessage)
      displayMessage({ message, senderName: username })
      setMessage('')
    }
  }

  const handleChatCardClick = (clickedUsername: string) => {
    setSelectedChatUser(clickedUsername) // Chỉ thay đổi receiverName
    setReceiverName(clickedUsername)
    setReceiverAvatar(
      chatListData.data.find(chat => chat.username === clickedUsername)?.avatar,
    )
    setReceiverFullName(
      chatListData.data.find(chat => chat.username === clickedUsername)
        ?.fullName,
    )
    setChatMessages([])
  }

  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#f0f0f0',
        padding: '16px',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          height: '100%',
          borderRadius: '8px',
        }}
      >
        <Grid size={4}>
          <Stack
            sx={{
              height: '100%',
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: '#fff',
              position: 'relative',
            }}
          >
            <Typography variant='h5' color='initial' mb={2}>
              Danh sách trò chuyện
            </Typography>
            {isLoading && <LazyLoading />}
            {error && <Typography>Error fetching chats</Typography>}
            {chatListData && (
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px ',
                  width: '100%',
                }}
              >
                {chatListData.data.map(chat => (
                  <ChatCard
                    key={`${chat.username}-${chat.lastMessageTime}`} // Use a combination of username and timestamp to ensure uniqueness
                    username={chat.username}
                    fullName={chat.fullName}
                    lastMessage={chat.lastMessage}
                    avatar={receiverAvatar}
                    lastMessageTime={chat.lastMessageTime}
                    onClick={() => handleChatCardClick(chat.username)}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid size={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              height: '100%',
            }}
          >
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                padding: '8px 16px',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                borderRadius: '16px 16px 0px 0px',
                width: '100%',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                  padding: '8px 16px',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  borderRadius: '16px ',
                }}
              >
                <Avatar src={receiverAvatar} />
                <Typography variant='h5' color='initial'>
                  {receiverFullName}
                </Typography>
                <Typography variant='body1' color='initial'>
                  Đang hoạt động
                </Typography>
              </Stack>
              <Stack flexDirection={'row'} gap={2}>
                <CallIcon />
                <MoreHorizIcon />
              </Stack>
            </Stack>
            <Stack sx={{ height: '100%', overflowY: 'auto' }} spacing={1} p={2}>
              {isFetching && <Typography>Loading messages...</Typography>}
              {!isFetching &&
                chatMessages.map((msg, index) => (
                  <Message
                    key={index}
                    content={msg.message}
                    timestamp={msg.timestamp}
                    isOwnMessage={msg.isOwnMessage}
                    avatar={receiverAvatar}
                  />
                ))}
            </Stack>
            <Stack direction='row' spacing={2} p={3}>
              <TextField
                placeholder='Aa'
                variant='outlined'
                value={message}
                onChange={e => setMessage(e.target.value)}
                fullWidth
                sx={{ borderRadius: '16px' }}
              />
              <Button variant='contained' onClick={sendPrivateMessage}>
                Send
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MessagePage
