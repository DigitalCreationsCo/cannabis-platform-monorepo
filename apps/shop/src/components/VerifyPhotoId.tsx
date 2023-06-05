import { urlBuilder } from "@cd/core-lib/src/utils";
import { Button, Center, FlexBox, H2, H5, UploadImageBox } from "@cd/ui-lib";
import axios from "axios";
import FormData from "form-data";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import DropZone from "./DropZone";
import { useFormContext } from "./form/FormStepProvider";

type Image = {
data: string;
path: string;
preview: string;
lastModified: Date;
lastModifiedDate: Date;
name: string;
size: number;
type: string;
}

const VerifyPhotoId = () => {

    const { resetFormValues, nextFormStep, prevFormStep, setFormValues, formData } = useFormContext();
    
    console.log('formData: ', formData);

    useEffect(() => {
        const createNewFormContext = () => {
            console.info('creating new form context for Quick Delivery Form')
            resetFormValues()
        }
        // MAKE SURE THIS IS NOT RENDERING REPEATEDLY, CLEANNING UP THE FORM CONTEXT
        createNewFormContext()
    }, [])


    const [frontImage, setFrontImage] = useState<Image | null>(null);
    const [backImage, setBackImage] = useState<Image | null>(null);
    
    useEffect(() => {}, [frontImage, backImage])
    
    const [loadingButton, setLoadingButton] = useState(false);
    const uploaded = frontImage && backImage

    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const onSubmitUpload = async () => {
        try {

            if (frontImage && backImage) {

                setLoadingButton(true);

                const 
                response: VerifyPhotoIDUploadResponse = await verifyLegalAgeImageUpload({frontImage, backImage})

                console.log('response: ', response)

                if (response.success === false)
                throw new Error('Error verifying your photo id. Please try again.')

                if (response.success) {
                    
                    toast('Thanks for verifying your id!');

                    setFormValues({ 
                        newUser: {
                        ...response.result,
                        } 
                    })

                    nextFormStep();

                }
            }
        } catch (error: any) {
            console.log('error: ', error);
            toast.error(error.message);
            setLoadingButton(false);
        }
    }

    const verifyLegalAgeImageUpload = async ({frontImage, backImage}: any) => {

        toast('Verifying your photo id...');

        try {
            const 
            formData = new FormData();

            formData.append("idFrontImage", frontImage);
            formData.append("idBackImage", backImage);

            const 
            response = await axios.post(
                urlBuilder.image.verifyIdentificationImageUpload(), 
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, 
            });

            if (response.status === 500)
            throw new Error(`We're having a problem verifying your image. Please try again.`)
            
            return response.data;

        } catch (error: any) {
            if (error.code === 'ERR_NETWORK')
            throw new Error(`We're having a problem verifying your image. Please try again.`);
            
            console.log('verify id error: ', error)
            throw new Error(error.message)
        }
    }
    
    const captchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY||''
    const captchaRef = useRef<any>(null);
    
    async function handleCaptcha(e: any) {
        try {
            e.preventDefault();
            const inputVal = await e.target[0].value;
            const token = captchaRef.current.getValue();
            captchaRef.current.reset();
            const response = await axios.post('/api/recaptcha', { inputVal, token });
            if (response.status === 200) await onSubmitUpload()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleCaptcha}>
            <Center className='space-y-4 w-3/4 m-auto pb-20 md:pb-0'>
                <H2>Please verify your id</H2>
                <H5>Please upload a picture of the front and back of your state's photo id card.</H5>
                <div className="h-[200px] w-[240px]">
                {frontImage ? 
                    <UploadImageBox
                    fill={true}
                    onClick={() => setFrontImage(null)}
                    >
                        <Image
                            src={frontImage?.preview}
                            alt="Id Front"
                            fill={true}
                            className='rounded'
                        />
                    </UploadImageBox>
                    : <DropZone
                            title="Upload ID Front Image"
                            maxFiles={1}
                            onChange={async (files: any) => {
                                const promiseFiles = files.map(async (file: any) => {

                                    return new Promise((resolve, reject) => {
                                        const reader = new FileReader()
                                        reader.onabort = () => reject('file reading was aborted')
                                        reader.onerror = () => reject('file reading has failed')
                                        reader.onload = () => {
                                            resolve(reader.result)
                                        }
                                        reader.readAsBinaryString(file)
                                    }).then(async (data) => Object.assign(file, {
                                            preview: URL.createObjectURL(file),
                                            data: data || null
                                        }));
                                    });

                                const uploadFile:Image[] = await Promise.all(promiseFiles)
                                setFrontImage(uploadFile[0]);
                            }}
                        />
                }</div>
                <div className="h-[200px] w-[240px]">
                {backImage ? 
                    <UploadImageBox
                    fill={true}
                    onClick={() => setBackImage(null)}
                    >
                        <Image
                            src={backImage.preview}
                            alt="Id Back"
                            fill={true}
                            className='rounded'
                        />
                    </UploadImageBox>
                    : <DropZone
                            title="Upload ID Back Image"
                            maxFiles={1}
                            onChange={async (files: any) => {
                                const promiseFiles = files.map(async (file: any) => {

                                    return new Promise((resolve, reject) => {
                                        const reader = new FileReader()
                                        reader.onabort = () => reject('file reading was aborted')
                                        reader.onerror = () => reject('file reading has failed')
                                        reader.onload = () => {
                                            resolve(reader.result)
                                        }
                                        reader.readAsBinaryString(file)
                                    }).then(async (data) => Object.assign(file, {
                                            preview: URL.createObjectURL(file),
                                            data: data || null
                                        }));
                                    });

                                const uploadFile:Image[] = await Promise.all(promiseFiles)
                                setBackImage(uploadFile[0]);
                            }}
                        />
                }
                </div>

                <ReCAPTCHA
                ref={captchaRef}
                sitekey={captchaSiteKey}
                onChange={(token) => setCaptchaToken(token)}
                />
                
                <FlexBox className='flex-row space-x-4 py-2'>
                    <Button 
                    disabled={loadingButton}
                    onClick={prevFormStep}
                    >go back</Button>
                    
                    <Button 
                    disabled={!uploaded || !captchaRef.current.getValue()}
                    loading={loadingButton}
                    // onClick={onSubmitUpload}
                    >Verify ID</Button>
                </FlexBox>
        </Center>
    </form>
)}

export default VerifyPhotoId

type VerifyPhotoIDUploadResponse = {
    success: boolean,
    result: { 
        isLegalAge: boolean, 
        idVerified: boolean
    },
    images: Record<string, string> | null
    isUploaded: boolean,
    error?: string,
}