// import { Clear } from "@mui/icons-material";
// import { LoadingButton } from "@mui/lab";
// import { Box, Button, Card, Grid, InputLabel, MenuItem, Select, styled } from "@mui/material";
// import FormControl from "@mui/material/FormControl";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import TextField from "@mui/material/TextField";
// import axios from "axios";
// import DropZone from "components/DropZone";
// import FlexBox from "components/FlexBox";
// import DeliveryBox from "components/icons/DeliveryBox";
// import AdminDashboardLayout from "components/layout/AdminDashboardLayout";
// import AdminDashboardNavigation from "components/layout/AdminDashboardNavigation";
// import DashboardPageHeader from "components/layout/DashboardPageHeader";
// import Loading from "components/Loading";
// import { Formik } from "formik";
// import useCategory from "hooks/useCategory";
import { Category, CurrencyName, ImageOrganization, ImageProduct, ImageUser, ImageVendor, ProductWithDetails, Unit } from "@cd/data-access"
import { Button, Card, FlexBox, Grid, Icons, LoadingDots, Padding, Page, Paragraph, TextField } from "@cd/shared-ui";
import axios from "axios";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ClickableTags, MenuItem, PageHeader, ProductItem, ProtectedComponent, Select, Tag } from "components";
import { urlBuilder } from "utils";
import Image from "next/image";
import { useCategory, useOnClickOutside } from "../../src/hooks";
// import toast from "react-hot-toast";
// import * as yup from "yup";
// import { Product } from "__types__/common";

// const StyledClear = styled(Clear)(() => ({
//   top: 5,
//   right: 5,
//   fontSize: 14,
//   cursor: "pointer",
//   position: "absolute",
// }));

// const UploadImageBox = styled(Box)(({ theme }) => ({
//   width: 80,
//   height: 80,
//   display: "flex",
//   overflow: "hidden",
//   borderRadius: "8px",
//   position: "relative",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor: theme.palette.primary.light,
// }));

// const checkoutSchema = yup.object().shape({
//   name: yup.string().required("required"),
//   category: yup.array().min(1).required("required"),
//   stock: yup.number().required("required"),
//   price: yup.number().required("required"),
// });

export type ImageAny = ImageOrganization | ImageProduct | ImageUser | ImageVendor

export default function ProductDetails() {
  const { query } = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ product, setProduct ] = useState<ProductWithDetails | []>([]);
  const [ productCategories, setProductCategories ] = useState(new Set());
  const [loadingButton, setLoadingButton] = useState(false);
  const [deletedImage, setDeletedImage] = useState<ImageAny[]>([]);
  const [ existingImage, setExistingImage ] = useState<ImageAny[]>([]);
  const [ searchCategoryTerms, setSearchCategoryTerms ] = useState("")
  const { categories, resultList, notFoundResult, doSearchCategories } = useCategory();
  const [ openDropDown, setOpenDropDown ] = useState(true)
  const dropDownRef = useRef(null);
  useOnClickOutside(dropDownRef, () => {
      setOpenDropDown(false);
  });
  // categories - category list
  // resultList - filtered categories from searchTerms
  // doSearchCategories - filter function

  const fetchProductDetails = async () => {
    try {
      const { data } = await axios(urlBuilder.next + `/api/products/${query.id}`);
      console.log(data)
      setExistingImage(data.images);
      setProduct(data);
      data.categories.forEach(category => setProductCategories(state => state.add(category)))
      // setProductCategories(state => new Set([ ...data.categories ]))
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

  const initialValues = product && {
    id: product?.id || "",
    name: product?.name || "",
    description: product?.description || "",
    features: product?.features || "",
    category: product?.categories || [],
    // images: product?.images || [],
    unit: product?.unit || "g",
    size: product?.size || 0,
    // currency: product?.currency || "USD",
    basePrice: product?.basePrice || 0,
    discount: product?.discount || 0,
    // salePrice: product?.salePrice || 0,
    stock: product?.stock || 0,
    organizationId: product?.organizationId || "",
    organization: product.organization,
    rating: product?.rating || 0,
    // reviews: product?.reviews || [],
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
        formData.append("unit", values.unit);
        formData.append("stock", values.stock);
        formData.append("price", values.price);
        formData.append("discount", values.discount);
        formData.append("description", values.description);
        formData.append("tags", values.tags);
        formData.append("categories", JSON.stringify(values.category));
        formData.append("deleteImages", JSON.stringify(deletedImage));
        files.forEach((file: any) => formData.append("files", file));

        await axios.put(`/api/product-upload/${product?.id}`, formData);
        setLoadingButton(false);
        toast.success("Product Update Successfully");
        Router.push("/products");
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
    // setDeletedImage((state) => [ ...state, { Key: image.key } ]);
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
            <Link href="products">
              <Button>
                Back to Products
              </Button>
            </Link>
          }
        />

        {loading && <Padding><LoadingDots /></Padding> || product && (
          <Grid className="md:w-2/3 px-3">
            {/* <Formik
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              onSubmit={handleFormSubmit}
            > */}
              {/*
              { ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (*/}
              <>
              {/* <Grid>
                <FlexBox className="grow">
                  <ProductItem className="grow" product={ product } />
                </FlexBox>
              </Grid> */}
                <TextField
                  name="name"
                  label="Name"
                  placeholder="Name"
                  // value={values.name}
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  // error={!!touched.name && !!errors.name}
                  // helperText={touched.name && errors.name}
                />
                <TextField
                  name="description"
                  label="Description"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  // placeholder="Description"
                  // value={values.description}
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
              {/* <div className="relative dropdown dropdown-bottom flex-col w-full space-x-0"> */}
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
                {/* <div className="pl-[121px] w-full dropdown-content"> */}
                  { openDropDown && resultList.length > 0 && 
                    <ul ref={dropDownRef} className="absolute pl-[121px] z-10 border w-full rounded-btn shadow cursor-default">
                      { resultList.map((v, index) => {
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
                      <Image key={'product-image-' + index} src={ image.location } alt="" height={ 100 } width={ 100 } />
                      // <UploadImageBox key={i}>
                      //   <img src={image.location} width="100%" />
                      //   <StyledClear onClick={() => handleDeleteExistingImage(image)} />
                      // </UploadImageBox>
                    );
                  })}

                  {/* {files.map((file, index) => {
                    return (
                      <Image src={ file.preview } alt="" height={ 100 } width={ 100 } />
                      // <UploadImageBox key={index}>
                      //   <img src={file.preview} width="100%" />
                      //   <StyledClear onClick={() => handleFileDelete(file)} />
                      // </UploadImageBox>
                    );
                  })} */}
                </FlexBox>
                
                <TextField
                  name="stock"
                  label="Stock"
                  type="number"
                  placeholder="Stock"
                  // onBlur={handleBlur}
                  // value={values.stock}
                  // onChange={handleChange}
                  // error={!!touched.stock && !!errors.stock}
                  // helperText={touched.stock && errors.stock}
                />
                <TextField
                  name="tags"
                  label="Tags"
                  // onBlur={handleBlur}
                  // value={values.tags}
                  // onChange={handleChange}
                  // placeholder="Tag1, Tag2, Tag3"
                />
                <TextField
                  name="price"
                  type="number"
                  label="Regular Price"
                  // onBlur={handleBlur}
                  // value={values.price}
                  // onChange={handleChange}
                  // placeholder="Regular Price"
                  // error={!!touched.price && !!errors.price}
                  // helperText={touched.price && errors.price}
                />
                <TextField
                  type="number"
                  name="discount"
                  label="Discount"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  // value={values.discount}
                  // placeholder="Product Discount"
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
                    // onClick={handleSubmit}
                    loading={loadingButton}
                  >
                    Save Product
                  </Button>
                </Grid>
                </>
              {/* )} */}
              {/* </Formik>  */ }
          </Grid>
        ) 
        || <Paragraph>The product is not found</Paragraph>
        }
      </Page>
    </ProtectedComponent>
  );
};
