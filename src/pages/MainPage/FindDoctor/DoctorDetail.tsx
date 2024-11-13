import { Box, Typography, Stack, Divider, Avatar, Rating } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useParams } from 'react-router-dom'
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react'
import {
  useGetDoctorDetailQuery,
  useGetDoctorCommentsQuery,
} from '../../../redux/api/api.caller'
import LazyLoading from '../../../components/LazyLoading'
export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>()
  const idDoctor = id ? parseInt(id) : 0
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

  // Change comments every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (commentData && commentData.data.elements.length > 0) {
        setCurrentIndex(
          prevIndex =>
            (prevIndex + commentsPerPage) % commentData.data.elements.length,
        )
      }
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval) // Cleanup the interval on unmount
  }, [commentData])

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
  return (
    <Box>
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
        <Grid size={12}>
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
              backgroundColor: '#F8F6F7',
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
                }}
              ></Box>
              <Stack
                sx={{
                  marginTop: '0px',
                  gap: '16px',
                  padding: '16px',
                  color: '#000',
                }}
              >
                <Typography variant={'h5'} color='#65AD45'>
                  {doctor.degree}
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
                <Typography variant={'h6'}>THÀNH TÍCH</Typography>
                <ul>
                  <li style={{ listStyle: 'none', marginLeft: '16px' }}>
                    Bằng khen của chủ tịch nước, của tổng bí thư và phó thủ
                    tướng nước CNHXCN Việt Nam trao tặng
                  </li>
                  <li style={{ listStyle: 'none', marginLeft: '16px' }}>
                    Bằng khen của bộ trưởng bộ y tế… và các cấp khác
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
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          maxWidth: '1152px',
          padding: '16px 0',
          backgroundColor: '#F8F6F7',
          margin: '0px auto',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant='h6' color='#65AD45' textAlign={'center'} mb={2}>
          Bệnh nhân đánh giá
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '0 30px',
          }}
        >
          {comments.length > 0 ? (
            commentsToShow.map(
              (
                comment: {
                  avatar: string | undefined
                  fullName:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined
                  username:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined
                  content:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined
                  rating: {
                    toFixed: (arg0: number) => number | null | undefined
                  }
                },
                index: Key | null | undefined,
              ) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: '300px',
                    padding: '16px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    transition: 'all 0.5s ease-in-out',
                  }}
                >
                  <Stack gap='8px'>
                    <Stack
                      direction={'row'}
                      gap={'16px'}
                      alignContent={'center'}
                    >
                      <Avatar src={comment.avatar}></Avatar>
                      <Stack direction='column' gap='4px'>
                        <Typography variant='body1' fontWeight='bold'>
                          {comment.fullName}
                        </Typography>
                        <Typography variant='body2'>
                          {comment.username}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography variant='body2'>{comment.content}</Typography>
                    <Typography
                      variant='body2'
                      color='#FFD700'
                      display={'flex'}
                      alignItems={'center'}
                    >
                      Đánh giá:{' '}
                      <Rating
                        name='read-only'
                        value={comment.rating.toFixed(1)}
                        readOnly
                        sx={{ fontSize: '16px' }}
                      />
                    </Typography>
                  </Stack>
                </Box>
              ),
            )
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
