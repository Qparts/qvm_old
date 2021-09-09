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
import TextField from '../Ui/TextField';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    dataTable: {
        boxShadow: 'none',
        background: '#F6F8FC',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        '@media (max-width: 369px)': {
            minWidth: '298px',
        },
    },
    dataTableBankTrans: { minWidth: '505px' },
    dataTableReplacementItem: { minWidth: '340px' },
    dataTableGeneral: {
        '@media (max-width: 665px)': {
            minWidth: '592px',
        },
    },
    dataTableGeneralDashboard: {
        '@media (max-width: 405px)': {
            minWidth: '334px',
        },
    },
    dataTableChat: {
        backgroundColor: '#E7F0F7',
        '& thead th': { color: '#707E8A' },
        '& tbody td': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        },
        '@media (max-width: 736px)': {
            minWidth: '600px',
        },
    },
    dataTablePartSearch: {
        '@media (max-width: 915px)': {
            minWidth: '844px',
        },
    },
    dataTableCata: {
        '@media (max-width: 799px)': {
            minWidth: '735px',
        },
    },
    dataTableSetting: {
        '@media (max-width: 970px) and (min-width: 960px)': {
            minWidth: '659px',
        },
        '@media (max-width: 740px)': {
            minWidth: '666px',
        },
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
    const offersLength = item.offers === undefined ? null : item.offers.length

    let value = maps != null && maps.length && headerItem.isMapped ?
        maps[headerItem.mapIndex].get(getValue(item, headerItem.attr)) ?
            maps[headerItem.mapIndex].get(getValue(item, headerItem.attr))[headerItem.mappedAttribute]
            : getValue(item, headerItem.attr)
        : headerItem.isBooleanOp ? getValue(item, headerItem.attr) ?
            headerItem.Result.positiveValue :
            headerItem.Result.negativeValue
            :
            (getValue(item, headerItem.attr));

    if (offersLength > 0 && headerItem.num === 'num') {
        value = helper.ccyFormat(getValue(item, 'offers[0].offerPrice'));
    } else if (offersLength == 0 && headerItem.num === 'num') {
        value = getValue(item, 'retailPrice');
    }

    if (headerItem.type == 'number') {
        value = helper.ccyFormat(value);
    }

    if (headerItem.label)
        value = value + ' ' + headerItem.label;

    if (headerItem.badge && offersLength > 0) {
        value = <> {value} {headerItem.badge} </>
    }

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
    showChildNumbers, childTitle, noChildComponent, dataTablePad, dataTableCata, dataTableSetting,
    dataTableGeneral, dataTableChat, dataTablePartSearch, dataTableBankTrans, dataTableReplacementItem,
    dataTableGeneralDashboard }) {

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
                        <Table className={
                            clsx(classes.dataTable,
                                classes[dataTablePad],
                                classes[dataTableCata],
                                classes[dataTableSetting],
                                classes[dataTableGeneral],
                                classes[dataTableChat],
                                classes[dataTablePartSearch],
                                classes[dataTableBankTrans],
                                classes[dataTableReplacementItem],
                                classes[dataTableGeneralDashboard]
                            )}
                            aria-label="simple table">
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
                                                                {
                                                                    headerItem.type != null &&
                                                                        headerItem.type == 'text' ?
                                                                        <TextField
                                                                            type='input'
                                                                            inputStylChat='inputStylChat'
                                                                            inputContChat='inputContChat'
                                                                            onChange={(event) => {
                                                                                if (event.target.value != "") {
                                                                                    headerItem.onchange(event.target.value, item, headerItem.attr)
                                                                                } else
                                                                                    event.target.value = getCellValue(item, headerItem, maps);
                                                                            }}
                                                                            defaultValue={getCellValue(item, headerItem, maps)}
                                                                            value={getCellValue(item, headerItem, maps)}
                                                                        /> :
                                                                        getCellValue(item, headerItem, maps)
                                                                }
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
