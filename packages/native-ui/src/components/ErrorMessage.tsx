// import router from 'next/router';
import { Text } from '@themed';
import Center from './atomic/Center';
import CopyRight from './CopyRight';
import FlexBox from './FlexBox';

function ErrorMessage({ code, message }: { code: number; message: string }) {
	return (
		<Center className="py-4 space-y-4">
			<Text>Our bad, your request failed</Text>

			<FlexBox className="flex-row space-x-2">
				<Text>{code} Error</Text>
				<Text>{message}</Text>
			</FlexBox>

			{/* <Button onPress={() => Router.back()}>go back</Button> */}
			<CopyRight />
		</Center>
	);
}

export default ErrorMessage;
