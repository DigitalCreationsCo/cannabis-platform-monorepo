import { Component, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import SkeletonCard from './skeleton/SkeletonCard';

type CardWithDataProps = {
	data: any;
	className?: string;
} & PropsWithChildren;

// this component handles no idea, but the bad data
// is being handled in a upstream component
class CardWithData extends Component<CardWithDataProps> {
	data: any;
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
		this.data = this.props.data;
	}
	render() {
		if (!this.data.id)
			return <SkeletonCard className={twMerge(this.props.className)} />;
		return (
			<Card className={twMerge(this.props.className)}>
				{this.props.children}
			</Card>
		);
	}
}

export default CardWithData;
