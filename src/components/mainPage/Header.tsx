import {
  Box,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
function Header() {
  const [userInfo, setUserInfo] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage khi trang tải
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo))
    }
  }, [])

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOptionClick = (path: string) => {
    navigate(path)
    handleMenuClose()
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    navigate('/login') // Chuyển về trang đăng nhập
  }
  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    borderBottom: '1.2px solid #3C5EAB', // Underline
    paddingBottom: '4px',
  }

  const activeLinkStyle = {
    borderBottom: '1.2px solid #fff', // Underline
  }

  return (
    <Box
      sx={{
        width: '100%',
        boxShadow: '#00000052 0px 2px 8px 0px',
        top: 0,
        zIndex: 1000,
        position: 'sticky',
        backgroundColor: '#fff',
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: '1152px',
          padding: 0,
          backgroundColor: '#fff',
          margin: '0px auto',
          flexWrap: 'nowrap',
        }}
      >
        <Grid size={12}>
          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',

              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'nowrap',
              padding: '16px 24px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: 'fit-content',
              }}
            >
              <Box
                component='img'
                src={logo}
                sx={{
                  width: '65px',
                  height: '65px',
                  borderRadius: '50%',
                  marginRight: '16px',
                }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: 'fit-content',
                }}
              >
                <Typography color='#3C5EAB' sx={{ width: 'fit-content' }}>
                  TÂM LÝ HỌC TRỊ LIỆU
                </Typography>
                <Typography color='#65AD45' sx={{ width: 'fit-content' }}>
                  Tâm an sống khỏe
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexDirection: 'row',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  width: 'fit-content',
                }}
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  color={'#65AD45'}
                ></FontAwesomeIcon>
                <Box>
                  <Typography>Hotline tư vấn</Typography>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    1900 1234
                  </Typography>
                </Box>
              </Box>
              {/* Avatar và menu của người dùng */}
              {userInfo && (
                <>
                  <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                  <Avatar
                    sx={{ width: '44px', height: '44px' }}
                    onClick={handleAvatarClick}
                    style={{ cursor: 'pointer' }}
                    src={userInfo.avatar || ''}
                  >
                    {userInfo.username[0].toUpperCase()}
                  </Avatar>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {userInfo.role === 'doctor' ? (
                      <MenuItem onClick={() => handleOptionClick('/doctor')}>
                        Trang quản lý
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={() => handleOptionClick('/message')}>
                        Tin nhắn
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                  </Menu>
                </>
              )}
              {!userInfo && (
                <Link
                  to='/login'
                  style={{ color: '#000', textDecoration: 'none' }}
                >
                  <Button variant='contained'>Đăng nhập</Button>
                </Link>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Box bgcolor={'#3C5EAB'} sx={{}}>
        <Stack
          sx={{
            maxWidth: '1152px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'nowrap',
            padding: '16px 24px',
            margin: '0px auto',
            color: '#fff',
            height: '50px',
          }}
        >
          <Link
            to='/'
            style={{
              ...linkStyle,
              ...(location.pathname === '/' && activeLinkStyle),
            }}
          >
            Trang chủ
          </Link>
          <Link
            to='/about'
            style={{
              ...linkStyle,
              ...(location.pathname === '/about' && activeLinkStyle),
            }}
          >
            Về PsyConnect
          </Link>
          <Link
            to='/test-chuan-doan'
            style={{
              ...linkStyle,
              ...(location.pathname === '/test-chuan-doan' && activeLinkStyle),
            }}
          >
            Làm bài test chuẩn đoán
          </Link>
          <Link
            to='/forum'
            style={{
              ...linkStyle,
              ...(location.pathname === '/forum' && activeLinkStyle),
            }}
          >
            Diễn đàn kiến thức về bệnh tâm lý
          </Link>
          <Link
            to='/find-doctor'
            style={{
              ...linkStyle,
              ...(location.pathname === '/find-doctor' && activeLinkStyle),
            }}
          >
            Tìm bác sĩ
          </Link>
          <Link
            to='/contact'
            style={{
              ...linkStyle,
              ...(location.pathname === '/contact' && activeLinkStyle),
            }}
          >
            Liên hệ
          </Link>
          {userInfo && userInfo.role === 'patient' && (
            <Link
              to='/personal'
              style={{
                ...linkStyle,
                ...(location.pathname === '/personal' && activeLinkStyle),
              }}
            >
              Quản lý cá nhân
            </Link>
          )}
        </Stack>
      </Box>
    </Box>
  )
}

export default Header
