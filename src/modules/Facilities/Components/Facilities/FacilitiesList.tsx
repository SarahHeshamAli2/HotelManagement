import DashboardHeading from "../../../Shared/Components/DashboardHeading/DashboardHeading";
import { useEffect, useState } from "react"
import { axiosInstance, FACILITIES_URLs  } from "../../../../services/urls"
import CustomTable from "../../../Shared/Components/CustomTable/CustomTable"
import { PaginationOptions } from "../../../../interfaces/PaginationInterfaces"
/* import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material" */
import { StyledTableCell, StyledTableRow } from "../../../../helperStyles/helperStyles" 
import NoData from "../../../Shared/Components/NoData/NoData"
import ActionMenu from "../../../Shared/ActionMenu/ActionMenu"
import { facility, getFacilitesResponse } from "../../../../interfaces/FacilitiesInterfaces"
import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form" 
import { toast } from "react-toastify";


const FacilitiesList = () => {
    const {
    register,
    formState:{errors , isSubmitting},
    handleSubmit
    
  } =useForm<addData>()
 


  const[facilities , setFacilities]=useState<facility[]>([])
  const[loading,setLoading] = useState(false)
  const[count, setCount] = useState<number>(0)


  const getFacilities = async ({size , page}:PaginationOptions) =>{
    setLoading(true)
    try {
      const response = await axiosInstance.get<getFacilitesResponse>(FACILITIES_URLs.GET_FACILITIES,
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

  interface addData{
  name:string
 }
  const addFacility = async(data:addData) => {
    try {
      const response = await axiosInstance.post(FACILITIES_URLs.ADD_FACILITIES, data)
      console.log(response)
      toast.success("facility added successfully")
      getFacilities({size:10 ,page:1})
      
    } catch (error) {
      console.log(error)
    }

  }

  const editFacility=()=>{

  }

  useEffect(() =>{
    getFacilities({size:10,page:1})
  },[])

    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }; 
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 
  return (
    <>
     <Box component="div">
     
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{padding:"50px"}}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Facility
          </Typography>
          <form onSubmit={handleSubmit(addFacility)} >
           <TextField 
            id="filled-basic"
            label="name" 
            variant="filled" 
            sx={{width:"100%"}} 
            {...register("name" , {
              required:"please enter name"
            }             
            )}
            />
            {errors.name && <Typography component="span" sx={{color:"red" , display:"block"}}>{errors.name.message}</Typography>}
           <Button type="submit" variant="contained" disabled={isSubmitting} sx={{textAlign:"end" , mt:"25px"}} >
            {isSubmitting ? "...loading" : "Save"}
           </Button>
          </form>
        </Box>
    </Modal>
    </Box> 
    <div>
      <DashboardHeading label="Facilities" item="Facility" handleClick={handleOpen} />
    </div>
    
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
                <ActionMenu editFunction={editFacility}/>
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
