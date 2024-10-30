import Grid from '@mui/material/Grid2'
import loginImg from '../../../assets/login-img.png'
import { Box, Typography, TextField, Button } from '@mui/material'
function Login() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: 0,
          margin: '0px auto',
          flexWrap: 'nowrap',
        }}
      >
        <Grid size={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='body1' color='initial'>
              Signin to PsyConnect
            </Typography>
            <Typography variant='body2' color='initial'>
              Welcome to PsyConnect, please enter your login details below to
              using the app
            </Typography>
            <TextField label='Tài khoản' variant='filled' />
            <TextField label='Mật khẩu' variant='filled' />
            <Button
              variant='contained'
              color='primary'
              sx={{ width: '100%', marginTop: '16px' }}
            >
              <Typography variant='body1'>Đăng nhập</Typography>
            </Button>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box component='img' src={loginImg}></Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
