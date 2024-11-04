import { Box, Typography, Stack, Divider } from '@mui/material'
import Grid from '@mui/material/Grid2'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

const relatedPosts = [
  {
    title: 'Bài viết liên quan 1',
    author: 'Dr Khai',
    img: 'https://plus.unsplash.com/premium_photo-1663840243136-825f46d64881?w=600&auto=format&fit=crop&q=60',
  },
  {
    title: 'Bài viết liên quan 2',
    author: 'Dr Hai',
    img: 'https://plus.unsplash.com/premium_photo-1663840243136-825f46d64881?w=600&auto=format&fit=crop&q=60',
  },
]

const post = {
  title: 'Tiêu đề chi tiết bài viết',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum ligula libero, sit amet tincidunt ex condimentum id. Nam non lorem odio. Proin ut est ligula. Ut id lacus vel felis sodales bibendum. Suspendisse auctor neque in malesuada aliquam. Praesent vel felis dolor. Integer convallis dictum risus, et malesuada neque. Phasellus varius felis sit amet dui vulputate, vel luctus nisl fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum ligula libero, sit amet tincidunt ex condimentum id. Nam non lorem odio. Proin ut est ligula. Ut id lacus vel felis sodales bibendum. Suspendisse auctor neque in malesuada aliquam. Praesent vel felis dolor. Integer convallis dictum risus, et malesuada neque. Phasellus varius felis sit amet dui vulputate, vel luctus nisl fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum ligula libero, sit amet tincidunt ex condimentum id. Nam non lorem odio. Proin ut est ligula. Ut id lacus vel felis sodales bibendum. Suspendisse auctor neque in malesuada aliquam. Praesent vel felis dolor. Integer convallis dictum risus, et malesuada neque. Phasellus varius felis sit amet dui vulputate, vel luctus nisl fermentum',
  img: 'https://plus.unsplash.com/premium_photo-1663840243136-825f46d64881?w=600&auto=format&fit=crop&q=60',
  time: '2024-10-31',
  author: 'Dr Hai',
  view: 100,
  like: 50,
}

const DetailPost = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          width: '1152px',
          margin: '0px auto',
          flexDirection: 'row',
          padding: '16px 0',
        }}
      >
        <Grid size={8.7}>
          <Box
            sx={{
              backgroundColor: '#fff',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              overflow: 'hidden',
              paddingBottom: '16px',
            }}
          >
            <Box
              component='img'
              src={post.img}
              alt={post.title}
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
              }}
            />
            <Box sx={{ padding: '24px' }}>
              <Typography variant='h4' sx={{ marginBottom: '16px' }}>
                {post.title}
              </Typography>
              <Stack
                direction='row'
                spacing={3}
                mb={3}
                sx={{
                  color: '#666',
                  fontSize: '14px',
                }}
              >
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <VisibilityOutlinedIcon style={{ fontSize: '20px' }} />
                  {post.view}
                </Typography>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <FavoriteBorderOutlinedIcon style={{ fontSize: '20px' }} />
                  {post.like}
                </Typography>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <AccountCircleOutlinedIcon style={{ fontSize: '20px' }} />
                  {post.author}
                </Typography>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <CalendarTodayIcon style={{ fontSize: '20px' }} />
                  {post.time}
                </Typography>
              </Stack>
              <Divider />
              <Typography
                variant='body1'
                sx={{ marginTop: '16px', lineHeight: '1.8' }}
              >
                {post.content}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={0.3}></Grid>
        <Grid size={3}>
          <Box
            sx={{
              backgroundColor: '#fff',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
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
            {relatedPosts.map((post, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: '16px',
                  padding: '8px 0px',
                  borderBottom: '1px solid #ddd',
                  marginBottom: '8px',
                }}
              >
                <Box
                  component='img'
                  src={post.img}
                  alt={post.title}
                  sx={{ width: '50px', height: '50px', borderRadius: '8px' }}
                />
                <Box>
                  <Typography variant='body1' color='initial'>
                    {post.title}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {post.author}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DetailPost
