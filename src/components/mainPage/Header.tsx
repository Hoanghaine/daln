import { Avatar, Box, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '../../constants/routePath.constant'

function Header() {
  return (
    <Box sx={{ width: '100%', boxShadow: '#00000052 0px 2px 8px 0px' }}>
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: 0,
          backgroundColor: '#fff',
          margin: '0px auto',
          flexWrap: 'nowrap',
        }}
      >
        <Grid size={12}>
          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',

              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'nowrap',
              padding: '16px 24px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: 'fit-content',
              }}
            >
              <Box
                component='img'
                src={logo}
                sx={{
                  width: '65px',
                  height: '65px',
                  borderRadius: '50%',
                  marginRight: '16px',
                }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: 'fit-content',
                }}
              >
                <Typography color='#3C5EAB' sx={{ width: 'fit-content' }}>
                  TÂM LÝ HỌC TRỊ LIỆU
                </Typography>
                <Typography color='#65AD45' sx={{ width: 'fit-content' }}>
                  Tâm an sống khỏe
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexDirection: 'row',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  width: 'fit-content',
                }}
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  color={'#65AD45'}
                ></FontAwesomeIcon>
                <Box>
                  <Typography>Hotline tư vấn</Typography>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    1900 1234
                  </Typography>
                </Box>
              </Box>
              <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
              <Avatar sx={{ width: '44px', height: '44px' }}>H</Avatar>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Box bgcolor={'#3C5EAB'}>
        <Stack
          sx={{
            maxWidth: '1152px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'nowrap',
            padding: '16px 24px',
            margin: '0px auto',
            color: '#fff',
            height: '50px',
          }}
        >
          <Link to='/'>Trang chủ</Link>
          <Link to='/about'>Về PsyConnect</Link>
          <Link to='/test-chuan-doan'>Làm bài test chuẩn đoán</Link>
          <Link to='/forum'>Diễn đàn kiến thức về bệnh tâm lý</Link>
          <Link to='/find-doctor'>Tìm bác sĩ</Link>
          <Link to='/news-event'>Tin tức & sự kiện</Link>
          <Link to='/contact'>Liên hệ</Link>
        </Stack>
      </Box>
    </Box>
  )
}

export default Header
