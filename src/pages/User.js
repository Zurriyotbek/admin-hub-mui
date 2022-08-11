import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

// ----------------------------------------------------------------------
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
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
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullName', label: 'Full name', alignRight: false },
  // { id: 'phone', label: 'Phone number', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'complaints', label: 'Complaints', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// URLS
const URL = {
  USER_LIST: 'api/v1/patient/list',
  // USER_DETAIL: '/api/v1/user/',
};

export default function User() {
  const dispatch = useDispatch();

  const { patientsList, selectedPatient } = useSelector((state) => state.patients);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    Axios.get(URL.USER_LIST, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
    })
      .then((response) => {
        console.log(response);
        dispatch(setPatients(response.data.content));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(selectedPatient, 'selectedPatient');

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const nameSlice = (name1, name2) => {
    return name1.slice(0, 1) + name2.slice(0, 1);
  };

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

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Patients
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {patientsList?.map((row) => {
                    const { id, name, surname, status, gender, complaints } = row;
                    // const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        // selected={isItemSelected}
                        // aria-checked={isItemSelected}
                        onClick={() => dispatch(setSelectedPatient(row))}
                      >
                        <TableCell padding="checkbox">{/*  */}</TableCell>
                        <TableCell component="th" scope="row" padding="none" sx={{ width: '300px' }}>
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
                        </TableCell>
                        <TableCell align="left" sx={{ width: '150px' }}>
                          {gender}
                        </TableCell>

                        <TableCell align="left" sx={{ width: '150px' }}>
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {status}
                          </Label>
                        </TableCell>

                        <TableCell align="left" sx={{ width: '450px', overflow: 'clip' }}>
                          {complaints || 'Unknown'}{' '}
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu userId={id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>

                {/* {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
