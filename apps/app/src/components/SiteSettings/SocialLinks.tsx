// import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
// import { LoadingButton } from "@mui/lab";
// import { Divider, Grid, TextField } from "@mui/material";
// import axios from "axios";
// import AppleStore from "components/icons/AppleStore";
// import PlayStore from "components/icons/PlayStore";
// import Loading from "components/Loading";
// import { H3 } from "components/Typography";
// import { Formik } from "formik";
// import useFetchSiteSetting from "hooks/useFetchSiteSetting";
// import React, { FC, useState } from "react";
// import toast from "react-hot-toast";
// import { db_slug } from "utils/constants";

// const SocialLinks: FC = () => {
//   const [loadingButton, setLoadingButton] = useState(false);
//   const { data, loading, refetch } = useFetchSiteSetting(`/api/settings/${db_slug.social_link}`);

//   const initialValues = {
//     facebook: data?.socialLinks[0]?.link || "",
//     twitter: data?.socialLinks[1]?.link || "",
//     instagram: data?.socialLinks[2]?.link || "",
//     linkedin: data?.socialLinks[3]?.link || "",
//     youtube: data?.socialLinks[4]?.link || "",

//     play_store: data?.appLinks[0]?.link || "",
//     app_store: data?.appLinks[1]?.link || "",
//   };

//   const handleFormSubmit = async (values) => {
//     setLoadingButton(true);

//     const socialLinks = [
//       { name: "Facebook", link: values.facebook, icon: "Facebook" },
//       { name: "Twitter", link: values.twitter, icon: "Twitter" },
//       { name: "Instagram", link: values.instagram, icon: "Instagram" },
//       { name: "Youtube", link: values.youtube, icon: "Youtube" },
//     ];

//     const appLinks = [
//       { name: "Google Play", link: values.play_store },
//       { name: "App Store", link: values.app_store },
//     ];

//     try {
//       await axios.post("/api/settings/social-links", {
//         appLinks,
//         socialLinks,
//         settings_name: db_slug.social_link,
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
//       {({ values, handleChange, handleSubmit }) => (
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <H3>Social Links</H3>
//             </Grid>

//             <Grid item md={6} xs={12}>
//               <TextField
//                 fullWidth
//                 name="facebook"
//                 label="Facebook"
//                 value={values.facebook}
//                 onChange={handleChange}
//                 placeholder="https://example.com"
//                 InputProps={{
//                   startAdornment: <Facebook fontSize="small" color="primary" sx={{ mr: 1 }} />,
//                 }}
//               />
//             </Grid>

//             <Grid item md={6} xs={12}>
//               <TextField
//                 fullWidth
//                 name="twitter"
//                 label="Twitter"
//                 value={values.twitter}
//                 onChange={handleChange}
//                 placeholder="https://example.com"
//                 InputProps={{
//                   startAdornment: <Twitter fontSize="small" color="primary" sx={{ mr: 1 }} />,
//                 }}
//               />
//             </Grid>

//             <Grid item md={6} xs={12}>
//               <TextField
//                 fullWidth
//                 name="instagram"
//                 label="Instagram"
//                 onChange={handleChange}
//                 value={values.instagram}
//                 placeholder="https://example.com"
//                 InputProps={{
//                   startAdornment: <Instagram fontSize="small" color="primary" sx={{ mr: 1 }} />,
//                 }}
//               />
//             </Grid>

//             <Grid item md={6} xs={12}>
//               <TextField
//                 fullWidth
//                 name="youtube"
//                 label="Youtube"
//                 value={values.youtube}
//                 onChange={handleChange}
//                 placeholder="https://example.com"
//                 InputProps={{
//                   startAdornment: <YouTube fontSize="small" color="primary" sx={{ mr: 1 }} />,
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Divider />
//             </Grid>

//             <Grid item xs={12}>
//               <H3>App Links</H3>
//             </Grid>

//             <Grid item md={6} xs={12}>
//               <TextField
//                 fullWidth
//                 name="play_store"
//                 label="Play Store"
//                 value={values.play_store}
//                 onChange={handleChange}
//                 placeholder="https://example.com"
//                 InputProps={{
//                   startAdornment: <PlayStore fontSize="small" color="primary" sx={{ mr: 1 }} />,
//                 }}
//               />
//             </Grid>

//             <Grid item md={6} xs={12}>
//               <TextField
//                 fullWidth
//                 name="app_store"
//                 label="App Store"
//                 value={values.app_store}
//                 onChange={handleChange}
//                 placeholder="https://example.com"
//                 InputProps={{
//                   startAdornment: <AppleStore fontSize="small" color="primary" sx={{ mr: 1 }} />,
//                 }}
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

export default function SocialLinks() {
    return <div>Social Links</div>;
}
