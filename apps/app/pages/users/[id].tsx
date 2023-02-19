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
import { AddAddressUserModal, ConfirmationModal, DropZone, Modal, PageHeader, ProtectedComponent } from 'components';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { renderAddress, urlBuilder } from 'utils';
import * as yup from 'yup';
import { useAppState } from '../../src/context/AppProvider';

// Will need to test admin level privelege for some api routes, like users/[id]
// will use this component to protect those routes from non-admin users

// To Do:
// finish createAddress api routes, add test cases
// add Address modal, use update modal?
// move edit modal to its own component?
// clean up the edit modal, to close without mutating state, or save changes when pressing the close button.
// its very close to being clean, but not quite there yet.
// test, test, test
//check admin privelege for these modals
// create update record api route

export default function UserDetails({ user }: { user: UserWithDetails }) {
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
        updatedAt: user?.updatedAt || new Date()
    };

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('required'),
        lastName: yup.string().required('required'),
        username: yup.string().required('required'),
        email: yup.string().required('required'),
        dialCode: yup.number().required('required'),
        phone: yup.number().required('required'),
        address: yup.array().min(1).required('required')
    });
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleFormSubmit
    });
    const { isLoading } = useAppState();
    const [files, setFiles] = useState<unknown[]>([]);
    const [loadingButton, setLoadingButton] = useState(false);
    const [existingImage, setExistingImage] = useState<ImageUser[]>(user?.imageUser || []);
    const [deletedImage, setDeletedImage] = useState<ImageUser[]>([]);

    const [address, setAddress] = useState<Address[]>(values.address || []);
    const [addressAddModal, setAddressAddModal] = useState(false);

    const [addressUpdate, setAddressUpdate] = useState<Address>();
    const handleAddressUpdate = (event, fieldName) =>
        setAddressUpdate((prev) => ({ ...prev, fieldName: event.target.value }));
    const [addressUpdateIndex, setAddressUpdateIndex] = useState<number>();
    const [addressUpdateModal, setAddressUpdateModal] = useState(false);
    const [addressDeleteIndex, setAddressDeleteIndex] = useState<number>();
    const [addressDeleteModal, setAddressDeleteModal] = useState(false);

    useEffect(() => {
        setAddress(values.address);
    }, [values.address]);

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

    async function handleAddressDelete({ addressId, userId }: { addressId: Address['id']; userId: User['id'] }) {
        try {
            const { data } = await axios.delete(urlBuilder.next + `/api/users/${userId}/address/${addressId}`);
            setAddress(address.filter((address) => address.id !== addressId));
            toast.success(data);
        } catch (error) {
            console.error(error);
            toast.error(error.response.statusText);
        }
    }

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
                            <>
                                
                                {/* check admin privelege for these modals */}
                                <AddAddressUserModal description={'Add a new address'} userId={user?.id} setState={setAddress} open={ addressAddModal} onClose={ () => setAddressAddModal(false)} />

                                <Modal className="px-10 border"
                                    description={ `Edit Address` }
                                    open={ addressUpdateModal }
                                    onClose={ () => {
                                        setAddressUpdateModal(false);
                                        setAddressUpdateIndex(null);
                                    } }>
                                    <Grid className='space-y-4'>
                                        <FlexBox className='flex-col space-x-0 space-y-1'>
                                    <TextField
                                        name={ `addressUpdate.street1` } label="Street Line 1" placeholder="Street Line 1"
                                        value={addressUpdate?.street1}
                                        onBlur={handleBlur}
                                                onChange={ e => handleAddressUpdate(e, 'street1') } />
                                            
                                    <TextField
                                        name={ `address[${addressUpdateIndex}].street2` } label="Street Line 2" placeholder="Street Line 2"
                                        value={addressUpdate?.street2}
                                        onBlur={handleBlur}
                                                onChange={ e => handleAddressUpdate(e, 'street2') } />
                                            
                                        <TextField
                                        name={ `address[${addressUpdateIndex}].city` } label="City" placeholder="City"
                                        value={addressUpdate?.city}
                                        onBlur={handleBlur}
                                                onChange={ e => handleAddressUpdate(e, 'city') } />
                                            
                                        <TextField
                                        name={ `state` } label="State" placeholder="State"
                                        value={addressUpdate?.state}
                                        onBlur={handleBlur}
                                                onChange={ e => handleAddressUpdate(e, 'state') } />
                                            
                                        <TextField
                                        name={ `address[${addressUpdateIndex}].country` } label="Country" placeholder="Country"
                                        value={addressUpdate?.country}
                                        onBlur={handleBlur}
                                                onChange={ e => handleAddressUpdate(e, 'country') } />
                                            
                                        <TextField
                                        name={ `address[${addressUpdateIndex}].zipcode` } label="Zipcode" placeholder="Zipcode"
                                        value={addressUpdate?.zipcode}
                                        onBlur={handleBlur}
                                        onChange={ e => handleAddressUpdate(e, 'zipcode') } />
                                        </FlexBox>
                                        <FlexBox className="justify-center">
                                            <Button onClick={ () => {
                                                setFieldValue('address', addressUpdate);
                                                setAddressUpdate(null)
                                                setAddressUpdateModal(false); toast.success('Please save your changes.');
                                            } }>Close</Button></FlexBox>
                                    </Grid>
                                </Modal>
                                
                                <ConfirmationModal
                                    showCloseButton={false}
                                    onClose={ () => { setAddressDeleteModal(false); setAddressDeleteIndex(null); }}
                                    open={ addressDeleteModal }
                                    handleConfirm={() => handleAddressDelete({ addressId: address?.[addressDeleteIndex]?.id, userId: user?.id })}
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
                                            value={values?.firstName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.firstName && !!errors.firstName}
                                        />
                                        <TextField
                                            name="lastName"
                                            label="Last Name"
                                            placeholder="Last Name"
                                            value={values?.lastName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.lastName && !!errors.lastName}
                                        />
                                        <TextField
                                            name="username"
                                            label="UserName"
                                            placeholder="UserName"
                                            value={values?.username}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.username && !!errors.username}
                                        />
                                        <TextField
                                            name="email"
                                            label="Email"
                                            placeholder="Email"
                                            value={values?.email}
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
                                                value={values?.dialCode}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.dialCode && !!errors.dialCode}
                                            />
                                            <TextField
                                                name="phone"
                                                label="Phone"
                                                placeholder="Phone"
                                                value={values?.phone}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.phone && !!errors.phone}
                                            />
                                        </FlexBox>
                                                
                                        <FlexBox>
                                            <FlexBox className="min-w-[111px] items-start">
                                                <label>Addresses</label>
                                                </FlexBox>
                                            <Button
                                                onClick={ (e) => {
                                                    e.preventDefault();
                                                        e.stopPropagation();
                                                    setAddressAddModal(true);
                                                } }
                                                size='sm'
                                                transparent
                                                border
                                            >
                                                Add Address
                                            </Button>
                                        </FlexBox>
                                        {address.length > 0 ? address.map((address, index) => (
                                            <Card key={`address-${index}`} className={'w-full px-3 flex-row justify-between items-center'}>
                                                { renderAddress(address) }

                                                <FlexBox className="max-w-fit">
                                                    <Button className={"w-1/2"} onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setAddressUpdate(values.address[index])
                                                        setAddressUpdateIndex(index);
                                                        setAddressUpdateModal(true);
                                                    }}>Edit</Button>
                                                    <DeleteButton className={ "w-1/2" } label={ false } onClick={ (e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setAddressDeleteIndex(index)
                                                        setAddressDeleteModal(true)
                                                    } } />
                                                </FlexBox>
                                            </Card>
                                        )): <Card>This user has no address listed.</Card>}
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
        // console.log('SSR user: ', userData)
        return {
            props: { user: userData },
        };
    } catch (error) {
        console.log('SSR error: ', error.message);
        throw new Error(error);
    }
}
