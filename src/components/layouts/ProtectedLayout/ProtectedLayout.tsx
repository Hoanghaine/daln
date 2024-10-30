import { useLocation, useOutlet } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import SideBar from '../../organisms/SideBar/Sidebar'
import Header from '../../organisms/Header/Header'
import MainPageHeader from '../../mainPage/Header.tsx'
import MainPageFooter from '../../mainPage/Footer.tsx'

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
  const isAuthenPath =
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register')

  // Render layout based on the type of route
  return (
    <Box sx={{ width: '100%' }}>
      {/* Admin Layout */}
      {isAdminPath && (
        <>
          <SideBar />
          <Stack
            sx={{
              width: '100%',
              padding: '16px 24px 16px 16px',
            }}
          >
            <Header />
            <Stack
              sx={{
                paddingBottom: '4.4rem',
                width: '100%',
              }}
            >
              {outlet}
            </Stack>
          </Stack>
        </>
      )}

      {/* Doctor Layout */}
      {isDoctorPath && (
        <>
          <SideBar />{' '}
          {/* You can customize this if doctors have a different sidebar */}
          <Stack
            sx={{
              width: '100%',
              padding: '16px 24px 16px 16px',
            }}
          >
            <Header />
            <Stack
              sx={{
                paddingBottom: '4.4rem',
                width: '100%',
              }}
            >
              {outlet}
            </Stack>
          </Stack>
        </>
      )}

      {/* Message Layout */}
      {isMessagePath && (
        <Stack
          sx={{
            width: '100%',
            padding: '16px 24px 16px 16px',
          }}
        >
          {/* Optionally, add a message header or sidebar here if needed */}
          <Stack
            sx={{
              paddingBottom: '4.4rem',
              width: '100%',
            }}
          >
            {outlet}
          </Stack>
        </Stack>
      )}

      {/* Authen Layout */}
      {isAuthenPath && <Box>{outlet}</Box>}

      {/* Main Website Layout */}
      {!isAdminPath && !isDoctorPath && !isMessagePath && (
        <Stack>
          <MainPageHeader />
          {outlet}
          <MainPageFooter />
        </Stack>
      )}
    </Box>
  )
}

export default ProtectedLayout
