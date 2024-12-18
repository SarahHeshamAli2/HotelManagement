
import { Ads_URLS, axiosInstance } from '../services/urls';
import useFetch from './useFetch';


export default function useAds() {



    const getAllAds = async()=>{
      const response = await  axiosInstance.get(Ads_URLS.getAllAds)

      return response
    }




   const{data,error,loading,trigger}= useFetch(getAllAds)
   return {
    Ads:data?.data?.data?.ads,
    Error:error,
    Loading:loading,
    trigger
   }
}