import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import Project from './pages/projectPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path={'/admin/project'} element={<Project/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
