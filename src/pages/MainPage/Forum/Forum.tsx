import { Box, Typography, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { useNavigate } from 'react-router-dom'
const categories = [
  'Chuyên mục 1',
  'Chuyên mục 2',
  'Chuyên mục 3',
  'Chuyên mục 4',
  'Chuyên mục 5',
]
const posts = [
  {
    id: 1,
    title: 'Bài viết 1',
    content:
      'lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit ',
    img: 'https://plus.unsplash.com/premium_photo-1663840243136-825f46d64881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
    time: '2021-10-10',
    author: 'Dr Hai',
    view: 100,
    like: 50,
  },
  {
    id: 2,
    title: 'Bài viết 2',
    content:
      'lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit ',
    img: 'https://plus.unsplash.com/premium_photo-1663840243136-825f46d64881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
    time: '2021-10-10',
    author: 'Dr Khai',
    view: 100,
    like: 50,
  },
  {
    id: 3,
    title: 'Bài viết 3',
    content:
      'lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit ',
    img: 'https://plus.unsplash.com/premium_photo-1663840243136-825f46d64881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
    time: '2021-10-10',
    author: 'Dr Hai',
    view: 100,
    like: 50,
  },
]
interface PostProps {
  id: number
  title: string
  content: string
  img: string
  time: string
  author: string
  view: number
  like: number
}
const RelativePost = ({ title, author }: PostProps) => (
  <Box
    sx={{
      display: 'flex',
      gap: '16px',
      padding: ' 8px 0px',
      backgroundColor: '#fff',
      '& img': {
        borderRadius: '50%',
      },
    }}
  >
    <Box
      component={'img'}
      src='https://plus.unsplash.com/premium_photo-1663840243136-825f46d64881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D'
      sx={{ width: '50px', height: '50px', objectFit: 'cover' }}
    ></Box>
    <Box>
      <Typography>{author}</Typography>
      <Typography variant='body1' color='initial'>
        {title}
      </Typography>
    </Box>
  </Box>
)
const Post = ({
  id,
  title,
  content,
  img,
  time,
  author,
  view,
  like,
}: PostProps) => {
  const navigate = useNavigate()

  const loadDetailPost = () => {
    navigate(`/forum/${id}`) // Navigate to the detail post page with the post id
  }
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
        borderRadius: '16px',
        marginBottom: '16px',
      }}
    >
      <Box
        onClick={loadDetailPost}
        component={'img'}
        src={img}
        sx={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: ' 16px 16px 0 0',
        }}
      ></Box>
      <Box
        sx={{
          padding: '8px 16px 16px 16px',
        }}
      >
        <Stack
          direction='row'
          spacing={3}
          mb={1}
          sx={{
            color: '#000',
          }}
        >
          <Typography
            sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <VisibilityOutlinedIcon
              style={{ color: '#3C5EAB', fontSize: '20px' }}
            />
            {view}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <FavoriteBorderOutlinedIcon
              style={{ color: '#3C5EAB', fontSize: '20px' }}
            />
            {like}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <AccountCircleOutlinedIcon
              style={{ color: '#3C5EAB', fontSize: '20px' }}
            />
            {author}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <CalendarTodayIcon style={{ color: '#3C5EAB', fontSize: '20px' }} />{' '}
            {time}
          </Typography>
        </Stack>
        <Typography variant='h5' color='initial' onClick={loadDetailPost}>
          {title}
        </Typography>
        <Typography variant='body2' color='initial'>
          {content}
        </Typography>
      </Box>
    </Box>
  )
}
export default function Forum() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#F0F2F5',
        position: 'relative',
        // padding: '16px 0',
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: '16px 0',
          gap: '20px',
          backgroundColor: 'initial',
          margin: '0px auto',
          flexWrap: 'nowrap',
        }}
      >
        <Grid size={3}>
          <Box
            sx={{
              backgroundColor: '#ffff',
              boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
              padding: '16px',
              borderRadius: '8px',
              position: 'sticky',
              top: '164px',
              zIndex: 1000,
            }}
          >
            <Typography variant='h6' color='initial'>
              Chuyên mục
            </Typography>
            <ul>
              {categories.map((category, index) => (
                <li
                  key={index}
                  style={{
                    marginLeft: '16px',
                    listStyle: 'none',
                    padding: '8px',
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          </Box>
        </Grid>

        <Grid size={6}>
          {posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </Grid>
        <Grid size={3}>
          <Box
            sx={{
              backgroundColor: '#ffff',
              boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
              padding: '16px',
              borderRadius: '8px',
              position: 'sticky',
              top: '164px',

              zIndex: 1000,
            }}
          >
            <Typography variant='h6' color='initial'>
              Bài viết liên quan
            </Typography>
            {posts.map((post, index) => (
              <RelativePost key={index} {...post} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
