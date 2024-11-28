import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import logo from '../../../assets/logo.png'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ChatIcon from '@mui/icons-material/Chat'
const StyledNavItem = styled(Box)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '16px',
  width: '100%',
  cursor: 'pointer',
  '&.active': {
    backgroundColor: '#65AD45',
    color: '#fff',
  },
}))

const SideBar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate() // Sử dụng useNavigate để điều hướng mà không reload trang

  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const menuItemsDoctor = [
    { id: '', label: 'Tổng quan', Icon: DashboardIcon },
    { id: 'schedule', label: 'Lịch làm việc', Icon: CalendarTodayIcon },
    { id: 'message', label: 'Tin nhắn', Icon: ChatIcon },
    { id: 'post', label: 'Bài viết của tôi', Icon: DynamicFeedIcon },
    { id: 'profile', label: 'Thông tin cá nhân', Icon: AccountCircleIcon },
  ]
  const menuItemsAdmin = [
    { id: '', label: 'Tổng quan', Icon: DashboardIcon },
    {
      id: 'account-management',
      label: 'Quản lý tài khoản',
      Icon: CalendarTodayIcon,
    },
    { id: 'post-management', label: 'Quản lý bài đăng', Icon: DynamicFeedIcon },
  ]

  const menuItems = location.pathname.includes('/admin')
    ? menuItemsAdmin
    : menuItemsDoctor
  const role = location.pathname.includes('/admin') ? 'admin' : 'doctor'

  return (
    <Box
      sx={{
        width: isCollapsed ? '70px' : '240px',
        height: '100vh',
        padding: '16px',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRight: '1px solid #e0e0e0',
      }}
    >
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'absolute',
          top: '8px',
          left: isCollapsed ? '80px' : '252px',
          transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'left 0.3s ease, transform 0.3s ease',
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Logo, thay đổi hiển thị dựa trên trạng thái thu gọn */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component={'img'}
          src={logo}
          alt='logo'
          sx={{
            mt: '20px',
            width: isCollapsed ? '40px' : '100px',
            marginBottom: '32px',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: isCollapsed ? 'center' : 'flex-start',
        }}
      >
        {menuItems.map(({ id, label, Icon }) => {
          const path = id === '' ? `/${role}` : `/${role}/${id}`
          const isActive = location.pathname === path

          return (
            <StyledNavItem
              key={id}
              className={isActive ? 'active' : ''}
              onClick={() => navigate(path)} // Sử dụng navigate để điều hướng
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'space-between',
                padding: '8px 16px',
                borderRadius: '16px',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Icon />
                {!isCollapsed && <Box sx={{ ml: '8px' }}>{label}</Box>}
              </Box>
            </StyledNavItem>
          )
        })}
      </Box>
    </Box>
  )
}

export default SideBar
