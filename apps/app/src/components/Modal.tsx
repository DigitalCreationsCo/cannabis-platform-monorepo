import React, { useState, useEffect, PropsWithChildren } from "react";
import { Button, H5, Paragraph, Span } from "@cd/shared-ui";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";

type ModalProps = {
    id: string;
    showModal: boolean;
    setModal: Function;
    handleConfirm: Function;
}
function Modal({ id, showModal, setModal, handleConfirm, children }: ModalProps & PropsWithChildren) {

    const [ isBrowser, setIsBrowser ] = useState(false)

    useEffect(() => {
      setIsBrowser(true);
    }, []);

    if (isBrowser) {
        const modalButton = document.querySelectorAll(`[data-modal-target=${id}]`)
        for (let i = 0; i < modalButton.length; i++) {
            modalButton[i].addEventListener('click', function(event){
                event.preventDefault()
                setModal(true)
            })
        }
        
        const backdrop = document.querySelectorAll(`.backdrop`)
        for (let i = 0; i < backdrop.length; i++) {
            backdrop[i].addEventListener('click', setModal(false))
        }
        
        const closeModal = document.querySelectorAll('.modal-close')
        for (let i = 0; i < closeModal.length; i++) {
            closeModal[i].addEventListener('click', setModal(false))
        }
        
        document.onkeydown = function(e) {
        e = e || window.event
        var isEscape = false
        if ("key" in e) {
            isEscape = (e.key === "Escape" || e.key === "Esc")
        } else {
            isEscape = (e.keyCode === 27)
        }
        if (isEscape) {
            setModal(false)
        }
        };

        
        return ReactDOM.createPortal(
            // <dialog data-modal={ id } className={ "border" } open={showModal}>{children}</dialog>,
            <dialog data-modal={ id } tabIndex={ -1 } aria-hidden="true" className={"fixed top-0 z-50 md:inset-0 w-full md:h-full" } open={showModal}>
                <div className="m-auto relative w-full h-full max-w-2xl md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-default-soft rounded-btn shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <H5 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                            </H5>
                            <Button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle={id}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <Span className="sr-only">Close modal</Span>
                            </Button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-6 space-y-6">
                            <Paragraph className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                            </Paragraph>
                            <Paragraph className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </Paragraph>
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <Button data-modal-toggle={id} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</Button>
                            <Button data-modal-toggle={id} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</Button>
                        </div>
                    </div>
                </div>
            </dialog>
            ,
            // for multiple modals, can create a subnode, or use an existing node
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
}

export default Modal;