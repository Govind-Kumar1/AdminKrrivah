import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import Project from './pages/projectPage'
import LoginPage from './pages/Login'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'
import DesignPage from './pages/DesignPage'

function App() {

  return (
    <>
      <Router>
        <Routes> 
          <Route path='/' element={<LoginPage/>}/>
          <Route path={'/admin'} element={<DashboardPage/>} />
          <Route path={'/admin/project'} element={<Project/> } /> 
          <Route path={'/admin/blog'} element={<BlogPage/>} />
          <Route path={'/admin/contact'} element={<ContactPage/>} />
          <Route path={'/admin/design'} element={<DesignPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
