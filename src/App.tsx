import { store } from './store/store'
import { Provider } from 'react-redux'

import { ThemeProvider } from './hooks/use-theme'
import { AppRoutes } from './routes/app-routes'
import { Toaster } from './components/ui/sonner'
import { IS_DEVELOPMENT_MODE } from './config'
import { ThemeToggle } from './components/common/theme-toggle.button'
import { useLocation } from 'react-router';

export function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="myshowai-theme">
        <AppRoutes />
        <Toaster />
        {!isLanding && <ThemeToggle />}
      </ThemeProvider>
    </Provider>
  )
}