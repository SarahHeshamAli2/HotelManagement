import { axiosInstance, Favorites_URLS } from "../services/urls";
import useFetch from "./useFetch";

export default function useFavorites() {
  const getFavorites = async () => {
    const response = await axiosInstance.get(Favorites_URLS.Get_Fav);
    const arr = response.data.data.favoriteRooms[0]?.rooms.map((room: any) => room._id);
    console.log(response.data.data.favoriteRooms[0]?.rooms);
    const favoriteItems =response.data.data.favoriteRooms[0]?.rooms
    return {arr,favoriteItems};
  };

  const { data, trigger,loading } = useFetch(getFavorites);
  console.log(data?.favoriteItems);
  
  return { favorites: data?.arr, triggerFav: trigger , favoriteItems : data?.favoriteItems ,loading };
}

