import { Box, Stack, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import blackdoctor from '../../../assets/blackdoctor.png'
import imgTriLieu from '../../../assets/tri-lieu-tam-ly-ca-nhan.png'
import NewsSection from '../../../components/mainPage/NewsSection'
import OurDoctorsSection from '../../../components/mainPage/OurDoctorsSection'
function Home() {
  return (
    <Box sx={{}}>
      <Box
        component={'img'}
        src='https://images.unsplash.com/photo-1727946265721-c224a52ec71c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D'
        sx={{ width: '100%', height: '500px', objectFit: 'cover', mb: 2 }}
      ></Box>
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
              <Typography variant='h3' color='#3C5EAB'>
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
            <Button variant='outlined'>Tìm hiểu thêm</Button>
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
        <NewsSection />
      </Grid>
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
          <Button variant='contained'>Làm bài kiểm tra ngay</Button>
        </Grid>
      </Box>
    </Box>
  )
}

export default Home
