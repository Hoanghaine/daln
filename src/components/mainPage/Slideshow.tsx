import { Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const doctorProfile = {
  certificates: [
    'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9jdG9yfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
  ],
}

const Slideshow = ({ certificates = doctorProfile.certificates }) => {
  return (
    <Swiper
      pagination={{ dynamicBullets: true }}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 1500,
        disableOnInteraction: true,
      }}
      className='mySwiper'
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid #ccc',
      }}
    >
      {certificates.slice(0, 3).map((cert, index) => (
        <SwiperSlide key={index}>
          <Box
            component='img'
            src={cert}
            alt={`Certificate ${index + 1}`}
            sx={{
              width: '100%',
              height: '500px',
              objectFit: 'cover',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slideshow
