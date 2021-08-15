import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
    CardContent,
    Box,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css';
import { getSpecialOfferDetails, setFilter } from 'src/redux/slices/specialOffer';
import constants from 'src/utils/constants';
import Datatable from 'src/components/table/DataTable';
import { PATH_APP } from 'src/routes/paths';
import SpecialOfferInfoGrid from './SpecialOfferInfoGrid';
import SpecialOfferInfoActions from './SpecialOfferInfoActions';
import SpecialOfferInfoHead from './SpecialOfferInfoHead';
import CardFoot from "../../../components/Ui/CardFoot";
import BackBtn from "../../../components/Ui/BackBtn";
import { OrdersArrow, Search } from '../../../icons/icons';
import TableAction from '../../../components/Ui/TableAction';
import Card from '../../../components/Ui/Card';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    backBox: {
        marginBottom: theme.spacing(2),
        textAlign: 'right'
    }
}));

// ----------------------------------------------------------------------


function SpecialOfferDetails({ specialOfferId }) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { offerProducts = [], searchSize, error, filter } = useSelector((state) => state.specialOffer);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [listView, setListView] = useState(true);
    let history = useHistory();

    useEffect(() => {
        dispatch(getSpecialOfferDetails(specialOfferId, 0, constants.MAX, ""));
    }, []);

    const changePagehandler = (event, newPage) => {
        setPage(newPage);
        dispatch(getSpecialOfferDetails(specialOfferId, newPage * constants.MAX, constants.MAX, ""));
    };

    useEffect(() => {
        const delayforSearch = setTimeout(() => {
            setPage(0);
            dispatch(getSpecialOfferDetails(specialOfferId, 0, constants.MAX, searchTerm));
        }, 500)

        return () => clearTimeout(delayforSearch)
    }, [searchTerm])

    const handleBackToOffersMenu = () => {
        history.push(PATH_APP.general.specialOffer);
    };

    const handleListView = () => {
        setListView(true);
    }

    const handleGridView = () => {
        setListView(false);
    }

    const showDetailsElement = (item) => {
        return (
            <TableAction
                type='offerActions'
                title={t("order the offer")}
                textIcon={<OrdersArrow width='17' height='17' fill='#CED5D8' fillArr={theme.palette.primary.main} />}
                icon={<Search width='15' height='15' fill='#CED5D8' />}
                link='/app/dashboard'
                linkSearch='/app/dashboard'
                mrItem="mrItem" />
        )
    }

    return (
        <>
            <Box className={classes.backBox}>
                <BackBtn
                    onClick={handleBackToOffersMenu}
                    variant='body3'
                    name={t("Back to offers")}
                />
            </Box>
            <Card cardBg='cardBg'>
                <SpecialOfferInfoHead offerId={specialOfferId} />
                <CardContent sx={{ padding: '10px 20px' }}>
                    <SpecialOfferInfoActions
                        search={(e) => {
                            dispatch(setFilter({ filter: e.target.value }));
                            setSearchTerm(e.target.value);
                        }}
                        filter={filter}
                        listView={listView}
                        handleListView={handleListView}
                        handleGridView={handleGridView} />
                    {listView ?
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
                                    label: t("SAR")
                                }
                            ]}
                            actions={[
                                {
                                    name: '',
                                    element: showDetailsElement
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
                            dataTableGeneral='dataTableGeneral'
                        />
                        :
                        <SpecialOfferInfoGrid
                            offerProducts={offerProducts}
                            error={error}
                            onSelectedPage={changePagehandler}
                            page={page}
                            isLazy={true}
                            size={searchSize}
                            rowsPerPage={constants.MAX}
                            hasPagination={true} />
                    }
                </CardContent>
                <CardFoot />
            </Card>
        </>
    );
}

export default SpecialOfferDetails;
