import {
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  TextField,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import SearchIcon from '@mui/icons-material/Search'
import {
  useGetChatListQuery,
  useGetChatQuery,
} from '../../redux/api/api.caller'
import { useEffect, useRef, useState } from 'react'
import LazyLoading from '../../components/LazyLoading'
// Mock data for messages
import LogoutIcon from '@mui/icons-material/Logout'
import { Stomp } from '@stomp/stompjs'

interface ChatCardProps {
  username: string
  fullName: string
  lastMessage: string
  avatar: string
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

// Function to render individual messages
interface MessageProps {
  content: string
  timestamp: string
  isOwnMessage: boolean
}

const Message = ({ content, timestamp, isOwnMessage }: MessageProps) => {
  return (
    <Stack
      sx={{
        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
        backgroundColor: isOwnMessage ? '#DCF8C6' : '#E0E0E0',
        padding: '8px 16px',
        borderRadius: '16px',
        maxWidth: '60%',
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
  )
}

function MessagePage() {
  const [selectedChatUser, setSelectedChatUser] = useState(null)
  const stompClient = useRef(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const { data: chatListData, error, isLoading } = useGetChatListQuery({})
  const { data: chatData } = useGetChatQuery(selectedChatUser, {
    skip: !selectedChatUser,
  })

  // Connect to WebSocket using STOMP
  useEffect(() => {
    const connectWebSocket = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      const userInfor = localStorage.getItem('userInfo')
      if (userInfor) {
        const userData = JSON.parse(userInfor)
        setUsername(userData.username)
      } else {
        console.error('User info not found')
        return
      }

      if (!username) {
        console.error('Username is not set yet')
        return
      }

      const socket = new WebSocket('ws://localhost:8080/ws')
      const client = Stomp.over(socket)

      client.connect({ Authorization: `Bearer ${token}` }, () => {
        client.subscribe(`/user/${username}/root`, onPrivateMessageReceived)
      })
      stompClient.current = client
    }

    connectWebSocket()

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => console.log('Disconnected'))
      }
    }
  }, [username, receiverName])

  interface PrivateMessagePayload {
    body: string
  }

  const onPrivateMessageReceived = (payload: PrivateMessagePayload) => {
    console.log('payload:', payload.body)

    const { message, senderName } = JSON.parse(payload.body)
    displayMessage({ message, senderName })
  }

  interface ChatMessage {
    message: string
    timestamp: string
    isOwnMessage: boolean
  }

  interface DisplayMessageProps {
    message: string
    senderName: string
  }

  const displayMessage = ({ message, senderName }: DisplayMessageProps) => {
    setChatMessages(prev => [
      ...prev,
      {
        message,
        timestamp: new Date().toLocaleTimeString(),
        isOwnMessage: senderName === username,
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

  const handleChatCardClick = username => {
    setSelectedChatUser(username)
  }

  return (
    <Box
      sx={{
        height: '100vh',
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
            <Stack p={2} flexDirection={'column'}>
              <Typography variant='h4' color='initial'>
                Đoạn chat
              </Typography>
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                  padding: '8px 16px',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  backgroundColor: '#F0F0F0',
                  borderRadius: '16px ',
                }}
              >
                <SearchIcon />
                <Typography variant='body1' color='initial'>
                  Tìm kiếm
                </Typography>
              </Stack>
            </Stack>
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
                    avatar={chat.avatar}
                    lastMessageTime={chat.lastMessageTime}
                    onClick={() => handleChatCardClick(chat.username)}
                  />
                ))}
              </Stack>
            )}

            <LogoutIcon
              sx={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                cursor: 'pointer',
                fontSize: '32px',
              }}
            />
          </Stack>
        </Grid>
        <Grid size={8}>
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: '16px',
              height: '100%',
            }}
          >
            {chatData && (
              <>
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
                    <Avatar src={chatData?.data?.elements[0]?.avatar} />
                    <Typography variant='h5' color='initial'>
                      {chatData?.data?.elements[0]?.fullNameReceiver}
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

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    flex: 1,
                    width: '100%',
                    overflowY: 'auto', // Allows scrolling if messages exceed the height
                  }}
                >
                  {chatData.data.elements.map((message, index) => (
                    <Message
                      key={index}
                      content={message.message}
                      timestamp={new Date(
                        message.timestamp,
                      ).toLocaleTimeString()}
                      isOwnMessage={message.senderName === selectedChatUser}
                    />
                  ))}
                </Box>
              </>
            )}
            <button onClick={sendMessage}>Send Test Message</button>
          </Box> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '16px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              height: '100%',
            }}
          >
            <Typography variant='h6'>
              Chat with {receiverName || '...'}
            </Typography>
            <Stack sx={{ maxHeight: '300px', overflowY: 'auto' }} spacing={1}>
              {chatMessages.map((msg, index) => (
                <Message
                  key={`${msg.timestamp}-${msg.isOwnMessage}`} // Use timestamp and ownMessage to ensure a unique key
                  content={msg.message}
                  timestamp={msg.timestamp}
                  isOwnMessage={msg.isOwnMessage}
                />
              ))}
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center'>
              <TextField
                label="Receiver's Name"
                variant='outlined'
                value={receiverName}
                onChange={e => setReceiverName(e.target.value)}
              />
              <TextField
                label='Message'
                variant='outlined'
                value={message}
                onChange={e => setMessage(e.target.value)}
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
