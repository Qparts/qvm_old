import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';
import clsx from 'clsx';
import Button from "../button/CustomButton";
import constants from 'src/utils/constants';
import helper from 'src/utils/helper';
import Scrollbars from '../Scrollbars';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '../Ui/Pagination';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    dataTable: {
        boxShadow: 'none',
        background: '#F6F8FC',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
    },
    dataTablePad: {
        padding: '0 10px'
    },
    dataTableHead: {
        '& $th': {
            border: 'none',
            background: 'none',
            color: '#7E8D99',
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: theme.typography.body4.fontSize,
            fontWeight: theme.typography.fontWeightRegular
        },
        '& $th:first-of-type, & $th:last-of-type': {
            boxShadow: 'none',
        }
    },
    dataTableTr: {
        "& td": {
            background: theme.palette.grey[0],
        },
        '& $td:first-of-type': {
            borderRadius: '20px 0 0 20px',
        },
        '& $td:last-of-type': {
            borderRadius: '0 20px 20px 0'
        },
    }
}));



const getValue = (object, path) => {
    return path
        .replace(/\[/g, '.')
        .replace(/\]/g, '')
        .split('.')
        .reduce((o, k) => (o || {})[k], object);
};

const getCellValue = (item, headerItem, maps) => {
    let value = maps != null && maps.length && headerItem.isMapped ?
        maps[headerItem.mapIndex].get(getValue(item, headerItem.attr)) ?
            maps[headerItem.mapIndex].get(getValue(item, headerItem.attr))[headerItem.mappedAttribute]
            : getValue(item, headerItem.attr)
        : headerItem.isBooleanOp ? getValue(item, headerItem.attr) ?
            headerItem.Result.positiveValue :
            headerItem.Result.negativeValue
            :
            (getValue(item, headerItem.attr));

    if (headerItem.type == 'number') {
        value = helper.ccyFormat(value);
    }

    if (headerItem.label)
        value = value + ' ' + headerItem.label;
    return value;
}

// ----------------------------------------------------------------------

function Row({ header, title, item, maps, childData = [], childHeader, showChildNumbers, noChildComponent }) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.dataTableTr}>
                {header.map((headerItem, j) => {
                    return (
                        <TableCell key={j}>
                            {getCellValue(item, headerItem, maps)}
                        </TableCell>
                    );
                })}

                <TableCell>
                    <IconButton
                        className="add-btn px-2"
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        <span className="t-cell">
                            {title} {showChildNumbers ? "(" + childData.length + ")" : ""}
                        </span> {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}

                    </IconButton>

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="p-0 t-collapse" colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {childData.length == 0 ?
                                noChildComponent(item)
                                :
                                <Datatable
                                    header={childHeader}
                                    hasChild={false}
                                    datatable={childData}
                                    page={0}
                                    isLazy={false} />
                            }
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
// ----------------------------------------------------------------------

function Datatable({ header, datatable = [], page = 1, rowsPerPage = constants.MAX,
    actions = [], error, onSelectedPage, onRowSelect,
    maps, size = datatable.length, isLazy = true, hasPagination = false,
    onRowsPerPageChange, hasChild = false, childData, childHeader,
    showChildNumbers, childTitle, noChildComponent, dataTablePad }) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);


    const [state, setState] = useState({
        data: isLazy == true ? datatable : datatable.slice(rowsPerPage * page, rowsPerPage * (page + 1)),
        page: page,
        rowsPerPage,
        numberOfPages: size ? Math.ceil(size / rowsPerPage) : Math.ceil(datatable.length / rowsPerPage),
    });

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%' }}>
                <Scrollbars>
                    <TableContainer component={Paper}>
                        <Table className={clsx(classes.dataTable, classes[dataTablePad])} aria-label="simple table">
                            <TableHead className={classes.dataTableHead}>
                                <TableRow>
                                    {header.map((item, i) => {
                                        return (
                                            <TableCell key={i}>{item.name}</TableCell>
                                        );
                                    })}
                                    {actions.map((actionItem, i) => {
                                        return (
                                            <TableCell key={i}>
                                                {actionItem.name}
                                            </TableCell>
                                        );
                                    })}
                                    {hasChild && <TableCell />}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.data
                                    .map((item, i) => {
                                        if (hasChild)
                                            return (<Row
                                                header={header}
                                                childHeader={childHeader}
                                                childData={item[childData]}
                                                title={childTitle}
                                                item={item}
                                                maps={maps}
                                                showChildNumbers={showChildNumbers}
                                                noChildComponent={noChildComponent}
                                                key={i}
                                            ></Row>)
                                        else
                                            return (
                                                <TableRow key={i} className={classes.dataTableTr}>
                                                    {header.map((headerItem, j) => {
                                                        return (
                                                            <TableCell key={j}>
                                                                {getCellValue(item, headerItem, maps)}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    {actions.map((actionItem, index) => {
                                                        return (
                                                            <TableCell key={index}>
                                                                {actionItem.element ?
                                                                    actionItem.element(JSON.stringify(item)) :
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        round
                                                                        onClick={() => actionItem.action(JSON.stringify(item))}
                                                                    >
                                                                        {actionItem.name}
                                                                    </Button>
                                                                }
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                    })

                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbars>

                <Pagination
                    hasPagination={hasPagination}
                    paginationData={datatable}
                    state={state}
                    setState={setState}
                    size={size}
                    isLazy={isLazy}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onSelectedPage={onSelectedPage} />
            </Paper>
        </Box>
    );
}

export default Datatable;
