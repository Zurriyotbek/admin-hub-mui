import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// icons

// @mui
import TextField from '@mui/material/TextField';
import { Grid, Container, Typography, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from '../api/axios';

// icons
import marsIcon from '../assets/icons/mars-solid.svg';
import venusIcon from '../assets/icons/venus-solid.svg';

// components
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

// URL
const URL = 'api/v1/patient/update-diagnosis';
// ----------------------------------------------------------------------
export default function UserInfo() {
  const patient = useSelector((state) => state.patients.selectedPatient);

  const [textAreaValue, setTextAreaValue] = useState(patient?.diagnosis || 'Not have');

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

  // React Tostify
  const notify = (status) => {
    switch (status) {
      case 'success':
        toast.success('Successfully updated diagnosis', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case 'error':
        toast.error('Error updating diagnosis', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case 'warning':
        toast.warn('Write diagnosis and try again!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      default:
        break;
    }
  };

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  const handleSave = () => {
    const data = {
      diagnosis: textAreaValue,
      patientId: patient.id,
    };

    if (textAreaValue === 'Not have') {
      notify('warning');
    }

    if (textAreaValue && textAreaValue !== 'Not have') {
      Axios.put(URL, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
        .then((res) => {
          console.log(res);
          notify('success');
        })
        .catch((err) => {
          console.log(err);
          notify('error');
        });
    }
  };

  return (
    <Page title="User: UserInfo">
      <ToastContainer />

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
        <div style={{ marginTop: '70px', boxShadow: '1px 1px 10px 1px rgba(23,17,17,0.2)', borderRadius: '20px' }}>
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

        {/* Patient diagnosis */}
        <div
          style={{
            marginTop: '50px',
            padding: '20px',
            boxShadow: '1px 1px 10px 1px rgba(23,17,17,0.2)',
            borderRadius: '20px',
          }}
        >
          <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>
            Patient diagnosis
          </Typography>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              id="outlined-multiline-static"
              multiline
              value={textAreaValue}
              onChange={handleTextAreaChange}
              rows="10"
              defaultValue={`${patient?.diagnosis || 'Not have'}`}
              sx={{ width: '100%' }}
            />
          </div>
          <Button variant="contained" sx={{ padding: '10px', width: '150px' }} onClick={handleSave}>
            Save
          </Button>
        </div>
      </Container>
    </Page>
  );
}
