import { Button, Center, FlexBox, Grid, H1, H4, H5, Padding, Page, Paragraph } from '@cd/shared-ui';
import Link from 'next/link';

function SignUpStart() {
    return (
        <Page>
            <Grid>
                <Padding>
                    <H1 className="text-center text-primary whitespace-pre-line font-display">
                        Welcome to Gras Cannabis
                    </H1>
                    <FlexBox>
                        <H4>Before you create an account,</H4>
                        <H4>
                            Please select an account. If you operate a dispensary and want to create a Dispensary
                            Account, please choose `Create A Dispensary Account`
                        </H4>
                    </FlexBox>

                    <Center>
                        <FlexBox>
                            <Center>
                                <H5>I'm here to shop for Cannabis Products</H5>
                                <Link href="/signup/create-account">
                                    <Button size="lg" bg="primary" transparent className="hover:bg-[#0b7529]">
                                        <Paragraph color="light">Create An Account</Paragraph>
                                    </Button>
                                </Link>
                            </Center>
                        </FlexBox>

                        <FlexBox>
                            <Center>
                                <H5>I'm here to create a Dispensary Account</H5>
                                <Link href="/signup/create-dispensary-account">
                                    <Button size="lg" bg="primary" transparent className="hover:bg-[#0b7529]">
                                        <Paragraph color="light">Create A Dispensary Account</Paragraph>
                                    </Button>
                                </Link>
                            </Center>
                        </FlexBox>
                    </Center>
                </Padding>
            </Grid>
        </Page>
    );
}

export default SignUpStart;
