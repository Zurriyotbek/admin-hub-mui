import './styles/main.scss';
// routes
import { useNavigate } from 'react-router-dom';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import Login from './pages/Login';
// import Axios from './api/axios';
// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();

  const token = localStorage.getItem('admin_token');

  function isAuthenticated(token) {
    if (!token) {
      return <Login />;
    }

    return <Router />;
  }

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {isAuthenticated(token)}
    </ThemeProvider>
  );
}
