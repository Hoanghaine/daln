import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface CustomizedMenusProps {
  setRole: (role: string) => void 
}

export default function CustomizedMenus({ setRole }: CustomizedMenusProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [displayRole, setDisplayRole] = React.useState('Khách hàng')
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (role: string) => {
    if (role === 'patient') {
      setDisplayRole('Khách hàng')
    } else if (role === 'doctor') {
      setDisplayRole('Bác sĩ')
    }

    setAnchorEl(null)
    setRole(role) // Truyền vai trò (role) về cho Login
  }

  return (
    <div>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {displayRole}
      </Button>
      <Menu
        id='demo-customized-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose('')}
      >
        <MenuItem onClick={() => handleClose('patient')} disableRipple>
          Khách hàng
        </MenuItem>
        <MenuItem onClick={() => handleClose('doctor')} disableRipple>
          Bác sĩ
        </MenuItem>
      </Menu>
    </div>
  )
}
