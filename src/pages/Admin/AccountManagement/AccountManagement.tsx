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
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
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
} from '../../../redux/api/api.caller'
import LazyLoading from '../../../components/LazyLoading'
import { IUser } from '../../../types/user'
import React from 'react'
// Mock data

export default function AccountManagement() {
  const [isDoctor, setIsDoctor] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<
    IDoctor | Ipatient | null
  >(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)
  const [page, setPage] = useState(0)
  const [currentAccountId, setCurrentAccountId] = useState<number | null>(null) // Track account ID
  const [isDoctorAccount, setIsDoctorAccount] = useState(false)

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

  if (accountsData) {
    console.log(accountsData.data.elements)
  }

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
  const handleApproveDoctor = async (doctorId: number) => {
    try {
      console.log('Approving doctor:', doctorId)
      await approveDoctor(doctorId)
      alert(`Bác sĩ đã được duyệt thành công!`)
      refetchAccounts()
    } catch (error) {
      console.error('Error approving doctor:', error)
      alert('Có lỗi xảy ra khi duyệt bác sĩ.')
    }
  }
  React.useEffect(() => {
    if (doctorDetail && isDoctorAccount) {
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

  const renderAccountTable = (accounts: IUser[]) => (
    <Table
      sx={{
        width: '80%',
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
          {/* <TableCell>Email</TableCell> */}
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
          <TableRow
            key={account.id}
            sx={{
              '& > *': {
                textAlign: 'center',
                borderBottom: '1px solid #999',
                fontSize: '16px',
              },
            }}
          >
            <TableCell>{account.username}</TableCell>
            <TableCell>{isDoctor ? account.status : 'ACTIVE'}</TableCell>
            <TableCell>
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
                  onClick={() => alert(`Xóa tài khoản ${account.username}`)}
                >
                  <DeleteIcon />
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
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        variant='fullWidth'
        centered
      >
        <Tab label='Tài khoản khách hàng' />
        <Tab label='Tài khoản bác sĩ' />
      </Tabs>

      {currentTab === 0 && customerAccounts && (
        <Box mt={2}>{renderAccountTable(customerAccounts)}</Box>
      )}

      {currentTab === 1 && doctorAccounts && (
        <Box mt={2}>{renderAccountTable(doctorAccounts)}</Box>
      )}
      {/* <Pagination
        count={Math.ceil(totalAccounts / 10)}
        page={page + 1}
        onChange={(event, newPage) => setPage(newPage - 1)}
      /> */}

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
                sx={{ width: 150, height: 150, borderRadius: '50%' }}
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
                  <strong>Bằng cấp:</strong>{' '}
                  {(selectedAccount as IDoctor).degree}
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
                <Box display='flex' flexDirection='row' gap='8px'>
                  {selectedAccount &&
                  'listCertificates' in selectedAccount &&
                  (selectedAccount as IDoctor).certificates.length > 0 ? (
                    (selectedAccount as IDoctor).certificates.map(
                      (cert, index) => (
                        <Box
                          component='img'
                          key={index}
                          src={cert}
                          sx={{ width: 100, height: 100 }}
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
                  onClick={handleCloseDialog}
                >
                  Từ chối
                </Button>
              </Stack>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}
