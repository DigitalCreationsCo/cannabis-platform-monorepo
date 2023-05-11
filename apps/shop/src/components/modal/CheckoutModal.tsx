import { modalActions, modalTypes, selectIsAddressAdded, selectUserState } from '@cd/core-lib';
import { Button, Center, FlexBox, H4, Modal, Paragraph } from '@cd/ui-lib';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { useAppDispatch } from '../../redux/hooks';

interface CheckoutModalProps {
    dispatchCloseModal: () => void;
    modalVisible: boolean;
}

function CheckoutModal({ dispatchCloseModal, modalVisible, ...props }: CheckoutModalProps) {
    const dispatch = useAppDispatch();

    const user = useSelector(selectUserState)
    const isAddressAdded = useSelector(selectIsAddressAdded)
    
    const closeModalAndReset = () => {
        dispatchCloseModal();
    };

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
                    <b>Sign In</b> with your account</Paragraph>
                    <FlexBox className='space-y-8'>
                        <Button
                            className="place-self-center"
                            onClick={openLoginModal}>
                            Sign In</Button>
                    </FlexBox></>
                }

                {user.isSignedIn && <><Paragraph>
                    We'll need your contact info and address so our delivery person can get to you.{'\n'}
                    Hit <b>Next</b> to provide your info.</Paragraph>
                    <FlexBox className='space-y-8'>
                    <Link href="/signup/create-account">
                        <Button
                            className="place-self-center">
                            Next</Button>
                            </Link>
                    </FlexBox></>
                }

            {/* <Paragraph>
                We'll need your contact info and address so our delivery person can get to you.{'\n'}
                <b>Sign In</b> with your account, or <b>Sign up</b> to provide your info.</Paragraph>
                <FlexBox className='space-y-8'>
                    <Button
                    <FlexBox className="items-center">
                        <Link href="/signup/create-account">
                        <Paragraph>{`Don't have account?`} </Paragraph>
                            <div onClick={closeModalAndReset}>
                            <H6>Sign Up</H6>
                            </div>
                        </Link>
                    </FlexBox> */}
                {/* </FlexBox> */}
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
