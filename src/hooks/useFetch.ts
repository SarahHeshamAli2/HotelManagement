import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  setData: Dispatch<SetStateAction<T | null>>;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  trigger: () => void;
}

const useFetch = <T>(fetchFun: () => Promise<T>): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isChanged, setIsChanged] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const trigger = () => setIsChanged(true); // Trigger to fetch new data

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetchFun();
        console.log("Fetched data:", response);
        if (mounted) setData(response);
      } catch (err) {
        if (mounted) {
          console.error("Error fetching data:", err);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
          setIsChanged(false); // Reset to prevent continuous fetching
        }
      }
    };
    if (isChanged) {
      fetchData(); // Trigger fetch when `isChanged` is true
    }

    return () => {
      mounted = false;
    };
  }, [isChanged]); // Re-fetch only when `isChanged` is true

  return { data, loading, error, setData, setIsChanged, trigger };
};

export default useFetch;