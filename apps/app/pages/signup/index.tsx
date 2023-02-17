import { Button, FlexBox, Grid, H1, H4, H5, Page, Paragraph } from '@cd/shared-ui';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

function SignUpStart() {
    // const [loadingButton, setLoadingButton] = useState(false);
    // const [passwordVisibility, setPasswordVisibility] = useState(false);

    // const togglePasswordVisibility = useCallback(() => {
    //     setPasswordVisibility((visible) => !visible);
    // }, []);
    return (
        <Page className="h-screen">
            <Grid className="space-y-6 py-16 content-center">
                <H1 className="text-center text-primary whitespace-pre-line font-display">Welcome to Gras Cannabis</H1>
                <FlexBox className="w-4/5 justify-center flex-col items-start place-self-center space-x-0">
                    <H4>Before you create an account,</H4>
                    <H4 className="whitespace-pre-wrap">
                        Please select an account. If you operate a dispensary and want to create a Dispensary Account,
                        please choose `Create A Dispensary Account`
                    </H4>
                </FlexBox>
                <FlexBox
                    className={twMerge(
                        'flex-col md:!flex-row space-x-0 justify-center md:space-x-16 space-y-6 md:space-y-0'
                    )}
                >
                    <FlexBox className="flex-col">
                        <H5>I'm here to shop for Cannabis Products</H5>
                        <Link href="/signup/create-account">
                            <Button className="w-[200px] h-[80px] bg-primary hover:bg-[#0b7529] opacity-90 transition ease-in-out duration-300">
                                <Paragraph className="whitespace-pre-line">Create An Account</Paragraph>
                            </Button>
                        </Link>
                    </FlexBox>

                    <FlexBox className="flex-col">
                        <H5>I'm here to create a Dispensary Account</H5>
                        <Link href="/signup/create-dispensary-account">
                            <Button className="w-[200px] h-[80px] bg-primary hover:bg-[#0b7529] opacity-90 transition ease-in-out duration-300">
                                <Paragraph className="whitespace-pre-line">Create A Dispensary Account</Paragraph>
                            </Button>
                        </Link>
                    </FlexBox>
                </FlexBox>
            </Grid>
        </Page>
    );
}

export default SignUpStart;
