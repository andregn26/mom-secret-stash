import './App.css'
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from "react-router-dom";
import { PageRegister } from './Pages/PageRegister';
import { PageLogin } from '@/Pages/PageLogin';
import { PageMain } from './Pages/PageMain';
import { PageProfile } from './Pages/PageProfile';
import { TemplateNavigation } from './Templates/TemplateNavigation';
function App() {

  return (
    <div className='bg-base-100 w-full min-h-100vh'>
      <TemplateNavigation />
      <Routes>
        <Route element={<PageMain />} path='/' />
        <Route path={"/login"} element={<PageLogin />} />
        <Route path={"/register"} element={<PageRegister />} />
        <Route path={"/profile"} element={<PageProfile />} />
      </Routes>
      <Toaster position='bottom-right' />

    </div>
  )
}

export default App
