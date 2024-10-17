import {  Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MyProvider, useMyContext } from './Components/MyContext';
import Generate from './Sections/Generate';
import OTP from './Sections/OTP';
import Dashboard from './Sections/Dashboard';
import Login from './Sections/Login';
import Signup from './Sections/Signup';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Sections/Home';
import { auth } from './Api/Token';
import VideoSection from './Sections/VideoSection';
import Features from './Components/Features';
import Activity from './Sections/Activity';
import DataSources from './Sections/DataSources';
import ProtectedRoutes from './Components/ProtectedRoutes';
import ResponseLogs from './Sections/ResponseLogs';
import Help from './Sections/Help';
import LogOut from './Components/LogOut';
import Profile from './Sections/Profile';
import PrivacyPolicy from './Sections/PrivacyPolicy';
import TermsAndConditions from './Sections/TermsAndCondition';
import AboutUs from './Sections/AboutUs';
function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}

const Main: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { isAuthenticated, setIsAuthenticated,toggleLog } = useMyContext();

  useEffect(() => { 
    if (isAuthenticated) {
      localStorage.setItem('currentPath', location.pathname);
    }
  }, [location, isAuthenticated]);

  useEffect(() => {
    const storedPath = localStorage.getItem('currentPath');
    const checkUserAuth = async () => {
      const isAuthorized = await auth();
      setIsAuthenticated(isAuthorized);

      if (isAuthorized && storedPath) {
        navigate(storedPath);
      } 

    };
    checkUserAuth();
  }, [setIsAuthenticated, navigate]);

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/activity');
    }
  }, [location, navigate]);




  return (
    <main className='h-auto flex flex-col'>
      <NavBar />

      {toggleLog && (
        <LogOut />
      )}
      
      <Routes>
        <Route path='/login' element={
          <section className='w-full h-screen flex justify-center items-center '>
            <Login />
          </section>
        } />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
           <Route path="" element={<Navigate to="/dashboard/activity" replace />} />
          <Route path="activity" element={<Activity isAuthenticated={isAuthenticated} />} />
          <Route path="response" element={<ResponseLogs />} />
          <Route path="data" element={<DataSources />} />
          <Route path="profile" element={<Profile />} />

         
          <Route path = "help" element={
          <section>
            <Help/>
            <Footer/>
          </section>
            } />
        </Route>

        <Route path='/signup' element={
          <section className='w-full h-screen flex justify-center items-center'>
            <Signup />
          </section>
        } />
        <Route path='/generate' element={
          <section className='h-auto '>
            <Generate />
            <Footer/>
          </section>
        } />
        <Route path='/' element={
          <section className='h-auto'>
            <Home />
            <VideoSection />
            <Features />
            <Footer />
          </section>
        } />
         <Route path='/help' element={
          <section className='h-auto'>
            <Help />
            <Footer />
          </section>
        } />
        <Route path='/auth' element={
          <OTP/>
        } />
         <Route path='/privacy' element={
          <section>
            <PrivacyPolicy/>
            <Footer/>

          </section>       
        } />
        <Route path='/terms' element={
          <section>
            <TermsAndConditions/>
            <Footer/>

          </section>       
        } />


        <Route path = '/about' element={
          <section>
            <AboutUs />
            <Footer />
          </section>
        } />
      </Routes>
    </main>
  );
}

export default App;