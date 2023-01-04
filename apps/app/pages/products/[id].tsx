import { Formik } from "formik";
import { Category, CurrencyName, ImageOrganization, ImageProduct, ImageUser, ImageVendor, Product, ProductWithDetails, Unit } from "@cd/data-access"
import { Button, Card, FlexBox, Grid, Icons, LoadingDots, Padding, Page, Paragraph, TextField } from "@cd/shared-ui";
import axios from "axios";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ClickableTags, MenuItem, PageHeader, ProductItem, ProtectedComponent, Select, Tag } from "components";
import { urlBuilder } from "utils";
import Image from "next/image";
import { useCategory, useOnClickOutside } from "hooks";
import * as yup from "yup";
import { twMerge } from "tailwind-merge";

// const StyledClear = styled(Clear)(() => ({
//   top: 5,
//   right: 5,
//   fontSize: 14,
//   cursor: "pointer",
//   position: "absolute",
// }));

const styleUploadWindow = ["h-[80px] w-[80px] flex overflow-hidden rounded-btn relative items-center justify-center bg-light"]
const UploadImageBox = (props: PropsWithChildren) => (
  <div className={twMerge(styleUploadWindow)}>{ props.children }</div>);
    
const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  category: yup.array().min(1).required("required"),
  stock: yup.number().required("required"),
  price: yup.number().required("required"),
  unit: yup.string().required("required"),
  size: yup.number().required("required"),
  currency: yup.number().required("required"),
  basePrice: yup.number().required("required"),
  discount: yup.number().required("required"),
  // salePrice:  yup.number().required("required"),
});

export type ImageAny = ImageOrganization | ImageProduct | ImageUser | ImageVendor

export default function ProductDetails() {
  const { query } = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ product, setProduct ] = useState<ProductWithDetails>();
  const [ productCategories, setProductCategories ] = useState(new Set());
  const [loadingButton, setLoadingButton] = useState(false);
  const [deletedImage, setDeletedImage] = useState<ImageAny[]>([]);
  const [ existingImage, setExistingImage ] = useState<ImageAny[]>([]);
  const [ searchCategoryTerms, setSearchCategoryTerms ] = useState("")
  const { categoryList, categorySearchResult, notFoundCategories, doSearchCategories } = useCategory();
  // categoryList: category list
  // categorySearchResult - filtered categories from searchTerms
  // doSearchCategories - filter function
  const [ openDropDown, setOpenDropDown ] = useState(true)
  const dropDownRef = useRef(null);
  useOnClickOutside(dropDownRef, () => {
      setOpenDropDown(false);
  });

  const fetchProductDetails = async () => {
    try {
      const { data } = await axios(urlBuilder.next + `/api/products/${query.id}`);
      setExistingImage(data.images);
      setProduct(data);
      setProductCategories(state => new Set([ ...state, ...data.categories ]))
      setLoading(false);
    } catch (error) {
      setLoadingButton(false);
      setLoading(false)
      console.error(error)
      toast.error(error.response?.statusText || error.message);
    }
  };

  useEffect(() => {
    if (query?.id) {
      fetchProductDetails()
    }
  }, [query]);

  const initialValues = {
    id: product?.id || "",
    name: product?.name || "",
    description: product?.description || "",
    features: product?.features || "",
    category: product?.categories || [],
    images: product?.images || [],
    unit: product?.unit || "g",
    size: product?.size || 0,
    currency: product?.currency || "USD",
    basePrice: product?.basePrice || 0,
    discount: product?.discount || 0,
    // salePrice: product?.salePrice || 0,
    stock: product?.stock || 0,
    organizationId: product?.organizationId || "",
    organization: product?.organization,
    rating: product?.rating || 0,
    reviews: product?.reviews || [],
    tags: product?.tags || "",
    createdAt: product?.createdAt || new Date(),
    updatedAt: product?.updatedAt || new Date()
  };

  // add more values
  const handleFormSubmit = async (values: any) => {
    try {
      if (product) {
        setLoadingButton(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("features", values.features);
        formData.append("categories", JSON.stringify(values.category));
        formData.append("images", JSON.stringify(values.images));
        formData.append("unit", values.unit);
        formData.append("size", values.size);
        formData.append("currency", values.currency);
        formData.append("basePrice", values.basePrice);
        formData.append("discount", values.discount);
        // formData.append("salePrice", values.salePrice);
        formData.append("stock", values.stock);
        formData.append("organizationId", values.organizationId);
        formData.append("rating", values.rating);
        formData.append("reviews", JSON.stringify(values.reviews));
        formData.append("tags", values.tags);
        formData.append("deleteImages", JSON.stringify(deletedImage));
        files.forEach((file: any) => formData.append("files", file));

        console.log('form data: ', formData)
        // update route
        // await axios.put(`/api/product-upload/${product?.id}`, formData: Product);
        setLoadingButton(false);
        toast.success("Product Update Successfully");
        // Router.push("/products");
      }
    } catch (error) {
      setLoadingButton(false);
      setLoading(false)
      console.error(error)
      toast.error(error.response.statusText);
    }
  };

  const handleDeleteExistingImage = (image: ImageOrganization | ImageProduct | ImageUser | ImageVendor) => {
    let id = image.id
    setExistingImage((state) => state.filter((image) => id !== image.id));
    setDeletedImage((state) => [ ...state, image ]);
  };

  const handleFileDelete = (file: File) => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };

  return (
    <ProtectedComponent>
      <Page>
        <PageHeader
          title="Edit Product"
          Icon={Icons.Delivery}
          Button={
            <Link href="/products">
              <Button>
                Back to Products
              </Button>
            </Link>
          }
        />

        {loading && <Padding><LoadingDots /></Padding> || product && (
          <Grid className="md:w-2/3 px-3">
            <Formik
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              onSubmit={handleFormSubmit}
            >
            { ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) =>
             <>
              <TextField
                name="name"
                label="Name"
                placeholder="Name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
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
                <label className="min-w-[111px] mt-2">Category</label>
                <ClickableTags
                  values={ productCategories }
                  setValues={ setProductCategories }
                  valueKey="name"
                />
              </FlexBox>
              <div className="relative dropdown w-full">
                <TextField
                  className="shadow"
                  label={ "Add Category" }
                  value={ searchCategoryTerms }
                  onFocus={ () => setOpenDropDown(true) }
                  onBlur={ () => setSearchCategoryTerms("") }
                  onChange={ (e) => {
                    doSearchCategories(e)
                    setSearchCategoryTerms(e.target.value)
                  } }
                />
                <div className="dropdown-bottom w-full">
                  { openDropDown && categorySearchResult.length > 0 && 
                    <ul ref={dropDownRef} className="absolute z-10 ml-[126px] w-full rounded-btn shadow cursor-default">
                      { categorySearchResult.map((v, index) => {
                        return (
                          <li
                            onClick={ () => {
                              // console.log('category: ', v)
                              if (![...productCategories].some((cat) => cat.name === v.name)) {
                                setProductCategories(state => new Set([ ...state, v ]))
                              }
                            } }
                            className={ "bg-inverse z-20 px-4 p-2 hover:bg-accent-soft" }
                            key={ v + index }
                          >
                            { v[ "name" ] }
                          </li>);
                      })}
                    </ul>
                  }
                </div>
              </div>
                
                {/* <DropZone
                  onChange={(files) => {
                    const uploadFiles = files.map((file) =>
                      Object.assign(file, { preview: URL.createObjectURL(file) })
                    );
                    setFiles(uploadFiles);
                  }}
                /> */}
                <FlexBox>
                  {existingImage.map((image: any, index) => {
                    return (
                      // <Image key={'product-image-' + index} src={ image.location } alt="" height={ 100 } width={ 100 } />
                      <UploadImageBox key={ index }>
                        hello existingImage
                        {/* <img src={image.location} width="100%" />
                        <StyledClear onClick={() => handleDeleteExistingImage(image)} /> */}
                      </UploadImageBox>
                    );
                  })}

                  {files.map((file, index) => {
                    return (
                      // <Image src={ file.preview } alt="" height={ 100 } width={ 100 } />
                      <UploadImageBox key={ index }>
                        hello files
                        {/* <img src={file.preview} width="100%" />
                        <StyledClear onClick={() => handleFileDelete(file)} /> */}
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
                
                <TextField
                  name="stock"
                  label="Stock"
                  type="number"
                  placeholder="Stock"
                  onBlur={handleBlur}
                  value={values.stock}
                  onChange={handleChange}
                  error={!!touched.stock && !!errors.stock}
                  helperText={touched.stock && errors.stock}
                />
                <TextField
                  name="tags"
                  label="Tags"
                  onBlur={handleBlur}
                  value={values.tags}
                  onChange={handleChange}
                  placeholder="Tag1, Tag2, Tag3"
                />
                <TextField
                  name="basePrice"
                  type="number"
                  label="Regular Price"
                  onBlur={handleBlur}
                  value={values.basePrice}
                  onChange={handleChange}
                  placeholder="Regular Price"
                  error={!!touched.basePrice && !!errors.basePrice}
                  helperText={touched.basePrice && errors.basePrice}
                />
                <TextField
                  type="number"
                  name="discount"
                  label="Discount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discount}
                  placeholder="Product Discount"
                />
                <FlexBox>
                  <label className="min-w-[111px]">Unit</label>
                  <Select className="max-w-fit">
                    { [ "grams" ].map(unit => (
                      <MenuItem key={ 'menu-item-' + unit } value={ unit }>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </FlexBox>

                <Grid>
                  <Button
                    onClick={handleSubmit}
                    loading={loadingButton}
                  >
                    Save Product
                  </Button>
                </Grid>
                </>
              }
              </Formik>
          </Grid>
        ) 
        || <Paragraph>The product is not found</Paragraph>
        }
      </Page>
    </ProtectedComponent>
  );
};
