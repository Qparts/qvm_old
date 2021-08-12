import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import Datatable from 'src/components/table/DataTable';
import { loadBranches } from 'src/redux/slices/branches';
import constants from 'src/utils/constants';
import BrancheActionsSection from './BrancheActionsSection';
import TableAction from '../../../../components/Ui/TableAction';
import { Delete, Edit } from "../../../../icons/icons";

// ----------------------------------------------------------------------

function BrancheItemsSection() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const { branches } = useSelector((state) => state.branches);
    const { countries } = useSelector((state) => state.authJwt);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(constants.MAX);

    useEffect(() => {
        dispatch(loadBranches(countries));
    }, []);

    const showDetailsElement = (item) => {
        return (
            <TableAction
                type='setting'
                title={t("Edit")}
                titleDel={t("Delete")}
                textIcon={<Edit width='14' height='14' fill='#CCD3D7' />}
                textIconDel={<Delete width='13' height='16' fill='#CCD3D7' />}
            />
        )
    }

    return (
        <Box sx={{ padding: branches.length > constants.MAX ? '10px 15px' : '10px 15px 0' }}>
            <BrancheActionsSection />
            <Datatable
                header={[
                    {
                        name: t("Name"),
                        attr: themeDirection == 'ltr' ? 'branchName' : 'branchNameAr',
                    },
                    {
                        name: t("Country"),
                        attr: themeDirection == 'ltr' ? 'countryName' : 'countryNameAr',
                    },
                    {
                        name: t("Region"),
                        attr: themeDirection == 'ltr' ? 'regionName' : 'regionNameAr',
                    },
                    {
                        name: t("City"),
                        attr: themeDirection == 'ltr' ? 'cityName' : 'cityNameAr',
                    }
                ]}
                actions={[{ element: showDetailsElement }]}
                datatable={branches}
                page={page}
                isLazy={false}
                rowsPerPage={rowsPerPage}
                hasPagination={branches.length > constants.MAX ? true : false}
            />
        </Box>
    );
}

export default BrancheItemsSection;
