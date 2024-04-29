import { TextContent, urlBuilder } from '@cd/core-lib';
import {
	Button,
	Center,
	DropZone,
	FlexBox,
	H3,
	Paragraph,
	UploadImageBox,
	useFormContext,
} from '@cd/ui-lib';
import axios, { type AxiosResponse } from 'axios';
import FormData from 'form-data';
import Image from 'next/image';
import router from 'next/router';
import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-hot-toast';
import { verifyPhotoIdTour } from '../tour';

type Image = {
	data: string;
	path: string;
	preview: string;
	lastModified: Date;
	lastModifiedDate: Date;
	name: string;
	size: number;
	type: string;
};

const VerifyPhotoId = () => {
	function startTour() {
		if (!verifyPhotoIdTour.isActivated) verifyPhotoIdTour.start();
	}

	useEffect(() => {
		if (window.location.pathname != '/') startTour();
	}, []);

	const { resetFormValues, nextFormStep, setFormValues } = useFormContext();

	useEffect(() => {
		function createNewFormContext() {
			resetFormValues();
		}
		createNewFormContext();
	}, []);

	const [frontImage, setFrontImage] = useState<Image | null>(null);
	const [backImage, setBackImage] = useState<Image | null>(null);
	const [loadingButton, setLoadingButton] = useState(false);
	const uploaded = frontImage && backImage;
	const [, setCaptchaToken] = useState<string | null>(null);
	const captchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
	const captchaRef = useRef<any>(null);
	useEffect(() => {
		// console.info('captchaSiteKey: ', captchaSiteKey);
		// console.info('captchaRef: ', captchaRef);
	}, []);
	async function handleCaptcha(e: any) {
		try {
			e.preventDefault();
			const inputVal = await e.target[0].value;
			const token = captchaRef.current.getValue();
			captchaRef.current.reset();
			const response = await axios.post('/api/recaptcha', {
				inputVal,
				token,
			});
			if (response.status === 200) await onSubmitUpload();
		} catch (error) {
			console.info(error);
		}
	}

	const onSubmitUpload = async () => {
		try {
			if (frontImage && backImage) {
				setLoadingButton(true);
				const response = await verifyLegalAgeImageUpload({
					frontImage,
					backImage,
				});
				toast(TextContent.account.VERIFY_ID_PROCESSING);
				if (response.success === 'true') {
					if (
						response.payload.id_verified === true &&
						response.payload.is_legal_age === false
					)
						router.push('/sorry-we-cant-serve-you');
					else {
						toast.success(TextContent.account.VERIFY_ID_COMPLETE);
						console.info('response verify id: ', response.payload);
						setFormValues({
							newUser: {
								scannedDOB: response.payload.scannedDOB,
								id_verified: response.payload.id_verified,
								is_legal_age: response.payload.is_legal_age,
								idFrontImage: response.payload.images.idFrontImage,
								idBackImage: response.payload.images.idBackImage,
							},
						});
						setLoadingButton(false);
						nextFormStep();
					}
				}
			}
		} catch (error: any) {
			setLoadingButton(false);
			toast.error(error.message);
		}
	};

	const verifyLegalAgeImageUpload = async ({
		frontImage,
		backImage,
	}: {
		frontImage: Image;
		backImage: Image;
	}): Promise<VerifyIdentificationResponse> => {
		try {
			const formData = new FormData();
			formData.append('idFrontImage', frontImage);
			formData.append('idBackImage', backImage);
			// @ts-ignore
			// for (const pair of formData.entries()) {
			// 	console.info(pair[0], pair[1]);
			// }
			const response = await axios.post<
				any,
				AxiosResponse<VerifyIdentificationResponse>,
				any
			>(urlBuilder.image.verifyIdentificationImageUpload(), formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (!response.data.success || response.data.success == 'false')
				throw new Error(response.data.error);

			return response.data;
		} catch (error: any) {
			if (error.code === 'ERR_NETWORK')
				throw new Error(
					`We're having a problem verifying your image. Please try again.`,
				);
			throw new Error(error.message);
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				handleCaptcha(e);
			}}
		>
			<Center className="m-auto w-3/4 space-y-4 md:pb-0">
				<H3 id="verify-id-step-2">21+ only. We'll need to see your ID</H3>
				<Paragraph>
					Submit a photo of the front and back of your state ID or driver's
					license.
				</Paragraph>
				<div id="verify-id-step-3" className="h-[200px] w-[240px]">
					{frontImage ? (
						<UploadImageBox fill={true} onClick={() => setFrontImage(null)}>
							<Image
								src={frontImage?.preview}
								alt="Id Front"
								fill={true}
								className="rounded"
							/>
						</UploadImageBox>
					) : (
						<DropZone
							title="Upload ID Front Photo"
							buttonText="Upload image"
							maxFiles={1}
							onChange={async (files: any) => {
								const promiseFiles = files.map(async (file: any) => {
									return new Promise((resolve, reject) => {
										const reader = new FileReader();
										reader.onabort = () => reject('file reading was aborted');
										reader.onerror = () => reject('file reading has failed');
										reader.onload = () => {
											resolve(reader.result);
										};
										reader.readAsBinaryString(file);
									}).then(async (data) =>
										Object.assign(file, {
											preview: URL.createObjectURL(file),
											data: data || null,
										}),
									);
								});

								const uploadFile: Image[] = await Promise.all(promiseFiles);
								setFrontImage(uploadFile[0]);
							}}
						/>
					)}
				</div>
				<div className="h-[200px] w-[240px]">
					{backImage ? (
						<UploadImageBox fill={true} onClick={() => setBackImage(null)}>
							<Image
								src={backImage.preview}
								alt="Id Back"
								fill={true}
								className="rounded"
							/>
						</UploadImageBox>
					) : (
						<DropZone
							title="Upload ID Back Photo"
							buttonText="Upload image"
							maxFiles={1}
							onChange={async (files: any) => {
								const promiseFiles = files.map(async (file: any) => {
									return new Promise((resolve, reject) => {
										const reader = new FileReader();
										reader.onabort = () => reject('file reading was aborted');
										reader.onerror = () => reject('file reading has failed');
										reader.onload = () => {
											resolve(reader.result);
										};
										reader.readAsBinaryString(file);
									}).then(async (data) =>
										Object.assign(file, {
											preview: URL.createObjectURL(file),
											data: data || null,
										}),
									);
								});

								const uploadFile: Image[] = await Promise.all(promiseFiles);
								setBackImage(uploadFile[0]);
							}}
						/>
					)}
				</div>

				<ReCAPTCHA
					ref={captchaRef}
					sitekey={captchaSiteKey}
					onChange={(token) => setCaptchaToken(token)}
				/>

				<FlexBox className="flex-row space-x-4 py-2">
					<Button
						id="verify-id-step-4"
						type="submit"
						disabled={!uploaded || !captchaRef.current.getValue()}
						loading={loadingButton}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onSubmitUpload();
						}}
					>
						{TextContent.ui.CONTINUE}
					</Button>
				</FlexBox>
			</Center>
		</form>
	);
};

export default VerifyPhotoId;

type VerifyIdentificationResponse =
	| {
			success: 'true';
			payload: {
				is_legal_age: boolean;
				id_verified: boolean;
				scannedDOB: Date | null;
				images: {
					idFrontImage: string;
					idBackImage: string;
				};
				isUploaded: boolean;
			};
	  }
	| {
			success: 'false';
			error: string;
	  };
