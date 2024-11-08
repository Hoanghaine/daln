import { useLocation, useOutlet } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import SideBar from '../../organisms/SideBar/Sidebar'
import Header from '../../organisms/Header/Header'
import MainPageHeader from '../../mainPage/Header.tsx'
import MainPageFooter from '../../mainPage/Footer.tsx'
import Grid from '@mui/material/Grid2'
import React from 'react'
function ProtectedLayout() {
  const outlet = useOutlet()
  const location = useLocation()
  // const navigate = useNavigate()
  // const isAdminPath = location.pathname.startsWith('/admin')

  // useEffect(() => {
  //   if (isAdminPath) {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       navigate("/admin");
  //     }
  //   }
  // }, [location.pathname, navigate, isAdminPath]);
  // Check if the path matches the admin, doctor, or message routes

  const isAdminPath = location.pathname.startsWith('/admin')
  const isDoctorPath = location.pathname.startsWith('/doctor')
  const isMessagePath = location.pathname.startsWith('/message')
  const isAuthenPath = ['/login', '/register'].some(path =>
    location.pathname.startsWith(path),
  )
  const renderCommonLayout = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100vh', // Chiều cao 100% của viewport
        backgroundColor: '#f5f5f5',
      }}
    >
      <SideBar />
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header /> {/* Đặt Header ở trên và không cuộn */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto', // Chỉ cuộn nội dung phần outlet
            overflowX: 'hidden',
          }}
        >
          {outlet}
        </Box>
      </Box>
    </Box>
  )
  // Render layout based on the type of route
  return (
    <Box sx={{ width: '100%' }}>
      {/* Admin Layout */}
      {isAdminPath && renderCommonLayout()}

      {/* Doctor Layout */}
      {isDoctorPath && renderCommonLayout()}

      {/* Message Layout */}
      {isMessagePath && (
        <Box
        >
          {outlet}
        </Box>
      )}

      {/* Authen Layout */}
      {isAuthenPath && <Box>{outlet}</Box>}

      {/* Main Website Layout */}
      {!isAdminPath && !isDoctorPath && !isMessagePath && !isAuthenPath && (
        <Box
          sx={{
            width: '100%',
            position: 'relative',
          }}
        >
          <MainPageHeader />
          {outlet}
          <MainPageFooter />
        </Box>
      )}
    </Box>
  )
}

export default ProtectedLayout
