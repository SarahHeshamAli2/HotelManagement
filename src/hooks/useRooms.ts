
import { axiosInstance, ROOMS_URLS } from '../services/urls';
import useFetch from './useFetch';


export default function useRooms() {
    

    const getAllRooms = async(page?:string,size?:string)=>{
      const response = await  axiosInstance.get(ROOMS_URLS.getAllRooms,{
        params :{
            page:page,
            size:size
        }
        
      })
      
      return response
    }




   const{data,error,loading}= useFetch(getAllRooms)
   return {
    Rooms:data?.data?.data?.rooms,
    Error:error,
    Loading:loading
   }
}

