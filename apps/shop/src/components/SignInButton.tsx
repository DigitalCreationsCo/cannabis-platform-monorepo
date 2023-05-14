import { modalActions } from "@cd/core-lib/src/reduxDir";
import { modalTypes } from "@cd/core-lib/src/utils";
import { Button } from "@cd/ui-lib";
import { ButtonProps } from "@cd/ui-lib/components/Button";
import { useAppDispatch } from "redux/hooks";

interface SignInButtonProps extends ButtonProps {}

function SignInButton(props: SignInButtonProps) {

    const dispatch = useAppDispatch();
    function openLoginModal() {
        dispatch(
            modalActions.openModal({
                modalType: modalTypes.loginModal
            })
        );
    }

    return (
        <Button
        { ...props }
        className="place-self-center mb-4"
        onClick={openLoginModal}>
        Sign In</Button>
    );
}

export default SignInButton;