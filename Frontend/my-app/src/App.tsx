import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sections/Sidebar';
import Generate from './Sections/Generate';
function App() {
  return (
    <main className='h-screen flex flex-row'>
      <div className='flex h-full '>

        <Sidebar />
      </div>
          <Routes>
            <Route 
              path="/generate" 
              element={
                <section className='w-full flex-1'>
                  <Generate />
                  
                </section>
              } 
            />
          </Routes>
    </main>
  );
}

export default App;
