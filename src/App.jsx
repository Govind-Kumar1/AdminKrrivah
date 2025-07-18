import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import Project from './pages/projectPage'
import LoginPage from './pages/Login'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path={'/admin/project'} element={<Project/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
