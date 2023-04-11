import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const ModalContext = React.createContext(null);
const ModalProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = React.useState(null);
    const context = React.useMemo(() => ({ modalOpen, setModalOpen }), [modalOpen, setModalOpen]);
    return _jsx(ModalContext.Provider, { value: context, children: children });
};
// allows the app to know the open state of any modal
const useModal = () => React.useContext(ModalContext);
export { useModal, ModalProvider };
//# sourceMappingURL=ModalProvider.js.map