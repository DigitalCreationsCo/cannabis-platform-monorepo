import {
    Category,
    ImageOrganization,
    ImageProduct,
    ImageUser,
    ImageVendor,
    Product,
    ProductWithDetails,
} from '@cd/data-access';
import {
    Button,
    FlexBox,
    Grid,
    Icons,
    IconWrapper,
    LoadingDots,
    Padding,
    Page,
    Paragraph,
    Row,
    TextField,
} from '@cd/shared-ui';
import axios from 'axios';
import { ClickableTags, DropZone, Modal, PageHeader, ProtectedComponent } from 'components';
import { Formik } from 'formik';
import { useCategory, useOnClickOutside } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { PropsWithChildren, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { urlBuilder } from 'utils';
import * as yup from 'yup';
import { useAppState } from '../../src/context/AppProvider';

const styleUploadWindow = ['h-[80px] w-[80px] border flex rounded-btn relative items-center justify-center bg-light'];
const UploadImageBox = ({ onClick, onKeyUp, children }: { onClick: any; onKeyUp?: any } & PropsWithChildren) => (
    <div onClick={onClick} onKeyUp={onKeyUp} className={twMerge(styleUploadWindow, 'indicator')}>
        <span className="indicator-item badge bg-primary w-5 h-5 p-0 items-center justify-center">
            <IconWrapper Icon={Icons.XIcon} size={8} className={'fill-light'} />
        </span>
        {children}
    </div>
);

const checkoutSchema = yup.object().shape({
    name: yup.string().required('required'),
    category: yup.array().min(1).required('required'),
    stock: yup.number().required('required'),
    price: yup.number().required('required'),
    unit: yup.string().required('required'),
    size: yup.number().required('required'),
    currency: yup.number().required('required'),
    basePrice: yup.number().required('required'),
    discount: yup.number().required('required'),
});

export type ImageAny = ImageOrganization | ImageProduct | ImageUser | ImageVendor;
export type ProductUpdatePayload = Product & {
    categories: any;
    images: ImageProduct[] & string;
    reviews: any;
    deleteImages?: ImageProduct[] & string;
    files?: ImageProduct[] | string;
};

export default function ProductDetails({ product }: { product: ProductWithDetails }) {
    const { isLoading, setIsLoading } = useAppState();
    const [productCategories, setProductCategories] = useState<Set<Category>>(new Set());
    const [files, setFiles] = useState<unknown[]>([]);
    const [loadingButton, setLoadingButton] = useState(false);
    const [existingImage, setExistingImage] = useState<ImageAny[]>(product?.variants[0]?.images || []);
    const [deletedImage, setDeletedImage] = useState<ImageAny[]>([]);
    const [searchCategoryTerms, setSearchCategoryTerms] = useState('');
    const { categorySearchResult, doSearchCategories } = useCategory();

    const [openModal, setModal] = useState(false);
    const toggleModal = () => {
        console.log('toggle');
        setModal((state) => !state);
    };

    const [openDropDown, setOpenDropDown] = useState(true);
    const dropDownRef = useRef(null);
    useOnClickOutside(dropDownRef, () => {
        setOpenDropDown(false);
    });

    const initialValues = {
        id: product?.id || '',
        name: product?.name || '',
        description: product?.description || '',
        features: product?.features || '',
        category: product?.categories || [],
        variants: product?.variants?.map((variant) => ({ ...variant })),
        // images: product?.images || [],
        // unit: product?.unit || "g",
        // size: product?.size || 0,
        // currency: product?.currency || "USD",
        // basePrice: product?.basePrice || 0,
        // discount: product?.discount || 0,
        // stock: product?.stock || 0,
        organizationId: product?.organizationId || '',
        organization: product?.organization,
        rating: product?.rating || 0,
        reviews: product?.reviews || [],
        tags: product?.tags || '',
        createdAt: product?.createdAt || new Date(),
        updatedAt: product?.updatedAt || new Date(),
    };

    async function handleFormSubmit(values: any) {
        try {
            if (product) {
                setLoadingButton(true);
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('description', values.description);
                formData.append('features', values.features);
                formData.append('categories', JSON.stringify(values.category));
                formData.append('images', JSON.stringify(values.images));
                formData.append('unit', values.unit);
                formData.append('size', values.size);
                formData.append('currency', values.currency);
                formData.append('basePrice', values.basePrice);
                formData.append('discount', values.discount);
                formData.append('stock', values.stock);
                formData.append('organizationId', values.organizationId);
                formData.append('rating', values.rating);
                formData.append('reviews', JSON.stringify(values.reviews));
                formData.append('tags', values.tags);
                formData.append('deleteImages', JSON.stringify(deletedImage));
                files.forEach((file: any) => formData.append('files', file));
                const { data } = await axios.put(urlBuilder.next + `/api/product-upload/${product.id}`, formData);
                setLoadingButton(false);
                toast.success(data);
                Router.push('/products');
            }
        } catch (error) {
            setLoadingButton(false);
            console.error(error);
            toast.error(error.response.statusText);
        }
    }

    const handleDeleteExistingImage = (image: ImageOrganization | ImageProduct | ImageUser | ImageVendor) => {
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
                    title="Edit Product"
                    Icon={Icons.Delivery}
                    Button={
                        <>
                            <Link href="/products">
                                <Button>Back to Products</Button>
                            </Link>
                            { product && <Button
                                // type="button"
                                onClick={(e) => {
                                    console.log('click');
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setModal(true);
                                }}
                            >
                                Edit Variants
                            </Button>}
                        </>
                    }
                />

                {isLoading ? (
                    <Padding>
                        <LoadingDots />
                    </Padding>
                ) : product ? (
                        <Grid className="md:w-2/3 px-3">
                            <Formik
                                initialValues={initialValues}
                                // validationSchema={checkoutSchema}
                                onSubmit={handleFormSubmit}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <>
                                        <Modal
                                            open={openModal}
                                            onClose={toggleModal}
                                            description="Product Variants"
                                        className="w-screen
                                            // min-w-full w-full sm:min-w-[600px] sm:w-[600px] px-0 sm:px-2 md:px-4
                                            "
                                        >
                                            <Grid className="px-0 space-y-2">
                                                <Row className="px-0 mx-0 justify-between">
                                                    <Paragraph className="justify-start w-[80px]">Sku</Paragraph>
                                                    <Paragraph className="justify-start w-[80px]">Stock</Paragraph>
                                                    <Paragraph className="justify-start w-[80px]">Size</Paragraph>
                                                    <Paragraph className="justify-start w-[80px]">Price</Paragraph>
                                                    <Paragraph className="justify-start w-[80px]">Discount</Paragraph>
                                                </Row>
                                                {product.variants &&
                                                    product.variants.map((v, index) => (
                                                        <Row
                                                            className={ twMerge('px-0 mx-0 justify-between',
                                                                !!touched.variants && 'bg-accent'
                                                            )}
                                                            key={'variant-' + index}
                                                        >
                                                            <Paragraph className="w-[80px] pr-2">
                                                                {v.sku}
                                                            </Paragraph>
                                                            <TextField
                                                                containerClassName="w-fit px-0 mx-0"
                                                                className="px-0 mx-0 w-[80px]"
                                                                name={`variants[${index}].stock`}
                                                                placeholder="Stock"
                                                                value={values?.variants?.[index].stock}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                            />
                                                            <TextField
                                                                containerClassName="w-fit px-0 mx-0"
                                                                className="px-0 mx-0 w-[80px]"
                                                                name={`variants[${index}].size`}
                                                                placeholder="Size"
                                                                value={values?.variants?.[index].size}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                            />
                                                            <TextField
                                                                containerClassName="w-fit px-0 mx-0"
                                                                className="px-0 mx-0 w-[80px]"
                                                                name={`variants[${index}].basePrice`}
                                                                placeholder="Price"
                                                                value={values?.variants?.[index].basePrice}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                            />
                                                            <TextField
                                                                containerClassName="w-fit px-0 mx-0"
                                                                className="px-0 mx-0 w-[80px]"
                                                                name={`variants[${index}].discount`}
                                                                placeholder="Discount"
                                                                value={values?.variants?.[index].discount}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                            />
                                                        </Row>
                                                    ))}
                                                <FlexBox className="justify-center">
                                                    {/* <Button onClick={() => setModal(false)}>Cancel</Button> */}
                                                    <Button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            toggleModal();
                                                        }}
                                                    >
                                                        Close
                                                    </Button>
                                                </FlexBox>
                                            </Grid>
                                        </Modal>

                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleSubmit();
                                            }}
                                        >
                                            <TextField
                                                name="name"
                                                label="Name"
                                                placeholder="Name"
                                                value={values.name}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.name && !!errors.name}
                                            />
                                            <TextField
                                                name="description"
                                                label="Description"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                value={values.description}
                                            />
                                            <FlexBox className="items-start">
                                                <label className="min-w-[111px] mt-2">Categories</label>
                                                <ClickableTags
                                                    values={productCategories}
                                                    setValues={setProductCategories}
                                                    valueKey="name"
                                                />
                                            </FlexBox>
                                            <Grid>
                                                <div className="relative z-10 dropdown w-full">
                                                    <TextField
                                                        className="shadow"
                                                        label={'Add Category'}
                                                        value={searchCategoryTerms}
                                                        onFocus={ (e) => {
                                                            doSearchCategories(e)
                                                            setOpenDropDown(true);
                                                        } }
                                                        // onBlur={ () => setOpenDropDown(false) }
                                                        onChange={ (e) => {
                                                            setSearchCategoryTerms(e.target.value);
                                                            doSearchCategories(e);
                                                            setOpenDropDown(true);
                                                        }}
                                                    />
                                                    <div className="dropdown-bottom w-full">
                                                        {openDropDown && categorySearchResult.length > 0 && (
                                                            <ul
                                                                ref={dropDownRef}
                                                                className="absolute z-10 ml-[126px] w-full rounded-btn shadow cursor-default"
                                                            >
                                                                {categorySearchResult.map((v, index) => {
                                                                    return (
                                                                        <li
                                                                            onClick={() => {
                                                                                if (
                                                                                    ![...productCategories].some(
                                                                                        (cat) => cat.name === v.name
                                                                                    )
                                                                                ) {
                                                                                    setProductCategories(
                                                                                        (state) =>
                                                                                            new Set([...state, v])
                                                                                    );
                                                                                }
                                                                            }}
                                                                            className={
                                                                                'bg-inverse z-20 px-4 p-2 hover:bg-accent-soft'
                                                                            }
                                                                            key={v.name + index}
                                                                        >
                                                                            {v['name']}
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                        </Grid>
                                        <TextField
                                                name="tags"
                                                label="Tags"
                                                onBlur={handleBlur}
                                                value={values.tags}
                                                onChange={handleChange}
                                                placeholder="Tag1, Tag2, Tag3"
                                            />
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
                                                    {files.map((file: {id: string, preview: string}, index) => {
                                                        return (
                                                            <UploadImageBox
                                                                key={index}
                                                                onClick={() => handleFileDelete(file)}
                                                                onKeyUp={() => {
                                                                    return 'thank yuo i almost pooed.';
                                                                }}
                                                            >
                                                                <Image
                                                                    src={file.preview}
                                                                    alt=""
                                                                    height={100}
                                                                    width={100}
                                                                />
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
                                            {/* <FlexBox>
                <TextField
                  name="stock"
                  label="Stock"
                  type="number"
                  placeholder="Stock"
                  onBlur={handleBlur}
                  value={values.stock}
                  onChange={handleChange}
                  error={!!touched.stock && !!errors.stock}
                  // helperText={touched.stock && errors.stock}
                    />
                    <Select className="max-w-fit">
                      { [ "grams" ].map(unit => (
                        <MenuItem key={ 'menu-item-' + unit } value={ unit }>
                          {unit}
                        </MenuItem>
                      ))}
                    </Select>
                  </FlexBox> */}
                                            
                                            {/* <TextField
                  name="basePrice"
                  type="number"
                  label="Regular Price"
                  onBlur={handleBlur}
                  value={values.basePrice}
                  onChange={handleChange}
                  placeholder="Regular Price"
                  error={!!touched.basePrice && !!errors.basePrice}
                  // helperText={touched.basePrice && errors.basePrice}
                /> */}
                                            {/* <TextField
                  type="number"
                  name="discount"
                  label="Discount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discount}
                  placeholder="Product Discount"
                /> */}
                                        <FlexBox className="justify-center py-2 items-stretch">
                                                <Button
                                                    className="flex grow bg-accent-soft hover:bg-accent"
                                                    // type="submit"
                                                    loading={loadingButton}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleSubmit();
                                                    }}
                                                >
                                                    Save Product
                                            </Button>
                                        </FlexBox>
                                        </form>
                                    </>
                                )}
                            </Formik>
                        </Grid>
                    ) : <Paragraph>The product is not found</Paragraph>}
            </Page>
        </ProtectedComponent>
    );
}

export async function getServerSideProps({ params }) {
    try {
        const product = await (await axios(urlBuilder.next + `/api/products/${params.id}`)).data;
        if (!product) return { notFound: true };
        return {
            props: { product },
        };
    } catch (error) {
        console.log('SSR error: ', error.message);
        throw new Error(error);
    }
}
