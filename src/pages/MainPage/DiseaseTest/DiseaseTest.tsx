import { Box, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import testBackground from '../../../assets/test-background.png'
import { Link } from 'react-router-dom'
function DiseaseTest() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${testBackground})`,
        backgroundPosition: '',
        backgroundSize: '100%',
        height: '650px',
      }}
    >
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
        }}
      >
        <Grid size={10}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              p: '100px 0px',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant='h3' color='#3C5EAB'>
              ĐÁNH GIÁ NHANH
            </Typography>
            <Typography variant='h4' color='#65AD45'>
              MIỄN PHÍ
            </Typography>
            <ul>
              <li
                style={{
                  marginLeft: '16px',
                  marginBottom: '8px',
                  fontSize: '20px',
                }}
              >
                TRẦM CẢM
              </li>
              <li
                style={{
                  marginLeft: '16px',
                  marginBottom: '8px',
                  fontSize: '20px',
                }}
              >
                RỐI LOẠN LO ÂU
              </li>
              <li
                style={{
                  marginLeft: '16px',
                  marginBottom: '8px',
                  fontSize: '20px',
                }}
              >
                CĂNG THẲNG - STRESS
              </li>
            </ul>
            <Link to='/test-tram-cam' style={{ textDecoration: 'none' }}>
              <Button variant='contained'>
                <Typography variant='h6' color='#fff'>
                  BẮT ĐẦU
                </Typography>
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DiseaseTest
