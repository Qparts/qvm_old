import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography, Divider } from '@material-ui/core';
import PartDetails from './PartDetails';
import Datatable from 'src/components/table/DataTable';
import { handleChangePage, setSelectedPart, partSearch, setFilter } from '../../../redux/slices/partSearch';
import constants from 'src/utils/constants';
import LocationFilterSection from './LocationFilterSection';
import TableAction from '../../../components/Ui/TableAction';
import TextField from 'src/components/Ui/TextField';
import SecContainer from '../../../components/Ui/SecContainer';
import CustomDialog from '../../../components/Ui/Dialog';
import { Plus } from "../../../icons/icons";
import PurchaseOrderSection from './PurchaseOrderSection';
import CustomButton from 'src/components/Ui/Button';
import SendPurchaseOrderSection from './SendPurchaseOrderSection';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('xl')]: {
            height: 320
        }
    },
    availabilityActionsCont: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #E5EBF0',
        paddingBottom: '10px',
    },
    availabilityActionsLeft: {
        width: '300px',
    }
}));

// ----------------------------------------------------------------------

function AvailabilityPartsSection() {
    const classes = useStyles();
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
                textIcon={<Plus width='14' height='14' fill='#CED5D8' />} />
        )
    }

    const closeOrderDailog = () => {
        dispatch(setSelectedPart({ selectedPart: null }));
        setOpenAddToPO(false)
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query != "") {
                dispatch(handleChangePage({ newPage: 0 }));
                dispatch(partSearch(query, 0, constants.MAX, searchTerm, locationFilters));
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm]);

    return (
        <Box sx={{ width: '100%' }}>
            <SecContainer
                header={t('Search Results')}>
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

                    <Box className={classes.availabilityActionsRight}>
                        <CustomButton
                            btnBg="btnBg"
                            mainBorderBtn='mainBorderBtn'
                            disabled={orders.length == 0}
                            onClick={() => setOpenSendPO(true)}
                        >
                            {t("Send PO")}
                        </CustomButton>
                    </Box>

                    <Box className={classes.availabilityActionsRight}>
                        <LocationFilterSection />
                    </Box>
                </Box>
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
                            name: t("Company Name"),
                            isMapped: true,
                            mapIndex: 0,
                            mappedAttribute: themeDirection == 'ltr' ? 'name' : 'nameAr',
                            attr: 'companyId'
                        },
                        {
                            name: t("Average market price"),
                            attr: 'retailPrice'
                        }
                    ]}

                    actions={[{ element: showDetailsElement }, { element: addToCart }]}
                    datatable={productResult}
                    error={error}
                    onSelectedPage={changePagehandler}
                    page={page}
                    isLazy={true}
                    maps={[companies]}
                    size={searchSize}
                    rowsPerPage={rowsPerPage}
                    hasPagination={true}

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
                title={t("Add to Purchase Order")}>

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
                <SendPurchaseOrderSection setOpenSendPO={setOpenSendPO} orders={orders}/>
            </CustomDialog>
        </Box >
    );
}

export default AvailabilityPartsSection;
