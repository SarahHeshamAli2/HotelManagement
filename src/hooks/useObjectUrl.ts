import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useObjectUrl = (image:  File | string| null) => {
  const [url, setUrl] = useState<string | null>(null);
  console.log(typeof image);

  useEffect(() => {
    if (!image || typeof image === "string") return;
    const blob = new Blob([image], { type: image.type });
    const objectUrl = URL.createObjectURL(blob);
    console.log("file:", typeof image);
    setUrl(objectUrl);
    toast.success("Image uploaded successfully");

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);
  return url;
};

export default useObjectUrl;
