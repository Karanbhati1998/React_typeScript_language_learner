import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './store.ts'
import { Provider } from 'react-redux'

const theme=createTheme({
  palette:{
    primary:{
      main:"rgb(255,0,0)"
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Provider store={store}>
    <App />
    </Provider>
  </ThemeProvider>,
)
