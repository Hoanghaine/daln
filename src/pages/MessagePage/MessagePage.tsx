import { Box, Stack, Typography, Avatar } from '@mui/material'
import Grid from '@mui/material/Grid2'
import SearchIcon from '@mui/icons-material/Search'
import CallIcon from '@mui/icons-material/Call'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    sender: 'Bạn',
    content: 'Xin chào!',
    timestamp: '10:00 AM',
    isOwnMessage: true,
  },
  {
    id: 2,
    sender: 'Tên người gửi',
    content: 'Chào bạn, bạn có khỏe không?',
    timestamp: '10:02 AM',
    isOwnMessage: false,
  },
  {
    id: 3,
    sender: 'Bạn',
    content: 'Mình ổn, cảm ơn! Bạn thì sao?',
    timestamp: '10:03 AM',
    isOwnMessage: true,
  },
  {
    id: 4,
    sender: 'Tên người gửi',
    content: 'Mình cũng khỏe, cảm ơn đã hỏi!',
    timestamp: '10:05 AM',
    isOwnMessage: false,
  },
]

const ChatCard = () => {
  return (
    <Stack
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
      }}
    >
      <Avatar />
      <Stack>
        <Typography variant='h6' color='initial'>
          Tên người gửi
        </Typography>
        <Typography variant='body1' color='initial'>
          Nội dung tin nhắn
        </Typography>
      </Stack>
    </Stack>
  )
}


// Function to render individual messages
const Message = ({ content, timestamp, isOwnMessage }) => {
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
      <Typography variant='caption' sx={{ alignSelf: 'flex-end', color: '#888' }}>
        {timestamp}
      </Typography>
    </Stack>
  )
}

function MessagePage() {
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
            }}
          >
            <Stack p={2}>
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
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
            </Stack>
          </Stack>
        </Grid>
        <Grid size={8}>
          <Box
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
                <Avatar></Avatar>
                <Typography variant='h5' color='initial'>
                  Tên người gửi
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
              {/* Render each message */}
              {mockMessages.map((message) => (
                <Message
                  key={message.id}
                  content={message.content}
                  timestamp={message.timestamp}
                  isOwnMessage={message.isOwnMessage}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MessagePage
