import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

type HashNavigateProps = {
	formstep: number;
	nextFormStep: () => void;
	prevFormStep: () => void;
	canProceed: boolean;
	setCanProceed: (canProceed: boolean) => void;
};

function useHashNavigate(formId: string): HashNavigateProps {
	// notes:
	// formstep is defined in a weird way, there is no upper limit, so control the exit flow in your forms, so they dont' break.

	const [cookies, setCookie, removeCookie] = useCookies([
		`form-step-${formId}-proceed`,
	]);
	const [canProceed, setProceed] = useState<boolean>(
		cookies[`form-step-${formId}-proceed`]
	);
	const [formstep, setFormstep] = useState<number>(
		Number(window.location.hash.split('=')[1]) - 1 || 0
	);
	const nextFormStep = () => setFormstep(formstep + 1);
	const prevFormStep = () => setFormstep(formstep - 1);

	const hash = `#step=${formstep + 1}`;

	useEffect(() => {
		setCookie(`form-step-${formId}-proceed`, JSON.stringify(canProceed));
		window.addEventListener('hashchange', (event) => {
			if (canProceed === true) {
				let step = window.location.hash.split('=')[1];
				setFormstep(Number(step) - 1);
			}
		});
		window.location.assign(hash);
	}, [formstep, hash, canProceed]);

	function setCanProceed(bool: boolean) {
		setProceed(bool);
	}

	return { formstep, nextFormStep, prevFormStep, canProceed, setCanProceed };
}

export { useHashNavigate };
