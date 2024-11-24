import { Box, Typography, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Testimonials from '../../../assets/testimonials.png'
import NewsSection from '../../../components/mainPage/NewsSection'
import OurDoctorsSection from '../../../components/mainPage/OurDoctorsSection'
import ContactSection from '../../../components/mainPage/ContactSection'
function AboutUs() {
  return (
    <Box>
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: '30px 0',
          gap: '20px',
          backgroundColor: '#fff',
          margin: '0px auto',
          flexWrap: 'nowrap',
          flexDirection: 'column',
        }}
      >
        <Grid size={12} sx={{ margin: '0 auto' }}>
          <Box
            sx={{
              // backgroundColor: '#65AD45',
              display: 'flex',
              borderRadius: '8px',
              gap: '16px',
              '& ul': {
                fontSize: '16px',
                paddingLeft: '16px',
                '& li::marker': {
                  color: '#3C5EAB',
                  fontSize: '16px',
                  marginBottom: '8px',
                },
              },
            }}
          >
            <Box
              component={'img'}
              src='https://plus.unsplash.com/premium_photo-1681966907271-1e350ec3bb95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D'
              sx={{
                width: '418px',
                height: '510px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            ></Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <Stack spacing={0.5}>
                <Typography variant='h5' color='#65AD45'>
                  Chào mừng bạn đến với PsyConnect
                </Typography>
                <Typography variant='h4' color=''>
                  Best Care for Your Mental Health
                </Typography>
              </Stack>
              <ul>
                <li>Trách nhiệm và tận tâm</li>
                <li>Các chuyên gia được kiểm chứng</li>
                <li>Dịch vụ nhanh gọn</li>
                <li>Bảo mật thông tin tuyệt đối</li>
              </ul>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                placerat scelerisque tortor ornare ornare. Quisque placerat
                scelerisque tortor ornare ornare Convallis felis vitae tortor
                augue. Velit nascetur proin massa in. Consequat faucibus
                porttitor enim et.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <OurDoctorsSection />
      <NewsSection />
      <ContactSection />
    </Box>
  )
}

export default AboutUs
