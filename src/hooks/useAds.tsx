
import { PaginationOptions } from '../interfaces/PaginationInterfaces';
import { Ads_URLS, axiosInstance } from '../services/urls';
import useFetch from './useFetch';


export default function useAds() {
    


  const getAllAds = async({size,page}:PaginationOptions)=>{
    const response = await  axiosInstance.get(Ads_URLS.getAllAds,{
      params:{
        size:size,
        page:page
      }
    })
    setData(response)
    
    return response
  }



    
   const{data,error,loading,setData,setIsChanged}= useFetch(()=>getAllAds({size:5,page:1}))
   return {
    AdsCount:data?.data?.data?.totalCount,
    Ads:data?.data?.data?.ads,
    Error:error,
    Loading:loading,
    getAd : getAllAds,
    setIsChanged

  

   }


}


      