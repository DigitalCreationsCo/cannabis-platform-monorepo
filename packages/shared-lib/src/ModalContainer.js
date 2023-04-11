import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { LoginModal } from "@cd/shared-ui";
import { useMemo } from "react";
// import ConfirmModal from "./ConfirmModal";
// import MessageBanner from "./MessageBanner";
// import MessageModal from "./MessageModal";
// import SelectModal from "./SelectModal";
// import TipModal from "./TipModal";
const MODAL_COMPONENTS = Object.freeze({
    //   SHOW_MODAL: MessageModal,
    //   CONFIRM_MODAL: ConfirmModal,
    //   SELECT_MODAL: SelectModal,
    //   TIP_MODAL: TipModal,
    //   MESSAGE_BANNER: MessageBanner,
    LOGIN_MODAL: LoginModal
});
const ModalContainer = (props) => {
    const ModalComponent = useMemo(() => MODAL_COMPONENTS[props.modalType], [props.modalType]);
    if (!props.modalType && !props.modalVisible)
        return _jsx(_Fragment, {});
    return _jsx(ModalComponent, { ...props });
    // return <LoginModal {...props} />
    // return <div>modal container here modalType:{props.modalType}</div>
};
export { ModalContainer };
//# sourceMappingURL=ModalContainer.js.map