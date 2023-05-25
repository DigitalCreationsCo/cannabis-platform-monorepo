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
    formstep: number;
    // setFormStep: (step:number) => void;
    nextFormStep: () => void;
    prevFormStep: () => void;
    canProceed: boolean;
    setCanProceed: (canProceed:boolean) => void;
}

function useHashNavigate (): HashNavigate {

    const [cookies, setCookie, removeCookie] = useCookies(['form-step-proceed']);
    // const [canProceed, setProceed] = useState<boolean>(false);
    const [canProceed, setProceed] = useState<boolean>(cookies['form-step-proceed']);

    function setCanProceed (bool: boolean) {
        setProceed(bool)
        // setCookie('form-step-proceed', bool, { path: '/' })
    }
    
    // useEffect(() => {
    //     setCookie('form-step-proceed', JSON.stringify(canProceed))
    //     console.info('form-step-proceed cookie updated.', canProceed)
    // }, [canProceed])

    
    const [formstep, setFormstep] = useState(0);
    const nextFormStep = () => setFormstep(formstep + 1)
    const prevFormStep = () => setFormstep(formstep - 1);

    // const [hash, setHash] = useState<string>(`#step=${formstep + 1}`);
    
    const 
    hash = `#step=${formstep + 1}`;

    console.log('formStep: ', formstep)
    console.log('hash: ', hash)
    console.log('canProceed: ', canProceed)

    useEffect(() => {
        setCookie('form-step-proceed', JSON.stringify(canProceed))
        console.info('form-step-proceed cookie updated.', canProceed)

        window.addEventListener('hashchange', event => {
            if (canProceed) {
                console.log('can proceed')
            let step = window.location.hash.split('=')[1]
            setFormstep(Number(step) - 1)
            console.log('hashchange: ', event)
            }
        })
        
        if (window.location.hash !== hash) {
            window.location.assign(hash)

            // window.onpopstate = () => {
            //     // window.location.replace('#')
            //     // window.history.back()
            //     // prevFormStep()
            // }
        }
    }, [formstep, hash, canProceed])

    return {formstep, nextFormStep, prevFormStep, canProceed, setCanProceed }
}
// nextformstep increments the formstep

export { useHashNavigate };
