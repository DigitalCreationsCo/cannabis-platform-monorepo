import { Page } from "@cd/ui-lib";
import CheckAge from "components/CheckAge";
import { useRouter } from "next/router";

function Welcome () {
    const router = useRouter()
    return (
    <Page>
        <CheckAge redirect={router.query.redirect as string} />
    </Page>
)}

export default Welcome