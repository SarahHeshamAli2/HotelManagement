import { axiosInstance, Favorites_URLS } from "../services/urls";
import useFetch from "./useFetch";

export default function useFavorites() {
  const getFavorites = async () => {
    const response = await axiosInstance.get(Favorites_URLS.Get_Fav);
    const arr = response.data.data.favoriteRooms[0]?.rooms.map((room: any) => room._id);
    
    return arr;
  };

  const { data, trigger } = useFetch(getFavorites);

  return { favorites: data, triggerFav: trigger };
}

