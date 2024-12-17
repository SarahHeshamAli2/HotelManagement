import { useEffect } from "react"
import { axiosInstance, FACILITIES_URLS } from "../../../../services/urls"


const FacilitiesList = () => {


  const getFacilities = async () =>{
    try {
      const response = await axiosInstance.get(FACILITIES_URLS.GET_FACILITIES)
      console.log(response)
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() =>{
    getFacilities()
  }
  )


  return (
    <>ffff</>
  )
}

export default FacilitiesList
