import React, { useState } from "react";
import Modal from "./Modal";

type ConfirmationAlertProps = {
    modalId: string;
    description?: string;
    handleConfirm: () => void;
};

function ConfirmationAlert({
    modalId,
    handleConfirm,
    description = "Confirm?",
}: ConfirmationAlertProps) {
    const [showModal, setModal] = useState(false)
    return (
        <Modal
            id={ modalId }
            showModal={ showModal }
            setModal={ setModal }
            handleConfirm={handleConfirm}
        >
            {description}
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
};

export default ConfirmationAlert;
