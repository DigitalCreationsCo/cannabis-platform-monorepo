import React, { useEffect, useRef } from 'react';

const useAfterMount = (func: () => void, deps: any[]) => {
	const didMount = React.useRef(false);

	useEffect(() => {
		if (didMount.current) func();
		else didMount.current = true;
	}, deps);
};

export default useAfterMount;
