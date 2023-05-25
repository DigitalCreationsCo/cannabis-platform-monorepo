import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

type HashNavigateProps = {
    formstep: number;
    nextFormStep: () => void;
    prevFormStep: () => void;
    canProceed: boolean;
    setCanProceed: (canProceed:boolean) => void;
}

function useHashNavigate (): HashNavigateProps {

    const [cookies, setCookie, removeCookie] = useCookies(['form-step-proceed']);
    const [canProceed, setProceed] = useState<boolean>(cookies['form-step-proceed']);
    const [formstep, setFormstep] = useState<number>((Number(window.location.hash.split('=')[1]) - 1 ) || 0);
    const nextFormStep = () => setFormstep(formstep + 1)
    const prevFormStep = () => setFormstep(formstep - 1);

    const hash = `#step=${formstep + 1}`;

    useEffect(() => {
        setCookie('form-step-proceed', JSON.stringify(canProceed))
        window.addEventListener(
            'hashchange', event => {
                if (canProceed) {
                let step = window.location.hash.split('=')[1]
                setFormstep(Number(step) - 1)
                }
        })
        window.location.assign(hash)
        
    }, [formstep, hash, canProceed])
    
    function setCanProceed (bool: boolean) {
        setProceed(bool)
    }

    return {formstep, nextFormStep, prevFormStep, canProceed, setCanProceed }
}

export { useHashNavigate };
