import './styles/index.css'
import theme from './theme.ts'
import { ThemeProvider } from '@mui/styles'
import AppRoutes from './routers'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import store from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  </Provider>,
)
