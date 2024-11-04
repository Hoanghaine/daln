import { Box, Stack, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import blackdoctor from '../../../assets/blackdoctor.png'
import imgTriLieu from '../../../assets/tri-lieu-tam-ly-ca-nhan.png'
import NewsSection from '../../../components/mainPage/NewsSection'
import OurDoctorsSection from '../../../components/mainPage/OurDoctorsSection'
import ContactSection from '../../../components/mainPage/ContactSection'
import Banner from '../../../components/mainPage/Banner'
import React from 'react'
function Home() {
  const pageRef = React.useRef<HTMLDivElement | null>(null)
  return (
    <Box sx={{}}>
      <Banner />
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: '16px 0',
          gap: '20px',
          backgroundColor: '#fff',
          margin: '0px auto',
          flexWrap: 'nowrap',
          flexDirection: 'column',
        }}
      >
        <Grid size={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <Box textAlign={'center'}>
              <Typography variant='h5' color='#3C5EAB'>
                Chào mừng đến với PsyConnect
              </Typography>
              <Typography variant='h4' color='#65AD45'>
                Nơi kết nối tâm lý học trị liệu
              </Typography>
            </Box>
            <Typography
              variant='body1'
              color='initial'
              width={'70%'}
              textAlign={'center'}
            >
              PsyConnect là nơi kết nối giữa người cần tìm kiếm sự hỗ trợ tâm lý
              và các chuyên gia tâm lý học trị liệu uy tín. Chúng tôi cung cấp
              dịch vụ tư vấn tâm lý trực tuyến, giúp bạn giải quyết những vấn đề
              tâm lý đang gặp phải một cách nhanh chóng và hiệu quả.
            </Typography>
            <Button
              variant='outlined'
              onClick={() => {
                pageRef.current?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              Tìm hiểu thêm
            </Button>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box
            component={'img'}
            src={blackdoctor}
            sx={{ width: '100%', height: '250px', objectFit: 'cover', mb: 2 }}
          ></Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#f5f5f5f5',
        }}
      >
        <Grid
          container
          sx={{
            maxWidth: '1152px',
            padding: '16px 0',
            gap: '20px',
            margin: '0px auto',
            flexWrap: 'nowrap',
            flexDirection: 'column',
          }}
        >
          <Typography variant='h4' color='#000' textAlign={'center'} mb={2}>
            PsyConnect tập trung vào
          </Typography>
          <Stack
            direction='row'
            spacing={4}
            sx={{ justifyContent: 'space-between' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Box
                component={'img'}
                src={imgTriLieu}
                sx={{ width: '100%' }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px',
                }}
              >
                <Box>
                  <Typography variant='h5' color='#000'>
                    Tham vấn và Trị liệu tâm lý
                  </Typography>
                  <Typography variant='body2' color='#000'>
                    Thực hiện tham vấn, tư vấn tâm lý trực tiếp, trực tuyến cho
                    học sinh, cặp đôi, gia đình…
                  </Typography>
                </Box>
                <Button variant='contained'>Xem chi tiết</Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Box
                component={'img'}
                src={imgTriLieu}
                sx={{ width: '100%' }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px',
                }}
              >
                <Box>
                  <Typography variant='h5' color='#000'>
                    Tham vấn và Trị liệu tâm lý
                  </Typography>
                  <Typography variant='body2' color='#000'>
                    Thực hiện tham vấn, tư vấn tâm lý trực tiếp, trực tuyến cho
                    học sinh, cặp đôi, gia đình…
                  </Typography>
                </Box>
                <Button variant='contained'>Xem chi tiết</Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Box
                component={'img'}
                src={imgTriLieu}
                sx={{ width: '100%' }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px',
                }}
              >
                <Box>
                  <Typography variant='h5' color='#000'>
                    Tham vấn và Trị liệu tâm lý
                  </Typography>
                  <Typography variant='body2' color='#000'>
                    Thực hiện tham vấn, tư vấn tâm lý trực tiếp, trực tuyến cho
                    học sinh, cặp đôi, gia đình…
                  </Typography>
                </Box>
                <Button variant='contained'>Xem chi tiết</Button>
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Box>
      <OurDoctorsSection />

      <NewsSection />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '20px',
          height: '360px',
          backgroundImage: `url('https://braincare.vn/wp-content/uploads/2021/04/braincare-xd_02.png')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          mb: 2,
        }}
        ref={pageRef}
      >
        <Grid
          container
          sx={{
            maxWidth: '1152px',
            width: '100%',
            padding: '16px 0',
            gap: '20px',
            backgroundColor: 'transparent',
            margin: '0px auto',
            flexWrap: 'nowrap',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant='h5' color='initial' mb={2}>
            Kiểm tra sức khỏe tinh thần miễn phí
          </Typography>
          <Link
            to='/test-chuan-doan'
            style={{
              padding: '16px 32px',
              backgroundColor: '#3C5EAB',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
            }}
          >
            Làm bài kiểm tra ngay
          </Link>
        </Grid>
      </Box>
      <ContactSection />
    </Box>
  )
}

export default Home
