import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Datatable from 'src/components/table/DataTable';
import 'react-slideshow-image/dist/styles.css'
import { loadBranches } from 'src/redux/slices/branches';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function BrancheItemsSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const { branches } = useSelector((state) => state.branches);
    const { countries } = useSelector(
        (state) => state.authJwt
    );
    const [page, setPage] = useState(0);
    // const [branches, setBranches] = useState([]);


    useEffect(() => {
        dispatch(loadBranches(countries));
    }, [])


    return (

        <Box sx={{ width: '100%' }}>


            <Datatable
                header={[
                    {
                        name: t("setting.name"),
                        attr: themeDirection == 'ltr' ? 'branchName' : 'branchNameAr',
                    },
                    {
                        name: t("setting.country"),
                        attr: themeDirection == 'ltr' ? 'countryName' : 'countryNameAr',
                    },
                    {
                        name: t("setting.region"),
                        attr: themeDirection == 'ltr' ? 'regionName' : 'regionNameAr',
                    },
                    {
                        name: t("setting.city"),
                        attr: themeDirection == 'ltr' ? 'cityName' : 'cityNameAr',

                    }

                ]}

                hasChild={false}
                datatable={branches}
                page={page}
                isLazy={false}
            />



        </Box >

    );
}

export default BrancheItemsSection;
