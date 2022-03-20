import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Datatable from 'src/components/table/DataTable';
import { loadBranches } from 'src/redux/slices/branches';
import constants from 'src/utils/constants';
import settingService from "src/services/settingService";
import { PATH_APP } from 'src/routes/paths';
import TableAction from '../../../../components/Ui/TableAction';
import { Edit } from "../../../../icons/icons";
import { refreshToken } from 'src/redux/slices/authJwt';

// ----------------------------------------------------------------------

function BrancheItemsSection({ openAddBranchModel, branchesNum }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const { themeDirection } = useSelector((state) => state.settings);
    const { branches } = useSelector((state) => state.branches);
    const { countries, loginObject } = useSelector((state) => state.authJwt);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(constants.MAX);

    useEffect(() => {
        dispatch(loadBranches(countries));
    }, []);

    const activateBranch = async (item) => {
        try {
            if (branchesNum > 0) {
                await settingService.updateActivateBranch({ branchId: item.id })
                await dispatch(refreshToken());
                window.location = PATH_APP.management.user.account;
                enqueueSnackbar(t('Success'), { variant: 'success' });
            } else {
                return openAddBranchModel()
            }
        } catch (error) {
            enqueueSnackbar(error.response.data ? t(error.response.data) : error.response.status, { variant: 'error' });
        }
    };

    const activateBranchBtn = (item) => {
        const data = JSON.parse(item);
        const findBranch = loginObject?.company.branches.find(b => b.id === data.id);
        if (findBranch?.active === false) {
            return <TableAction
                type='partSearch'
                title={t("Activation")}
                onClick={() => activateBranch(data)}
                textIcon={<Edit width='14' height='14' fill='#CED5D8' />} />
        }
    }

    return (
        <Box sx={{ padding: branches.length > constants.MAX ? '10px 15px' : '10px 15px 0' }}>

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
                actions={[{ element: activateBranchBtn }]}
                datatable={branches}
                page={page}
                isLazy={false}
                rowsPerPage={rowsPerPage}
                hasPagination={branches.length > constants.MAX ? true : false}
                dataTableSetting='dataTableSetting'
            />
        </Box>
    );
}

export default BrancheItemsSection;
