import Grid from '@mui/material/Grid2'
import { Box, Stack, Typography, Button } from '@mui/material'

const posts = [
  {
    title: 'Tin tức 1',
    content:
      'lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit ',
    img: 'https://plus.unsplash.com/premium_photo-1663840243136-825f46d64881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
    time: '2021-10-10',
    author: 'Dr Hai',
    view: 100,
    like: 50,
  },
  {
    title: 'Tin tức 2',
    content: 'Nội dung tin tức 2',
    img: 'https://plus.unsplash.com/premium_photo-1663840243136-825f46d64881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
    time: '2021-10-10',
    author: 'Dr Khai',
    view: 100,
    like: 50,
  },
  {
    title: 'Tin tức 3',
    content: 'Nội dung tin tức 3',
    img: 'https://plus.unsplash.com/premium_photo-1663840243136-825f46d64881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
    time: '2021-10-10',
    author: 'Dr Hai',
    view: 100,
    like: 50,
  },
]
interface PostProps {
  title: string
  content: string
  img: string
  time: string
  author: string
  view: number
  like: number
}
const Post = ({ title, content, img, time, author, view, like }: PostProps) => (
  <Box>
    <Box
      component={'img'}
      src={img}
      sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
    ></Box>
    <Box>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          color: '#3C5EAB',
        }}
      >
        <Typography>{time}</Typography>
        <Typography>{author}</Typography>
        <Typography>{view}</Typography>
        <Typography>{like}</Typography>
      </Stack>
      <Typography variant='h5' color='initial'>
        {title}
      </Typography>
      <Typography variant='body2' color='initial'>
        {content}
      </Typography>
    </Box>
  </Box>
)
export default function NewsAndEvent() {
  return (
    <Box textAlign={'center'}>
      <Typography variant='h4' color='initial'>
        Tin tức và sự kiện
      </Typography>
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: '16px 0',
          gap: '20px',
          backgroundColor: '#fff',
          margin: '0px auto',
          flexWrap: 'nowrap',
        }}
      >
        <Grid size={8}>
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </Grid>
        <Grid size={3}></Grid>
      </Grid>
    </Box>
  )
}
