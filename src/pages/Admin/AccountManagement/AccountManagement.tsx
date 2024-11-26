import { useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Stack,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { IDoctor } from '../../../types/doctor'
import { Ipatient } from '../../../types/patient'
import {
  useGetAccountsQuery,
  useGetDoctorDetailQuery,
  useGetPatientDetailQuery,
  useApproveDoctorMutation,
  useRejectDoctorMutation,
} from '../../../redux/api/api.caller'
import LazyLoading from '../../../components/LazyLoading'
import { IUser } from '../../../types/user'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AccountManagement() {
  const [isDoctor, setIsDoctor] = useState(false)
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [selectedAccount, setSelectedAccount] = useState<
    IDoctor | Ipatient | null
  >(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)
  const [page, setPage] = useState(0)
  const [currentAccountId, setCurrentAccountId] = useState<number | null>(null) // Track account ID
  const [isDoctorAccount, setIsDoctorAccount] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [reason, setReason] = useState('') // Lý do từ chối
  const reasons = ['Không đủ thông tin', 'Yêu cầu không hợp lệ', 'Khác']

  const {
    data: accountsData,
    isLoading,
    isError,
    refetch: refetchAccounts,
  } = useGetAccountsQuery({ page, size: 10 })

  const { data: doctorDetail } = useGetDoctorDetailQuery(currentAccountId!, {
    skip: !isDoctorAccount || !currentAccountId,
  })

  const { data: patientDetail } = useGetPatientDetailQuery(currentAccountId!, {
    skip: isDoctorAccount || !currentAccountId,
  })

  const customerAccounts = accountsData?.data.elements.filter(
    account => account.role === 'PATIENT',
  )
  const doctorAccounts = accountsData?.data.elements.filter(
    account => account.role === 'DOCTOR',
  )

  const filteredCustomerAccounts =
    filterStatus === 'ALL'
      ? customerAccounts
      : customerAccounts?.filter(account => account.status === filterStatus)
  const filteredDoctorAccounts =
    filterStatus === 'ALL'
      ? doctorAccounts
      : doctorAccounts?.filter(account => account.status === filterStatus)

  // Mở popup xem chi tiết tài khoản
  const handleOpenDialog = (account: IUser, isDoctorAccount: boolean) => {
    if (isDoctorAccount) {
      const doctorAccount: IDoctor = {
        id: account.id,
        name: '',
        email: '',
        address: '',
        phone: '',
        dob: '',
        role: account.role,
        avatar: '',
        createdDate: '',
        lastModifiedDate: '',
        certificates: [],
        specialization: '',
        about: '',
        degree: '',
        avgRating: 0,
        experience: 0,
        status: account.status, // From IUser
      }
      setSelectedAccount(doctorAccount)
    } else {
      const patientAccount: Ipatient = {
        id: account.id,
        name: '',
        email: '',
        address: '',
        phone: '',
        dob: '',
        avatar: '',
      }
      setSelectedAccount(patientAccount)
    }
    setOpenDialog(true)
    setCurrentAccountId(account.id)
    setIsDoctorAccount(isDoctorAccount)
  }
  const handleDeleteAccount = (accountId: number) => {
    console.log(`Delete account with id: ${accountId}`)
  }

  const [approveDoctor] = useApproveDoctorMutation()
  const [rejectDoctor] = useRejectDoctorMutation()
  const handleApproveDoctor = async (doctorId: number) => {
    try {
      console.log('Approving doctor:', doctorId)
      await approveDoctor(doctorId)
      toast.success('Duyệt bác sĩ thành công!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'bottom-right',
      })
      refetchAccounts()
      handleCloseDialog()
    } catch (error) {
      console.error('Error approving doctor:', error)
      toast.error('Duyệt bác sĩ không thành công!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'bottom-right',
      })
      handleCloseDialog()
    }
  }
  const handleRejectDoctor = async (doctorId: number) => {
    try {
      const response = await rejectDoctor({ doctorId, reason })
      console.log('Reject doctor response:', response)
      if (response) {
        toast.success('Từ chối bác sĩ thành công!', {
          theme: 'colored',
          autoClose: 2000,
          position: 'bottom-right',
        })
        refetchAccounts()
        handleCloseDialog()
        handleCloseRejectDialog()
      }
    } catch (error) {
      toast.error('Từ chối bác sĩ không thành công!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'bottom-right',
      })
      console.error('Error approving doctor:', error)
      handleCloseDialog()
      handleCloseRejectDialog()
    }
  }

  React.useEffect(() => {
    if (doctorDetail && isDoctorAccount) {
      console.log('doctorDetail', doctorDetail)
      setSelectedAccount(prev => ({
        ...prev,
        ...doctorDetail.data, // Cập nhật thông tin chi tiết bác sĩ
      }))
    } else if (patientDetail && !isDoctorAccount) {
      setSelectedAccount(prev => ({
        ...prev,
        ...patientDetail.data, // Cập nhật thông tin chi tiết bệnh nhân
      }))
    }
  }, [doctorDetail, patientDetail, isDoctorAccount])

  if (isLoading) return <LazyLoading />
  if (isError || !accountsData?.data.elements.length) {
    return (
      <Typography variant='h6' color='error'>
        Error fetching posts or no posts available.
      </Typography>
    )
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedAccount(null)
  }

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
    if (newValue === 1) {
      setIsDoctor(true)
    } else {
      setIsDoctor(false)
    }
  }
  const handleOpenRejectDialog = () => {
    setIsRejectDialogOpen(true)
  }

  const handleCloseRejectDialog = () => {
    setIsRejectDialogOpen(false)
    setReason('') // Reset lý do khi đóng
  }
  const renderAccountTable = (accounts: IUser[]) => (
    <Table
      sx={{
        margin: 'auto',
        borderRadius: '16px ',
        border: '1px solid #65AD45',
        overflow: 'hidden',
        borderCollapse: 'separate',
      }}
    >
      <TableHead
        sx={{
          fontWeight: 'bold',
          backgroundColor: '#65AD45',
        }}
      >
        <TableRow>
          <TableCell
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '16px',
            }}
          >
            Tên đăng nhập
          </TableCell>
          <TableCell
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '16px',
            }}
          >
            Trạng thái
          </TableCell>
          <TableCell
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '16px',
            }}
          >
            Hành động
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {accounts.map((account: IUser) => (
          <TableRow key={account.id}>
            <TableCell
              sx={{
                textAlign: 'center',
                fontSize: '16px',
              }}
            >
              {account.username}
            </TableCell>
            <TableCell
              sx={{
                textAlign: 'center',
                fontSize: '16px',
              }}
            >
              {isDoctor ? account.status : 'ACTIVE'}
            </TableCell>
            <TableCell
              sx={{
                textAlign: 'center',
                fontSize: '16px',
              }}
            >
              <Stack direction='row' spacing={1} justifyContent={'center'}>
                <IconButton
                  color='success'
                  onClick={() => handleOpenDialog(account, isDoctor)}
                  sx={{
                    color: '#65AD45',
                    borderColor: '#65AD45',
                    '&:hover': {
                      backgroundColor: '#65AD45',
                      color: 'white',
                    },
                  }}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>

                <IconButton
                  color='error'
                  onClick={() => alert(`Khóa tài khoản ${account.username}`)}
                >
                  <LockIcon />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
  return (
    <Box padding={2}>
      <ToastContainer />
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        variant='fullWidth'
        centered
      >
        <Tab label='Tài khoản khách hàng' />
        <Tab label='Tài khoản bác sĩ' />
        <Box ml={2} mt={2} display='flex' justifyContent='center'>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id='filter-status-label'>
              Sắp xếp theo trạng thái
            </InputLabel>
            <Select
              labelId='filter-status-label'
              value={filterStatus}
              label='Sắp xếp theo trạng thái'
              onChange={e => setFilterStatus(e.target.value)}
            >
              <MenuItem value='ALL'>Tất cả</MenuItem>
              <MenuItem value='APPROVED'>Hoạt động</MenuItem>
              <MenuItem value='PENDING'>Đang chờ</MenuItem>
              <MenuItem value='REJECTED'>Bị từ chối</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Tabs>

      {currentTab === 0 && filteredCustomerAccounts && (
        <Box
          mt={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'flex-end',
          }}
        >
          {renderAccountTable(filteredCustomerAccounts)}
        </Box>
      )}

      {currentTab === 1 && filteredDoctorAccounts && (
        <Box mt={2}>{renderAccountTable(filteredDoctorAccounts)}</Box>
      )}

      {selectedAccount && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              borderRadius: '16px ',
            },
          }}
        >
          <DialogTitle
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
              backgroundColor: '#65AD45',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: '16px',
            }}
          >
            Chi tiết tài khoản
            <CloseIcon onClick={handleCloseDialog} />
          </DialogTitle>
          <DialogContent>
            <Box display='flex' flexDirection='row' gap='16px'>
              <Box
                component={'img'}
                src={selectedAccount.avatar || '/placeholder-avatar.png'}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <Box flexGrow={1}>
                <Typography>
                  <strong>Tên:</strong> {selectedAccount.name}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {selectedAccount.email}
                </Typography>
                <Typography>
                  <strong>Địa chỉ:</strong> {selectedAccount.address}
                </Typography>
                <Typography>
                  <strong>Ngày sinh:</strong> {selectedAccount.dob}
                </Typography>
                <Typography>
                  <strong>Số điện thoại:</strong> {selectedAccount.phone}
                </Typography>
              </Box>
            </Box>
            {isDoctor && (
              <Box>
                {isDoctor && (
                  <Typography>
                    <strong>Chuyên khoa:</strong>{' '}
                    {(selectedAccount as IDoctor).specialization}
                  </Typography>
                )}
                <Typography>
                  <strong>Kinh nghiệm:</strong>{' '}
                  {(selectedAccount as IDoctor).experience}
                </Typography>
                <Typography>
                  <strong>Giới thiệu:</strong>{' '}
                  {(selectedAccount as IDoctor).about}
                </Typography>
                <Typography>
                  <strong>Đánh giá trung bình:</strong>{' '}
                  {(selectedAccount as IDoctor).avgRating}
                </Typography>
                <Typography>
                  <strong>Chứng chỉ:</strong>
                </Typography>
                <Box
                  display='flex'
                  flexDirection='row'
                  gap='8px'
                  sx={{
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  {selectedAccount &&
                  'certificates' in selectedAccount &&
                  (selectedAccount as IDoctor).certificates.length > 0 ? (
                    (selectedAccount as IDoctor).certificates.map(
                      (cert, index) => (
                        <Box
                          component='img'
                          key={index}
                          src={cert}
                          sx={{ width: '30%', height: 100 }}
                        />
                      ),
                    )
                  ) : (
                    <Typography>Chưa có chứng chỉ</Typography> // Thông báo nếu chưa có certificates
                  )}
                </Box>

                <Typography>
                  <strong>Trạng thái:</strong>{' '}
                  {(selectedAccount as IDoctor).status}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            {(selectedAccount as IDoctor).status === 'PENDING' && (
              <Stack
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                }}
              >
                <Button
                  startIcon={<CheckIcon />}
                  variant='contained'
                  color='success'
                  onClick={() => handleApproveDoctor(selectedAccount.id)}
                >
                  Duyệt
                </Button>
                <Button
                  startIcon={<CloseIcon />}
                  variant='outlined'
                  color='error'
                  onClick={() => handleOpenRejectDialog()}
                >
                  Từ chối
                </Button>
                <Dialog
                  open={isRejectDialogOpen}
                  onClose={handleCloseRejectDialog}
                >
                  <DialogTitle>Chọn lý do từ chối</DialogTitle>
                  <DialogContent sx={{ p: 2 }}>
                    <FormControl fullWidth>
                      <Select
                        labelId='reason-label'
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        fullWidth
                      >
                        {reasons.map((reasonItem, index) => (
                          <MenuItem key={index} value={reasonItem}>
                            {reasonItem}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseRejectDialog} color='primary'>
                      Hủy
                    </Button>
                    <Button
                      onClick={() => handleRejectDoctor(selectedAccount.id)}
                      color='error'
                      variant='contained'
                    >
                      Xác nhận
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}
