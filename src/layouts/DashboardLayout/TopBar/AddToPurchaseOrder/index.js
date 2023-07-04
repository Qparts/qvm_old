import { useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Typography } from '@material-ui/core';
import { MIconButton } from 'src/theme';
import SendPurchaseOrderSection from './SendPurchaseOrderSection'
import { OrdersArrow } from 'src/icons/icons';
import CustomDialog from 'src/components/Ui/Dialog';

// ----------------------------------------------------------------------

function AddToPurchaseOrder() {
  const anchorRef = useRef(null);
  const [openSendPO, setOpenSendPO] = useState(false);
  const { t } = useTranslation();
  const { orders } = useSelector((state) => state.PartSearch);

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={() => setOpenSendPO(true)}
        color={openSendPO ? 'primary' : 'default'}
      >
        <Badge badgeContent={orders.length > 0 ? orders.length : null} color="error">
          <OrdersArrow width='24' height='24' fill='#7E8D99' fillArr='#F20505' />
        </Badge>
      </MIconButton>

      <CustomDialog
        fullWidth={true}
        open={openSendPO}
        handleClose={() => setOpenSendPO(false)}
        title={t("Send PO")}>
        {orders.length > 0 ?
          <SendPurchaseOrderSection setOpenSendPO={setOpenSendPO} />
          : <Typography variant="subtitle1"> {t("You have no orders yet")} </Typography>
        }
      </CustomDialog>
    </>
  );
}

export default AddToPurchaseOrder;
