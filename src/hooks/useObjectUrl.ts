import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const useObjectUrl = (files: File[] | FileList | null) => {
  const [url, setUrl] = useState<string[] | string | null>(null);

  useEffect(() => {
    if (!files) return;
    const fileArray = Array.isArray(files) ? files : Array.from(files);
    const urls = fileArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setUrl(urls);
    if (urls.length !== 0) toast.success("Images uploaded successfully");

    return () => {
      urls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [files]);

  const removeObjectURL = useCallback(
    (urlToRemove: string) => {
      if (Array.isArray(url)) {
        setUrl(url.filter((url) => url !== urlToRemove));
        URL.revokeObjectURL(urlToRemove);
      } else if (url === urlToRemove) {
        setUrl(null);
        URL.revokeObjectURL(urlToRemove);
      }
    },
    [url]
  );

  return { url, removeObjectURL, setUrl };
};

export default useObjectUrl;
// useEffect(() => {
//   if (files) {
//     const urls = files.map((file) => URL.createObjectURL(file as File));
//     // const urls = Array.from(files).map((file) => URL.createObjectURL(file));
//     setUrl((prevUrls) => [...prevUrls, ...urls]);
//     if (urls.length !== 0) toast.success("Image uploaded successfully");
//     return () => {
//       urls.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }
// }, [files]);
// const useObjectUrl = (files: File[] | File | null) => {
//   const [url, setUrl] = useState<string[] | string | null>(null);

//   useEffect(() => {
//     if (!files) return;
//     if (Array.isArray(files)) {
//       const urls = files.map((file) => URL.createObjectURL(file));
//       setUrl((prevUrls) => prevUrls && [...prevUrls, ...urls]);
//       if (urls.length !== 0) toast.success("Images uploaded successfully");
//       return () => {
//         urls.forEach((url) => URL.revokeObjectURL(url));
//       };
//     } else {
//       const objectUrl = URL.createObjectURL(files);
//       setUrl(objectUrl);
//       if (objectUrl) toast.success("Image uploaded successfully");
//       return () => {
//         console.log("Revoking URL:");

//         URL.revokeObjectURL(objectUrl);
//       };
//     }
//   }, [files]);
//   // useEffect(() => {
//   //   if (!files || typeof files === "string") return;
//   //   if (files) {
//   //     // const blob = new Blob([files], { type: 'application/octet-stream' });
//   //     const urls = Array.isArray(files)
//   //       ? files.map((file) => URL.createObjectURL(new Blob([file])))
//   //       : URL.createObjectURL(
//   //           new Blob([files], { type: "application/octet-stream" })
//   //         );

//   //     setUrl(urls);

//   //     return () => {
//   //       if (Array.isArray(urls)) {
//   //         urls.forEach((url) => URL.revokeObjectURL(url));
//   //       } else {
//   //         URL.revokeObjectURL(urls);
//   //       }
//   //     };
//   //   }
//   // }, [files]);
//   const removeObjectURL = useCallback((urlToRemove: string) => {
//     if (Array.isArray(url)) {
//       setUrl(url.filter((url) => url !== urlToRemove));
//     } else {
//       setUrl([]);
//     }
//   }, []);

//   return { url, removeObjectURL, setUrl };
// };
