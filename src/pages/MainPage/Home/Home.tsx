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
            padding: '30px 0',
            gap: '20px',
            margin: '0px auto',
            flexWrap: 'nowrap',
            flexDirection: 'column',
          }}
        >
          <Typography variant='h4' color='#000' textAlign={'center'} mb={2}>
            <Typography
              variant='h4'
              color='initial'
              sx={{
                color: '#65AD45',
                display: 'inline-block',
              }}
            >
              PsyConnect
            </Typography>{' '}
            tập trung vào
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
                sx={{ width: '100%', height: '300px', objectFit: 'cover' }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '20px',
                }}
              >
                <Box>
                  <Typography variant='h5' color='#000' mb={1}>
                    Tham vấn và Trị liệu tâm lý
                  </Typography>
                  <Typography variant='body2' color='#000'>
                    Thực hiện tham vấn, tư vấn tâm lý trực tiếp, trực tuyến cho
                    học sinh, cặp đôi, gia đình…
                  </Typography>
                </Box>
                <Button variant='outlined' sx={{ borderRadius: '16px' }}>
                  Xem chi tiết
                </Button>
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
                src={
                  'https://braincare.vn/wp-content/uploads/2024/05/anh-chi-Phuong-sang-loc.jpg'
                }
                sx={{ width: '100%', height: '300px', objectFit: 'cover' }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '20px',
                }}
              >
                <Box>
                  <Typography variant='h5' color='#000' mb={1}>
                    Sàng lọc và Đánh giá trẻ em
                  </Typography>
                  <Typography variant='body2' color='#000'>
                    Hỗ trợ theo dõi sự phát triển của trẻ với bộ công cụ sàng
                    lọc tin cậy nhất hiện nay…
                  </Typography>
                </Box>
                <Button variant='outlined' sx={{ borderRadius: '16px' }}>
                  Xem chi tiết
                </Button>
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
                src={
                  'https://braincare.vn/wp-content/uploads/2023/01/MG_8980edited-scaled-e1678423183117-2048x1581.jpg'
                }
                sx={{ width: '100%', height: '300px', objectFit: 'cover' }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '20px',
                }}
              >
                <Box>
                  <Typography variant='h5' color='#000' mb={1}>
                    Đào tạo
                  </Typography>
                  <Typography variant='body2' color='#000'>
                    Đào tạo đề cập đến việc dạy các kỹ năng thực hành, nghề
                    nghiệp hay kiến thức liên quan…
                  </Typography>
                </Box>
                <Button variant='outlined' sx={{ borderRadius: '16px' }}>
                  Xem chi tiết
                </Button>
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
