import { OrderItem, OrderItemWithDetails } from "@cd/data-access";
import { Button, Center, H4, H5, H6, Paragraph, Price, UploadImageBox } from "@cd/ui-lib";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
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

    const [cookies, setCookie] = useCookies(['gras-cart-token'])
    
    const cart = cookies["gras-cart-token"] && JSON.parse(JSON.stringify(cookies["gras-cart-token"])) as OrderItem || null
    console.log('cart: ', cart)
    
    return (
    <Center className='space-y-2 w-3/4 m-auto pb-20 md:pb-0'>
        <H4>Thank you for ordering from Delivery by Gras.
        </H4>
        <H5>We've got your order ready for delivery.</H5>
        <div className="flex flex-col md:grid grid-cols-2 gap-2">{
        cart.cartItems.length > 0 && cart.cartItems.map((product: OrderItemWithDetails, index) => (
            <div key={`order-item-${index}`} className="border flex space-x-2 items-center p-4 rounded justify-between">
                <H6>{product.name}</H6>
                <Paragraph>{product.size + product.unit}</Paragraph>
                <Price price={product.salePrice || product.basePrice} />
            </div>

            )) || <div>You have no items in your order.</div>}
            <H5 className="flex justify-end col-span-2">Your total is <Price className="pl-2" price={cart.total || 0} /></H5>
            </div>
            
        <H4>
            Before we can deliver to you, please share your photo to help us verify you.</H4>
        <H5>Please upload a picture of the front and back of your state photo id.</H5>
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