import { useCallback, useEffect, useState } from "react";

const useHash = () => {
    const [hash, setHash] = useState(() => window.location.hash);
    
    const hashChangeHandler = useCallback(() => {
        setHash(window.location.hash);
    }, []);
    
    useEffect(() => {
        window.addEventListener('hashchange', hashChangeHandler);
        return () => {
        window.removeEventListener('hashchange', hashChangeHandler);
        };
    }, []);
    
    const updateHash = useCallback(
        (newHash:string) => {
        if (newHash !== hash) window.location.hash = newHash;
        },
        [hash]
    );
    
    return [hash, updateHash];
};
    

type HashNavigate = {
    formStep: number;
    // setFormStep: (step:number) => void;
    nextFormStep: () => void;
    prevFormStep: () => void;
}

function useHashNavigate (): HashNavigate {

    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep(formStep + 1)
    const prevFormStep = () => setFormStep(formStep - 1);

    const hash = `#step=${formStep}`

    useEffect(() => {

        console.log('window hash: ', window.location.hash)
        if (window.location.hash !== hash) {
            
            window.location.assign(hash)

            window.onpopstate = () => {
                // window.location.replace('#')
                // window.history.back()
                // prevFormStep()
            }
        }
        window.addEventListener('hashchange', event => {
            console.log('hashchange: ', event)
        })
        
    }, [hash])

    return {formStep, nextFormStep, prevFormStep }
}

export { useHash, useHashNavigate };
