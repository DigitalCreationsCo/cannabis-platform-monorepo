// import { Clear } from "@mui/icons-material";
// import { LoadingButton } from "@mui/lab";
// import { Grid, styled } from "@mui/material";
// import { Box } from "@mui/system";
// import axios from "axios";
// import DropZone from "components/DropZone";
// import FlexBox from "components/FlexBox";
// import Loading from "components/Loading";
// import useFetchSiteSettings from "hooks/useFetchSiteSettings";
// import React, { FC, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { db_slug } from "utils/constants";

// const UploadBox = styled(Box)(() => ({
//   width: 170,
//   height: "auto",
//   borderRadius: "4px",
//   position: "relative",
// }));

// const StyledClear = styled(Clear)(() => ({
//   top: 5,
//   right: 5,
//   fontSize: 14,
//   color: "red",
//   cursor: "pointer",
//   position: "absolute",
// }));

// interface FileType extends File {
//   preview: string;
// }

// type ImageType = { location: string; key?: string };

// const BannerSlider: FC = () => {
//   const [newFiles, setNewFiles] = useState<FileType[]>([]);
//   const [loadingButton, setLoadingButton] = useState(false);
//   const [oldFiles, setOldFiles] = useState<ImageType[]>([]);
//   const [deletedImages, setDeletedImages] = useState<ImageType[]>([]);
//   const { data, loading, refetch } = useFetchSiteSetting(`/api/settings/${db_slug.banner_slider}`);

//   useEffect(() => {
//     if (data) {
//       setOldFiles(data);
//     }
//   }, [data]);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     setLoadingButton(true);
//     const formData = new FormData();
//     formData.append("delete", JSON.stringify(deletedImages));
//     newFiles.forEach((file: File) => formData.append("files", file));

//     try {
//       await axios.post("/api/settings/slide", formData);
//       toast.success("Data updated successfully");
//       refetch();
//       setNewFiles([]);
//       setDeletedImages([]);
//       setLoadingButton(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setLoadingButton(false);
//     }
//   };

//   const deleteOldImage = (image: ImageType) => {
//     setOldFiles((state) => state.filter((item) => item.location !== image.location));
//     setDeletedImages((state) => [...state, image]);
//   };

//   const deleteNewImage = (name: string) => {
//     setNewFiles((state) => state.filter((item) => item.name !== name));
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   console.log(deletedImages);

//   return (
//     <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <DropZone
//             title="Drag and Drop slide image here"
//             imageSize="upload landscape photo"
//             onChange={(files) => {
//               const uploadFiles = files.map((file) =>
//                 Object.assign(file, { preview: URL.createObjectURL(file) })
//               );
//               setNewFiles(uploadFiles);
//             }}
//           />

//           <FlexBox gap={1} mt={2}>
//             {oldFiles.map((item) => (
//               <UploadBox key={item.key}>
//                 <img src={item.location} width="100%" />
//                 <StyledClear onClick={() => deleteOldImage(item)} />
//               </UploadBox>
//             ))}

//             {newFiles?.map((file, index) => (
//               <UploadBox key={index}>
//                 <img src={file.preview} width="100%" />
//                 <StyledClear onClick={() => deleteNewImage(file.name)} />
//               </UploadBox>
//             ))}
//           </FlexBox>
//         </Grid>

//         <Grid item xs={12}>
//           <LoadingButton
//             type="submit"
//             color="primary"
//             variant="contained"
//             loading={loadingButton}
//             // disabled={!newFiles || newFiles?.length === 0}
//           >
//             Save Changes
//           </LoadingButton>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

export default function BannerSlider() {
    return <div>Banner Slider</div>;
}
