import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { handleChangePage, setSelectedPart, partSearch, setFilter } from '../../../redux/slices/partSearch';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import PartDetails from './PartDetails';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    TextField,
    Typography,
} from '@material-ui/core';
import Datatable from 'src/components/table/DataTable';
import { useTranslation } from 'react-i18next';
import constants from 'src/utils/constants';


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
    }
}));

// ----------------------------------------------------------------------




function AvailabilityPartsSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { productResult = [], searchSize = 0, companies, selectedPart, page,
        rowsPerPage, error, query, locationFilters, filter } = useSelector((state) => state.PartSearch);
    const { themeDirection } = useSelector((state) => state.settings);

    const [expanded, setExpanded] = useState(true);
    const [searchTerm, setSearchTerm] = useState('')


    const changePagehandler = (event, newPage) => {
        dispatch(handleChangePage({ newPage: newPage }));
        dispatch(partSearch(query, newPage * constants.MAX, constants.MAX, filter, locationFilters));
    };


    const showDetails = (item) => {
        dispatch(setSelectedPart({ selectedPart: JSON.parse(item) }));
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query != "") {
                dispatch(handleChangePage({ newPage: 0 }));
                dispatch(partSearch(query, 0, constants.MAX, searchTerm, locationFilters));
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])


    return (
        <Box sx={{ width: '100%' }}>

            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{t("searchTab.availability")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="row d-flex justify-content-center">
                        <TextField
                            onChange={(e) => {
                                dispatch(setFilter({ filter: e.target.value }));
                                setSearchTerm(e.target.value);
                            }}
                            value={filter}
                            name="partNumber"
                            type="text"
                            label={t("searchTab.searchByPartNO")}
                        />
                    </div>
                    <Box sx={{ mb: 3 }} />

                    <Datatable
                        header={[
                            {
                                name: t("searchTab.partNo"),
                                attr: 'partNumber',
                            },
                            {
                                name: t("searchTab.brand"),
                                attr: 'brandName',
                            },
                            {
                                name: t("searchTab.companyName"),
                                isMapped: true,
                                mapIndex: 0,
                                mappedAttribute: themeDirection == 'ltr' ? 'name' : 'nameAr',
                                attr: 'companyId'
                            },
                            {
                                name: t("searchTab.averagePrice"),
                                attr: 'retailPrice'
                            }
                        ]}

                        actions={[
                            {
                                name: t("searchTab.details"),
                                action: showDetails,
                            }
                        ]}
                        datatable={productResult}
                        error={error}
                        onSelectedPage={changePagehandler}
                        page={page}
                        isLazy={true}
                        maps={[companies]}
                        size={searchSize}
                        rowsPerPage={rowsPerPage}

                    />

                </AccordionDetails>
            </Accordion>

            <Dialog
                onClose={() => dispatch(setSelectedPart({ selectedPart: null }))}
                aria-labelledby="customized-dialog-title"
                open={selectedPart != null}
                className={classes.root}
            >
                <DialogTitle>
                    <Typography variant="h6" component="div">
                        {t("searchTab.availabilityTitle")}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers sx={{ p: 2 }}>
                    <PartDetails />
                </DialogContent>
            </Dialog>

        </Box>
    );
}

export default AvailabilityPartsSection;
