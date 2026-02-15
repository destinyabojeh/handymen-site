import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HandymanServices from './pages/HandymanServices';
import MoveInServices from './pages/MoveInServices';
import RenovationServices from './pages/RenovationServices';
import Contact from './pages/Contact';
import JoinTeam from './pages/JoinTeam';
import { BookingProvider } from './context/BookingContext';
import BookingModal from './components/BookingModal';

// Scroll to top on route change wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-brand-light font-body text-gray-800">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/handyman" element={<HandymanServices />} />
              <Route path="/move-in" element={<MoveInServices />} />
              <Route path="/renovation" element={<RenovationServices />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/join" element={<JoinTeam />} />
            </Routes>
          </main>
          <Footer />
          <BookingModal />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
