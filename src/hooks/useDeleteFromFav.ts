import { useState } from 'react';
import { axiosInstance, Favorites_URLS } from '../services/urls';
import { toast } from 'react-toastify';

const useDeleteFromFav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const handleClickDelete = async (id: string) => {
    setDeleting(true);
    setIsLoading(true);
    
    try {
      const resp = await axiosInstance.delete(Favorites_URLS.Delete_Fav(id), {
        data: { roomId: id }
      });

      setDeleting(false);
      setIsLoading(false);
      toast.success(resp?.data?.message);  // Success notification

      // Trigger the refetch after successful deletion
      console.log(resp);
    } catch (error) {
      setDeleting(false);
      setIsLoading(false);
      
      console.error(error);
      
    }
  };

  return { handleClickDelete, isLoading, deleting };
};

export default useDeleteFromFav;