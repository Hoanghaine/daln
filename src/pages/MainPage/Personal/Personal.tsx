import React, { useState } from 'react'
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material'
import { useGetPatientProfileQuery } from '../../../redux/api/api.caller'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box role='tabpanel' hidden={value !== index} sx={{ padding: 2 }}>
      {value === index && <Box>{children}</Box>}
    </Box>
  )
}

export default function Personal() {
  const [tabIndex, setTabIndex] = useState(0)
  const { data, error, isLoading } = useGetPatientProfileQuery()
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div>Error loading profile</div>
  }

  // Lấy dữ liệu từ response
  const patientProfile = data?.data
  console.log(patientProfile)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        display: 'flex',
        gap: '20px',
      }}
    >
      <Stack
        alignItems='center'
        spacing={2}
        sx={{
          mb: 3,
          height: '100%',
          bgcolor: '#ffff',
          borderRadius: 2,
          width: '20%',
          padding: 3,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          orientation='vertical'
          centered
          sx={{
            width: '100%',
            p: 0,
            mb: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
          }}
        >
          <Tab label='Thông tin cá nhân' sx={{ width: '100%' }} />
          <Tab label='Lịch hẹn' />
          <Tab label='Bài viết cá nhân' />
        </Tabs>
      </Stack>

      <Box
        sx={{
          flex: 1,
          backgroundColor: '#ffffff',
          borderRadius: 2,
          p: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Tab Content */}
        <TabPanel value={tabIndex} index={0}>
          <Typography variant='h6' sx={{ mb: 2, textAlign: 'center' }}>
            Thông tin cá nhân
          </Typography>
          <Avatar
            src={patientProfile?.avatar ?? '/default-avatar.png'} // Placeholder for missing avatar
            sx={{ width: 150, height: 150 }}
          />
          <Typography>
            <strong>Tên:</strong> {patientProfile?.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {patientProfile?.email}
          </Typography>
          <Typography>
            <strong>Địa chỉ:</strong> {patientProfile?.address}
          </Typography>
          <Typography>
            <strong>Số điện thoại:</strong> {patientProfile?.phone}
          </Typography>
          <Typography>
            <strong>Ngày sinh:</strong> {patientProfile?.dob}
          </Typography>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Typography variant='h6' sx={{ mb: 2, textAlign: 'center' }}>
            Lịch hẹn
          </Typography>
          <Stack spacing={2}>
            <Box
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                p: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography>
                <strong>Ngày:</strong> 20/11/2024
              </Typography>
              <Typography>
                <strong>Bác sĩ:</strong> Nguyễn Bác Sĩ
              </Typography>
              <Typography>
                <strong>Ghi chú:</strong> Kiểm tra sức khỏe định kỳ
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                p: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography>
                <strong>Ngày:</strong> 25/12/2024
              </Typography>
              <Typography>
                <strong>Bác sĩ:</strong> Trần Chuyên Khoa
              </Typography>
              <Typography>
                <strong>Ghi chú:</strong> Tư vấn chuyên sâu
              </Typography>
            </Box>
          </Stack>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Typography variant='h6' sx={{ mb: 2, textAlign: 'center' }}>
            Bài viết cá nhân
          </Typography>
        </TabPanel>
      </Box>
    </Box>
  )
}
