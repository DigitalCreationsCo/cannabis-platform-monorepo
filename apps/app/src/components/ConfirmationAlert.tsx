import { Button, FlexBox, TextField } from '@cd/shared-ui';
import React, { PropsWithChildren, ReactNode } from 'react';
import Modal, { ModalProps } from './Modal';

interface ConfirmationAlertProps extends ModalProps {
    confirmMessage?: string;
    handleConfirm: () => void;
    children?: ReactNode;
}

function ConfirmationAlert({
    description = 'Confirm?',
    confirmMessage = 'Yes',
    handleConfirm,
    children,
    ...props
}: ConfirmationAlertProps) {
    return (
        <Modal {...props} className="text-center" description={description}>
            <FlexBox className="flex-col space-y-4">
                {children}
                <FlexBox className="justify-center">
                    <Button className="" onClick={props.onClose}>
                        No
                    </Button>
                    <Button className="" onClick={handleConfirm}>
                        {confirmMessage}
                    </Button>
                </FlexBox>
            </FlexBox>
        </Modal>
        // <Dialog
        //   open={open}
        //   onClose={close}
        //   sx={{
        //     "& .MuiPaper-root": {
        //       borderRadius: "4px",
        //       minWidth: { md: 400, xs: "100%" },
        //     },
        //     "& .MuiDialogTitle-root": {
        //       pb: 0,
        //       fontSize: 28,
        //       fontWeight: 700,
        //       textAlign: "center",
        //     },
        //     "& .MuiDialogContent-root": {
        //       textAlign: "center",
        //     },
        //     "& .MuiDialogActions-root": {
        //       pb: 4,
        //       justifyContent: "center",
        //       "& button": { padding: "7px 28px" },
        //     },
        //   }}
        // >
        //   <DialogTitle>Are you sure?</DialogTitle>

        //   <DialogContent>{description}</DialogContent>

        //   <DialogActions>
        //     <Button onClick={close} variant="outlined">
        //       No
        //     </Button>
        //     <Button onClick={handleConfirm} variant="contained" color="primary">
        //       Yes
        //     </Button>
        //   </DialogActions>
        // </Dialog>
    );
}

export default ConfirmationAlert;
