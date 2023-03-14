import { LoginModal } from "@cd/shared-ui";
import { useEffect } from "react";
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
  useEffect(() => {console.log('ue render')})
  console.log('props', props)
  console.log('modal container: modalType: ', props.modalType)
  // console.log(props)
  // console.log('modal container: modalType: ', props.modalType)
  if (!props.modalType) return <></>;

  // const ModalComponent = useMemo(() => MODAL_COMPONENTS[modalType], [modalType]);
  // // return <ModalComponent {...props} />;
  // // return <LoginModal {...props} />
  return <div>modal container here modalType:{props.modalType}</div>
};

export { ModalContainer };
