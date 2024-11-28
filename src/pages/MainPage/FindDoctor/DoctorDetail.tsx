import {
  Box,
  Typography,
  Stack,
  Divider,
  Avatar,
  Rating,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useGetDoctorDetailQuery,
  useGetDoctorCommentsQuery,
} from '../../../redux/api/api.caller'
import LazyLoading from '../../../components/LazyLoading'
import { useMakeScheduleMutation } from '../../../redux/api/api.caller'
import SendIcon from '@mui/icons-material/Send'
import { Stomp, CompatClient } from '@stomp/stompjs'
import { useEffect, useRef, useState } from 'react'

export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>()
  const idDoctor = id ? parseInt(id) : 0
  const [appointmentDate, setAppointmentDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [notes, setNotes] = useState('')
  const [makeSchedule, { isLoading }] = useMakeScheduleMutation()
  const stompClient = useRef<CompatClient | null>(null)

  const [message, setMessage] = useState('Bác sĩ ơi hỗ trợ tôi với!')
  const [username, setUsername] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const {
    data: doctorData,
    isLoading: isDoctorLoading,
    isError: isDoctorError,
  } = useGetDoctorDetailQuery(idDoctor)

  const {
    data: commentData,
    isLoading: isCommentLoading,
    isError: isCommentError,
  } = useGetDoctorCommentsQuery(idDoctor)

  const [currentIndex, setCurrentIndex] = useState(0)
  const commentsPerPage = 3

  useEffect(() => {
    if (doctorData?.data) {
      setReceiverName(doctorData.data.username)
    }
    connectWebSocket()
  }, [doctorData])
  useEffect(() => {
    const setUserName = async () => {
      const userInfor = localStorage.getItem('userInfo')
      if (userInfor) {
        const userData = JSON.parse(userInfor)
        setUsername(userData.username) // Thiết lập username từ localStorage
      } else {
        console.error('User info not found')
      }
    }
    setUserName()
  }, [])
  // Change comments every 3 seconds
  useEffect(() => {
    if (commentData && commentData.data.elements.length > 0) {
      const totalComments = commentData.data.elements.length
      if (totalComments <= commentsPerPage) {
        setCurrentIndex(0) // Reset nếu số đánh giá ít hơn commentsPerPage
      } else {
        const interval = setInterval(() => {
          setCurrentIndex(
            prevIndex => (prevIndex + commentsPerPage) % totalComments,
          )
        }, 3000)

        return () => clearInterval(interval)
      }
    }
  }, [commentData])
  const connectWebSocket = async () => {
    const token = localStorage.getItem('token')
    if (!token || !username) return // Chỉ tiếp tục nếu có token và username

    const client = Stomp.over(
      // () => new WebSocket('wss://local.thinhtran.online/ws'),
      () => new WebSocket('ws://localhost:8080/ws'),
    )

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log('Connected')

        // Subscribe to the topic
        client.subscribe(`/user/${username}/root`, () => {
          console.log('Subscribed to topic')
        })
      },
      error => {
        console.error('Connection lost. Retrying in 5 seconds...', error)
        setTimeout(connectWebSocket, 5000) // Tự động reconnect sau 5 giây
      },
    )
    stompClient.current = client
  }
  if (isDoctorLoading || isCommentLoading) return <LazyLoading />
  if (isDoctorError || !doctorData || isCommentError || !commentData) {
    return (
      <Typography variant='h6' color='error'>
        Error fetching data or no data available.
      </Typography>
    )
  }
  const doctor = doctorData.data

  const comments = commentData.data.elements
  const displayedComments = comments.slice(
    currentIndex,
    currentIndex + commentsPerPage,
  )

  // Handle the case when there are fewer comments than 3 or we're at the end of the array
  const commentsToShow =
    displayedComments.length < commentsPerPage
      ? [
          ...displayedComments,
          ...comments.slice(0, commentsPerPage - displayedComments.length),
        ]
      : displayedComments

  const handleSubmit = async () => {
    if (!appointmentDate || !timeSlot) {
      toast.error('Vui lòng chọn ngày và giờ!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'bottom-right',
      })
      return
    }
    const appointmentDateISO = new Date(appointmentDate).toISOString()
    try {
      await makeSchedule({
        doctorId: idDoctor,
        notes,
        appointmentDate: `${appointmentDateISO.split('T')[0]}T${timeSlot}`,
      }).unwrap()
      toast.success('Đặt lịch thành công!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'top-right',
      })
      setAppointmentDate('')
      setTimeSlot('')
      setNotes('')
    } catch (error) {
      toast.error('Đặt lịch thất bại!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'top-right',
      })
      console.error(error)
    }
  }
  const handleSendMessageNow = async () => {
    if (message && receiverName && stompClient.current) {
      const chatMessage = {
        senderName: username,
        receiverName: receiverName,
        message: message,
      }
      console.log('Sending message:', chatMessage)
      stompClient.current.send(
        '/app/private-message',
        { Authorization: 'Bearer ' + localStorage.getItem('token') },
        JSON.stringify(chatMessage),
      )
      setMessage('') // Reset message input
      toast.success('Tin nhắn đã được gửi!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'top-right',
      })
      window.location.href = '/message'
    }
  }

  return (
    <Box>
      <ToastContainer />
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: '16px 0',
          gap: '20px',
          backgroundColor: 'tranference',
          margin: '0px auto',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
        }}
      >
        <Grid size={9}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              backgroundColor: '#F8F6F7',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
            }}
          >
            <Box
              sx={{
                width: '50%',
                padding: '16px',
              }}
            >
              <Box
                component={'img'}
                src={doctor.avatar}
                sx={{
                  margin: '0px',
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              ></Box>
              <Stack
                sx={{
                  marginTop: '0px',
                  gap: '8px',
                  padding: '16px',
                  color: '#000',
                }}
              >
                <Typography variant={'h5'} color='#65AD45'>
                  {doctor.name}
                </Typography>
                <Typography variant={'body1'} color='#65AD45'>
                  Phó viện trưởng – Viện sức khỏe tâm thần Bệnh viện Bạch Mai Hà
                  Nội
                </Typography>
                <Typography variant={'h6'}>LÝ LỊCH CÁ NHÂN</Typography>
                <ul>
                  <li
                    style={{
                      listStyle: 'none',
                      marginLeft: '16px',
                      marginBottom: '8px',
                    }}
                  >
                    Họ và tên: {doctor.name}
                  </li>
                  <li
                    style={{
                      listStyle: 'none',
                      marginLeft: '16px',
                      marginBottom: '8px',
                    }}
                  >
                    Nơi đào tạo: Trường Đại học Y Hà Nội
                  </li>
                </ul>

                <Typography variant={'h6'}>THÔNG TIN LIÊN HỆ</Typography>
                <Typography variant='body1'>
                  Địa chỉ: {doctor.address}
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Box
              sx={{
                width: '50%',
                padding: '16px',
              }}
            >
              <Typography variant='h6' color='#65AD45'>
                KINH NGHIỆM LÀM VIỆC CÁ NHÂN
              </Typography>
              <Typography variant='body1' color='initial'>
                {doctor.about}
              </Typography>
              <Typography variant='h6' color='#65AD45' mt={2}>
                THÀNH TÍCH
              </Typography>
              <ul>
                <li style={{ listStyle: 'none', marginLeft: '16px' }}>
                  Bằng khen của chủ tịch nước, của tổng bí thư và phó thủ tướng
                  nước CNHXCN Việt Nam trao tặng
                </li>
                <li style={{ listStyle: 'none', marginLeft: '16px' }}>
                  Bằng khen của bộ trưởng bộ y tế… và các cấp khác
                </li>
              </ul>
            </Box>
          </Box>
        </Grid>
        <Grid size={3}>
          <Button
            endIcon={<SendIcon />}
            variant='contained'
            sx={{ mb: 2 }}
            onClick={handleSendMessageNow}
          >
            Gửi tin nhắn ngay
          </Button>
          <Box
            sx={{
              backgroundColor: '#F8F6F7',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              padding: '24px',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <Typography
              variant='h5'
              color='#65AD45'
              textAlign='center'
              marginBottom={3}
            >
              Đặt lịch ngay
            </Typography>
            <Stack spacing={3}>
              <TextField
                type='date'
                label='Chọn ngày'
                InputLabelProps={{ shrink: true }}
                value={appointmentDate}
                onChange={e => setAppointmentDate(e.target.value)}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel id='time-slot-label'>Chọn giờ</InputLabel>
                <Select
                  labelId='time-slot-label'
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  label='Chọn giờ'
                >
                  <MenuItem value='09:00:00'>9:00 - 12:00</MenuItem>
                  <MenuItem value='12:00:00'>12:00 - 15:00</MenuItem>
                  <MenuItem value='15:00:00'>15:00 - 18:00</MenuItem>
                </Select>
              </FormControl>

              {/* Ghi chú */}
              <TextField
                label='Ghi chú (không bắt buộc)'
                multiline
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                fullWidth
              />
              <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                disabled={isLoading}
                fullWidth
                sx={{
                  backgroundColor: '#65AD45',
                  ':hover': { backgroundColor: '#4c8a34' },
                }}
              >
                {isLoading ? 'Đang xử lý...' : 'Đặt lịch'}
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          maxWidth: '1152px',
          padding: '16px 0',
          backgroundColor: '#F8F6F7',
          margin: '0 auto',
          textAlign: 'center',
          mb: 2,
          borderRadius: 2,
          border: '1px solid #e0e0e0',
        }}
      >
        <Typography variant='h6' color='#65AD45' mb={2}>
          Bệnh nhân đánh giá
        </Typography>

        <Box
          sx={{
            width: 'fit-content',
            display: 'flex',
            margin: '0 auto',
            padding: '0 20px',
            gap: '20px',
          }}
        >
          {comments.length > 0 ? (
            commentsToShow.map((comment, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: '300px',
                  padding: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Stack spacing={1}>
                  {/* Header with avatar and user info */}
                  <Stack direction='row' spacing={2} alignItems='center'>
                    <Avatar src={comment.avatar} alt={comment.fullName} />
                    <Stack spacing={0.5}>
                      <Typography variant='body1' fontWeight='bold'>
                        {comment.fullName}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {comment.username}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Comment content */}
                  <Typography variant='body2' color='textPrimary'>
                    {comment.content}
                  </Typography>

                  {/* Rating */}
                  <Box display='flex' alignItems='center' color='#FFD700'>
                    <Typography variant='body2' sx={{ mr: 1 }}>
                      Đánh giá:
                    </Typography>
                    <Rating
                      name='read-only'
                      value={Number(comment.rating.toFixed(1))}
                      readOnly
                      size='small'
                    />
                  </Box>
                </Stack>
              </Box>
            ))
          ) : (
            <Typography variant='body2' color='textSecondary'>
              Không có đánh giá nào
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
