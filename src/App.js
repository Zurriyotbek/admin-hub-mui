import './styles/main.scss';

// routes
import { useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import Axios from './api/axios';
// ----------------------------------------------------------------------

export default function App() {
  const state = useSelector((state) => state);
  console.log(state, 'state');

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
