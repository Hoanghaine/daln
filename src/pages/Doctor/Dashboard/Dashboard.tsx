import { Box, Stack, Typography, Card,CardContent } from '@mui/material'
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
const data = [
  { day: 'Mon', visits: 10 },
  { day: 'Tue', visits: 5 },
  { day: 'Wed', visits: 8 },
  { day: 'Thu', visits: 5 },
  { day: 'Fri', visits: 11 },
  { day: 'Sat', visits: 9 },
  { day: 'Sun', visits: 3 },
]
const BasicCard = () => {
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
      <PersonOutlineOutlinedIcon
        style={{
          color: '#000',
          fontSize: '70px',
        }}
      />
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant='body1' color='#99999'>
          Số lượng khách hàng
        </Typography>
        <Typography variant='h4' fontWeight={'bold'}>
          100
        </Typography>
      </Stack>
    </Card>
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
      <Stack
        sx={{
          width: '100%',
          display: 'grid',

          gridTemplateColumns: '1fr 1fr 1fr',

          justifyContent: 'space-between',
          gap: '16px',
          marginTop: '16px',
        }}
      >
        <BasicCard />
        <BasicCard />
        <BasicCard />
      </Stack>
      <Box sx={{ mt: '16px' }}>
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
    </Box>
  )
}

export default Dashboard
