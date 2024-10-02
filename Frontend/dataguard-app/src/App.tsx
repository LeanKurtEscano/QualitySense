import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { MyProvider, useMyContext } from './Components/MyContext';
import Generate from './Sections/Generate';
import Dashboard from './Sections/Dashboard';
import Login from './Sections/Login';
import Signup from './Sections/Signup';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Sections/Home';
import { auth, refreshUserToken } from './Api/Api';
import Features from './Components/Features';
import Activity from './Sections/Activity';
import DataSources from './Sections/DataSources';
import ProtectedRoutes from './Components/ProtectedRoutes';
function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}

const Main: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useMyContext();
  useEffect(() => {
    const checkUserAuth = async () => {
      const isAuthorized = await auth();
      if (isAuthorized) {
        setIsAuthenticated(true);
      }
    }

    checkUserAuth();
  }, [setIsAuthenticated]);

  return (
    <main className='h-auto  flex flex-col'>
      <NavBar />
      <Routes>
        <Route path='/' element={
          <section className='w-full h-screen flex justify-center items-center '>
            <Login />
          </section>
        } />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route path="activity" element={<Activity isAuthenticated={isAuthenticated} />} />
          <Route path="data" element={<DataSources />} />
        </Route>

        <Route path='/signup' element={
          <section className='w-full h-screen flex justify-center items-center'>
            <Signup />
          </section>
        } />
        <Route path='/generate' element={
          <section className='h-auto '>
            <Generate />
          </section>
        } />
        <Route path='/home' element={

          <section className='h-auto'>
            <Home />
            <Features />
            <Footer />

          </section>
        } />
      </Routes>
    </main>
  );
}

export default App;

