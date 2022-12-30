//Modal.tsx
import React, { useRef } from "react";
// import { useOnClickOutside } from "usehooks-ts";
import { twMerge } from "tailwind-merge";
import { Paragraph } from "@cd/shared-ui";

export type ModalProps = {
    children: React.ReactNode;
    open: boolean;
    onClose(): void;
    className?: string;
    description: string;
    disableClickOutside?: boolean;
};

const Modal = ({ children, open, disableClickOutside, onClose, description, className }: ModalProps) => {
  const ref = useRef(null);
//   useOnClickOutside(ref, () => {
//     if (!disableClickOutside) {
//       onClose();
//     }
//   });

  const modalClass = ["absolute h-[200px] bg-light border modal modal-bottom sm:modal-middle", open && "modal-open"]
  return (
    <div className={twMerge(modalClass, className)}>
        <div className="modal-box" ref={ ref }>
            <Paragraph>{ description }</Paragraph>
            {children}
        </div>
    </div>
  );
};

export default Modal;