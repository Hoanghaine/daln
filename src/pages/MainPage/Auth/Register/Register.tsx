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
import loginImg from '../../../../assets/login-img.png'
import {
  useRegisterMutation,
  useGetSpecializationsQuery,
  useUploadCertificatesMutation,
} from '../../../../redux/api/api.caller' // API mutation
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { IUserRegister } from '../../../../types/user'
import 'react-toastify/dist/ReactToastify.css'
import LazyLoading from '../../../../components/LazyLoading'
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
  const [certificates, setCertificates] = useState<File[]>([]) // State to store selected files
  const { data: specializationsData } = useGetSpecializationsQuery({})
  const [uploadCertificates] = useUploadCertificatesMutation()
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      const selectedArray = Array.from(selectedFiles)

      if (selectedArray.length + certificates.length > 3) {
        toast.error('Bạn chỉ có thể nhập tối đa 3 chứng chỉ!', {
          theme: 'colored',
          autoClose: 2000,
          position: 'bottom-center',
        })
      } else {
        setCertificates([...certificates, ...selectedArray].slice(0, 3)) // Ensure only 3 files max
      }
    }
  }
  if (isLoading) return <LazyLoading />
  const handleRegister = async () => {
    console.log('Register form data:', formData)
    try {
      // Gửi yêu cầu đăng ký
      const response = await register(formData).unwrap()
      console.log('Register response:', response)

      if (response) {
        if (formData.role === 'DOCTOR') {
          const token = response.data.token
          localStorage.setItem('token', token)
          console.log(formData.name)
          if (certificates.length > 0) {
            // Gửi yêu cầu tải lên certificates
            const uploadResponse = await uploadCertificates({
              images: certificates,
              name: formData.name,
            }).unwrap()
            console.log('Upload certificates response:', uploadResponse)

            toast.success('Chứng chỉ đã được tải lên thành công!', {
              theme: 'colored',
              autoClose: 3000,
              position: 'top-right',
            })
          }

          toast.success(
            'Đăng ký thành công! Vui lòng kiểm tra email sau 1-2 ngày',
            {
              theme: 'colored',
              autoClose: 3000,
              position: 'top-right',
            },
          )
        } else {
          toast.success('Đăng ký thành công!', {
            theme: 'colored',
            autoClose: 2000,
            position: 'top-right',
          })
        }

        // Điều hướng sau khi hoàn tất
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
    } catch (error) {
      console.error('Register failed:', error)
      toast.error('Đăng ký thất bại!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'top-right',
      })
      localStorage.removeItem('token')
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
          direction='row'
          spacing={2}
          justifyContent='flex-end'
          alignItems='center'
          mb={2}
        >
          <Typography variant='body1' color='initial'>
            Bạn đã có tài khoản?{' '}
          </Typography>
          <Button variant='contained' onClick={() => navigate('/login')}>
            Đăng nhập
          </Button>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
          }}
        >
          <Typography variant='h4' color='initial' textAlign={'center'} mb={2}>
            Signup to{' '}
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
                variant='outlined'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
              />
              <TextField
                label='Password'
                type='password'
                variant='outlined'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
              />
              <TextField
                label='Name'
                variant='outlined'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextField
                label='Email'
                variant='outlined'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                label='Phone'
                variant='outlined'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
              />
              <TextField
                label='Date of Birth'
                type='date'
                InputLabelProps={{ shrink: true }}
                variant='outlined'
                name='dob'
                value={formData.dob}
                onChange={handleInputChange}
              />
              <TextField
                label='Address'
                variant='outlined'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
              />
              {tabValue === 1 && (
                <>
                  <TextField
                    label='Specialization'
                    variant='outlined'
                    name='specialization'
                    value={formData.specialization}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label='Experience Years'
                    type='number'
                    variant='outlined'
                    name='experienceYears'
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                  />
                  <Box>
                    <Typography variant='body1' color='initial'>
                      Import your certificates (Max 3)
                    </Typography>
                    <input
                      type='file'
                      multiple
                      accept='image/*'
                      onChange={handleFileChange}
                    />
                    {certificates.length > 0 && (
                      <Typography variant='body2' color='initial'>
                        {certificates.length} file(s) selected
                      </Typography>
                    )}
                  </Box>
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
        </Box>
      </Box>

      <Box
        component='img'
        src={loginImg}
        sx={{
          width: '500px',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '16px',
          flexGrow: 0,
        }}
      ></Box>
    </Box>
  )
}
