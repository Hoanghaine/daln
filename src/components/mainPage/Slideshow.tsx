import React, { useState, useEffect } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

const images = [
  'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9jdG9yfGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
]

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      )
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval) // Clear interval on component unmount
  }, [])

  // Handle manual slide change
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '500px',
        overflow: 'hidden',
        objectFit: 'cover',
      }}
    >
      {/* Slides */}
      {images.map((image, index) => (
        <Box
          key={index}
          component='img'
          src={image}
          alt={`Slide ${index + 1}`}
          sx={{
            display: index === currentIndex ? 'block' : 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ))}

      {/* Previous Button */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '16px',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '16px',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  )
}

export default Slideshow
