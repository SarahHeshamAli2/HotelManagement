import { room } from "../services/interfaces";
import { axiosInstance, Favorites_URLS } from "../services/urls";
import useFetch from "./useFetch";



export default function useFavorites() {
  const getFavorites = async () => {
    const response = await axiosInstance.get(Favorites_URLS.Get_Fav);
    const arr = response.data.data.favoriteRooms[0]?.rooms.map((room: room) => room._id
  )
    const favoriteItems =response.data.data.favoriteRooms[0]?.rooms
    return {arr,favoriteItems};
  };
  const { data, trigger,loading } = useFetch(getFavorites);
  
  return { favorites: data?.arr, triggerFav: trigger , favoriteItems : data?.favoriteItems ,loading };
}

