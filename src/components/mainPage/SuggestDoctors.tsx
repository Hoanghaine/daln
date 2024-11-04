import { Box, Typography, Stack, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'

const doctors = [
  {
    name: 'Bác sĩ A',
    specialty: 'Trầm cảm',
    image: 'https://braincare.vn/wp-content/uploads/bac-si-dung.jpg',
  },
  {
    name: 'Bác sĩ B',
    specialty: 'Rối loạn lo âu',
    image: 'https://braincare.vn/wp-content/uploads/bac-si-dung.jpg',
  },
  {
    name: 'Bác sĩ C',
    specialty: 'Tâm lý trẻ em',
    image: 'https://braincare.vn/wp-content/uploads/bac-si-dung.jpg',
  },
  {
    name: 'Bác sĩ D',
    specialty: 'Tâm lý trẻ em',
    image: 'https://braincare.vn/wp-content/uploads/bac-si-dung.jpg',
  },
]

function SuggestDoctors() {
  return (
    <Box mt={3}>
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          width: '100%',
          padding: '26px',
          margin: '0 auto',
          border: '2px solid #65AD45',
          flexWrap: 'nowrap',
          flexDirection: 'column',
          borderRadius: '16px',
          backgroundColor: '#fff',
          color: '#000',
        }}
      >
        <Stack
          direction='row'
          spacing={2}
          mb={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography variant='h5' mb={2} color='#65AD45'>
            Các bác sĩ được đề xuất
          </Typography>
          <Link style={{ textDecoration: 'none' }} to='/find-doctor'>
            <Button
              variant='outlined'
              sx={{
                // backgroundColor: '#65AD45',
                borderRadius: '16px',
                border: '1px solid #65AD45',
                color: '#65AD45',
                textDecoration: 'none',
                ':hover': {
                  backgroundColor: '#65AD45',
                  color: '#fff',
                }
              }}
            >
              Xem tất cả
            </Button>
          </Link>
        </Stack>
        <Box>
          <Stack
            direction='row'
            spacing={4}
            sx={{ justifyContent: 'space-between' }}
          >
            {doctors.map((doctor, index) => (
              <Box key={index}>
                <Box
                  component={'img'}
                  src={doctor.image}
                  alt={doctor.name}
                  sx={{
                    width: '100%',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <Typography variant='h6' textAlign={'center'}>
                  {doctor.name}
                </Typography>
                <Typography variant='body1' textAlign={'center'}>
                  Chuyên môn: {doctor.specialty}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Grid>
    </Box>
  )
}

export default SuggestDoctors
