import React from 'react';
import { useSelector } from 'react-redux';

// icons

import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// icons
import { Link } from 'react-router-dom';
import marsIcon from '../assets/icons/mars-solid.svg';
import venusIcon from '../assets/icons/venus-solid.svg';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// import Page from '../components/Page';

export default function UserInfo() {
  const patient = useSelector((state) => state.patients.selectedPatient);

  console.log(patient);

  const handleCompaint = (complaint) => {
    if (complaint === null) {
      return <Typography>No cause of complaints</Typography>;
      // eslint-disable-next-line no-else-return
    } else if (complaint.includes('https://')) {
      return (
        <a href={complaint} target="_blank" rel="noreferrer">
          {complaint}
        </a>
      );
    } else {
      return <Typography>{patient?.causeOfComplaint}</Typography>;
    }
  };

  return (
    <Page title="User: UserInfo">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          {`${patient.name} ${patient.surname}`}
          <img
            src={patient.gender === 'FEMALE' ? marsIcon : venusIcon}
            alt="icon"
            style={{ marginLeft: '10px', width: '30px', height: '30px' }}
          />
          <Typography sx={{ marginLeft: 'auto', fontSize: '20px' }}>
            Phone:
            <a href={`tel:${patient?.phone}`} style={{ marginLeft: '10px' }}>
              {patient?.phone}
            </a>
            {/* <Link to={`tel:${patient?.phone}`}>{patient?.phone}</Link> */}
          </Typography>
        </Typography>
        <Typography sx={{ mb: 5, textAlign: 'right', color: 'GrayText', fontSize: '20px' }}>
          <span style={{ fontWeight: 'bold' }}>Manzil: </span>
          {patient?.region}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Birth date" total={patient?.birthDate} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Weight"
              // kg
              total={`${patient?.weight}`}
              color="info"
              icon={'ant-design:apple-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Height"
              // sm
              total={`${patient?.height}`}
              color="warning"
              icon={'ant-design:windows-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Temperature"
              // °C
              total={`${patient?.temperature || 'unknown'} `}
              color="error"
              icon={'ant-design:bug-filled'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Blodd pressure"
              // °C
              total={`${patient?.bloodPressure || 'unknown'} `}
              color="success"
              icon={'ant-design:bug-filled'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Heart rate"
              // °C
              total={`${patient?.heartBeat || 'unknown'} `}
              color="error"
              icon={'ant-design:bug-filled'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Smokes"
              // °C
              total={`${patient?.cigarette || 'unknown'} `}
              color="info"
              icon={'ant-design:bug-filled'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Current temperature"
              // °C
              total={`${patient?.currentTemperature || 'unknown'} `}
              color="warning"
              icon={'ant-design:bug-filled'}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: '70px', boxShadow: '2px 4px 10px 2px rgba(23,17,17,0.42)', borderRadius: '20px' }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="h5">Complaints</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{patient?.complaints || 'No complaints'}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography variant="h5">Cause of complaint</Typography>
            </AccordionSummary>
            <AccordionDetails>{handleCompaint(patient?.causeOfComplaint)}</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="h5">Started time</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{patient?.complaintStartedTime || 'Unknown'}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="h5">Diabetes </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{patient?.diabetes || 'Unknown'}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="h5">Desease list</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{patient?.diseasesList || 'Unknown'}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="h5">Drug list</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{patient?.drugsList || 'Unknown'}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
    </Page>
  );
}
