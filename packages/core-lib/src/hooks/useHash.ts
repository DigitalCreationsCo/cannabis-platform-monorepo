import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

// const useHash = () => {
//     const [hash, setHash] = useState(() => window.location.hash);
    
//     const hashChangeHandler = useCallback(() => {
//         setHash(window.location.hash);
//     }, []);
    
//     useEffect(() => {
//         window.addEventListener('hashchange', hashChangeHandler);
//         return () => {
//         window.removeEventListener('hashchange', hashChangeHandler);
//         };
//     }, []);
    
//     const updateHash = useCallback(
//         (newHash:string) => {
//         if (newHash !== hash) window.location.hash = newHash;
//         },
//         [hash]
//     );
    
//     return [hash, updateHash];
// };
    

type HashNavigate = {
    formStep: number;
    // setFormStep: (step:number) => void;
    nextFormStep: () => void;
    prevFormStep: () => void;
    canProceed: boolean;
    setCanProceed: (canProceed:boolean) => void;
}

function useHashNavigate (): HashNavigate {

    const [cookies, setCookie, removeCookie] = useCookies(['form-step-proceed']);

    const [canProceed, setProceed] = useState<boolean>(false);
    
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep(formStep + 1)
    const prevFormStep = () => setFormStep(formStep - 1);

    const hash = `#step=${formStep + 1}`

    useEffect(() => {

        if (window.location.hash !== hash) {
            
            window.location.assign(hash)

            window.onpopstate = () => {
                // window.location.replace('#')
                // window.history.back()
                // prevFormStep()
            }
        }
        window.addEventListener('hashchange', event => {
            if (canProceed) {
            let step = window.location.hash.split('=')[1]
            setFormStep(Number(step) - 1)
            console.log('hashchange: ', event)
            }
        })
        
    }, [hash])

    function setCanProceed (bool: boolean) {
        setProceed(bool)
        // setCookie('form-step-proceed', bool, { path: '/' })
    }

    useEffect(() => {
        setCookie('form-step-proceed', JSON.stringify(canProceed))
        console.info('form-step-proceed cookie set.')
    }, [canProceed])

    return {formStep, nextFormStep, prevFormStep, canProceed, setCanProceed }
}

export { useHashNavigate };
