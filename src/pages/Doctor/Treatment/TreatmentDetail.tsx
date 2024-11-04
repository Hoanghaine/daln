import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

// Giả lập dữ liệu chat
const initialMessages = [
  { id: 1, sender: 'Bác sĩ', content: 'Chào bạn, tôi có thể giúp gì?' },
  { id: 2, sender: 'Bệnh nhân', content: 'Tôi cảm thấy đau đầu.' },
]

function TreatmentDetail() {
  const { id } = useParams<{ id: string }>() // Lấy ID của phòng từ URL
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: 'Bác sĩ', content: newMessage },
      ])
      setNewMessage('')
    }
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant='h4' gutterBottom>
        Chi Tiết Phòng {id}
      </Typography>

      {/* Hiển thị tin nhắn */}
      <List
        sx={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}
      >
        {messages.map(message => (
          <ListItem key={message.id}>
            <ListItemText primary={`${message.sender}: ${message.content}`} />
          </ListItem>
        ))}
      </List>

      {/* Ô nhập tin nhắn mới */}
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <TextField
          fullWidth
          variant='outlined'
          placeholder='Nhập tin nhắn...'
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <Button variant='contained' onClick={handleSendMessage}>
          Gửi
        </Button>
      </Box>
    </Box>
  )
}

export default TreatmentDetail
