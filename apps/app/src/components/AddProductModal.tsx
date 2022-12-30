import React from "react";
import Modal, { ModalProps } from "./Modal";

// type AddProductProps = {
//     open: any;
//     setOpen: any;
//     modalId: string;
//     description?: string;
//     handleConfirm?: () => void;
// };

function AddProduct({ children, ...props }: ModalProps) {
    return (
        <Modal { ...props }>
            { children }
        </Modal>
  );
};

export default AddProduct;
