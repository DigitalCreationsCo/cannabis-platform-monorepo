// import { ModalContainer } from '@cd/shared-lib';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';

const ModalContainer = (props) => {
    const { modalType } = props;
    console.log('modal container: props', props);

    if (!modalType) return <></>;

    return <div>modal is {props.modalVisible ? 'open' : 'closed'}</div>;
};
// const mapDispatchToProps = { dispatchCloseModal: modalActions.closeModal };
export default connect((state: RootState) => state.modal)(ModalContainer);
