import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import searchFill from '@iconify-icons/eva/search-fill';
import { Icon } from '@iconify/react';
import {
    Card,
    Grid,
    CardHeader,
    CardContent,
    Typography,
    OutlinedInput,
    InputAdornment
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import { getSpecialOfferDetails, getSpecialOffersLive, setFilter } from 'src/redux/slices/specialOffer';
import { useSelector } from 'react-redux';
import helper from 'src/utils/helper';
import constants from 'src/utils/constants';
import Datatable from 'src/components/table/DataTable';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    search: {
        width: 240,
        margin: 10,
        transition: theme.transitions.create(['box-shadow', 'width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter
        }),
        '&.Mui-focused': { width: 320, boxShadow: theme.shadows[25].z8 },
        '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: `${theme.palette.grey[500_32]} !important`
        }
    },
}));

// ----------------------------------------------------------------------


function SpecialOfferDetails({ specialOfferId }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { offerProducts = [], searchSize, error, selectedOffer, filter } = useSelector((state) => state.specialOffer);
    const { themeDirection } = useSelector((state) => state.settings);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('')





    useEffect(() => {
        dispatch(getSpecialOfferDetails(specialOfferId, 0, constants.MAX, ""));
    }, []);


    const changePagehandler = (event, newPage) => {
        setPage(newPage);
        dispatch(getSpecialOfferDetails(specialOfferId, newPage * constants.MAX, constants.MAX, ""));
    };


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            dispatch(getSpecialOfferDetails(specialOfferId, 0, constants.MAX, searchTerm));
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])



    return (

        <Box sx={{ width: '100%' }}>
            <Card  >
                <CardContent className={classes.cardContent}>

                    <OutlinedInput
                        value={filter}
                        onChange={(e) => {
                            dispatch(setFilter({ filter: e.target.value }));
                            setSearchTerm(e.target.value);
                        }}
                        placeholder={t("Search by part number")}
                        startAdornment={
                            <InputAdornment position="start">
                                <Box
                                    component={Icon}
                                    icon={searchFill}
                                    sx={{ color: 'text.disabled' }}
                                />
                            </InputAdornment>
                        }
                        className={classes.search}
                    />

                    <Box sx={{ mb: 3 }} />


                    <Datatable
                        header={[
                            {
                                name: t("Part Number"),
                                attr: 'partNumber',
                            },
                            {
                                name: t("Brand"),
                                attr: 'brandName',
                            },
                            {
                                name: t("Quantity"),
                                attr: 'stock.length',
                            },
                            {
                                name: t("Price"),
                                attr: 'offers[0].offerPrice',
                                type: 'number',
                                label: t("common.sar")

                            }
                        ]}


                        datatable={offerProducts}
                        error={error}
                        onSelectedPage={changePagehandler}
                        page={page}
                        isLazy={true}
                        size={searchSize}
                        rowsPerPage={constants.MAX}
                        hasPagination={true}

                    />


                </CardContent >
            </Card>

        </Box >

    );
}

export default SpecialOfferDetails;
