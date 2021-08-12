import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Breadcrumbs,
    Typography
} from '@material-ui/core';
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useTranslation } from 'react-i18next';
import CarItems from './CarItems';
import { disappearBreadcrumbs, handleBackAction } from 'src/redux/slices/catalog';
import GroupItems from './GroupItems';
import Part from './Part';
import CatalogHead from "./CatalogHead";
import BackBtn from "../../../components/Ui/BackBtn";
import Card from "../../../components/Ui/Card";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    carDetailssChild: {
        padding: '15px',
        background: theme.palette.grey[0],
    },
    backCont: {
        background: 'inherit',
        padding: '10px 15px',
        textAlign: 'right'
    },
}));

// ----------------------------------------------------------------------

function CarDetails() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { selectedCatalog, selectedCar, fromList, groups, part, groupsStack, backToCarInfo } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();

    return (
        <>
            {part != null || groups.length > 0 ? '' :
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    className="breadcrumb-custom"
                    style={{ marginBottom: '16px' }}
                >
                    <Link color="inherit"
                        style={{ cursor: 'pointer' }}
                        onClick={() => dispatch(disappearBreadcrumbs())}
                    >
                        {t("Catalog Search")}
                    </Link>
                    <Typography color="textPrimary">{t("Catalog Details")}</Typography>
                </Breadcrumbs>
            }
            {groups.length == 0 ?
                <CarItems /> :
                <Card cardBg='cardBg'>
                    <CatalogHead />
                    <Box className={classes.backCont}>
                        {part != null || groups.length > 0 ?
                            <BackBtn
                                variant='body2'
                                onClick={() => {
                                    dispatch(handleBackAction(part, selectedCatalog, selectedCar, fromList, groupsStack, backToCarInfo));
                                }}
                                name={t("Back")}
                            /> : ''
                        }
                    </Box>
                    <Box className={classes.carDetailssChild}>
                        {part == null ?
                            <GroupItems />
                            :
                            <Part />
                        }
                    </Box>
                </Card>
            }
        </>
    );
}

export default CarDetails;
