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
import { CurrencyName, ImageOrganization, ImageProduct, ImageUser, ImageVendor, ProductWithDetails, Unit } from "@cd/data-access"
import { Button, Card, FlexBox, Grid, Icons, LoadingDots, Padding, Page, Paragraph, TextField } from "@cd/shared-ui";
import axios from "axios";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PageHeader, ProductItem, ProtectedComponent } from "components";
import { urlBuilder } from "utils";
import Image from "next/image";
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
  // const { categories } = useCategory();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductWithDetails>();
  const [loadingButton, setLoadingButton] = useState(false);
  const [deletedImage, setDeletedImage] = useState<ImageAny[]>([]);
  const [existingImage, setExistingImage] = useState<ImageAny[]>([]);

  const fetchProductDetails = async () => {
    try {
      const { data } = await axios(urlBuilder.next + `/api/products/${query.id}`);
      setExistingImage(data.images);
      setProduct(data);
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
    categories: product?.categories || [],
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
          <Grid className="md:w-2/3">
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
              <Grid className="space-y-2">
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
                <label id="category">Select Category</label>
                {/* <Select
                  multiple
                  name="category"
                  labelId="category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  input={<OutlinedInput label="Select Category" />}
                >
                  {categories.map((item) => (
                    <MenuItem value={item.name} key={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select> */}
                {/* <DropZone
                  onChange={(files) => {
                    const uploadFiles = files.map((file) =>
                      Object.assign(file, { preview: URL.createObjectURL(file) })
                    );
                    setFiles(uploadFiles);
                  }}
                /> */}
                <FlexBox>
                  {existingImage.map((image: any, i) => {
                    return (
                      <Image src={ image.location } alt="" height={ 100 } width={ 100 } />
                      // <UploadImageBox key={i}>
                      //   <img src={image.location} width="100%" />
                      //   <StyledClear onClick={() => handleDeleteExistingImage(image)} />
                      // </UploadImageBox>
                    );
                  })}

                  {files.map((file, index) => {
                    return (
                      <Image src={ file.preview } alt="" height={ 100 } width={ 100 } />
                      // <UploadImageBox key={index}>
                      //   <img src={file.preview} width="100%" />
                      //   <StyledClear onClick={() => handleFileDelete(file)} />
                      // </UploadImageBox>
                    );
                  })}
                </FlexBox>
                <TextField
                  name="description"
                  label="Description"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  // placeholder="Description"
                  // value={values.description}
                />
                <TextField
                  name="stock"
                  label="Stock"
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
                <TextField
                  name="unit"
                  label="Unit"
                  // value={values.unit}
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  // placeholder="Product Unit"
                />
              </Grid>

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
