import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ClientBooking from './pages/ClientBooking';
import DriverReg from './pages/DriverReg';
import AdminPanel from './pages/AdminPanel';
import Help from './pages/Help';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking" element={<ClientBooking />} />
              <Route path="/driver" element={<DriverReg />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;