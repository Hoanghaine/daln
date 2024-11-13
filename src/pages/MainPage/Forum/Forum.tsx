import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Paper,
  InputBase,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useGetPostsQuery } from '../../../redux/api/api.caller'
import { IPost } from '../../../types/posts'
import AddPost from './AddPost/AddPost'
import SearchIcon from '@mui/icons-material/Search'
import CreateIcon from '@mui/icons-material/Create'
import LazyLoading from '../../../components/LazyLoading'
const categories = ['Tư vấn']
import CloseIcon from '@mui/icons-material/Close'
const RelativePost = ({ title, author }: { title: string; author: string }) => (
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
  thumbnail,
  createdAt,
  author,
  totalLikes,
  totalComment,
}: IPost) => {
  const navigate = useNavigate()

  const loadDetailPost = () => {
    console.log('Load detail post', id)
    navigate(`/forum/${id}`)
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
      {thumbnail && (
        <Box
          onClick={loadDetailPost}
          component={'img'}
          src={thumbnail}
          sx={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: ' 16px 16px 0 0',
          }}
        ></Box>
      )}
      <Box
        sx={{
          padding: '8px 16px 16px 16px',
        }}
      >
        <Typography variant='h5' color='initial' onClick={loadDetailPost}>
          {title}
        </Typography>
        <Typography variant='body2' color='initial'>
          {content}
        </Typography>
        <Stack
          direction='row'
          spacing={3}
          mt={1}
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
            {totalComment}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <FavoriteBorderOutlinedIcon
              style={{ color: '#3C5EAB', fontSize: '20px' }}
            />
            {totalLikes}
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
            <CalendarTodayIcon style={{ color: '#3C5EAB', fontSize: '20px' }} />
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}

export default function Forum() {
  const [showAddPost, setShowAddPost] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('Tư vấn')
  const [page, setPage] = useState<number>(0)
  const { data, isLoading, isError, refetch } = useGetPostsQuery({
    page,
    size: 10,
  })

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  const handleAddPostSuccess = () => {
    console.log('Post added successfully!')

    refetch() // Re-fetch posts after successful addition
    setShowAddPost(false) // Optionally hide AddPost form after submission
  }
  const handleClose = () => {
    setShowAddPost(false) // Close the dialog when "Cancel" is clicked
  }

  if (isLoading) return <LazyLoading />
  if (isError || !data?.data.elements.length) {
    return (
      <Typography variant='h6' color='error'>
        Error fetching posts or no posts available.
      </Typography>
    )
  }
  const filteredPosts = data.data.elements.filter(
    (post: IPost) => post.tag === selectedCategory,
  )
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#F0F2F5',
        position: 'relative',
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
          <Box mb={2}>
            <Paper
              component='form'
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                mb: '16px',
              }}
            >
              <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Tìm kiếm bài viết'
                inputProps={{ 'aria-label': 'Tìm kiếm bài viết' }}
              />
            </Paper>

            <Button
              startIcon={<CreateIcon />}
              variant='contained'
              onClick={() => setShowAddPost(true)}
            >
              Đăng bài viết
            </Button>
            <Dialog
              open={showAddPost}
              onClose={handleClose}
              maxWidth='sm'
              fullWidth
            >
              <DialogTitle
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottom: '1px solid #D6D9DD',
                }}
              >
                <Typography
                  variant='h6'
                  color='initial'
                  sx={{ flexGrow: 1, textAlign: 'center' }}
                >
                  Tạo bài viết
                </Typography>
                <CloseIcon
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: '#D6D9DD',
                    padding: '2px',
                    borderRadius: '50%',
                    '&:hover': {
                      color: 'red',
                    },
                  }}
                />
              </DialogTitle>
              <DialogContent>
                <AddPost onAddPostSuccess={handleAddPostSuccess} />
              </DialogContent>
            </Dialog>
          </Box>

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
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    marginLeft: '16px',
                    listStyle: 'none',
                    padding: '8px',
                    cursor: 'pointer',
                    color:
                      selectedCategory === category ? '#3C5EAB' : 'inherit',
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          </Box>
        </Grid>

        <Grid size={6}>
          {filteredPosts.map((post: IPost) => (
            <Post key={post.id} {...post} />
          ))}
        </Grid>

        <Grid size={3}>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '16px',
              boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
              borderRadius: '8px',
              position: 'sticky',
              top: '164px',
              zIndex: 1000,
            }}
          >
            <Typography variant='h6' color='initial'>
              Bài viết liên quan
            </Typography>
            {data.data.elements.slice(0, 3).map((post: IPost) => (
              <RelativePost key={post.id} {...post} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
