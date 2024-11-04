import { Box, Typography, Stack, Divider } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2'
import { useParams } from 'react-router-dom'
export default function DoctorDetail() {
  const { doctorID } = useParams()
  return (
    <Box>
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
          alignItems: 'center',
        }}
      >
        <Grid size={12}>
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
              backgroundColor: '#F8F6F7',
            }}
          >
            <Box
              sx={{
                width: '50%',
                padding: '16px',
              }}
            >
              <h2>Doctor Details for ID: {doctorID}</h2>
              <Box
                component={'img'}
                src={
                  'https://phongkhamtamly.com/wp-content/uploads/2024/10/n-bac-si-dung.jpg'
                }
                sx={{
                  margin: '0px',
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                }}
              ></Box>
              <Stack
                sx={{
                  marginTop: '0px',
                  gap: '16px',
                  padding: '16px',
                  color: '#000',
                }}
              >
                <Typography variant={'h5'} color='#65AD45'>
                  TS. BSCK II NGUYỄN VĂN DŨNG
                </Typography>
                <Typography variant={'body1'} color='#65AD45'>
                  Phó viện trưởng – Viện sức khỏe tâm thần Bệnh viện Bạch Mai Hà
                  Nội
                </Typography>
                <Typography variant={'h6'}>LÝ LỊCH CÁ NHÂN</Typography>
                <ul>
                  <li
                    style={{
                      listStyle: 'none',
                      marginLeft: '16px',
                      marginBottom: '8px',
                    }}
                  >
                    Họ và tên: Nguyễn Văn Dũng
                  </li>
                  <li
                    style={{
                      listStyle: 'none',
                      marginLeft: '16px',
                      marginBottom: '8px',
                    }}
                  >
                    Nơi đào tạo: Trường Đại học Y Hà Nội
                  </li>
                </ul>
                <Typography variant={'h6'}>THÀNH TÍCH</Typography>
                <ul>
                  <li style={{ listStyle: 'none', marginLeft: '16px' }}>
                    Bằng khen của chủ tịch nước, của tổng bí thư và phó thủ
                    tướng nước CNHXCN Việt Nam trao tặng
                  </li>
                  <li style={{ listStyle: 'none', marginLeft: '16px' }}>
                    Bằng khen của bộ trưởng bộ y tế… và các cấp khác
                  </li>
                </ul>
                <Typography variant={'h6'}>THÔNG TIN LIÊN HỆ</Typography>
                <Typography variant='body1'>
                  Địa chỉ: Tầng 7 toà nhà 59 Võ Chí Công, Phường Nghĩa Đô, Quận
                  Cầu Giấy, Tp. Hà Nội, Việt Nam
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Box
              sx={{
                width: '50%',
                padding: '16px',
              }}
            >
              <Typography variant='h6' color='#65AD45'>
                KINH NGHIỆM LÀM VIỆC CÁ NHÂN
              </Typography>
              <Typography variant='body1' color='initial'>
                Tiến sĩ Bác sĩ Chuyên khoa 2 Nguyễn Văn Dũng là bác sĩ Cao cấp
                hàng đầu của Viện sức khỏe tâm thần – Bệnh viện Bạch Mai. Hiện
                bác sĩ đang giữ cương vị Phó viện trưởng-Viện sức khỏe tâm
                thần-Bệnh viện Bạch Mai Là người thầy luôn tận tâm với bệnh
                nhân, với nhiều năm kinh nghiệm công tác tại các Bệnh viện tuyến
                đầu Việt Nam về lĩnh vực “Sức khỏe tâm thần” đã giúp cho rất
                nhiều bệnh nhân có thể trở lại cuộc sống bình thường. TS. BSCK
                II Nguyễn Văn Dũng trong quá trình công tác của mình đã có rất
                nhiều “Bằng khen” mà trong đó có danh hiệu rất cao quý của người
                thầy thuốc: “Thầy thuốc Ưu tú” do Thủ tướng chính phủ nhà nước
                Cộng hòa xã hội chủ nghĩa Việt Nam khen tặng. Với nhiều thành
                tích đóng góp trong công tác phòng, chống và cống hiến trong sự
                nghiệp bảo vệ và nâng cao Sức khỏe của nhân dân. Ngoài vai trò
                là người thầy thuốc chữa bệnh cho rất nhiều bệnh nhận, thầy còn
                đảm nhiệm thêm một vai trò vô cùng to lớn nữa đó là: Tham gia
                đào tạo nâng cao trình độ của các cán bộ trong ngành, giảng dạy
                các sinh viên của các Trường đại học nhằm xây dựng đội ngũ y bác
                sĩ kế cận trong tương lai cho đất nước( như: Đại học Y Hà Nội,
                Đại học Y Hải Phòng, Đại học Y Tây Nguyên).
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
