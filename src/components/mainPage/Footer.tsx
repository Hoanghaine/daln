import Grid from '@mui/material/Grid2'
import { Box, Stack, Typography } from '@mui/material'

function Footer() {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#3C5EAB' }}>
      <Grid container
            sx={{ maxWidth: '1152px', padding: 0, margin: '0px auto', flexWrap: 'nowrap' }}>
        <Grid size={12}
        >
          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '24px',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'nowrap',
              color: '#fff'
              , padding: '16px 0px',
            }}
          >
            <Typography variant="h5">
              PsyConnect
            </Typography>
            <Box>
              <Typography>
                Tâm Lý học trị liệu
              </Typography>
              <Typography>
                Địa chỉ: Tầng 7, Toà nhà 59 Võ Chí Công, P. Nghĩa Đô, Q. Cầu Giấy, Tp. Hà Nội,
                Việt Nam
              </Typography>
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <Typography>
                Tổng đài tư vấn: 1900 3307
              </Typography>
              <Typography>
                Hotline: (024) 8888 9999
              </Typography>
            </Box>
            <Box>
              <Typography>
                Website
              </Typography>
              <Typography>
                Về Psyconnect
              </Typography>
              <Typography>
                Làm bài test chuẩn đoán
              </Typography>
              <Typography>
                Diễn đàn kiến thức về bệnh tâm lý
              </Typography>
              <Typography>
                Tin tức & sự kiện
              </Typography>
              <Typography>
                Liên hệ
              </Typography>
            </Box>
          </Stack>
        </Grid>

      </Grid>
      <Box
        bgcolor={'#65AD45'}
        sx={{
          height: '50px',
          display: 'flex',
          alignItems: 'center',
        }}

      >
        <Typography
          sx={{
            color: '#fff',
            width: '1152px',
            margin: '0px auto',
          }}
        >
          Powered by PsyConnect
        </Typography>
      </Box>
    </Box>

  )
}

export default Footer
