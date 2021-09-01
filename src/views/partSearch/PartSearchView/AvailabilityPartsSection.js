import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';
import PartDetails from './PartDetails';
import Datatable from 'src/components/table/DataTable';
import { handleChangePage, setSelectedPart, partSearch, setFilter } from '../../../redux/slices/partSearch';
import constants from 'src/utils/constants';
import LocationFilterSection from './LocationFilterSection';
import TableAction from '../../../components/Ui/TableAction';
import TextField from 'src/components/Ui/TextField';
import SecContainer from '../../../components/Ui/SecContainer';
import CustomDialog from '../../../components/Ui/Dialog';
import CustomButton from '../../../components/Ui/Button';
import { Plus, OrdersArrow } from "../../../icons/icons";
import PurchaseOrderSection from './PurchaseOrderSection';
import SendPurchaseOrderSection from './SendPurchaseOrderSection';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    availabilityCont: {
        position: 'relative',
        '& .MuiTypography-h5': {
            height: '60px',
            lineHeight: '37px',
        }
    },
    sendPo: {
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(1.25),
        '& button': {
            '@media (max-width: 320px) and (min-width: 300px)': {
                padding: theme.spacing(0.875, 1.25),
            },
            '& svg': {
                marginRight: theme.spacing(1)
            }
        },
    },
    availabilityActionsCont: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #E5EBF0',
        paddingBottom: '10px',
        minWidth: '300px',
        '@media (max-width: 700px) and (min-width: 300px)': {
            display: 'block',
            width: '100%',
            minWidth: '100%',
        },
    },
    availabilityActionsLeft: {
        width: '300px',
        minWidth: '300px',
        '@media (max-width: 700px) and (min-width: 300px)': {
            width: '100%',
            minWidth: '100%',
            marginBottom: theme.spacing(2)
        },
    },
    specialOfferBadge: {
        backgroundColor: '#FEE6E6',
        color: theme.palette.primary.main,
        borderRadius: '5px 0 5px 5px',
        padding: '4px 7px',
        marginLeft: '5px'
    }
}));

// ----------------------------------------------------------------------

function AvailabilityPartsSection() {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [openAddToPO, setOpenAddToPO] = useState(false);
    const [openSendPO, setOpenSendPO] = useState(false);
    const { productResult = [], searchSize = 0, companies, selectedPart, page,
        rowsPerPage, error, query, locationFilters, filter, orders } = useSelector((state) => state.PartSearch);
    const { themeDirection } = useSelector((state) => state.settings);
    const [searchTerm, setSearchTerm] = useState('');

    const changePagehandler = (event, newPage) => {
        dispatch(handleChangePage({ newPage: newPage }));
        dispatch(partSearch(query, newPage * constants.MAX, constants.MAX, filter, locationFilters));
    };

    const showDetailsAction = (item) => {
        dispatch(setSelectedPart({ selectedPart: JSON.parse(item) }));
    }

    const addToCompanyCart = (item) => {
        dispatch(setSelectedPart({ selectedPart: JSON.parse(item) }));
        setOpenAddToPO(true);
    }

    const showDetailsElement = (item) => {
        return (
            <TableAction
                type='partSearch'
                title={t("Details")}
                onClick={() => showDetailsAction(item)}
                textIcon={<Plus width='14' height='14' fill='#CED5D8' />} />
        )
    }


    const addToCart = (item) => {
        return (
            <TableAction
                type='partSearch'
                title={t("Add To PO")}
                onClick={() => addToCompanyCart(item)}
                textIcon={<OrdersArrow width='17' height='17' fill='#CED5D8' fillArr={theme.palette.primary.main} />} />
        )
    };

    const closeOrderDailog = () => {
        dispatch(setSelectedPart({ selectedPart: null }));
        setOpenAddToPO(false)
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query != "") {
                dispatch(handleChangePage({ newPage: 0 }));
                dispatch(partSearch(query, 0, 0, searchTerm, locationFilters));
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm]);

    // <Typography variant="caption" className={classes.specialOfferBadge}>{t("Special offer")}</Typography>

    return (
        <Box className={orders.length > 0 ? classes.availabilityCont : null}>
            {orders.length > 0 ?
                <Box className={classes.sendPo}>
                    <CustomButton
                        btnWidth='btnWidth'
                        onClick={() => setOpenSendPO(true)}
                    >
                        <OrdersArrow width='17' height='17' fill={theme.palette.grey[0]} fillArr={theme.palette.grey[0]} className={classes.orderOffer} />
                        {t("Send PO")}
                    </CustomButton>
                </Box> : null}
            <SecContainer
                header={t('Search Results')}
                secContainerMt='secContainerMt'>
                <Box className={classes.availabilityActionsCont}>
                    <Box className={classes.availabilityActionsLeft}>
                        <TextField
                            type='input'
                            value={filter}
                            onChange={(e) => {
                                dispatch(setFilter({ filter: e.target.value }));
                                setSearchTerm(e.target.value);
                            }}
                            label={t("Search by part number")}
                            selectBg='selectBg' />
                    </Box>

                    <Box>
                        <LocationFilterSection />
                    </Box>
                </Box>
                <Datatable
                    header={[
                        {
                            name: t("Part Number"),
                            attr: 'partNumber',
                            badge: <Typography variant="caption" className={classes.specialOfferBadge}>{t("Special offer")}</Typography>
                        },
                        {
                            name: t("Brand"),
                            attr: 'brandName',
                        },
                        {
                            name: t("Company Name"),
                            isMapped: true,
                            mapIndex: 0,
                            mappedAttribute: themeDirection == 'ltr' ? 'name' : 'nameAr',
                            attr: 'companyId'
                        },
                        {
                            name: t("Average market price"),
                            attr: 'retailPrice',
                            num: 'num'
                        }
                    ]}

                    actions={[{ element: addToCart }, { element: showDetailsElement }]}
                    datatable={productResult}
                    error={error}
                    onSelectedPage={changePagehandler}
                    page={page}
                    isLazy={true}
                    maps={[companies]}
                    size={searchSize}
                    rowsPerPage={rowsPerPage}
                    hasPagination={true}
                    dataTablePartSearch='dataTablePartSearch'
                />

            </SecContainer>

            <CustomDialog
                open={selectedPart != null && openAddToPO == false}
                handleClose={() => dispatch(setSelectedPart({ selectedPart: null }))}
                title={t("Availability details")}>
                <PartDetails />
            </CustomDialog>

            <CustomDialog
                open={openAddToPO}
                handleClose={closeOrderDailog}
                title={t("Add to Purchase Order")}
                dialogWidth='dialogWidth'>
                {selectedPart != null &&
                    <PurchaseOrderSection
                        closeOrderDailog={closeOrderDailog} />
                }
            </CustomDialog>

            <CustomDialog
                fullWidth={true}
                open={openSendPO}
                handleClose={() => setOpenSendPO(false)}
                title={t("Send PO")}>
                <SendPurchaseOrderSection setOpenSendPO={setOpenSendPO} orders={orders} />
            </CustomDialog>
        </Box >
    );
}

export default AvailabilityPartsSection;
