import { Button, Center, H3, Paragraph, UploadImageBox } from "@cd/ui-lib";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DropZone from "./DropZone";
import { useFormContext } from "./StepFormProvider";

const VerifyPhotoId = ({ nextFormStep }: { nextFormStep: () => void }) => {
    const { resetFormValues, setFormValues } = useFormContext();
    
    const createNewFormContext = () => {
        console.info('creating new form context: VerifyPhotoId')
        resetFormValues();
    }
    
    useEffect(() => {
        createNewFormContext()
    }, [])

    const [frontImage, setFrontImage] = useState<any>(null);
    const [backImage, setBackImage] = useState<any>(null);
    const [loadingButton, setLoadingButton] = useState(false);

    const uploaded = !frontImage || !backImage

    const onSubmitUpload = async () => {
        try {
            if (frontImage && backImage) {
                setLoadingButton(true);
                const response = await verifyPhotoIdImage({frontImage, backImage})
                // if (response.status === 200) {
                if (response !== null) {
                    toast('Success! Your photo id has been verified.')
                }
                nextFormStep();
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
    <Center className='space-y-2 w-3/4 m-auto'>
        <H3>Thank you for ordering from Delivery by Gras.
        </H3>
        <H3>We've got your order ready for delivery.</H3>
        <H3>
            Before we can deliver to you, please share your photo to help us verify you.</H3>
        <Paragraph>Please upload a picture of the front and back of your state photo id.</Paragraph>
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
        <Button 
        disabled={uploaded}
        loading={loadingButton}
        onClick={onSubmitUpload}
        >Verify ID</Button>
    </Center>
)}

export default VerifyPhotoId