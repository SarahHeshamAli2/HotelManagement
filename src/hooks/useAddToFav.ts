import { useCallback } from 'react';
import { axiosInstance, Favorites_URLS } from '../services/urls';
import { toast } from 'react-toastify';

const useAddToFav = (id: string) => {
  // const [counter, setCounter] = useState(0)
  // const trigger = () => setCounter((prevCount)=>prevCount+1)
    const handleClick = useCallback(() => {
      axiosInstance.post(Favorites_URLS.Add_To_Fav,{
        "roomId":id
      }).then((resp)=>{
        toast.success(resp?.data?.message)
        console.log(resp)
      }).catch((error)=>{
        console.log(error)
        toast.error(error?.response?.data?.message || 'something went wrong')
      })
    }, [id]);

    return handleClick;
};

export default useAddToFav;

