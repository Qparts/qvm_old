import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "../button/CustomButton";
import constants from 'src/utils/constants';
import TablePagination from '@material-ui/core/TablePagination';
import { tableCellClasses } from '@material-ui/core/TableCell';
import { experimentalStyled as styled } from '@material-ui/core/styles';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// ----------------------------------------------------------------------

function Datatable({ header, datatable = [], page = 1, rowsPerPage = constants.MAX,
    actions = [], error, onSelectedPage, onRowSelect,
    maps, size = datatable.length, isLazy = true, hasPagination = true, onRowsPerPageChange }) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        data: isLazy == true ? datatable : datatable.slice(rowsPerPage * page, rowsPerPage * (page + 1)),
        page: page,
        rowsPerPage,
        numberOfPages: size ? Math.ceil(size / rowsPerPage) : Math.ceil(datatable.length / rowsPerPage),
    });


    useEffect(() => {
        setState({
            ...state,
            page: page,
            data: isLazy == true ? datatable : datatable.slice(rowsPerPage * page, rowsPerPage * (page + 1)),

        })
    }, [datatable])


    useEffect(() => {
        if (!isLazy) {
            setState({
                ...state,
                data: datatable.slice(rowsPerPage * page, rowsPerPage * (page + 1)),
            })
        }

    }, [rowsPerPage])

    const getValue = (object, path) => {
        return path
            .replace(/\[/g, '.')
            .replace(/\]/g, '')
            .split('.')
            .reduce((o, k) => (o || {})[k], object);
    };

    const getCellValue = (item, headerItem) => {
        return maps != null && maps.length && headerItem.isMapped ?
            maps[headerItem.mapIndex].get(getValue(item, headerItem.attr)) ?
                maps[headerItem.mapIndex].get(getValue(item, headerItem.attr))[headerItem.mappedAttribute]
                : getValue(item, headerItem.attr)
            : headerItem.isBooleanOp ? getValue(item, headerItem.attr) ?
                headerItem.Result.positiveValue :
                headerItem.Result.negativeValue
                :
                (getValue(item, headerItem.attr))
    }

    const changePagehandler = (event, newPage) => {
        if (onSelectedPage)
            onSelectedPage(event, newPage);
        else setState({
            ...state,
            page: newPage,
            data: datatable != null && datatable.length > 0 ?
                datatable.slice(rowsPerPage * newPage, rowsPerPage * (newPage + 1)) : []
        });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                {header.map((item, i) => {
                                    return (
                                        <StyledTableCell key={i}>{item.name}</StyledTableCell>
                                    );
                                })}

                                {actions.map((actionItem, i) => {
                                    return (
                                        <StyledTableCell key={i}>
                                            {actionItem.name}
                                        </StyledTableCell>
                                    );
                                })}

                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {

                                state.data
                                    .map((item, i) => {
                                        return (
                                            <StyledTableRow key={i}>
                                                {header.map((headerItem, j) => {
                                                    return (
                                                        <StyledTableCell key={j}>

                                                            {
                                                                getCellValue(item, headerItem)
                                                            }

                                                        </StyledTableCell>
                                                    );
                                                })}

                                                {actions.map((actionItem, index) => {

                                                    return (
                                                        <StyledTableCell key={index}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                round
                                                                onClick={() => actionItem.action(JSON.stringify(item))}
                                                            >
                                                                {actionItem.name}
                                                            </Button>
                                                        </StyledTableCell>

                                                    );
                                                })}

                                            </StyledTableRow>
                                        );
                                    })

                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                {hasPagination && <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={size}
                    rowsPerPage={constants.MAX}
                    page={state.page}
                    onPageChange={changePagehandler}
                />}

            </Paper>
        </Box>
    );
}

export default Datatable;
