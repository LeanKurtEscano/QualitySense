import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { MyProvider, useMyContext } from './Components/MyContext'; // Import the context here
import Generate from './Sections/Generate';
import Dashboard from './Sections/Dashboard';
import Login from './Sections/Login';
import Signup from './Sections/Signup';
import NavBar from './Components/NavBar';

function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}

const Main: React.FC = () => {
  const { setIsAuthenticated } = useMyContext(); 
  useEffect(() => {
    const userToken = localStorage.getItem('access_token');
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]); 

  return (
    <main className='h-screen flex flex-col'>
      <NavBar />
      <Routes>
        <Route path='/' element={
          <section className='w-full h-screen flex justify-center items-center pb-10'>
            <Login />
          </section>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/signup' element={
          <section className='w-full h-screen flex justify-center items-center'>
            <Signup />
          </section>
        } />
        <Route path='/generate' element={
          <section className='w-max overflow-x-hidden  overflow-y-hidden h-screen'>
            <Generate />     
          </section>    
        } />
      </Routes>
    </main>
  );
}

export default App;

