// import { Delete } from "@mui/icons-material";
// import { LoadingButton } from "@mui/lab";
// import { Box, Button, Divider, Grid, IconButton, TextField } from "@mui/material";
// import axios from "axios";
// import FlexBox from "components/FlexBox";
// import Loading from "components/Loading";
// import ReactQuill from "components/ReactQuill";
// import { H3, H6 } from "components/Typography";
// import { FieldArray, Formik } from "formik";
// import useFetchSiteSetting from "hooks/useFetchSiteSetting";
// import React, { FC, useState } from "react";
// import toast from "react-hot-toast";
// import { db_slug } from "utils/constants";

// const FooterSettings: FC = () => {
//   const [logo, setLogo] = useState<File>();
//   const [loadingButton, setLoadingButton] = useState(false);
//   const { data, loading, refetch } = useFetchSiteSetting(`/api/settings/${db_slug.footer_setting}`);

//   const initialValues = {
//     footer_description: data?.description || "",

//     column_two_heading: data?.column_two?.heading || "",
//     column_two_links: data?.column_two?.links || [],

//     column_three_heading: data?.column_three?.heading || "",
//     column_three_links: data?.column_three?.links || [],

//     column_four_heading: data?.column_four?.heading || "",
//     column_four_description: data?.column_four?.description || "",
//   };

//   const handleFormSubmit = async (values) => {
//     setLoadingButton(true);

//     try {
//       const column_two = {
//         heading: values.column_two_heading,
//         links: values.column_two_links,
//       };
//       const column_three = {
//         heading: values.column_three_heading,
//         links: values.column_three_links,
//       };

//       const column_four = {
//         heading: values.column_four_heading,
//         description: values.column_four_description,
//       };

//       const formData = new FormData();
//       formData.append("file", logo);
//       formData.append("settings_name", "Footer Setting");
//       formData.append("description", values.footer_description);
//       formData.append("column_two", JSON.stringify(column_two));
//       formData.append("column_three", JSON.stringify(column_three));
//       formData.append("column_four", JSON.stringify(column_four));

//       await axios.post("/api/settings/footer", formData);
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
//     <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
//       {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <H6 mb={1}>Footer Logo</H6>
//               <label htmlFor="site_logo">
//                 <Box
//                   sx={{
//                     cursor: "pointer",
//                     border: "1px solid",
//                     padding: "5px 10px",
//                     borderRadius: "4px",
//                     color: "primary.main",
//                     display: "inline-block",
//                     borderColor: "primary.main",
//                   }}
//                 >
//                   Upload
//                 </Box>
//               </label>

//               <input
//                 hidden
//                 type="file"
//                 id="site_logo"
//                 accept="image/*"
//                 onChange={(e) => setLogo(e.target.files[0])}
//               />

//               {data?.logo && (
//                 <Box mt={2} bgcolor="primary.200" maxWidth={130} padding={1}>
//                   <img src={data?.logo?.location} width="100%" />
//                 </Box>
//               )}
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 rows={4}
//                 multiline
//                 fullWidth
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 name="footer_description"
//                 label="Footer Description"
//                 value={values.footer_description}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Divider />
//             </Grid>

//             <FieldArray
//               name="column_two_links"
//               render={(arrayHelper) => (
//                 <>
//                   <Grid item xs={12}>
//                     <FlexBox alignItems="center" justifyContent="space-between">
//                       <H3>Second Column Content</H3>

//                       <Button
//                         color="primary"
//                         variant="contained"
//                         onClick={() => {
//                           arrayHelper.push({ id: Date.now(), name: "", link: "" });
//                         }}
//                       >
//                         Add Item
//                       </Button>
//                     </FlexBox>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       onBlur={handleBlur}
//                       label="Heading Name"
//                       onChange={handleChange}
//                       name="column_two_heading"
//                       value={values.column_two_heading}
//                     />
//                   </Grid>

//                   {values.column_two_links?.map((item, index) => (
//                     <Grid item container spacing={2} key={item.id}>
//                       <Grid item xs={5}>
//                         <TextField
//                           fullWidth
//                           label="Name"
//                           value={item.name}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           name={`column_two_links.${index}.name`}
//                         />
//                       </Grid>

//                       <Grid item xs={5}>
//                         <TextField
//                           fullWidth
//                           label="Link"
//                           value={item.link}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           name={`column_two_links.${index}.link`}
//                         />
//                       </Grid>

//                       <Grid item xs={2}>
//                         <IconButton onClick={() => arrayHelper.remove(index)}>
//                           <Delete />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   ))}
//                 </>
//               )}
//             />

//             <Grid item xs={12}>
//               <Divider />
//             </Grid>

//             <FieldArray
//               name="column_three_links"
//               render={(arrayHelper) => (
//                 <>
//                   <Grid item xs={12}>
//                     <FlexBox alignItems="center" justifyContent="space-between">
//                       <H3>Third Column Content</H3>

//                       <Button
//                         color="primary"
//                         variant="contained"
//                         onClick={() => {
//                           arrayHelper.push({ id: Date.now(), name: "", link: "" });
//                         }}
//                       >
//                         Add Item
//                       </Button>
//                     </FlexBox>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       onBlur={handleBlur}
//                       label="Heading Name"
//                       onChange={handleChange}
//                       name="column_three_heading"
//                       value={values.column_three_heading}
//                     />
//                   </Grid>

//                   {values.column_three_links?.map((item, index) => (
//                     <Grid item container spacing={2} key={item.id}>
//                       <Grid item xs={5}>
//                         <TextField
//                           fullWidth
//                           label="Name"
//                           value={item.name}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           name={`column_three_links.${index}.name`}
//                         />
//                       </Grid>

//                       <Grid item xs={5}>
//                         <TextField
//                           fullWidth
//                           label="Link"
//                           value={item.link}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           name={`column_three_links.${index}.link`}
//                         />
//                       </Grid>

//                       <Grid item xs={2}>
//                         <IconButton onClick={() => arrayHelper.remove(index)}>
//                           <Delete />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   ))}
//                 </>
//               )}
//             />

//             <Grid item xs={12}>
//               <Divider />
//             </Grid>

//             <Grid item xs={12}>
//               <H3 mb={3}>Four Column Content</H3>

//               <TextField
//                 fullWidth
//                 label="Heading"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 name="column_four_heading"
//                 value={values.column_four_heading}
//                 sx={{ mb: 3 }}
//               />

//               <ReactQuill
//                 box_height={200}
//                 value={values.column_four_description}
//                 onChange={(value) => setFieldValue("column_four_description", value)}
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

export default function FooterSettings() {
    return <div>Footer Settings</div>;
}
