import { Box, Typography, Button, Stack } from '@mui/material'
import imgTriLieu from '../../assets/tri-lieu-tam-ly-ca-nhan.png'
import Grid from '@mui/material/Grid2'
function NewsSection() {
  return (
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
      <Box>
        <Typography variant='h4' color='initial' textAlign={'center'} mb={2}>
          Tin tức và sự kiện
        </Typography>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              component={'img'}
              src={imgTriLieu}
              sx={{ width: '50%', height: '300px', objectFit: 'cover' }}
            ></Box>
            <Box>
              <Typography variant='h5' color='initial'>
                Tham vấn và Trị liệu tâm lý
              </Typography>
              <Typography variant='body2' color='initial'>
                Thực hiện tham vấn, tư vấn tâm lý trực tiếp, trực tuyến cho học
                sinh, cặp đôi, gia đình…
              </Typography>
              <Button variant='outlined'>Xem chi tiết</Button>
            </Box>
          </Box>
          <Stack
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
              },
              gap: 2,
            }}
          >
            <Box>
              <Box
                component={'img'}
                src={imgTriLieu}
                sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
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
                sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
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
                sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
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
        </Box>
      </Box>
    </Grid>
  )
}

export default NewsSection
