import { Card, Center, H1, H2, Page, Small } from "@cd/ui-lib";
import { twMerge } from "tailwind-merge";

function DriverTermsAndConditions () {
    return (
        <Page className={twMerge(styles.gradient, 'md:pt-16')}>
            <Center>
                <Card>
                    <H2 className="text-left">Gras</H2>
                    <H1 className="text-left">Driver Terms And Conditions</H1>
                    <Small className="text-justify">
                    Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. Insert terms and conditions here. 
                    </Small>
                </Card>
            </Center>
        </Page>
    );
}

export default DriverTermsAndConditions;

const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary'] };
