import TextContent from '@cd/core-lib/src/constants/text.constant';
import useCheckHrefIncludes from '@cd/core-lib/src/hooks/useCheckHrefIncludes';
import CloseButton from '@cd/ui-lib/src/components/button/CloseButton';
import CopyRight from '@cd/ui-lib/src/components/CopyRight';
import { Paragraph } from '@cd/ui-lib/src/components/Typography';
import { getBreakpointValue } from '@cd/ui-lib/src/hooks/useBreakpoint';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import logo from '../../../public/img/logo120.png';
import styles from '../../styles/theme';
import { type ViewProps } from '../../widget.types';

function Launch({
	expanded,
	screenwidth,
	setExpand,
	dispensaryName,
}: ViewProps) {
	const openWidget = () => setExpand(true);
	const closeWidget = (e: any) => {
		e.stopPropagation();
		setExpand(false);
	};

	const navigate = useNavigate();
	const isCheckout = useCheckHrefIncludes('checkout');
	useEffect(() => {
		isCheckout ? navigate('/checkout') : null;
	});

	const md = getBreakpointValue('md');
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div onClick={openWidget} className={twMerge([styles.launch_f(expanded)])}>
			{expanded ? (
				<div className="flex flex-row items-center">
					<div className="p-6"></div>

					<div className="flex flex-col p-2">
						<Paragraph className="m-auto" color="light">
							{TextContent.info.PARTNER_FOR_DELIVERY_f(dispensaryName)}
						</Paragraph>
						<Paragraph className="m-auto text-inverse" color="light">
							{TextContent.info.ORDER_AT_CHECKOUT}
						</Paragraph>
						<div className="m-auto">
							<CopyRight prepend={TextContent.info.DELIVERY_BY_GRAS} />
						</div>
					</div>

					<div>
						<CloseButton
							iconSize={32}
							className="relative p-2 pr-4"
							theme={'light'}
							onClick={closeWidget}
						/>
					</div>
				</div>
			) : (
				<div className="flex flex-row items-center">
					{screenwidth >= md && (
						<img
							src={logo}
							alt="Delivery By Gras"
							height={40}
							width={40}
							className="object-contain animate-shake"
						/>
					)}
					<Paragraph color="light" className="items-center">
						<b>Delivery&nbsp;by&nbsp;Gras</b>&nbsp;is&nbsp;available!
					</Paragraph>
					{screenwidth >= md && <div className="w-[20px]"></div>}
				</div>
			)}
		</div>
	);
}

export default Launch;
