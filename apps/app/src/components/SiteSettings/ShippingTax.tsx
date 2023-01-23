// import { LoadingButton } from "@mui/lab";
// import { Grid, TextField } from "@mui/material";
// import axios from "axios";
// import Loading from "components/Loading";
// import { Formik } from "formik";
// import useFetchSiteSetting from "hooks/useFetchSiteSetting";
// import React, { FC, useState } from "react";
// import toast from "react-hot-toast";
// import { db_slug } from "utils/constants";

// const ShippingTax: FC = () => {
//   const [loadingButton, setLoadingButton] = useState(false);
//   const { data, loading, refetch } = useFetchSiteSetting(`/api/settings/${db_slug.shipping_vat}`);

//   const initialValues = {
//     vat: data?.vat || 0,
//     shipping: data?.shipping_charge || 0,
//   };

//   const handleFormSubmit = async (values) => {
//     setLoadingButton(true);

//     try {
//       await axios.post("/api/settings/shipping-vat", {
//         vat: values.vat,
//         name: "Shipping and Vat",
//         shipping: values.shipping,
//       });

//       toast.success("Data updated successfully");
//       refetch();
//       setLoadingButton(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setLoadingButton(false);
//     }
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
//       {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <Grid container spacing={3}>
//             <Grid item md={7} xs={12}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 name="shipping"
//                 onBlur={handleBlur}
//                 label="Shipping Charge"
//                 onChange={handleChange}
//                 value={values.shipping}
//                 error={!!touched.shipping && !!errors.shipping}
//                 helperText={touched.shipping && errors.shipping}
//               />
//             </Grid>

//             <Grid item md={7} xs={12}>
//               <TextField
//                 fullWidth
//                 name="vat"
//                 label="VAT"
//                 type="number"
//                 value={values.vat}
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 error={!!touched.vat && !!errors.vat}
//                 helperText={touched.vat && errors.vat}
//               />
//             </Grid>
//           </Grid>

//           <LoadingButton
//             type="submit"
//             color="primary"
//             variant="contained"
//             loading={loadingButton}
//             sx={{ mt: 4 }}
//           >
//             Save Changes
//           </LoadingButton>
//         </form>
//       )}
//     </Formik>
//   );
// };

function ShippingTax() {
    return <div>Shipping Tax and Fees</div>;
}
export default ShippingTax;
