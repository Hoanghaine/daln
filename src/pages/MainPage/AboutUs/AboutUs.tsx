import { Box, Typography } from '@mui/material'
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
          padding: '16px 0',
          gap: '20px',
          backgroundColor: '#fff',
          margin: '0px auto',
          flexWrap: 'nowrap',
          flexDirection: 'column',
        }}
      >
        <Grid size={10} sx={{ margin: '0 auto' }}>
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              padding: '16px',
              '& ul': {
                paddingLeft: '16px',
                '& li::marker': {
                  color: '#3C5EAB',
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
              }}
            ></Box>
            <Box>
              <Typography variant='body1' color='initial'>
                Chào mừng bạn đến với PsyConnect
              </Typography>
              <Typography variant='h4' color='initial'>
                Best Care for Your Mental Health
              </Typography>
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
        <Grid size={12}>
          <Box component={'img'} src={Testimonials}></Box>
        </Grid>
      </Grid>
      <OurDoctorsSection />
      <NewsSection />
      <ContactSection />
    </Box>
  )
}

export default AboutUs
