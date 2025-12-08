import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.jsx'; 
import { ThemeProvider } from './components/theme-provider.jsx';  

const App = () => {
  return (
  <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>  )

}

export default App