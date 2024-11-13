import Grid from '@mui/material/Grid2'
import loginImg from '../../../assets/login-img.png'
import { Box, Typography, TextField, Button, Stack } from '@mui/material'
import CustomizedMenus from './CustomizedMenus'
import { toast } from 'react-toastify'

import { useState } from 'react'
import { useLoginMutation } from '../../../redux/api/api.caller' // API mutation
import { IUser } from '../../../types/user'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('') // Quản lý username
  const [password, setPassword] = useState('') // Quản lý password
  const [role, setRole] = useState('doctor')

  // Mutation hook để gọi API login
  const [login, { isLoading }] = useLoginMutation()

  // Hàm xử lý khi nhấn nút Đăng nhập
  const handleClickLogin = async () => {
    const userData: IUser = {
      id: 0,
      username,
      password,
      role,
      status: 'APPROVED',
    } // Tạo object User
    try {
      const response = await login(userData).unwrap() // Gọi API login
      console.log('Login response:', response)
      console.log('userData:', userData)
      if (response) {
        const token = response.data.token
        const userInfo = {
          role: userData.role,
          username: response.data.username, // Ví dụ nếu API trả về username
          avatar: response.data.avatar, // Ví dụ nếu API trả về avatar
        }

        localStorage.setItem('token', token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo)) // Lưu thông tin người dùng

        if (userData.role === 'patient') {
          navigate('/')
        } else if (userData.role === 'doctor') {
          navigate('/')
        }
      } else {
        toast.error('Đăng nhập thất bại sai email hoặc password', {
          theme: 'colored',
          autoClose: 2000,
          position: 'bottom-right',
        })
      }
    } catch (error) {
      console.error('Login failed:', error)
      // Xử lý khi đăng nhập thất bại
    }
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        padding: '32px 0px',
        position:'relative',  
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
        spacing={2}
      >
        <Grid size={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Stack
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              gap={1}
            >
              <Typography variant='body1' color='initial'>
                Chưa có tài khoản?{' '}
              </Typography>
              <Button component={Link} variant='contained' to='/register'>
                Đăng ký
              </Button>
            </Stack>
            <Typography variant='body1' color='initial'>
              Signin to PsyConnect
            </Typography>
            <Typography variant='body2' color='initial'>
              Welcome to PsyConnect, please enter your login details below to
              using the app
            </Typography>
            <TextField
              label='Tài khoản'
              variant='filled'
              value={username}
              onChange={e => setUsername(e.target.value)} // Cập nhật username
            />
            <TextField
              label='Mật khẩu'
              type='password'
              variant='filled'
              value={password}
              onChange={e => setPassword(e.target.value)} // Cập nhật password
            />
            <CustomizedMenus setRole={setRole} /> {/* Truyền hàm setRole */}
            <Button
              variant='contained'
              color='primary'
              sx={{ width: '100%', marginTop: '16px' }}
              onClick={handleClickLogin}
              disabled={isLoading}
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
