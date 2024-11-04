import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'

// Dữ liệu mẫu danh sách phòng chữa trị
const treatmentRooms = [
  { id: 1, name: 'Phòng 101', status: 'Đang sử dụng' },
  { id: 2, name: 'Phòng 102', status: 'Sẵn sàng' },
  { id: 3, name: 'Phòng 103', status: 'Đang sử dụng' },
  { id: 4, name: 'Phòng 104', status: 'Sẵn sàng' },
]

function Treatment() {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant='h4' gutterBottom>
        Quản Lý Phòng Chữa Trị
      </Typography>
      <List>
        {treatmentRooms.map(room => (
          <Link
            to={`/treatment/${room.id}`}
            key={room.id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItem
              component={Paper}
              sx={{ marginBottom: '10px', padding: '15px' }}
            >
              <ListItemText
                primary={room.name}
                secondary={`Trạng thái: ${room.status}`}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )
}

export default Treatment
