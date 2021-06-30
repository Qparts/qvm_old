import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
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
import helper from 'src/utils/helper';
import Scrollbars from '../Scrollbars';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    dataTable: {
        boxShadow: 'none',
        background: '#F6F8FC',
    },
    dataTableHead: {
        '& $th': {
            border: 'none',
            background: 'none',
            color: '#7E8D99',
            paddingTop: 0,
            paddingBottom: theme.spacing(1),
            fontSize: theme.typography.body4.fontSize,
            fontWeight: theme.typography.fontWeightRegular
        },
        '& $th:first-of-type, & $th:last-of-type': {
            boxShadow: 'none',
        }
    },
    dataTableTr: {
        background: theme.palette.grey[0],
        borderBottom: '10px solid #F6F8FC',
        '&:last-of-type': {
            border: 0
        },
        '& $td:first-of-type': {
            borderRadius: '10px 0 0 10px',
        },
        '& $td:last-of-type': {
            borderRadius: '0 10px 10px 0'
        }
    },
    tablePagination: {
        borderTop: '10px solid #F6F8FC',
        '& .MuiTablePagination-toolbar': {
            height: '59px'
        }
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
    showChildNumbers, childTitle, noChildComponent }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { themeDirection } = useSelector((state) => state.settings);

    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();


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
            <Paper sx={{ width: '100%' }}>
                <Scrollbars>
                    <TableContainer component={Paper}>
                        <Table className={classes.dataTable} sx={{ minWidth: 650 }} aria-label="simple table">
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

                {hasPagination && <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={size}
                    rowsPerPage={constants.MAX}
                    page={state.page}
                    onPageChange={changePagehandler}
                    className={classes.tablePagination}
                    labelDisplayedRows={
                        ({ from, to, count }) => {
                            return themeDirection == 'ltr' ? '' + from + '-' + to + t("Of") + count :
                                '' + to + '-' + from + t("Of") + count
                        }
                    }
                />}
            </Paper>
        </Box>
    );
}

export default Datatable;
