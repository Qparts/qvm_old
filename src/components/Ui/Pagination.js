import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import { useTranslation } from 'react-i18next';
import constants from 'src/utils/constants';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    tablePagination: {
        borderTop: 0,
        '& .MuiTablePagination-toolbar': {
            height: '59px'
        }
    }
}));

// ----------------------------------------------------------------------

export default function CustomButton(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);

    useEffect(() => {
        props.setState({
            ...props.state,
            page: props.page,
            data: props.isLazy == true ? props.paginationData : props.paginationData.slice(props.rowsPerPage * props.page, props.rowsPerPage * (props.page + 1)),

        })
    }, [props.paginationData])


    useEffect(() => {
        if (!props.isLazy) {
            props.setState({
                ...props.state,
                data: props.paginationData.slice(props.rowsPerPage * props.page, props.rowsPerPage * (props.page + 1)),
            })
        }

    }, [props.rowsPerPage])

    const changePagehandler = (event, newPage) => {
        if (props.onSelectedPage)
            props.onSelectedPage(event, newPage);
        else props.setState({
            ...props.state,
            page: newPage,
            data: props.paginationData != null && props.paginationData.length > 0 ?
                props.paginationData.slice(props.rowsPerPage * newPage, props.rowsPerPage * (newPage + 1)) : []
        });
    };

    return (
        <>
            {props.hasPagination && <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={props.size}
                rowsPerPage={constants.MAX}
                page={props.state.page}
                onPageChange={changePagehandler}
                className={classes.tablePagination}
                labelDisplayedRows={
                    ({ from, to, count }) => {
                        return themeDirection == 'ltr' ? '' + from + '-' + to + t("Of") + count :
                            '' + to + '-' + from + t("Of") + count
                    }
                }
            />}
        </>
    );
}