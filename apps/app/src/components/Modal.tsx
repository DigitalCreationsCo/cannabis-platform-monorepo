import React, { useState, useEffect, PropsWithChildren, useRef } from "react";
import { Button, H5, Paragraph, Span } from "@cd/shared-ui";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";

type ModalProps = {
    id: string;
    open: boolean;
    setModal: Function;
    handleConfirm: Function;
}
function Modal({ id, open, setModal, handleConfirm, children }: ModalProps & PropsWithChildren) {
    const [ isBrowser, setIsBrowser ] = useState(false)
    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const ref = useRef(null)
//     useOnClickOutside(ref, () => {
//     if (!disableClickOutside) {
//       onClose();
//     }
//   });
    const modalClass = twMerge("modal modal-bottom sm:modal-middle", open && "modal-open");

    if (isBrowser) {
    return ReactDOM.createPortal(
        <div className={modalClass}>
        <div className="modal-box" ref={ref}>
            {children}
        </div>
        </div>
        ,
        document.getElementById("modal-root") as Element
    );
    } else {
        return null;
    }
}

export default Modal;