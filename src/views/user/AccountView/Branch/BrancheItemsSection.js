import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Datatable from 'src/components/table/DataTable';
import 'react-slideshow-image/dist/styles.css'
import { loadBranches } from 'src/redux/slices/branches';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "src/components/button/CustomButton";

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

    const noChildComponent = () => {
        return (
            <div className="text-center py-4">
                <PersonAddIcon fontSize="large" color="disabled" />
                <h6 className="pt-2">
                    you didn't add users to this branch yet
                </h6>


                <Button
                    className="round"
                    color="primary"
                    className="mx-2"
                    round
                >
                    Add User
                </Button>
            </div>
        )
    }

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

                childData="users"
                childHeader={[
                    {
                        name: t("Name"),
                        attr: 'name',
                    },
                    {
                        name: t("Phone"),
                        attr: 'mobile',
                    },
                    {
                        name: t("Email"),
                        attr: 'email',

                    }]}
                hasChild={true}
                datatable={branches}
                showChildNumbers={true}
                noChildComponent = {noChildComponent}
                childTitle="Users"
                page={page}
                isLazy={false}
            />



        </Box >

    );
}

export default BrancheItemsSection;
