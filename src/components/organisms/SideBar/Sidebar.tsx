import { NavLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import logo from '../../../assets/logo.png'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useLocation } from 'react-router-dom'

const StyledNavLink = styled(NavLink)(() => ({
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '16px',
  width: '224px',
  '&.active': {
    '& .first-icon': {
      display: 'block',
    },
    '& .second-icon': {
      display: 'none',
    },
  },
  '& .first-icon': {
    display: 'none',
  },
  '& .second-icon': {
    display: 'block',
  },
}))

const SideBar: React.FC = () => {
  const location = useLocation()

  const [isCollapsed, setIsCollapsed] = useState(false)

  // Hàm để thay đổi trạng thái
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  const menuItemsDoctor = [
    { id: 'dashboard', label: 'Tổng quan', Icon: DashboardIcon },
    { id: 'schedule', label: 'Lịch làm việc', Icon: CalendarTodayIcon },
    { id: 'treatment', label: 'Phòng Khám', Icon: MeetingRoomIcon },
    { id: 'post', label: 'Quản lý bài viết', Icon: DynamicFeedIcon },
  ]
  const menuItemsAdmin = [
    { id: 'dashboard', label: 'Tổng quan', Icon: DashboardIcon },
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
        width: isCollapsed ? '70px' : '240px', // Chiều rộng sidebar khi thu gọn/mở rộng
        height: '100vh', // Sidebar chiếm toàn bộ chiều cao
        border: '1px solid #f5f5f5',
        padding: '16px',
        transition: 'width 0.3s ease', // Hiệu ứng mượt mà khi chuyển đổi
        overflow: 'hidden', // Giúp ẩn nội dung khi thu gọn
      }}
    >
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'absolute',
          top: '8px',
          left: isCollapsed ? '80px' : '252px', // Di chuyển nút theo trạng thái
          transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', // Xoay icon khi sidebar đóng/mở
          transition: 'left 0.3s ease, transform 0.3s ease',
          zIndex: 1000, // Đảm bảo nút hiển thị trên các phần tử khác
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
            marginBottom: '16px',
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
        {menuItems.map(({ id, label, Icon }) => (
          <StyledNavLink
            key={id}
            to={`/${role}/${id}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'space-between',
              padding: '8px 16px',
              borderRadius: '16px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
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
          </StyledNavLink>
        ))}
      </Box>
    </Box>
  )
}

export default SideBar
