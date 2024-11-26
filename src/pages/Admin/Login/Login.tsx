import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useAdminLoginMutation } from '../../../redux/api/api.caller'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { IUser } from '../../../types/user'
function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading }] = useAdminLoginMutation()
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ username, password })
  }
  const handleClickLogin = async () => {
    const userData = {
      username,
      password,
    }
    console.log(userData)

    try {
      const response = await login(userData).unwrap()
      console.log('Login response:', response)
      if (response) {
        const token = response.data.token

        const userInfo = {
          role: response.data.role,
          username: response.data.username,
          avatar: response.data.avatar,
        }

        localStorage.setItem('token', token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        toast.error('Đăng nhập thất bại sai email hoặc password', {
          theme: 'colored',
          autoClose: 2000,
          position: 'bottom-right',
        })
        navigate('/admin')
      } else {
        toast.error('Đăng nhập thất bại sai email hoặc password', {
          theme: 'colored',
          autoClose: 2000,
          position: 'bottom-right',
        })
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <ToastContainer />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <Avatar
          sx={{
            margin: '0 auto',
            backgroundColor: '#1976d2',
            marginBottom: 2,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5' gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label='Username'
            variant='outlined'
            fullWidth
            margin='normal'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            margin='normal'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleClickLogin}
            disabled={isLoading}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default Login
