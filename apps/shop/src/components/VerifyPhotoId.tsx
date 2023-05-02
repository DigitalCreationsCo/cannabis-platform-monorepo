import { Button, Center, FlexBox, H2, H5, UploadImageBox } from "@cd/ui-lib";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DropZone from "./DropZone";
import { useFormContext } from "./StepFormProvider";

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

    const [frontImage, setFrontImage] = useState<any>(null);
    const [backImage, setBackImage] = useState<any>(null);
    const [loadingButton, setLoadingButton] = useState(false);
    const uploaded = frontImage && backImage

    const onSubmitUpload = async () => {
        try {
            if (frontImage && backImage) {
                setLoadingButton(true);
                toast('Verifying your photo id...')
                const response = await verifyPhotoIdImage({frontImage, backImage})
                // if (response.status === 200) {
                if (response !== null) {
                    toast('Success! Your photo id has been verified.')
                    
                    // setFormValues({ isLegalAge: true, idVerified: true })

                    // GET IDENTIFICATION CONFIRM RESPONSE
                    // ADD THE PROPERTY ageVerified: true to new user form,
                    nextFormStep();

                }
            }
        } catch (error: any) {
        }
    }

    const verifyPhotoIdImage = async ({frontImage, backImage}: any) => {
        try {
            console.log('verifyPhotoIdImage: frontimage ', frontImage)
            console.log('verifyPhotoIdImage: backimage ', backImage)
            // return await axios.post('/api/verify-photo-id', {
                // photo_id_front_image: frontImage, 
                // photo_id_back_image: backImage
            // })
            return true
        } catch (error: any) {
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
                    src={frontImage.preview}
                    alt="Id Front"
                    fill={true}
                    className='rounded'
                />
            </UploadImageBox>
            : <DropZone
                    title="Upload ID Front Image"
                    maxFiles={1}
                    onChange={(files) => {
                        const uploadFiles = files.map((file) =>
                            Object.assign(file, { preview: URL.createObjectURL(file) })
                        );
                        setFrontImage(uploadFiles[0]);
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
                    onChange={(files) => {
                        const uploadFiles = files.map((file) =>
                            Object.assign(file, { preview: URL.createObjectURL(file) })
                        );
                        setBackImage(uploadFiles[0]);
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