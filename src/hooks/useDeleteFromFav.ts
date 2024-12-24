import { useState } from 'react';
import { axiosInstance, Favorites_URLS } from '../services/urls';
import { toast } from 'react-toastify';

const useDeleteFromFav = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
    
    const handleClickDelete = (id: string) => {
      setDeleting(true)
      setIsLoading(true)
    axiosInstance.delete(Favorites_URLS.Delete_Fav(id),{
      data:{
        "roomId":id
      }

    }).then((resp)=>{
      setDeleting(false)
      toast.success(resp?.data?.message)
      console.log(resp);
      setIsLoading(false)
      
    }).catch((error)=>{
      setDeleting(false)
      setIsLoading(false)

      console.log(error);

      })
   
    }
    return {handleClickDelete,isLoading,deleting};
};

export default useDeleteFromFav;

