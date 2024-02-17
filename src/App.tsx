import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import { Home,Learning,Quiz,Result } from './pages'

const App = () => {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='learn' element={<Learning/>}/>
      <Route path='quiz' element={<Quiz/>}/>
      <Route path='result' element={<Result/>}/>
      <Route path='login' element={<Home/>}/>
    </Route>
  ))
  return (
    <RouterProvider router={router} />
  )
}

export default App