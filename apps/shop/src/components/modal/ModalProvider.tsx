import { modalActions, ModalContainer } from '@cd/shared-lib';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';

const mapModalStateToProps = (state: RootState) => state.modal;
const mapDispatchToProps = { dispatchCloseModal: modalActions.closeModal };
export default connect(mapModalStateToProps, mapDispatchToProps)(ModalContainer);
