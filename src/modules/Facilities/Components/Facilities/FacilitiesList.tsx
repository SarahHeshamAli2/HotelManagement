import { useEffect, useState } from "react"
import { axiosInstance, FACILITIES_URLS } from "../../../../services/urls"
import CustomTable from "../../../Shared/Components/CustomTable/CustomTable"
import { PaginationOptions } from "../../../../interfaces/PaginationInterfaces"
/* import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material" */
import { StyledTableCell, StyledTableRow } from "../../../../helperStyles/helperStyles" 
import NoData from "../../../Shared/Components/NoData/NoData"
import ActionMenu from "../../../Shared/ActionMenu/ActionMenu"
import { facility, getFacilitesResponse } from "../../../../interfaces/FacilitiesInterfaces"
import { CircularProgress } from "@mui/material"
/* import { useForm } from "react-hook-form" */


const FacilitiesList = () => {
/*   const {
    register,
    formState:{errors , isSubmitting},
    handleSubmit
    
  } =useForm()
 */


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

/*  interface addData{
  name:string
 }
  const addFacility = async(data:addData) => {
    try {
      const response = await axiosInstance.post(FACILITIES_URLS.ADD_FACILITIES, data)
      console.log(response)
      
    } catch (error) {
      console.log(error)
    }

  } */

  useEffect(() =>{
    getFacilities({size:10,page:1})
  },[])

/*   const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }; */
/*   
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); */
  return (
    <>
{/*     <Box component="div">
     <Button onClick={handleOpen} variant="contained">Contained</Button>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add
          </Typography>
          <form onSubmit={handleSubmit(addFacility)} >
           <TextField id="filled-basic" label="name" variant="filled" sx={{width:"100%"}} />
           <Button type="submit" variant="contained">Contained</Button>
          </form>


        </Box>
    </Modal>
    </Box> */}
    
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
