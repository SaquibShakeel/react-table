import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, makeStyles, TablePagination, Grid } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Moment from 'moment';
import '../App.css';
import android from '../assets/android-filled.svg';
import apple from '../assets/apple-filled.svg';

import DateRange from "./DateRange";

const useStyles = makeStyles({
    table: {
    },
    TableContainer: {
        maxHeight: 800,
        margin: "1%",
        marginTop: "0",
        borderRadius: "10px",
    },
    TableHeaderCell: {
        fontSize: '1rem',
        fontWeight: 'bold',
        backgroundColor: '#271c1c',
        color: '#fff',
    },
    TableRowCell: {
        color: '#fff',
    },
    TablePaginationCell: {
        backgroundColor: '#283046',
        color: '#fff',
        alignItems: 'center',
        justify: 'center',
    },
});
const StyledTableRow = styled(TableRow)(({ theme }) => ({
      backgroundColor: "#283046",
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const Backdrop = (props) => {
    return (
        <div className='backdrop' onClick={props.onClick}/>
    );
};


const MakeTable = () => {
    const [tableData, setTableData] = useState([]);
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [sDate, setSDate] = useState('2022-06-01');
    const [eDate, setEDate] = useState('2022-07-01');
    const [modal, setModal] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onChangeDate = ranges => {
        // ranges ...
        console.log(ranges);
        setSDate(Moment(ranges.startDate).format('YYYY-MM-DD'));
        setEDate(Moment(ranges.endDate).format('YYYY-MM-DD'));
      };

      const modalHandler = () => {
        setModal(true);
      }

      const closeModalHandler = () => {
        setModal(false);
      }

      useEffect(() => {
          const fetchData = async () => {
              const result = await fetch(`https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=${sDate}&todate=${eDate}`);
              const data = await result.json();
              setTableData(data.data);
            }
            fetchData();
        }, [sDate, eDate]);
        

    return (
      <div className='makeTable'>
        {modal && ReactDOM.createPortal(<Backdrop onClick={closeModalHandler} />, document.getElementById('backdrop-root'))}
        {modal && ReactDOM.createPortal(<DateRange onChange={onChangeDate}/>, document.getElementById('overlay-root'))}
        <div className='flex-pagination'>
        <TablePagination
                className={classes.TablePaginationCell}
                rowsPerPageOptions={[5, 10, 20, 50, 80, 100]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        <button onClick={modalHandler} className='date-btn'>Select Duration</button>
        </div>
      <TableContainer component={Paper} className={classes.TableContainer}>
        <Table className={classes.table} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.TableHeaderCell} align="center">
                Date
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Day Installs
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Platform
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Day Uninstalls
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Platform
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Churn Rate
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Platform
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <StyledTableRow key={row.created_At}>
                      <TableCell
                        className={classes.TableRowCell}
                        align="center"
                      >
                        {Moment(row.created_At).format("DD MMMM YY")}
                      </TableCell>
                      <TableCell
                        className={classes.TableRowCell}
                        align="center"
                      >
                        {row.totalinstall}
                      </TableCell>
                      <TableCell
                        className={classes.TableRowCell}
                        align="center"
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={10}>
                            <img className='grid-img' src={apple} alt="logo"></img>
                            {row.ios_install}
                          </Grid>
                          <Grid item xs={10}>
                            <img className='grid-img' src={android} alt="logo"></img>
                            {row.android_install}
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell
                        className={classes.TableRowCell}
                        align="center"
                      >
                        {row.totaluninstall}
                      </TableCell>
                      <TableCell
                        className={classes.TableRowCell}
                        align="center"
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={10}>
                            <img className='grid-img' src={apple} alt="logo"></img>
                            {row.ios_uninstall}
                          </Grid>
                          <Grid item xs={10}>
                            <img className='grid-img' src={android} alt="logo"></img>
                            {row.android_uninstall}
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell
                        className={classes.TableRowCell}
                        align="center"
                      >
                        {row.totalchurn}%
                      </TableCell>
                      <TableCell
                        className={classes.TableRowCell}
                        align="center"
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={10}>
                            <img className='grid-img' src={apple} alt="logo"></img>
                            {row.ios_churn}%
                          </Grid>
                          <Grid item xs={10}>
                            <img className='grid-img' src={android} alt="logo"></img>
                            {row.android_churn}%
                          </Grid>
                        </Grid>
                      </TableCell>
                    </StyledTableRow>
                  );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
}

export default MakeTable;