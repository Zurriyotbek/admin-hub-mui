// @mui
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';
import Axios from '../api/axios';

// ----------------------------------------------------------------------

// URL
const URL = 'api/v1/admin/bot-stats';

export default function DashboardApp() {
  const theme = useTheme();

  const [botStats, setBotStats] = useState({});

  useEffect(() => {
    Axios.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
    })
      .then((res) => {
        console.log(res);
        setBotStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bot statistics
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Joined today" total={botStats?.joinedToday} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total users"
              total={botStats?.totalUsers}
              color="info"
              icon={'ant-design:apple-filled'}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
