import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './app/providers/AppProvider'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
