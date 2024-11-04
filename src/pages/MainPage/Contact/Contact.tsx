import { Box, Typography, Stack, TextField, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhoneVolume,
  faLocationDot,
  faEnvelope,
  faClock,
} from '@fortawesome/free-solid-svg-icons'
import NewsSection from '../../../components/mainPage/NewsSection'
const lienhe = [
  {
    icon: <FontAwesomeIcon icon={faPhoneVolume} size='2x' color='#3C5EAB' />,
    title: 'Đường dây nóng',
    content: '1900 3307',
  },
  {
    icon: <FontAwesomeIcon icon={faLocationDot} size='2x' color='#3C5EAB' />,
    title: 'Địa chỉ',
    content: 'Hà Nội',
  },
  {
    icon: <FontAwesomeIcon icon={faEnvelope} size='2x' color='#3C5EAB' />,
    title: 'Email',
    content: 'Psyconnect@gmail.com',
  },
  {
    icon: <FontAwesomeIcon icon={faClock} size='2x' color='#3C5EAB' />,
    title: 'Giờ làm việc',
    content: 'Mon-Sat 09:00-20:00',
  },
]
interface StyledBoxProps {
  icon: JSX.Element
  title: string
  content: string
}
const StyledBox = ({ icon, title, content }: StyledBoxProps) => (
  <Box
    sx={{
      display: 'block',
      width: '240px',
      height: '240px',
      backgroundColor: '#FFC107',
      mb: 2,
    }}
  >
    <Box
      sx={{
        margin: ' 0 auto',
        padding: '40px 20px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        {icon}
      </Box>
      <Box mt={2}>
        <Typography variant='h6' color='#3C5EAB'>
          {title}
        </Typography>
        <Typography variant='body1' color='#3C5EAB'>
          {content}
        </Typography>
      </Box>
    </Box>
  </Box>
)
export default function Contact() {
  return (
    <Box p={1}>
      <Typography variant='h4' color='#3C5EAB' textAlign={'center'} mb={2}>
        Liên hệ
      </Typography>
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: '16px 0',
          alignItems: 'center',
          gap: '20px',
          backgroundColor: '#fff',
          margin: '0px auto',
          flexWrap: 'nowrap',
          flexDirection: 'column',
        }}
      >
        <Grid size={10}>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.748413661302!2d105.74611147499886!3d20.962616190047605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452efff394ce3%3A0x391a39d4325be464!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBQaGVuaWthYQ!5e0!3m2!1svi!2s!4v1730389068259!5m2!1svi!2s'
            width='1000'
            height='450'
            style={{ border: 0 }}
            loading='lazy'
          ></iframe>
        </Grid>
        <Grid size={10} sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: '45%',
              display: 'flex',
              gap: '16px',
              padding: '16px',
              flexDirection: 'column',
            }}
          >
            <Typography variant='h4' color='initial'>
              Liên hệ tư vấn
            </Typography>
            <TextField id='' label='Họ và tên' />
            <TextField id='' label='Email' />
            <TextField id='' label='Số điện thoại' />
            <TextField id='' label='Nội dung' multiline rows={4} />
            <Button variant='contained'>Gửi</Button>
          </Box>
          <Box
            sx={{
              width: '55%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            {lienhe.map((contact, index) => (
              <StyledBox
                key={index}
                icon={contact.icon}
                title={contact.title}
                content={contact.content}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
      <NewsSection />
    </Box>
  )
}
