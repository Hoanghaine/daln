import { Box, Typography, Stack } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhoneVolume,
  faLocationDot,
  faEnvelope,
  faClock,
} from '@fortawesome/free-solid-svg-icons'

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
function ContactSection() {
  return (
    <Box
      sx={{
        backgroundColor: '#F5F5F5',
        padding: '50px 0',
      }}
    >
      <Typography
        variant='h4'
        color='#3C5EAB'
        textAlign={'center'}
        mb={2}
        sx={{}}
      >
        Liên hệ
      </Typography>
      <Stack
        sx={{
          display: 'flex',
          width: '1016px',
          margin: '0 auto',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
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
      </Stack>
    </Box>
  )
}

export default ContactSection
