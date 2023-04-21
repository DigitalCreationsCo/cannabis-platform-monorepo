import { Button, Center, CheckBox, FlexBox, H1, H3 } from "@cd/ui-lib"
import { useRouter } from "next/router"
import { useState } from "react"
import { useCookies } from "react-cookie"

const CheckAge = ({ redirect }: { redirect?: string }) => {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['yesOver21'])

    const [yesOver21, setYesOver21] = useState(false)
    const toggleOver21 = () => setYesOver21(!yesOver21)
    
    const confirmAgeOver21 = () => {
        setCookie('yesOver21', 'true')  
        router.push({ pathname: redirect }) // navigates back to the previous page, or the home page if there is no redirect URL
    }

    return (
    <Center>
        <H1>Welcome to Gras</H1>
        <H3>
            first thing first,
            Are you 21 years or older?
            </H3>
            
        <FlexBox className="p-4 space-x-4 space-y-4">

            <CheckBox onChange={toggleOver21} checked={yesOver21} LabelComponent={H3} label="I'm over 21" />

            <Button size="lg"
            onClick={confirmAgeOver21}>
                Continue</Button>
        </FlexBox>
    </Center>
)}

export default CheckAge