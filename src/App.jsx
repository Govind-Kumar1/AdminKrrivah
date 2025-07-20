import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import Project from './pages/projectPage'
import LoginPage from './pages/Login'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'
import DesignPage from './pages/DesignPage'
import AddProject from './components/projectComponents/AddProject'
import StatisticsPage from './pages/StatisticsPage'
import BannerPage from './pages/BannerPage'
import GalleryPage from './pages/GalleryPage'

function App() {

  return (
    <>
      <Router>
        <Routes> 
          <Route path='/' element={<LoginPage/>}/>
          <Route path={'/admin/dashboard'} element={<DashboardPage/>} /> 
          <Route path={'/admin/blog'} element={<BlogPage/>} />
          <Route path={'/admin/project'} element={<Project/>} />
          <Route path={'/admin/project/add-project'} element={<AddProject/>} />
          <Route path={'/admin/contact'} element={<ContactPage/>} />
          <Route path={'/admin/design'} element={<DesignPage/>} />
          <Route path={'/admin/statistics'} element={<StatisticsPage/>} />
          <Route path={'/admin/banner'} element={<BannerPage/>} />
          <Route path={'/admin/gallery'} element={<GalleryPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
