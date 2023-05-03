import { Button, Center, FlexBox, H2, H5, UploadImageBox } from "@cd/ui-lib";
import axios from "axios";
import FormData from "form-data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DropZone from "./DropZone";
import { useFormContext } from "./StepFormProvider";

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

const VerifyPhotoId = ({ nextFormStep, prevFormStep }: { nextFormStep: () => void; prevFormStep: () => void; }) => {
    
    const { resetFormValues, setFormValues } = useFormContext();
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
    const [loadingButton, setLoadingButton] = useState(false);
    const uploaded = frontImage && backImage

    useEffect(() => {}, [frontImage, backImage])
    const onSubmitUpload = async () => {
        try {
            if (frontImage && backImage) {
                setLoadingButton(true);
                toast('Verifying your photo id...')
                const response = await verifyPhotoIdImage({frontImage, backImage})
                // if (response.status === 200) {
                if (response) {
                    toast('Success! Your photo id has been verified.')
                    
                    // setFormValues({ isLegalAge: true, idVerified: true })

                    // GET IDENTIFICATION CONFIRM RESPONSE
                    // ADD THE PROPERTY ageVerified: true to new user form,
                    nextFormStep();

                } else {
                    
                }
            }
        } catch (error: any) {
        }
    }

    const verifyPhotoIdImage = async ({frontImage, backImage}: any) => {
        try {
            const formData = new FormData();
            formData.append("file", frontImage);
            formData.append("file", backImage);
            const response = await axios.post('/api/verify-id', formData);
            
            console.log('verify id response: ', response);
            return response.data;
        } catch (error: any) {
            console.log('verify id error: ', error)
        }
    }
    
    return (
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
                    onChange={async (files) => {
                        const promiseFiles = files.map(async (file) => {

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
                    onChange={async (files) => {
                        const promiseFiles = files.map(async (file) => {

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
        <FlexBox className='flex-row space-x-4 py-2'>
            <Button 
            disabled={loadingButton}
            onClick={prevFormStep}
            >go back</Button>
            <Button 
            disabled={!uploaded}
            loading={loadingButton}
            onClick={onSubmitUpload}
            >Verify ID</Button>
        </FlexBox>
    </Center>
)}

export default VerifyPhotoId