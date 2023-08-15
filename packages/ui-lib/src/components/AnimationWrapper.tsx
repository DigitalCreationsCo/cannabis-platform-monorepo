import { motion, type Variants } from 'framer-motion';
import { type PropsWithChildren } from 'react';

function AnimationWrapper(props: PropsWithChildren<{ className?: string }>) {
	return (
		<motion.main
			variants={variants} // Pass the variant object into Framer Motion
			initial="hidden" // Set the initial state to variants.hidden
			animate="enter" // Animated state to variants.enter
			exit="exit" // Exit state (used later) to variants.exit
			transition={{ type: 'linear' }} // Set the transition to linear
			className={props.className}
		>
			{props.children}
		</motion.main>
	);
}

export default AnimationWrapper;

const variants: Variants = {
	hidden: { opacity: 0, x: 0, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: 0 },
};
