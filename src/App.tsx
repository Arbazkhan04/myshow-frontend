import { store } from './store/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from './hooks/use-theme'
import { AppRoutes } from './routes/app-routes'
import { Toaster } from './components/ui/sonner'
import { IS_DEVELOPMENT_MODE } from './config'
import { ThemeToggle } from './components/common/theme-toggle.button'

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="myshowai-theme">
        <AppRoutes />
        <Toaster />
        {IS_DEVELOPMENT_MODE && <ThemeToggle />}
      </ThemeProvider>
    </Provider>
  )
}