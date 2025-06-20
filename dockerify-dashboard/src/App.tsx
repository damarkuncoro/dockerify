import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import ContainerPage from './pages/containers';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/containers" element={<ContainerPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;


