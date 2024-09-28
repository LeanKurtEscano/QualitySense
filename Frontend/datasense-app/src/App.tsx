import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Generate from './Sections/Generate';
import Dashboard from './Sections/Dashboard';
import Login from './Sections/Login';
import Signup from './Sections/Signup';
import NavBar from './Components/NavBar';
function App() {
  return (
    <main className='h-screen flex flex-col'>
      <NavBar/>
      <Routes>
        <Route path='/' element={
          <section className='w-full h-screen flex justify-center items-center'>
            <Login />

          </section>
        }>
        </Route>
        <Route path="/dashboard" element={<Dashboard />}> 
        </Route>
        <Route path='/signup' element={
          <section className='w-full h-screen flex justify-center  items-center'>
            <Signup />
          </section>
        }>
        </Route>
        <Route path='/generate' element={ 
          <section className='w-max  h-screen'>
            <Generate/>     
          </section>    
              
        }>
        </Route>

      </Routes>
     
    </main>
  );
}

export default App;
