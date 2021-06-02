import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
    Box,
    Breadcrumbs,
    Typography
} from '@material-ui/core';
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useTranslation } from 'react-i18next';
import CarFilter from './CarFilter';
import CarItems from './CarItems';
import { disappearBreadcrumbs, handleBackAction } from 'src/redux/slices/catalog';
import GroupItems from './GroupItems';
import Button from "./../../../components/button/CustomButton";
import Part from './Part';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {}
}));

// ----------------------------------------------------------------------

function CarDetails() {
    const dispatch = useDispatch();
    const { selectedCatalog, selectedCar, fromList, groups, part, groupsStack, backToCarInfo } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            {part != null || groups.length > 0 ?
                <div className="pb-3">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            dispatch(handleBackAction(part, selectedCatalog, selectedCar, fromList, groupsStack, backToCarInfo));
                        }}
                    >
                        {t("common.back")}
                    </Button>
                </div>

                :

                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    className="breadcrumb-custom"
                >
                    <Link color="inherit"
                        onClick={() => dispatch(disappearBreadcrumbs())}
                    >
                        {t("Catalog Search")}
                    </Link>
                    <Typography color="textPrimary">{t("Catalog Details")}</Typography>
                </Breadcrumbs>
            }

            <Grid item xs={12} md={12} lg={12}>
                {groups.length == 0 ?
                    <div style={{ width: '98%' }}>
                        {fromList && <CarFilter />}
                        <Box sx={{ mt: 3 }} />
                        <CarItems />
                    </div> :
                    <>
                        {part == null ?
                            <GroupItems />
                            :
                            <Part />
                        }
                    </>
                }
            </Grid>
        </Grid>
    );
}

export default CarDetails;
