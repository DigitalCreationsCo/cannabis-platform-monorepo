import { Address, ImageUser, User, UserWithDetails } from '@cd/data-access';
import {
    Button,
    Card,
    DeleteButton,
    FlexBox,
    Grid,
    H6,
    Icons,
    LoadingDots,
    Padding,
    Page,
    Paragraph,
    TextField,
    UploadImageBox
} from '@cd/shared-ui';
import axios from 'axios';
import { ConfirmationModal, DropZone, Modal, PageHeader, ProtectedComponent } from 'components';
import { format } from 'date-fns';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { urlBuilder } from 'utils';
import { useAppState } from '../../src/context/AppProvider';
import { useOnClickOutside } from '../../src/hooks';

// Will need to test admin level privelege for some api routes, like users/[id]
// will use this component to protect those routes from non-admin users

// To Do:
// 1. Add the more textfield to update address modal
// test, test, test
// create server main api routes for address, with test cases
// test some more ;)
// maybe add editor middleware functionality for priveleged editing within the page? use ssr for this.

export default function UserDetails({ user }: { user: UserWithDetails }) {
    const { isLoading } = useAppState();
    const [files, setFiles] = useState<unknown[]>([]);
    const [loadingButton, setLoadingButton] = useState(false);
    const [existingImage, setExistingImage] = useState<ImageUser[]>(user?.imageUser || []);
    const [deletedImage, setDeletedImage] = useState<ImageUser[]>([]);
    const [openDropDown, setOpenDropDown] = useState(true);
    const [addressUpdateIndex, setAddressUpdateIndex] = useState<number>();
    const [addressUpdateModal, setAddressUpdateModal] = useState(false);
    const [addressDeleteModal, setAddressDeleteModal] = useState(false);

    const dropDownRef = useRef(null);
    useOnClickOutside(dropDownRef, () => {
        setOpenDropDown(false);
    });

    const initialValues = {
        id: user?.id || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        username: user?.username || '',
        email: user?.email || '',
        emailVerified: user?.emailVerified || false,
        dialCode: user?.dialCode || '',
        phone: user?.phone || '',
        address: user?.address || [],
        termsAccepted: user?.termsAccepted || false,
        imageUser: user?.imageUser || [],
        memberships: user?.memberships || [],
        createdAt: user?.createdAt || new Date(),
        updatedAt: user?.updatedAt || new Date(),
    };

    async function handleFormSubmit(values: any) {
        try {
            if (user) {
                setLoadingButton(true);
                const formData = new FormData();
                formData.append('firstName', values.firstName);
                formData.append('lastName', values.lastName);
                formData.append('username', values.username);
                formData.append('email', JSON.stringify(values.email));
                formData.append('emailVerified', JSON.stringify(values.emailVerified));
                formData.append('dialCode', values.dialCode);
                formData.append('phone', values.phone);
                formData.append('address', values.address);
                formData.append('termsAccepted', values.termsAccepted);
                formData.append('imageUser', values.imageUser);
                formData.append('memberships', values.memberships);
                formData.append('deleteImages', JSON.stringify(deletedImage));
                files.forEach((file: any) => formData.append('files', file));
                const { data } = await axios.put(urlBuilder.next + `/api/product-upload/${user?.id}`, formData);
                setLoadingButton(false);
                toast.success(data);
                location.reload();
            }
        } catch (error) {
            setLoadingButton(false);
            console.error(error);
            toast.error(error.response.statusText);
            location.reload();
        }
    }

    // function removeRelatedFields(user) {
    //     // delete User['driver'];
    //     // delete User['customer'];
    //     // delete User['deliveryInfo'];
    //     return user;
    // }

    // async function handleAddressUpdate() {
    //     try {
    //         const { data } = await axios.put(
    //             urlBuilder.next + `/api/users/${user?.id}/address/${user?.address?.[addressUpdateIndex]?.id}`
    //         );
    //         toast.success(data);
    //     } catch (error) {
    //         console.error(error);
    //         toast.error(error.response.statusText);
    //     }
    // }

    async function handleAddressDelete({ addressId, userId }: { addressId: Address['id']; userId: User['id'] }) {
        try {
            const { data } = await axios.delete(urlBuilder.next + `/api/users/${userId}/address/${addressId}`);
            toast.success(data);
        } catch (error) {
            console.error(error);
            toast.error(error.response.statusText);
        }
    }

    // change user admin level function

    const handleDeleteExistingImage = (image: ImageUser) => {
        const id = image.id;
        setExistingImage((state) => state.filter((image) => id !== image.id));
        setDeletedImage((state) => [...state, image]);
    };

    /* eslint-disable */
    const handleFileDelete = (deleteFile) => {
        setFiles((files) => files.filter((file: {id: string}) => file.id !== deleteFile.id));
    };
    /* eslint-disable */

    return (
        <ProtectedComponent>
            <Page>
                <PageHeader
                    title={`User: ${user?.firstName}`}
                    Icon={Icons.ShoppingBagOutlined}
                    Button={
                        <Link href="/users">
                            <Button>Back to Users</Button>
                        </Link>
                    }
                />
                {isLoading ? (
                    <Padding>
                        <LoadingDots />
                    </Padding>
                ) : user ? (
                        <Grid className="md:max-w-fit px-3">
                        <Formik
                            initialValues={initialValues}
                            // validationSchema={userSchema}
                            onSubmit={handleFormSubmit}
                        >
                                { ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <>
                                        
                                        <Modal description={ `Edit Address` } open={ addressUpdateModal } onClose={ () => setAddressUpdateModal(false) }>
                                            <TextField
                                                                containerClassName=""
                                                                className="px-0 mx-0"
                                                name={ `user.address[${addressUpdateIndex}].street1` } label="Street Line 1" placeholder="Street Line 1"
                                            value={values?.address?.[addressUpdateIndex]?.street1}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}/>
                                        </Modal>
                                        <ConfirmationModal
                                            onClose={() => setAddressDeleteModal(false)}
                                            open={ addressDeleteModal }
                                            handleConfirm={() => handleAddressDelete({ addressId: user?.address?.[addressUpdateIndex]?.id, userId: user?.id })}
                                            description={ "Delete this address? You can't undo this action." } />
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleSubmit();
                                    }}
                                >
                                    <FlexBox className="flex-col space-x-0 space-y-2 items-stretch">
                                        <H6>{`Member since ${format(new Date(user.createdAt), 'MMM dd, yyyy')}`}</H6>
                                        <TextField
                                            name="firstName"
                                            label="First Name"
                                            placeholder="First Name"
                                            value={values.firstName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.firstName && !!errors.firstName}
                                        />
                                        <TextField
                                            name="lastName"
                                            label="Last Name"
                                            placeholder="Last Name"
                                            value={values.lastName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.lastName && !!errors.lastName}
                                        />
                                        <TextField
                                            name="username"
                                            label="UserName"
                                            placeholder="UserName"
                                            value={values.username}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.username && !!errors.username}
                                        />
                                        <TextField
                                            name="email"
                                            label="Email"
                                            placeholder="Email"
                                            value={values.email}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.email && !!errors.email}
                                        />
                                        <FlexBox>
                                            <TextField
                                                maxLength={3}
                                                name="dialCode"
                                                label="DialCode"
                                                placeholder="DialCode"
                                                value={values.dialCode}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.dialCode && !!errors.dialCode}
                                            />
                                            <TextField
                                                name="phone"
                                                label="Phone"
                                                placeholder="Phone"
                                                value={values.phone}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.phone && !!errors.phone}
                                            />
                                        </FlexBox>
                                        <FlexBox className="flex-row min-w-[111px]">
                                            <label>Addresses</label>
                                        </FlexBox>
                                        {user.address.map((address, index) => (
                                            <Card key={`address-${index}`} className={'w-full flex-row justify-between items-center'}>
                                                <Paragraph className={'whitespace-pre-line'}>
                                                    {`${address.street1} ${address.street2} 
                                                    ${address.city} ${address.state} ${address.country} ${address.zipcode}`}
                                                </Paragraph>
                                                <FlexBox className="max-w-fit">
                                                    <Button className={"w-1/2"} onClick={(e) => {
                                    e.preventDefault();
                                                        e.stopPropagation();
                                                        setAddressUpdateIndex(index);
                                    setAddressUpdateModal(true);
                                }}>Edit</Button>
                                                    <DeleteButton className={ "w-1/2" } label={ false } onClick={ (e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setAddressDeleteModal(true)
                                                    } } />
                                                </FlexBox>
                                            </Card>
                                        ))}
                                        <FlexBox>
                                            <Paragraph>{`Are the Terms Of Use accepted? ${
                                                user.termsAccepted ? 'Yes' : 'No'
                                            }`}</Paragraph>
                                        </FlexBox>
                                    </FlexBox>
                                    <Grid title="Images" className="space-y-2">
                                        <FlexBox>
                                            {existingImage.map((image: any, index) => {
                                                return (
                                                    <UploadImageBox
                                                        key={index}
                                                        onClick={() => handleDeleteExistingImage(image)}
                                                        // onKeyUp={() => {}}
                                                    >
                                                        <Image
                                                            key={'product-image-' + index}
                                                            src={image.location}
                                                            alt=""
                                                            fill={true}
                                                        />
                                                    </UploadImageBox>
                                                );
                                            })}
                                            {files.map((file: { id: string; preview: string }, index) => {
                                                return (
                                                    <UploadImageBox
                                                        key={index}
                                                        onClick={() => handleFileDelete(file)}
                                                    >
                                                        <Image src={file.preview} alt="" height={100} width={100} />
                                                    </UploadImageBox>
                                                );
                                            })}
                                        </FlexBox>
                                        <DropZone
                                            onChange={(files) => {
                                                const uploadFiles = files.map((file) =>
                                                    Object.assign(file, { preview: URL.createObjectURL(file) })
                                                );
                                                setFiles(uploadFiles);
                                            }}
                                        />
                                    </Grid>
                                    <FlexBox className="justify-center py-2 items-stretch">
                                        <Button
                                            className="flex grow"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleSubmit();
                                            }}
                                            loading={loadingButton}
                                        >
                                            Save Changes
                                        </Button>
                                    </FlexBox>
                                        </form>
                                        </>
                            )}
                        </Formik>
                    </Grid>
                ) : (
                    <Paragraph>The User is not found</Paragraph>
                )}
            </Page>
        </ProtectedComponent>
    );
}

export async function getServerSideProps({ params }) {
    try {
        const userData = await (await axios(urlBuilder.next + `/api/users/${params.id}`)).data;
        if (!userData) return { notFound: true };
        return {
            props: { user: userData },
        };
    } catch (error) {
        console.log('SSR error: ', error.message);
        throw new Error(error);
    }
}
