import { H2 } from "@cd/ui-lib";
import { Page } from "@cd/ui-lib/components";
import { ConfirmOrder } from "components";

function Checkout() {
    return (
        <Page className="items-center">
            <H2>Checkout</H2>
            <ConfirmOrder />
        </Page>
    );
}

export default Checkout;