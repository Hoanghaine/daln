import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
  Rating,
  Stack,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import findDoctor from '../../../assets/doctor_find_background.jpg'
import { IDoctorsBasicInfor } from '../../../types/doctor'
import { useState } from 'react'
import {
  useGetSpecializationsQuery,
  useLazyGetDoctorsBasicInforQuery,
} from '../../../redux/api/api.caller'
import { useEffect } from 'react'
import LazyLoading from '../../../components/LazyLoading'
const Searchbox = () => (
  <Paper
    component='form'
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
  >
    <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
      <SearchIcon />
    </IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder='Tìm kiếm bác sĩ'
      inputProps={{ 'aria-label': 'search google maps' }}
    />
  </Paper>
)
const DoctorCard = ({
  name,
  avatar,
  id,
  specialization,
  avgRating,
}: IDoctorsBasicInfor) => {
  return (
    <Grid
      size={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
        },
      }}
      onClick={() => {
        window.location.href = `/find-doctor/${id}`
      }}
    >
      <Box
        component={'img'}
        src={avatar}
        alt={name}
        sx={{
          width: '100%',
          height: '250px',
          borderRadius: '8px',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6' color={'#65AD45'} sx={{ marginTop: '10px' }}>
          {name}
        </Typography>
        <Typography variant='body2'>Chuyên môn: {specialization}</Typography>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='body1' color='initial'>
            {avgRating.toFixed(1)}%
          </Typography>
          <Rating
            name='read-only'
            value={avgRating}
            readOnly
            sx={{ fontSize: '18px' }}
          />
        </Stack>
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#65AD45',
            color: '#fff',
            borderRadius: '16px',
            marginTop: '10px',
            '&:hover': {
              backgroundColor: '#3C5EAB',
            },
          }}
          component={Link}
          to={`/find-doctor/${id}`}
        >
          Xem thông tin
        </Button>
      </Box>
    </Grid>
  )
}
const TopDoctorCard = ({
  name,
  avatar,
  id,
  specialization,
}: IDoctorsBasicInfor) => {
  return (
    <Grid
      size={12}
      sx={{
        display: 'flex',
        gap: '16px',
        padding: '8px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        mb: 1,
      }}
    >
      <Box
        component={'img'}
        src={avatar}
        alt={name}
        sx={{
          width: '70px',
          height: '70px',
          borderRadius: '8px',
          objectFit: 'cover',
        }}
      />
      <Box>
        <Typography variant='body1' color={'#65AD45'}>
          {name}
        </Typography>
        <Typography variant='body2' mb={2}>
          {specialization}
        </Typography>
      </Box>
    </Grid>
  )
}

function FindDoctor() {
  const [page, setPage] = useState<number>(0)
  const [doctors, setDoctors] = useState<IDoctorsBasicInfor[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    string | null
  >(null)

  // Lazy queries for the two API calls
  const [triggerGetDoctors, { isLoading: isGetDoctorsLoading }] =
    useLazyGetDoctorsBasicInforQuery()

  const { data: specializationsData } = useGetSpecializationsQuery({})

  const fetchAllDoctors = async () => {
    console.log('fetchAllDoctors')
    setIsLoading(true)
    const { data, error } = await triggerGetDoctors({ page, size: 10 })

    // Check for errors, handle if needed
    if (error) {
      console.error('Error fetching doctors:', error)
      setIsLoading(false)
      return
    }

    // Map the response to state (elements is inside data)
    setDoctors(data?.data?.elements || [])
    setIsLoading(false)
  }

  const fetchDoctorsBySpecialization = async (specialization: string) => {
    setIsLoading(true)
    const { data, error } = await triggerGetDoctors({
      page,
      size: 10,
      specialization,
    })
    // Check for errors, handle if needed
    if (error) {
      console.error('Error fetching doctors:', error)
      setIsLoading(false)
      return
    }
    console.log('doctors:', data?.data?.elements)
    setDoctors(data?.data?.elements || [])
    setIsLoading(false)
  }

  const handleSpecializationChange = async (
    event: React.MouseEvent<HTMLButtonElement>,
    specialization: string | null,
  ) => {
    event.preventDefault()
    setPage(0) // Reset page to 0 on specialization change
    setSelectedSpecialization(specialization)
    if (specialization) {
      await fetchDoctorsBySpecialization(specialization)
    } else {
      await fetchAllDoctors()
    }
  }

  useEffect(() => {
    const fetchDoctorsBySpecialization = async () => {
      console.log('fetchDoctorsBySpecialization')
      setIsLoading(true)
      const { data, error } = await triggerGetDoctors({
        page,
        size: 10,
      })
      // Check for errors, handle if needed
      if (error) {
        console.error('Error fetching doctors:', error)
        setIsLoading(false)
        return
      }
      console.log('doctors:', data?.data?.elements)
      setDoctors(data?.data?.elements || [])
      setIsLoading(false)
    }
    fetchDoctorsBySpecialization()
  }, [page])

  if (isLoading || isGetDoctorsLoading) {
    return <LazyLoading />
  }

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${findDoctor})`,
          backgroundPosition: '100% 10%',
          backgroundSize: 'fill',
          backgroundRepeat: 'no-repeat',
          height: '600px',
        }}
      >
        <Grid
          container
          sx={{
            maxWidth: '1152px',
            padding: '16px 0',
            gap: '20px',
            backgroundColor: 'tranference',
            margin: '0px auto',
            flexWrap: 'nowrap',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid size={10}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                p: '100px 0px',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant='h3' color='#3C5EAB' fontWeight={700}>
                ĐỘI NGŨ CHUYÊN GIA
              </Typography>
              <Typography variant='h4' color='#65AD45' fontWeight={600}>
                của PsyConnect
              </Typography>
              <ul>
                <li
                  style={{
                    marginLeft: '16px',
                    marginBottom: '8px',
                    fontSize: '20px',
                  }}
                >
                  Được đào tạo chuyên sâu
                </li>
                <li
                  style={{
                    marginLeft: '16px',
                    marginBottom: '8px',
                    fontSize: '20px',
                  }}
                >
                  Kinh nghiệm thực tế
                </li>
                <li
                  style={{
                    marginLeft: '16px',
                    marginBottom: '8px',
                    fontSize: '20px',
                  }}
                >
                  Tận tâm, chu đáo
                </li>
              </ul>
              <Button
                variant='outlined'
                onClick={() => {
                  const doctorGrid = document.getElementById('doctorGrid')
                  if (doctorGrid) {
                    const offsetTop =
                      doctorGrid.getBoundingClientRect().top +
                      window.pageYOffset -
                      147
                    window.scrollTo({
                      top: offsetTop,
                      behavior: 'smooth',
                    })
                  }
                }}
              >
                Tìm hiểu thêm
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: '16px 0',
          backgroundColor: '#fff',
          margin: '0px auto',
          justifyContent: 'space-between',
        }}
        id='doctorGrid'
      >
        <Grid size={12} mb={1} sx={{}}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              mt: 1,
              mb: 1,
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant='body1' color='initial'>
              Lọc bác sĩ:
            </Typography>
            <Button
              variant={
                selectedSpecialization === null ? 'contained' : 'outlined'
              }
              onClick={event => handleSpecializationChange(event, null)}
            >
              Tất cả
            </Button>
            {specializationsData?.data.elements.map(
              (specialization: string) => (
                <Button
                  key={specialization}
                  variant={
                    selectedSpecialization === specialization
                      ? 'contained'
                      : 'outlined'
                  }
                  onClick={event =>
                    handleSpecializationChange(event, specialization)
                  }
                >
                  {specialization}
                </Button>
              ),
            )}
          </Box>
        </Grid>
        <Grid size={9}>
          <Grid container spacing={1}>
            {doctors.map(doctor => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </Grid>
        </Grid>
        <Grid size={2.5}>
          <Typography variant='h6' color='initial'>
            Top bác sĩ của tháng
          </Typography>
          <Grid container sx={{ flexDirection: 'column' }}>
            {doctors.map(doctor => (
              <TopDoctorCard key={doctor.id} {...doctor} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FindDoctor
