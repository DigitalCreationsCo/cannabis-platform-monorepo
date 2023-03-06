import React, { PropsWithChildren } from 'react';
const ModalContext = React.createContext(null);

const ModalProvider = ({ children }: PropsWithChildren) => {
    const [modalOpen, setModalOpen] = React.useState(null);

    const context = React.useMemo(() => ({ modalOpen, setModalOpen }), [modalOpen, setModalOpen]);
    return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
};

// allows the app to know the open state of any modal
const useModal = () => React.useContext(ModalContext);

export { useModal, ModalProvider };
