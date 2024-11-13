import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface CustomizedMenuProps {
  setTagId: (tagId: number) => void // Định nghĩa props cho setTagId
}

export default function CustomizedMenu({ setTagId }: CustomizedMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedLabel, setSelectedLabel] = React.useState('Chọn chuyên mục') // State for button label
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (tagId: number, label: string) => {
    setAnchorEl(null)
    setTagId(tagId)
    setSelectedLabel(label) // Update the button label when an item is selected
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
        {selectedLabel} {/* Update the button text dynamically */}
      </Button>
      <Menu
        id='demo-customized-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(0, 'Chọn chuyên mục')} // Default label if menu is closed without selection
      >
        <MenuItem onClick={() => handleClose(1, 'Tư vấn')} disableRipple>
          Tư vấn
        </MenuItem>
        <MenuItem
          onClick={() => handleClose(2, 'Kiến thức tâm lý học')}
          disableRipple
        >
          Kiến thức tâm lý học
        </MenuItem>
      </Menu>
    </div>
  )
}
