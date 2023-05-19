import { FormCard, LayoutContextProps, Page } from '@cd/ui-lib';
import ProvideStripeAccountId from 'components/form/ProvideStripeAccountId';
import Head from 'next/head';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
    DispensaryCreate,
    DispensaryReview,
    DispensarySignUpComplete,
    DispensaryUserCreate,
    ProvideDispensaryKey
} from '../../components';

type HashNavigate = {
    formStep: number;
    // setFormStep: (step:number) => void;
    nextFormStep: () => void;
    prevFormStep: () => void;
}

type FormStepComponentProps = { 
    nextFormStep: () => void; 
    prevFormStep: () => void; 
}

// const useHash = () => {
//     const [hash, setHash] = useState(() => window.location.hash);
  
//     const hashChangeHandler = useCallback(() => {
//       setHash(window.location.hash);
//     }, []);
  
//     useEffect(() => {
//       window.addEventListener('hashchange', hashChangeHandler);
//       return () => {
//         window.removeEventListener('hashchange', hashChangeHandler);
//       };
//     }, []);
  
//     const updateHash = useCallback(
//       (newHash:string) => {
//         if (newHash !== hash) window.location.hash = newHash;
//       },
//       [hash]
//     );
  
//     return [hash, updateHash];
//   };

// function useHashNavigate (): HashNavigate {

//     const [formStep, setFormStep] = useState(0);
//     const nextFormStep = () => setFormStep(formStep + 1)
//     const prevFormStep = () => setFormStep(formStep - 1);

//     const hash = `#step=${formStep}`

//     useEffect(() => {

//         console.log('window hash: ', window.location.hash)
//         if (window.location.hash !== hash) {
            
//             window.location.assign(hash)

//             window.onpopstate = () => {
//                 // window.location.replace('#')
//                 // window.history.back()
//                 // prevFormStep()
//             }
//         }
//         window.addEventListener('hashchange', event => {
//             console.log('hashchange: ', event)
//         })
        
//     }, [hash])

//     return {formStep, nextFormStep, prevFormStep }
// }

function DispensarySignUpStepForm() {

    // const { formStep, nextFormStep, prevFormStep } = useHashNavigate()
    const [formStep, setFormStep] = useState(0);

    const nextFormStep = () => setFormStep(formStep + 1)
    const prevFormStep = () => setFormStep(formStep - 1);

    const FormStepComponents = [
        ProvideDispensaryKey,
        DispensaryCreate, 
        ProvideStripeAccountId,
        DispensaryUserCreate, 
        DispensaryReview, 
        DispensarySignUpComplete
    ];

    const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', ''] };
    return (
        <Page className={twMerge(styles.gradient, 'md:pt-16')}>
            <Head>
                <title>Create a Dispensary Account</title>
            </Head>
            <FormCard className={"bg-inverse-soft flex justify-center m-auto items-center"}>
                {FormStepComponents.map((_fsc, index) => {
                    return (
                        formStep === index && 
                        <_fsc key={'form-step-component-' + index} 
                        nextFormStep={nextFormStep} 
                        prevFormStep={prevFormStep}
                        />
                    );
                })}
            </FormCard>
        </Page>
    );
}

DispensarySignUpStepForm.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false
});
export default DispensarySignUpStepForm;
