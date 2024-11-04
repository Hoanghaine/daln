import { Box, Typography, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'

function OurDoctorsSection() {
  return (
    <Box sx={{ backgroundColor: '#65AD45' }}>
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
          color: '#FFF',
        }}
      >
        <Typography variant='h4' textAlign={'center'} mb={2}>
          Đội ngũ chuyên gia của PsyConnect
        </Typography>
        <Box>
          <Stack>
            <Box
              sx={{
                width: '80%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '20px',
                margin:'0 auto',
                mb: 2,
              }}
            >
              <Box
                component={'img'}
                src='https://braincare.vn/wp-content/uploads/bac-si-dung.jpg'
                sx={{
                  width: '40%',
                  height: '400px',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <Typography variant='h5' color='#fff'>
                  TS. Lê Thị Hồng
                </Typography>
                <Typography variant='body1' color='#fff'>
                  Chuyên gia tâm lý học
                </Typography>
                <Typography variant='body2' color='#fff'>
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
    </Box>  
  )
}

export default OurDoctorsSection
