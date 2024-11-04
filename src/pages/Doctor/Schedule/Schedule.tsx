import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import {format} from 'date-fns/format'
import {parse} from 'date-fns/parse'
import {startOfWeek} from 'date-fns/startOfWeek'
import {getDay} from 'date-fns/getDay'
import {vi} from 'date-fns/locale/vi' // Sử dụng locale tiếng Việt
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { Edit, Delete, Visibility } from '@mui/icons-material'
// Dữ liệu mẫu lịch hẹn
const appointmentsData = [
  {
    id: 1,
    patient: 'Nguyễn Văn A',
    time: '2024-11-05 09:00 AM',
    status: 'Đã xác nhận',
  },
  {
    id: 2,
    patient: 'Trần Thị B',
    time: '2024-11-06 10:00 AM',
    status: 'Đang chờ',
  },
  {
    id: 3,
    patient: 'Phạm Văn C',
    time: '2024-11-07 03:00 PM',
    status: 'Đã hoàn thành',
  },
]

// Localizer setup cho react-big-calendar
const locales = {
  vi: vi,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // Tuần bắt đầu vào thứ 2
  getDay,
  locales,
})

// Chuyển đổi dữ liệu lịch hẹn thành sự kiện cho lịch
interface Appointment {
  id: number
  patient: string
  time: string
  status: string
}

interface Event {
  id: number
  title: string
  start: Date
  end: Date
}

const convertAppointmentsToEvents = (appointments: Appointment[]): Event[] =>
  appointments.map(appointment => ({
    id: appointment.id,
    title: `${appointment.patient} - ${appointment.status}`,
    start: new Date(appointment.time), // Chuyển đổi thời gian bắt đầu
    end: new Date(new Date(appointment.time).getTime() + 60 * 60 * 1000), // Mặc định 1 giờ
  }))
function Schedule() {
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetails | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  interface AppointmentDetails {
    id: number
    patient: string
    time: string
    status: string
  }

  const handleViewDetails = (appointment: AppointmentDetails) => {
    setSelectedAppointment(appointment)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedAppointment(null)
  }

  // Dữ liệu sự kiện từ lịch hẹn
  const events = convertAppointmentsToEvents(appointmentsData)
  return (
    <Box sx={{ padding: '20px' }}>
      {/* Lịch hiển thị */}
      <Box sx={{ height: 500, marginBottom: '30px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
          messages={{
            next: 'Tiếp',
            previous: 'Trước',
            today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày',
            agenda: 'Lịch trình',
          }}
          defaultView='week' // Có thể là 'month', 'week', hoặc 'day'
          views={['month', 'week', 'day']}
        />
      </Box>

      {/* Bảng lịch hẹn như ban đầu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bệnh nhân</TableCell>
              <TableCell>Thời gian hẹn</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align='right'>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentsData.map(appointment => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patient}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Chip label={appointment.status} />
                </TableCell>
                <TableCell align='right'>
                  <IconButton
                    color='primary'
                    onClick={() => handleViewDetails(appointment)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton color='secondary'>
                    <Edit />
                  </IconButton>
                  <IconButton color='error'>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Chi tiết lịch hẹn (Dialog) */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Chi Tiết Lịch Hẹn</DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <>
              <Typography>Bệnh nhân: {selectedAppointment.patient}</Typography>
              <Typography>Thời gian hẹn: {selectedAppointment.time}</Typography>
              <Typography>Trạng thái: {selectedAppointment.status}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Schedule
