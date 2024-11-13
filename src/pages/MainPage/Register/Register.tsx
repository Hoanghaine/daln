import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  Stack,
} from '@mui/material'
import loginImg from '../../../assets/login-img.png'
import { useRegisterMutation } from '../../../redux/api/api.caller' // API mutation
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { IUserRegister } from '../../../types/user'
import 'react-toastify/dist/ReactToastify.css'
import LazyLoading from '../../../components/LazyLoading'
export default function Register() {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0) // To manage the selected tab
  const [formData, setFormData] = useState<IUserRegister>({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    specialization: '',
    experienceYears: 0,
    role: 'PATIENT',
  }) // Initial form data
  const [register, { isLoading }] = useRegisterMutation() // Mutation hook to call the register API

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setFormData({
      ...formData,
      role: newValue === 0 ? 'PATIENT' : 'DOCTOR', // Update the role based on tab
      specialization: newValue === 0 ? '' : formData.specialization,
      experienceYears: newValue === 0 ? 0 : formData.experienceYears,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  if(isLoading) return <LazyLoading />
  const handleRegister = async () => {
    console.log('Register form data:', formData)
    try {
      const response = await register(formData).unwrap()
      console.log('Register response:', response)
      if (response) {
        toast.success('Đăng ký thành công!', {
          theme: 'colored',
          autoClose: 2000,
          position: 'top-right',
        })
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        toast.error('Đăng ký thất bại!', {
          theme: 'colored',
          autoClose: 2000,
          position: 'top-right',
        })
      }
    } catch (error) {
      console.error('Register failed:', error)
      toast.error('Đăng ký thất bại!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'top-right',
      })
    }
  }
  const notify = () => toast('Wow so easy!')

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        padding: '32px 0px',
        position: 'relative',
      }}
    >
      <ToastContainer />
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          margin: '0px auto',
          flexWrap: 'nowrap',
        }}
        spacing={2}
      >
        <Grid size={6}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
          >
            <Tab label='User Registration' />
            <Tab label='Doctor Registration' />
          </Tabs>

          <Box sx={{ padding: '16px' }}>
            <Stack spacing={2}>
              <TextField
                label='Username'
                variant='filled'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
              />
              <TextField
                label='Password'
                type='password'
                variant='filled'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
              />
              <TextField
                label='Name'
                variant='filled'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextField
                label='Email'
                variant='filled'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                label='Phone'
                variant='filled'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
              />
              <TextField
                label='Date of Birth'
                type='date'
                InputLabelProps={{ shrink: true }}
                variant='filled'
                name='dob'
                value={formData.dob}
                onChange={handleInputChange}
              />
              <TextField
                label='Address'
                variant='filled'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
              />
              {tabValue === 1 && (
                <>
                  <TextField
                    label='Specialization'
                    variant='filled'
                    name='specialization'
                    value={formData.specialization}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label='Experience Years'
                    type='number'
                    variant='filled'
                    name='experienceYears'
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                  />
                </>
              )}
              <Button
                variant='contained'
                color='primary'
                sx={{ width: '100%', marginTop: '16px' }}
                onClick={handleRegister}
                disabled={isLoading}
              >
                <Typography variant='body1'>Register</Typography>
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box component='img' src={loginImg}></Box>
        </Grid>
      </Grid>
    </Box>
  )
}
