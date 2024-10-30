import { Box, Stack, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import blackdoctor from '../../../assets/blackdoctor.png'
import imgTriLieu from '../../../assets/tri-lieu-tam-ly-ca-nhan.png'
import NewsSection from '../../../components/mainPage/NewsSection'
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
          <Box>
            <Typography variant='h4' color='initial'>
              Chào mừng đến với PsyConnect
            </Typography>
            <Typography variant='h2' color='initial'>
              Nơi kết nối tâm lý học trị liệu
            </Typography>
            <Typography variant='body1' color='initial'>
              PsyConnect là nơi kết nối giữa người cần tìm kiếm sự hỗ trợ tâm lý
              và các chuyên gia tâm lý học trị liệu uy tín. Chúng tôi cung cấp
              dịch vụ tư vấn tâm lý trực tuyến, giúp bạn giải quyết những vấn đề
              tâm lý đang gặp phải một cách nhanh chóng và hiệu quả.
            </Typography>
            <Typography variant='caption' color='initial'>
              Tìm hiểu thêm
            </Typography>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box
            component={'img'}
            src={blackdoctor}
            sx={{ width: '100%', height: '500px', objectFit: 'cover', mb: 2 }}
          ></Box>
        </Grid>
        <Grid size={12}>
          <Typography variant='body1' color='initial'>
            PsyConnect tập trung vào
          </Typography>
          <Stack
            direction='row'
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component={'img'}
                src={imgTriLieu}
                sx={{ width: '100%' }}
              ></Box>
              <Box>
                <Typography variant='h5' color='initial'>
                  Tham vấn và Trị liệu tâm lý
                </Typography>
                <Typography variant='body2' color='initial'>
                  Thực hiện tham vấn, tư vấn tâm lý trực tiếp, trực tuyến cho
                  học sinh, cặp đôi, gia đình…
                </Typography>
                <Button variant='outlined'>Xem chi tiết</Button>
              </Box>
            </Box>
            <Box>
              <Box
                component={'img'}
                src={imgTriLieu}
                sx={{ width: '100%' }}
              ></Box>
              <Box>
                <Typography variant='h5' color='initial'>
                  Tham vấn và Trị liệu tâm lý
                </Typography>
                <Typography variant='body2' color='initial'>
                  Thực hiện tham vấn, tư vấn tâm lý trực tiếp, trực tuyến cho
                  học sinh, cặp đôi, gia đình…
                </Typography>
                <Button variant='outlined'>Xem chi tiết</Button>
              </Box>
            </Box>
            <Box>
              <Box
                component={'img'}
                src={imgTriLieu}
                sx={{ width: '100%' }}
              ></Box>
              <Box>
                <Typography variant='h5' color='initial'>
                  Tham vấn và Trị liệu tâm lý
                </Typography>
                <Typography variant='body2' color='initial'>
                  Thực hiện tham vấn, tư vấn tâm lý trực tiếp, trực tuyến cho
                  học sinh, cặp đôi, gia đình…
                </Typography>
                <Button variant='outlined'>Xem chi tiết</Button>
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid size={12}>
          <Typography variant='h4' color='initial' textAlign={'center'}>
            Đội ngũ chuyên gia của BrainCare
          </Typography>
          <Box>
            <Stack>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: '20px',
                  mb: 2,
                }}
              >
                <Box
                  component={'img'}
                  src='https://braincare.vn/wp-content/uploads/bac-si-dung.jpg'
                  sx={{ width: '50%', objectFit: 'cover', flexShrink: 0 }}
                ></Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Typography variant='h5' color='initial'>
                    TS. Lê Thị Hồng
                  </Typography>
                  <Typography variant='body1' color='initial'>
                    Chuyên gia tâm lý học
                  </Typography>
                  <Typography variant='body2' color='initial'>
                    Hơn 30 năm kinh nghiệm trong lĩnh vực điều trị các rối loạn
                    tâm thần, các rối loạn phát triển ở trẻ em, cai nghiện game,
                    Internet, rượu tại Viện sức khỏe tâm thần-Bệnh viện Bạch Mai
                  </Typography>
                </Box>
              </Box>
              <Stack
                direction='row'
                spacing={2}
                sx={{ justifyContent: 'space-between' }}
              >
                <Box
                  component={'img'}
                  src='https://braincare.vn/wp-content/uploads/bac-si-dung.jpg'
                  sx={{ width: '200px', objectFit: 'cover', flexShrink: 0 }}
                ></Box>
                <Box
                  component={'img'}
                  src='https://braincare.vn/wp-content/uploads/bac-si-dung.jpg'
                  sx={{ width: '200px', objectFit: 'cover', flexShrink: 0 }}
                ></Box>
                <Box
                  component={'img'}
                  src='https://braincare.vn/wp-content/uploads/bac-si-dung.jpg'
                  sx={{ width: '200px', objectFit: 'cover', flexShrink: 0 }}
                ></Box>
                <Box
                  component={'img'}
                  src='https://braincare.vn/wp-content/uploads/bac-si-dung.jpg'
                  sx={{ width: '200px', objectFit: 'cover', flexShrink: 0 }}
                ></Box>
                <Box
                  component={'img'}
                  src='https://braincare.vn/wp-content/uploads/bac-si-dung.jpg'
                  sx={{ width: '200px', objectFit: 'cover', flexShrink: 0 }}
                ></Box>
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid size={12}>
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
          >
            <Typography variant='h5' color='initial' mb={2}>
              Kiểm tra sức khỏe tinh thần miễn phí
            </Typography>
            <Button variant='contained'>Làm bài kiểm tra ngay</Button>
          </Box>
        </Grid>
        <Grid size={12}>
          <NewsSection />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
