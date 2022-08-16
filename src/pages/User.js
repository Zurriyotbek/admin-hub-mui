import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

// ----------------------------------------------------------------------
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Moment from 'react-moment';
import Axios from '../api/axios';
import { setPatients, setSelectedPatient } from '../redux/slices/patients/index';

// images
import maleAvatar from '../assets/icons/human-icon.svg';
import femaleAvatar from '../assets/icons/woman-avatar-icon.svg';

// material
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullName', label: 'Full name', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'complaints', label: 'Complaints', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

// URLS
const URL = {
  USER_LIST: 'api/v1/patient/list',
  USER_SEARCH: 'api/v1/patient/search/',
};

export default function User() {
  const dispatch = useDispatch();

  const { patientsList, selectedPatient } = useSelector((state) => state.patients);

  const [page, setPage] = useState(0);

  const [pagesCount, setPagesCount] = useState(0);

  const pageQuery = '?page=';

  const [filterName, setFilterName] = useState('');

  const isUserNotFound = patientsList.length === 0;

  const [loading, setLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const nameSlice = (name1, name2) => name1.slice(0, 1) + name2.slice(0, 1);

  const setAvatarByGender = (gender) => {
    switch (gender) {
      case 'FEMALE':
        return femaleAvatar;
      case 'MALE':
        return maleAvatar;

      default:
        return null;
    }
  };

  const handleUserStatus = (status) => {
    // status === 'PENDING' ? 'error' : status === 'PROCESSING' ? 'warning' : 'success'
    switch (status) {
      case 'PENDING':
        return 'error';
      case 'PROCESS':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      default:
        return '';
    }
  };

  useEffect(() => {
    setLoading(true);

    const getFromUrl = (value) => {
      if (value) {
        return URL.USER_SEARCH + value;
      }
      return URL.USER_LIST + pageQuery + page;
    };

    Axios.get(getFromUrl(filterName), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
    })
      .then((response) => {
        dispatch(setPatients(response.data.content));
        setPagesCount(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filterName, page]);

  const dateFormat = 'd MMM YYYY';
  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Patients
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />

                {!isUserNotFound && loading ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {patientsList?.map((row) => {
                      const { id, name, surname, status, gender, createdDate } = row;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          onClick={() => dispatch(setSelectedPatient(row))}
                        >
                          <TableCell padding="checkbox">{/*  */}</TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            sx={{
                              width: '300px',
                              '&:hover': {
                                backgroundColor: 'rgba(32, 101, 209, 0.08)',
                                cursor: 'pointer',
                              },
                            }}
                          >
                            <Link to={`/dashboard/user/${id}`} style={{ display: 'contents' }}>
                              <Stack direction="row" alignItems="center" spacing={2}>
                                {gender ? (
                                  <Avatar alt={name} src={setAvatarByGender(gender)} />
                                ) : (
                                  <span className="user-avatar">{nameSlice(name, surname)}</span>
                                )}
                                <Typography variant="subtitle2" noWrap>
                                  {`${name} ${surname}`}
                                </Typography>
                              </Stack>
                            </Link>
                          </TableCell>
                          <TableCell align="left" sx={{ width: '150px' }}>
                            {gender}
                          </TableCell>

                          <TableCell align="left" sx={{ width: '150px' }}>
                            <Label variant="ghost" color={handleUserStatus(status)}>
                              {status}
                            </Label>
                          </TableCell>

                          <TableCell align="left" sx={{ width: '450px', overflow: 'clip' }}>
                            <Moment format="D MMM YYYY, hh:mm">{createdDate.split('.')[0]}</Moment>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu userId={id} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )}

                {!loading && isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <div style={{ marginTop: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <Pagination count={pagesCount} color="primary" onChange={handleChangePage} />
          </div>
        </Card>
      </Container>
    </Page>
  );
}
