import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {
  isBookingOpen: boolean;
  openBooking: (service?: string, details?: string) => void;
  closeBooking: () => void;
  initialService: string;
  initialDetails: string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialService, setInitialService] = useState('');
  const [initialDetails, setInitialDetails] = useState('');

  const openBooking = (service?: string, details?: string) => {
    if (service) setInitialService(service);
    if (details) setInitialDetails(details);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    // Clear state after animation closes
    setTimeout(() => {
      setInitialService('');
      setInitialDetails('');
    }, 300);
  };

  return (
    <BookingContext.Provider value={{ isBookingOpen, openBooking, closeBooking, initialService, initialDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};