import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

interface HashNavigateProps {
	formstep: number;
	nextFormStep: () => void;
	prevFormStep: () => void;
	canProceed: boolean;
	setCanProceed: (canProceed: boolean) => void;
}

function useHashNavigate(formId: string): HashNavigateProps {
	// formstep is defined with no upper limit, so control the exit flow in your forms, so they dont' break.

	const [cookies, setCookie] = useCookies([`form-step-${formId}-proceed`]);

	const [canProceed, setProceed] = useState<boolean>(
		cookies[`form-step-${formId}-proceed`]
	);

	useEffect(() => {
		setCookie(`form-step-${formId}-proceed`, `${canProceed}`);
	}, [canProceed]);

	function setCanProceed(bool: boolean) {
		setProceed(bool);
	}

	const [formstep, setFormstep] = useState(0);

	// useEffect(() => {
	// 	if (!window.location.hash) window.location.hash = `#step=${formstep + 1}`;
	// }, [formstep]);

	// useEffect(() => {
	// 	function handleBeforeUnload(e: any) {
	// 		if (formstep > 0) {
	// 			e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
	// 			e.returnValue = '';
	// 		}
	// 		setFormstep(0);
	// 	}

	// 	window.addEventListener('beforeunload', handleBeforeUnload);
	// 	return () => {
	// 		window.removeEventListener('beforeunload', handleBeforeUnload);
	// 	};
	// }, []);

	// useEffect(() => {
	// 	const handleHashChange = () => {
	// 		if (canProceed === true) {
	// 			const newFormStep = extractFormStepFromHash();
	// 			setFormstep(newFormStep);
	// 		}
	// 	};

	// 	// Add the hash change event listener
	// 	window.addEventListener('hashchange', handleHashChange);

	// 	// Cleanup the event listener when the component unmounts
	// 	return () => {
	// 		window.removeEventListener('hashchange', handleHashChange);
	// 	};
	// }, []); // Empty dependency array to ensure the effect runs only once on mount

	// Function to extract the formStep from the hash
	const extractFormStepFromHash = () => {
		const match = window.location.hash.match(/#step=(\d+)/);
		return match ? parseInt(match[1]!, 10) : 0;
	};

	const nextFormStep = () => setFormstep(formstep + 1);
	const prevFormStep = () => setFormstep(formstep - 1);

	return { formstep, nextFormStep, prevFormStep, canProceed, setCanProceed };
}

export { useHashNavigate };
