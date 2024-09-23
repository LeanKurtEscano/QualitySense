import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sections/Sidebar';
import Generate from './Sections/Generate';
import Dashboard from './Sections/Dashboard';
import Login from './Sections/Login';

function App() {
  return (
    <main className='h-screen flex flex-row'>
      <Routes>
        <Route path='/' element={
          <section className='w-full h-screen flex justify-center items-center'>
            <Login />

          </section>
        }>
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
            <Route path="generate" element={<Generate />} />    
          </Route>
        
    

      </Routes>
    </main>
  );
}

export default App;
