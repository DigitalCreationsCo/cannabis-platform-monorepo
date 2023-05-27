import { modalActions, modalTypes, selectIsAddressAdded, selectUserState } from '@cd/core-lib';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import Center from '../atomic/Center';
import Button from '../button/Button';
import FlexBox from '../FlexBox';
import { H4, Paragraph } from '../Typography';
import Modal from './Modal';

interface CheckoutModalProps {
    dispatchCloseModal: () => void;
    modalVisible: boolean;
}

function CheckoutModal({ dispatchCloseModal, modalVisible, ...props }: CheckoutModalProps) {
    const dispatch = useDispatch();

    const user = useSelector(selectUserState)
    const isAddressAdded = useSelector(selectIsAddressAdded)
    
    const closeModalAndReset = () => {
        dispatchCloseModal();
    };

    function completeSignUp() {
        closeModalAndReset()
        // this branch will likely never happen, 
        // because automatic redirect for new users is handled in the signin flow.
        
        // Router.push("/signup/continue");
    }

    return (
        <Modal
        disableClickOutside
        className={twMerge(styles.responsive, 'flex flex-col')} 
        modalVisible={modalVisible} 
        onClose={dispatchCloseModal} 
        {...props}>
            <Center className='space-y-8 w-3/4 m-auto pb-8'>
            <H4>It looks like you haven't ordered with us before.</H4>
            
            {!user.isSignedIn && <><Paragraph>
                We'll need your contact info and address so our delivery person can get to you.{'\n'}
                Sign In with your account</Paragraph>
                <FlexBox className='space-y-8'>
                    <Button
                        className="place-self-center"
                        onPress={openLoginModal}>
                        Sign In</Button>
                </FlexBox></>
            }

            {user.isSignedIn && !isAddressAdded && <><Paragraph>
                We'll need your contact info and address so our delivery person can get to you.{'\n'}
                Hit <b>Next</b> to provide your info.</Paragraph>
                <FlexBox className='space-y-8'>
                    <Button
                    onPress={completeSignUp}
                    className="place-self-center">
                    Next</Button>
                </FlexBox></>
            }
            </Center>
        </Modal>
    );
    
    function openLoginModal() {
        dispatch(
            modalActions.openModal({
                modalType: modalTypes.loginModal
            })
        );
    }
}

export default CheckoutModal;

const styles = {
    responsive: 'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8'
};
