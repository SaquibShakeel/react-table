import { useState, useEffect } from 'react';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, makeStyles, TablePagination } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Moment from 'moment';
import '../App.css';

import DateRange from "./DateRange";

const useStyles = makeStyles({
    table: {
    },
    TableContainer: {
        maxHeight: 800,
        margin: "0",
        borderRadius: "10px",
    },
    TableHeaderCell: {
        fontSize: '1.2rem',
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
    '&:nth-of-type(odd)': {
      backgroundColor: "#1d1d2f",
    },
    '&:nth-of-type(even)': {
      backgroundColor: "#283046",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const MakeTable = () => {
    const [tableData, setTableData] = useState([]);
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sDate, setSDate] = useState('2022-06-01');
    const [eDate, setEDate] = useState('2022-07-01');

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

      useEffect(() => {
          const fetchData = async () => {
              const result = await fetch(`https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=${sDate}&todate=${eDate}`);
              const data = await result.json();
              setTableData(data.data);
            }
            fetchData();
        }, [sDate, eDate]);
        

    return (
      <TableContainer component={Paper} className={classes.TableContainer}>
        <DateRange onChange={onChangeDate}/>
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
        <div></div>
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
                IOS Installs
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Android Installs
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Day Uninstalls
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                IOS Uninstalls
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Android Uninstalls
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Churn Rate
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                IOS Churn
              </TableCell>
              <TableCell className={classes.TableHeaderCell} align="center">
                Android Churn
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
                        {row.ios_install}
                      </TableCell>
                      <TableCell
                        className={classes.TableRowCell}
                        align="center"
                      >
                        {row.android_install}
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
                        {row.ios_uninstall}
                      </TableCell>
                      <TableCell
                        className={classes.TableRowCell}
                        align="center"
                      >
                        {row.android_uninstall}
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
                        {row.ios_churn}
                      </TableCell>
                      <TableCell
                        className={classes.TableRowCell}
                        align="center"
                      >
                        {row.android_churn}
                      </TableCell>
                    </StyledTableRow>
                  );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default MakeTable;