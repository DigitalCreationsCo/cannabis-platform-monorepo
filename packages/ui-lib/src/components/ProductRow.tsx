import { ProductWithDashboardDetails } from '@cd/data-access';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/assets/images/logo.png';
import Icons from '../icons';
import FlexBox from './FlexBox';
import IconWrapper from './IconWrapper';
import Row from './Row';
import { Small } from './Typography';

type ProductVariantRowProps = {
	product: ProductWithDashboardDetails;
};
export default function ProductVariantRow({ product }: ProductVariantRowProps) {
	const imageSrc = product?.variants?.[0]?.images?.[0]?.location || logo;

	return (
		<Link href={`products/${product.id}`}>
			<Row className="justify-start md:pl-1">
				<Image src={imageSrc} alt={product.name} height={60} width={60} />

				<Small className="min-w-[144px]">{product.name}</Small>

				<FlexBox className="flex-row items-center space-x-0 md:space-x-2 sm:grow">
					<IconWrapper iconColor="yellow" Icon={Icons.StarFilled} />
					<Small>{product.rating}</Small>
				</FlexBox>

				{/* <DeleteButton
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDialogOpen(true);
                    setDeleteId(product.id);
                    setDeleteName(product.name);
                }}
                ></DeleteButton> */}

				<IconWrapper
					className="hidden sm:block"
					iconSize={16}
					Icon={Icons.Right}
				/>
			</Row>
		</Link>
	);
}
