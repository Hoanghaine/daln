
import loginImg from '../../../../assets/login-img.png'
import { Box, Typography, TextField, Button, Stack } from '@mui/material'
import CustomizedMenus from './CustomizedMenus'
import { ToastContainer, toast } from 'react-toastify'

import { useState } from 'react'
import { useLoginMutation } from '../../../../redux/api/api.caller' // API mutation
import { IUser } from '../../../../types/user'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('') // Quản lý username
  const [password, setPassword] = useState('') // Quản lý password
  const [role, setRole] = useState('')

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
      if(!userData.role) {
        userData.role = 'patient'
      }
      const response = await login(userData).unwrap() // Gọi API login
      if (response) {
        const token = response.data.token

        const userInfo = {
          role: userData.role,
          username: response.data.username, // Ví dụ nếu API trả về username
          avatar: response.data.avatar, // Ví dụ nếu API trả về avatar
        }
        console.log(' userData:', userData)

        localStorage.setItem('token', token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo)) // Lưu thông tin người dùng

        if (userData.role === 'patient') {
          navigate('/')
        } else if (userData.role === 'doctor') {
          navigate('/doctor')
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
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <ToastContainer />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '550px',
        }}
      >
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          gap={1}
          mb={2}
        >
          <Typography variant='body1' color='initial'>
            Chưa có tài khoản?{' '}
          </Typography>
          <Button component={Link} variant='contained' to='/register'>
            Đăng ký
          </Button>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
            gap: 1,
          }}
        >
          <Typography variant='h4' color='initial' textAlign={'center'} mb={1}>
            Signin to{' '}
            <Typography
              variant='h4'
              color='initial'
              sx={{
                color: '#3C5EAB',
                display: 'inline-block',
              }}
            >
              Psy
            </Typography>
            <Typography
              variant='h4'
              color='initial'
              sx={{
                color: '#65AD45',
                display: 'inline-block',
              }}
            >
              Connect
            </Typography>
          </Typography>
          <Typography variant='body1' color='initial' mb={2}>
            Welcome to PsyConnect, please enter your login details below to
            using the app
          </Typography>
          <TextField
            label='Tài khoản'
            variant='outlined'
            value={username}
            onChange={e => setUsername(e.target.value)} // Cập nhật username
          />
          <TextField
            label='Mật khẩu'
            type='password'
            variant='outlined'
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
      </Box>

      <Box component='img' src={loginImg}></Box>
    </Box>
  )
}

export default Login
