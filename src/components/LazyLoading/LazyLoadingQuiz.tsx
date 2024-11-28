import ClipLoader from 'react-spinners/ClipLoader'
import { useState } from 'react'
import { StyledLazyLoading } from './styled'
import { Typography } from '@mui/material'
const LazyLoadingQuiz = () => {
  const [color] = useState('#36d7b7')
  return (
    <StyledLazyLoading>
      <ClipLoader size={45} color={color} loading />
      <Typography variant='body1' color={color} textAlign={'center'} ml={2}>
        Vui lòng đợi trong giây lát để tính toán kết quả
      </Typography>
    </StyledLazyLoading>
  )
}

export default LazyLoadingQuiz
