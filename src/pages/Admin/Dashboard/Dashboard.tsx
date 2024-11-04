import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  Avatar,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Data for LineChart
const data = [
  { day: 'Mon', visits: 10 },
  { day: 'Tue', visits: 5 },
  { day: 'Wed', visits: 8 },
  { day: 'Thu', visits: 5 },
  { day: 'Fri', visits: 11 },
  { day: 'Sat', visits: 9 },
  { day: 'Sun', visits: 3 },
]

// Basic Card Component
const BasicCard = ({ icon, title, value }) => {
  return (
    <Card
      sx={{
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid #999',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        gap: '16px',
      }}
    >
      {icon}
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant='body1' color='#999'>
          {title}
        </Typography>
        <Typography variant='h4' fontWeight={'bold'}>
          {value}
        </Typography>
      </Stack>
    </Card>
  )
}

// Basic card data
const basicCardData = [
  {
    icon: (
      <PersonOutlineOutlinedIcon style={{ fontSize: '70px', color: '#000' }} />
    ),
    title: 'Số lượng khách hàng',
    value: 100,
  },
  {
    icon: (
      <StarBorderOutlinedIcon style={{ fontSize: '70px', color: '#000' }} />
    ),
    title: 'Hiệu suất hệ thống',
    value: 100,
  },
  {
    icon: (
      <PersonOutlineOutlinedIcon style={{ fontSize: '70px', color: '#000' }} />
    ),
    title: 'Số lượng bác sĩ',
    value: 100,
  },
]

// Best choice doctor data
const bestChoiceDoctorData = [
  {
    name: 'Dr. John Doe',
    rating: 4.5,
    speciality: 'Cardiologist',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Dr. Jane Smith',
    rating: 4.2,
    speciality: 'Neurologist',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Dr. Alex Johnson',
    rating: 4.8,
    speciality: 'Dermatologist',
    image: 'https://via.placeholder.com/150',
  },
]

// Component hiển thị danh sách bác sĩ
const ListBestChoiceDoctor = () => {
  return (
    <Stack spacing={2}>
      {bestChoiceDoctorData.map((doctor, index) => (
        <Card
          key={index}
          sx={{
            display: 'flex',
            gap: '16px',
            padding: '16px',
            border: '1px solid #ddd',
          }}
        >
          <Avatar
            alt={doctor.name}
            src={doctor.image}
            sx={{ width: 80, height: 80 }}
          />
          <Stack>
            <Typography variant='h6'>{doctor.name}</Typography>
            <Typography variant='body2'>{doctor.speciality}</Typography>
            <Typography variant='body2'>Rating: {doctor.rating}</Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  )
}

function Dashboard() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        padding: '16px',
      }}
    >
      {/* Dropdown chọn tuần */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '4px',
          padding: ' 2px 4px',
          width: 'fit-content',
          border: '1px solid #999',
          borderRadius: '16px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <KeyboardArrowDownIcon />
        Tuần này
      </Box>

      {/* Layout gồm 2 cột: bên trái (cards + chart) và bên phải (list bác sĩ) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginTop: '16px',
        }}
      >
        {/* Cột bên trái: 3 cards và biểu đồ */}
        <Stack spacing={2}>
          {basicCardData.map((card, index) => (
            <BasicCard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
            />
          ))}
          <Box>
            <Card sx={{ border: '1px solid #00000033', borderRadius: '12px' }}>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Thống Kê Lượng Người Thăm Khám Trong Tuần
                </Typography>
                <ResponsiveContainer width='100%' height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='day' />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type='monotone'
                      dataKey='visits'
                      stroke='#8884d8'
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        {/* Cột bên phải: danh sách bác sĩ */}
        <ListBestChoiceDoctor />
      </Box>
    </Box>
  )
}

export default Dashboard
