import { useEffect, useState } from "react"
import { axiosInstance, FACILITIES_URLS } from "../../../../services/urls"
import CustomTable from "../../../Shared/Components/CustomTable/CustomTable"
import { PaginationOptions } from "../../../../interfaces/PaginationInterfaces"
import { CircularProgress } from "@mui/material"
import { StyledTableCell, StyledTableRow } from "../../../../helperStyles/helperStyles" 
import NoData from "../../../Shared/Components/NoData/NoData"
import ActionMenu from "../../../Shared/ActionMenu/ActionMenu"


const FacilitiesList = () => {

  interface facility{
      _id: number,
      name: string,
      createdBy: {
          _id: number,
          userName:string
      },
      createdAt:number,
      updatedAt: number
      totalCount:number
  }
  interface getFacilitesResponse{
    success: boolean,
    message: string,
    data:{'facilities':facility[] , 'totalCount':number}
  }
  
  const[facilities , setFacilities]=useState<facility[]>([])
  const[loading,setLoading] = useState(false)
  const[count, setCount] = useState<number>(0)


  const getFacilities = async ({size , page}:PaginationOptions) =>{
    setLoading(true)
    try {
      const response = await axiosInstance.get<getFacilitesResponse>(FACILITIES_URLS.GET_FACILITIES,
      {
        params: {size,page}
      }
      )

      setFacilities(response?.data?.data?.facilities|| [])
      setCount(response?.data?.data?.totalCount || 0)
      
    
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    getFacilities({size:10,page:1})
  },[])


  return (
    <>
       <CustomTable columnTitles={["Name","createdAt" ,"createdBy","updatedAt" ," "]}
       count={count}
       getListFn={getFacilities}>
        {loading && (
          <CircularProgress 
          sx={{
            display:"flex",
            color:"blue",
            marginTop: "4rem",
            margin: "auto",
            textAlign: "center",
            justifyContent:"center",
            alignItems:"center"
          }}
          size={"4rem"}
           />
        )}
        {!loading && facilities.length> 0 ? (facilities.map((item) =>(
          <StyledTableRow key={item._id}>
              <StyledTableCell component="th" scope="row" align="center">
                {item.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {item.createdAt}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {item.createdBy.userName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {item.updatedAt}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                <ActionMenu />
              </StyledTableCell>
          </StyledTableRow>
        ))
        ):(
          !loading &&<NoData />
        )
        } 
       </CustomTable>
    </>
  )
}

export default FacilitiesList
