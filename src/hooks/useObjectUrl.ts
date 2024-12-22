import { useEffect, useState } from "react";
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

  return url;
};

export default useObjectUrl;
