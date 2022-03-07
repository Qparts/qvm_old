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

function UsersItemsSection({ openAddUserModel, usersNum }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const { countries, loginObject } = useSelector((state) => state.authJwt);
    const users = loginObject.company.subscribers;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(constants.MAX);

    useEffect(() => {
        dispatch(loadBranches(countries));
    }, []);

    const activateUser = async (item) => {
        try {
            if (usersNum > 0) {
                await settingService.updateActivateUser({ userId: item.id })
                await dispatch(refreshToken());
                window.location = PATH_APP.management.user.account;
                enqueueSnackbar(t('Request has been uploaded'), { variant: 'success' });
            } else {
                return openAddUserModel()
            }
        } catch (error) {
            enqueueSnackbar(error.response.data ? t(error.response.data) : error.response.status, { variant: 'error' });
        }
    };

    const activateUserBtn = (item) => {
        const data = JSON.parse(item);
        const defaultBranchValue = data.defaultBranch === null ?
            loginObject.company.defaultBranchId : data.defaultBranch
        const branchesStatus = loginObject?.company.branches.find(b => b.id === defaultBranchValue);
        if (data.active === false) {
            return <TableAction
                type='partSearch'
                title={t("Activation")}
                onClick={() => activateUser(data)}
                textIcon={<Edit width='14' height='14' fill='#CED5D8' />}
                disableTableAction={branchesStatus?.active === false && 'disableTableAction'} />
        }
    }

    return (
        <Box sx={{ padding: users.length > constants.MAX ? '10px 15px' : '10px 15px 0' }}>

            <Datatable
                header={[
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

                    },
                ]}
                actions={[{ element: activateUserBtn }]}
                datatable={users}
                page={page}
                isLazy={false}
                rowsPerPage={rowsPerPage}
                hasPagination={users.length > constants.MAX ? true : false}
                dataTableSetting='dataTableSetting'
            />
        </Box>
    );
}

export default UsersItemsSection;
