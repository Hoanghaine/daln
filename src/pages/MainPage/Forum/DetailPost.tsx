import {
  Box,
  Typography,
  Stack,
  Divider,
  Avatar,
  Button,
  TextField,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp'
import { useParams } from 'react-router-dom'
import { useMemo, useEffect, useState } from 'react'
import {
  useGetPostDetailQuery,
  useGetPostCommentsQuery,
  useCommentPostMutation,
  useLikePostMutation,
  useUnLikePostMutation,
} from '../../../redux/api/api.caller'
import LazyLoading from '../../../components/LazyLoading'
import styled from '@mui/system/styled'
import { get } from 'http'
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
const CommentBox = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: '16px',
  },
}))
const DetailPost = () => {
  const { id } = useParams<{ id: string }>()
  const postId = useMemo(() => (id ? parseInt(id, 10) : 0), [id])
  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
    refetch: refetchPost,
  } = useGetPostDetailQuery(postId)
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    refetch: refetchComments,
  } = useGetPostCommentsQuery(postId)
  const [likePost, { isLoading: isLiking }] = useLikePostMutation()
  const [unLikePost, { isLoading: isUnliking }] = useUnLikePostMutation()
  const [commentPost, { isLoading: isCommenting }] = useCommentPostMutation()
  const [newComment, setNewComment] = useState('')
  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  useEffect(() => {
    console.log('DetailPost re-rendered')
    // Lấy thông tin người dùng từ localStorage khi trang tải
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      const avatar = JSON.parse(storedUserInfo).avatar
      setUserAvatar(avatar)
    }
  }, [])
  const post = postData?.data
  const comments = commentsData?.data?.elements || []

  if (isPostLoading || isCommentsLoading) {
    return <LazyLoading />
  }
  if (isPostError) {
    return (
      <Typography variant='h6' color='error'>
        Error fetching post or no data available.
      </Typography>
    )
  }
  const handleLikePost = async (postId: number) => {
    console.log('like post id:', postId)
    try {
      const response = await likePost(postId).unwrap()
      console.log('like post response:', response)
      refetchPost()
    } catch (error) {
      console.error('Failed to like the post:', error)
    }
  }

  const handleUnlikePost = async (postId: number) => {
    console.log('unlike post id:', postId)
    try {
      const response = await unLikePost(postId).unwrap()
      console.log('unlike post response:', response)
      refetchPost()
      // Optionally, refetch or optimistically update local state here
    } catch (error) {
      console.error('Failed to unlike the post:', error)
    }
  }
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return
    try {
      await commentPost({ postId, content: newComment }).unwrap()
      setNewComment('')
      refetchComments()
    } catch (error) {
      console.error('Failed to post comment:', error)
    }
  }

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
              src={post.thumbnail}
              alt={post.title}
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
              }}
            />
            <Box sx={{ padding: '24px' }}>
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
                  <Avatar src={post.authorAvatar}></Avatar>
                  {post.author}
                </Typography>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {post.liked ? (
                    <FavoriteSharpIcon
                      onClick={() => handleUnlikePost(post.id)}
                      style={{ color: '#3C5EAB', fontSize: '20px' }}
                    />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      onClick={() => handleLikePost(post.id)}
                      style={{ color: '#3C5EAB', fontSize: '20px' }}
                    />
                  )}
                  {post.likeCount}
                </Typography>

                <Typography
                  sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <CalendarTodayIcon style={{ fontSize: '20px' }} />
                  {post.createdAt}
                </Typography>
              </Stack>
              <Typography variant='h5' sx={{ marginBottom: '8px' }}>
                {post.title}
              </Typography>
              <Box sx={{}} dangerouslySetInnerHTML={{ __html: post.content }} />
              <Divider sx={{ margin: '16px 0' }} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {isCommentsLoading ? (
                  <LazyLoading />
                ) : (
                  comments.map((comment, index) => (
                    <Box key={comment.id || index} sx={{}}>
                      <Stack
                        direction='row'
                        spacing={1}
                        alignItems='flex-start'
                      >
                        <Avatar
                          src={
                            comment.avatar ||
                            'https://imgs.search.brave.com/H_NZMJINClnOmtALE4lAcyKp_ICH1MB4hLmLmL2voWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzJx/aWZ2L3N0eWxlcy9j/b21tdW5pdHlJY29u/Xzh5NDFwMHowNTh0/YzEucG5n'
                          }
                        />
                        <Box
                          sx={{
                            width: '100%',
                            backgroundColor: '#F0F2F5',
                            padding: '8px 16px',
                            borderRadius: '16px',
                          }}
                        >
                          <Typography variant='body1'>
                            {comment.username || 'Anonymous'}
                          </Typography>
                          <Typography variant='body2' color='textSecondary'>
                            {comment.content}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))
                )}
                <Stack direction='row' spacing={1} mt={2}>
                  <Avatar src={userAvatar || ''}></Avatar>
                  <CommentBox
                    fullWidth
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder='Write a comment...'
                    disabled={isCommenting}
                    sx={{
                      backgroundColor: '#F0F2F5',
                      borderRadius: '16px',
                    }}
                  />
                  <Button
                    variant='contained'
                    onClick={handleCommentSubmit}
                    disabled={isCommenting}
                    sx={{
                      borderRadius: '16px',
                      padding: '8px 16px',
                      backgroundColor: '#3C5EAB',
                      color: '#fff',
                    }}
                  >
                    Post
                  </Button>
                </Stack>
              </Box>
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
