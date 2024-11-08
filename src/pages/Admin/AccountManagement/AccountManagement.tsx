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
import { IUser } from '../../../types/user'
// Mock data
const accounts: IUser[] = [
  {
    id: 1,
    username: 'John Doe',
    password: '123',
    role: 'patient',
  },
  {
    id: 1,
    username: 'John Doe',
    password: '123',
    role: 'patient',
  },
]
const customerAccounts: Ipatient[] = [
  {
    id: 1,
    username: 'benhnhan1',
    name: 'benh nhan 1',
    email: 'john@example.com',
    phone: '0123456789',
    address: '123 Main Street',
    dob: '01/01/1990',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    username: 'benhnhan2',
    name: 'benh nhan 2',
    email: 'john@example.com',
    phone: '0123456789',
    address: '123 Main Street',
    dob: '01/01/1990',
    imageUrl: 'https://via.placeholder.com/150',
  },
]

const doctorAccounts: IDoctor[] = [
  {
    id: 1,
    username: 'doctor1',
    imageUrl: 'https://via.placeholder.com/150',
    name: 'Dr. John Doe',
    email: 'dr.john@example.com',
    phone: '0123456789',
    address: '123 Main Street',
    specialization: 'Cardiologist',
    experience: '5 years',
    dob: '01/01/1990',
    degree: 'MBBS, MD',
    about:
      'Dr. John Doe is a Cardiologist with 5 years of experience. He has a degree in MBBS and MD. He is an expert in treating heart-related diseases.',
    listCertificates: [
      'https://images.unsplash.com/photo-1730407787489-96c056ef4630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1730407787489-96c056ef4630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1730407787489-96c056ef4630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8',
    ],
    status: 'pending',
  },
  {
    id: 2,
    username: 'doctor2',
    imageUrl: 'https://via.placeholder.com/150',

    name: 'Dr. John Doe 2',
    email: 'dr.john2@example.com',
    phone: '0123456789',
    address: '123 Main Street',
    specialization: 'Cardiologist',
    experience: '3 years',
    dob: '01/01/1995',
    degree: 'MBBS, MD',
    about:
      'Dr. John Doe is a Cardiologist with 5 years of experience. He has a degree in MBBS and MD. He is an expert in treating heart-related diseases.',
    listCertificates: [
      'https://images.unsplash.com/photo-1730407787489-96c056ef4630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1730407787489-96c056ef4630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1730407787489-96c056ef4630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8',
    ],
    status: 'approved',
  },
]

function AccountManagement() {
  const [isDoctor, setIsDoctor] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<
    Ipatient | IDoctor | null
  >(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)

  // Mở popup xem chi tiết tài khoản
  const handleOpenDialog = (
    account: Ipatient | IDoctor,
    isDoctorAccount: boolean,
  ) => {
    setSelectedAccount(account)
    setIsDoctor(isDoctorAccount)
    setOpenDialog(true)
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

  const renderAccountTable = (
    accounts: (Ipatient | IDoctor)[],
    isDoctor: boolean = false,
  ) => (
    <Table
      sx={{
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
        <TableRow
          sx={{
            '& > *': {
              textAlign: 'center',
              borderBottom: '1px solid #999',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '16px',
            },
          }}
        >
          <TableCell>Tên</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Trạng thái</TableCell>
          <TableCell>Hành động</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {accounts.map((account: Ipatient | IDoctor) => (
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
            <TableCell>{account.name}</TableCell>
            <TableCell>{account.email}</TableCell>
            <TableCell>
              {isDoctor ? (account as IDoctor).status : 'active'}
            </TableCell>
            <TableCell>
              <Stack
                direction='row'
                spacing={1}
                sx={{
                  justifyContent: 'flex-start',
                  paddingLeft: '50px',
                }}
              >
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
                  color='warning'
                  onClick={() =>
                    alert(`Khóa/Mở khóa tài khoản ${account.name}`)
                  }
                >
                  <LockIcon />
                </IconButton>
                <IconButton
                  color='error'
                  onClick={() => alert(`Xóa tài khoản ${account.name}`)}
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

      {/* Tab panel for Customer Accounts */}
      {currentTab === 0 && (
        <Box mt={2}>{renderAccountTable(customerAccounts)}</Box>
      )}

      {/* Tab panel for Doctor Accounts */}
      {currentTab === 1 && (
        <Box mt={2}>{renderAccountTable(doctorAccounts, true)}</Box>
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
                component='img'
                src={selectedAccount.imageUrl}
                sx={{ width: 150, height: 150, borderRadius: '50%' }}
              />
              <Box flexGrow={1}>
                <Typography>
                  <strong>Tên đăng nhập:</strong> {selectedAccount.username}
                </Typography>
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
                  <strong>Chứng chỉ:</strong>
                </Typography>
                <Box display='flex' flexDirection='row' gap='8px'>
                  {(selectedAccount as IDoctor).listCertificates.map(
                    (cert, index) => (
                      <Box
                        component='img'
                        key={index}
                        src={cert}
                        sx={{ width: 100, height: 100 }}
                      />
                    ),
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
            {(selectedAccount as IDoctor)?.status === 'pending' && isDoctor && (
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
                  onClick={() => alert(`Duyệt bác sĩ ${selectedAccount.name}`)}
                >
                  Duyệt
                </Button>
                <Button
                  startIcon={<CloseIcon />}
                  variant='outlined'
                  color='error'
                  onClick={() =>
                    alert(`Từ chối bác sĩ ${selectedAccount.name}`)
                  }
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

export default AccountManagement
