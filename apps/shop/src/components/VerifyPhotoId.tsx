import { Button, Center, H3, LoadingDots, Paragraph, UploadImageBox } from "@cd/ui-lib";
import Image from "next/image";
import { useState } from "react";
import DropZone from "./DropZone";

const VerifyPhotoId = ({ nextFormStep }: { nextFormStep: () => void }) => {
    const [frontImage, setFrontImage] = useState<any>(null);
    const [backImage, setBackImage] = useState<any>(null);
    const [loadingButton, setLoadingButton] = useState(false);

    const uploaded = !frontImage || !backImage

    const onSubmitUpload = async () => {
        if (frontImage && backImage) {
            setLoadingButton(true);
            // nextFormStep();
            await verifyPhotoIdImage({frontImage, backImage})
        }
    }

    const verifyPhotoIdImage = async ({frontImage, backImage}: any) => {
        console.log('verifyPhotoIdImage: frontimage ', frontImage)
        console.log('verifyPhotoIdImage: backimage ', backImage)
        // return await axios.post('/api/verify-photo-id', {
            // photo_id_front_image: frontImage, 
            // photo_id_back_image: backImage
        // })
    }

    return (
    <Center className='space-y-2'>
        <H3>We'll need to verify your age and identification</H3>
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
        <LoadingDots />
    </Center>
)}

export default VerifyPhotoId