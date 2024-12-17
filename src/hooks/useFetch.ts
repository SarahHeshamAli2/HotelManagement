import { useEffect, useState } from "react";

interface FetchState<T>{
    data: T | null,
    loading: boolean,
    error: string | null   ,
    trigger : ()=>void 
}

const useFetch = <T>(fetchFun: ()  => Promise<T>,pageNum?:string| null):FetchState<T> => {
    const [data,setData] = useState<T | null>(null)
    const [loading,setLoading] = useState<boolean>(true)
    const [error,setError] =useState<string|null>(null)
    const [counter, setCounter] = useState<null|undefined|number>()

    const trigger = () => setCounter((prevCount)=>prevCount+1)

    useEffect(() => {
      let mounted = true;
      const fetchData =async () => {
        try {
          const response = await fetchFun();
          setData(response)
        } catch (err ) {
          if (mounted) {
              if (err instanceof Error) {
                  setError(err.message);
                } else {
                  setError('An unknown error occurred');
                }
            }
        }
        finally{
          if (mounted) {
              setLoading(false);
            }
        }
      }
      try {
          fetchData();
        } catch (err) {
          if (err instanceof Error) {
              setError(err.message);
            } else {
              setError('An unknown error occurred');
            }
        }
        return () => {
          mounted = false;
        };
    },[counter])
  return {data,loading,error,trigger};
}

export default useFetch