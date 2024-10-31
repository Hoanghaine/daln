import { createRoot } from 'react-dom/client'
import './styles/index.css'
import theme from './theme.ts'
import { ThemeProvider } from '@mui/styles'
import AppRoutes from './routers'
createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <AppRoutes />
  </ThemeProvider>,
)
