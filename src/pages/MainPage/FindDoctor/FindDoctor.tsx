import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import findDoctor from '../../../assets/doctor_find_background.jpg'
interface Doctor {
  id: string
  name: string
  avatar: string
  description: string
}
const Searchbox = () => (
  <Paper
    component='form'
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
  >
    <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
      <SearchIcon />
    </IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder='Tìm kiếm bác sĩ'
      inputProps={{ 'aria-label': 'search google maps' }}
    />
  </Paper>
)
const DoctorCard = ({ name, avatar, id, description }: Doctor) => {
  return (
    <Grid
      size={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: '8px',
      }}
    >
      <Box
        component={'img'}
        src={avatar}
        alt={name}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
        }}
      />
      <Box>
        <Typography variant='h6' color={'#65AD45'}>
          {name}
        </Typography>
        <Typography variant='body2' mb={2}>
          {description}
        </Typography>
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#65AD45',
            color: '#fff',
            borderRadius: '16px',
            '&:hover': {
              backgroundColor: '#3C5EAB',
            },
          }}
          component={Link}
          to={`/doctor-detail/${id}`}
        >
          Xem thông tin
        </Button>
      </Box>
    </Grid>
  )
} 
const TopDoctorCard = ({ name, avatar, id, description }: Doctor) => {
  return (
    <Grid
      size={12}
      sx={{
        display: 'flex',
        gap: '16px',
        padding: '8px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        mb: 1,
      }}
    >
      <Box
        component={'img'}
        src={avatar}
        alt={name}
        sx={{
          width: '70px',
          height: '70px',
          borderRadius: '8px',
        }}
      />
      <Box>
        <Typography variant='body1' color={'#65AD45'}>
          {name}
        </Typography>
        <Typography variant='body2' mb={2}>
          {description}
        </Typography>
        {/* <Button
          variant='contained'
          sx={{
            backgroundColor: '#65AD45',
            color: '#fff',
            borderRadius: '16px',
            padding: '4px 16px',
            fontSize: '13px',
            '&:hover': {
              backgroundColor: '#3C5EAB',
            },
          }}
          component={Link}
          to={`/doctors/${id}`}
        >
          Xem thông tin
        </Button> */}
      </Box>
    </Grid>
  )
}
const topDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
  {
    id: '2',
    name: 'Nguyễn Văn B',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
  {
    id: '3',
    name: 'Nguyễn Văn C',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
  {
    id: '4',
    name: 'Nguyễn Văn D',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
]
const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
  {
    id: '2',
    name: 'Nguyễn Văn B',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
  {
    id: '3',
    name: 'Nguyễn Văn C',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
  {
    id: '4',
    name: 'Nguyễn Văn D',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
  {
    id: '5',
    name: 'Nguyễn Văn A',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
  {
    id: '6',
    name: 'Nguyễn Văn B',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
  {
    id: '7',
    name: 'Nguyễn Văn C',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
  {
    id: '8',
    name: 'Nguyễn Văn D',
    avatar: 'https://phongkhamtamly.com/wp-content/uploads/2024/09/7.png',
    description: 'Chuyên gia tâm lý trị liệu',
  },
]

function FindDoctor() {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${findDoctor})`,
          backgroundPosition: '100% 10%',
          backgroundSize: 'fill',
          backgroundRepeat: 'no-repeat',
          height: '600px',
        }}
      >
        <Grid
          container
          sx={{
            maxWidth: '1152px',
            padding: '16px 0',
            gap: '20px',
            backgroundColor: 'tranference',
            margin: '0px auto',
            flexWrap: 'nowrap',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid size={10}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                p: '100px 0px',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant='h3' color='#3C5EAB' fontWeight={700}>
                ĐỘI NGŨ CHUYÊN GIA
              </Typography>
              <Typography variant='h4' color='#65AD45' fontWeight={600}>
                của PsyConnect
              </Typography>
              <ul>
                <li
                  style={{
                    marginLeft: '16px',
                    marginBottom: '8px',
                    fontSize: '20px',
                  }}
                >
                  Được đào tạo chuyên sâu
                </li>
                <li
                  style={{
                    marginLeft: '16px',
                    marginBottom: '8px',
                    fontSize: '20px',
                  }}
                >
                  Kinh nghiệm thực tế
                </li>
                <li
                  style={{
                    marginLeft: '16px',
                    marginBottom: '8px',
                    fontSize: '20px',
                  }}
                >
                  Tận tâm, chu đáo
                </li>
              </ul>
              <Button
                variant='outlined'
                onClick={() => {
                  const doctorGrid = document.getElementById('doctorGrid')
                  if (doctorGrid) {
                    const offsetTop =
                      doctorGrid.getBoundingClientRect().top +
                      window.pageYOffset -
                      147
                    window.scrollTo({
                      top: offsetTop,
                      behavior: 'smooth',
                    })
                  }
                }}
              >
                Tìm hiểu thêm
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: '16px 0',
          backgroundColor: '#fff',
          margin: '0px auto',
          justifyContent: 'space-between',
        }}
        id='doctorGrid'
      >
        <Grid size={12} mb={1} sx={{}}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              mt: 1,
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant='body1' color='initial'>
              Lọc bác sĩ:{' '}
            </Typography>
            <Button variant='outlined'>Tất cả</Button>
            <Button variant='outlined'>Tâm lý học</Button>
            <Button variant='outlined'>Tâm thần học</Button>
            <Button variant='outlined'>Tâm lý học trẻ em</Button>
          </Box>
        </Grid>
        <Grid size={9}>
          <Grid container>
            {doctors.map((doctor, index) => DoctorCard(doctor))}
          </Grid>
        </Grid>
        <Grid size={2.5}>
          <Typography variant='h6' color='initial'>
            Top bác sĩ của tháng
          </Typography>
          <Grid container sx={{ flexDirection: 'column' }}>
            {topDoctors.map((doctor, index) => TopDoctorCard(doctor))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FindDoctor
