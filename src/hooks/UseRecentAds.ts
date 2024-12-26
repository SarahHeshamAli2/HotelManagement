import { Ads_URLS, axiosInstance } from "../services/urls";
import useFetch from "./useFetch";

export default function UseRecentAds() {
  const getRecentAds = async () => {
    const response = await axiosInstance.get(Ads_URLS.getAdsPortal);
    const adsArr = response.data.data.ads;
    const recentAds = adsArr
      .filter((ad: { isActive: boolean; }) => ad.isActive)
      .slice(0, 5);
    return recentAds;
  };

  const { data, trigger } = useFetch(getRecentAds);

  return { ads: data, triggerAds: trigger };
}
