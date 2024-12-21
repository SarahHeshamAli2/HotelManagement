import DashboardHeading from "../../../Shared/Components/DashboardHeading/DashboardHeading";
import { useCallback, useEffect, useState } from "react"
import { axiosInstance, FACILITIES_URLS, FACILITIES_URLs  } from "../../../../services/urls"
import CustomTable from "../../../Shared/Components/CustomTable/CustomTable"
import { PaginationOptions } from "../../../../interfaces/PaginationInterfaces"
import { StyledTableCell, StyledTableRow } from "../../../../helperStyles/helperStyles" 
import NoData from "../../../Shared/Components/NoData/NoData"
import ActionMenu from "../../../Shared/ActionMenu/ActionMenu"
import { facility, getFacilitesResponse } from "../../../../interfaces/FacilitiesInterfaces"
import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form" 
import { toast } from "react-toastify";
import { formatDate } from "../../../../helperFunctions/helperFunctions";
import DeleteConfirmation from "../../../Shared/DeleteConfirmation/DeleteConfirmation";
import ViewModal from "../../../Shared/Components/ViewModal/ViewModal";

const FacilitiesList = () => {
    const {
    register,
    formState:{errors , isSubmitting},
    handleSubmit,
    setValue
    
  } =useForm<addData>()
 


  const[facilities , setFacilities]=useState<facility[]>([])
  const[loading,setLoading] = useState(false)
  const[count, setCount] = useState<number>(0)

    const [deleting, setDeleting] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState<string>("");
    const [viewId, setViewId] = useState<string>('');
    const [view, setView] = useState<boolean>(false);
    const [viewLoading, setViewLoading] = useState<boolean>(false);
    const [viewData, setViewData] = useState({});

    const handleOpenDelete = (id: string) => {
      setSelectedId(id);
      setOpenDelete(true);
    };
    const handleCloseDelete = () => setOpenDelete(false);

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
  const deleteFacility = async () => {
      try {
        setDeleting(true)
        await axiosInstance.delete(
          FACILITIES_URLS.deleteFacility(selectedId)
        );
        toast.success("Facility deleted successfully");
        getFacilities({ size: 5, page: 1 });
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.message || "something went wrong");
      }finally{
        setDeleting(false)
        handleCloseDelete();
      }
    };

  interface addData{
  name:string
 }
  const addFacility = async(data:addData) => {
    try {
      const response = await axiosInstance.post(FACILITIES_URLs.ADD_FACILITIES, data)
      console.log(response)
      handleClose()
      toast.success("facility added successfully")
      getFacilities({size:5 ,page:1})
      
    } catch (error) {
      console.log(error)
    }

  }
  
  const[selectedFacility , setSelectedFacility]=useState<facility |null>(null)
  const [openEdit, setOpenEdit] = useState(false);
  
  const handleOpenEdit = (item:facility) =>{
    setOpenEdit(true);
    setSelectedFacility(item)
    setValue("name" , item.name)
 
  } 
  const handleCloseEdit = () =>{
    setSelectedFacility(null);
    setOpenEdit(false);
  }  

  const editFacility= async(data :addData)=>{
    if (!selectedFacility || !selectedFacility._id) {
      toast.error("Invalid facility selected for editing.");
      return;
  }
    try {
      const response = await axiosInstance.put(FACILITIES_URLs.UPDATE_FACILITIES(selectedFacility?._id) , data)
      console.log(response)
      handleCloseEdit()
      toast.success("Updated facility successfully")
      getFacilities({size:5,page:1}) 
    } catch (error) {
      console.log(error)
      toast.error("Failed to update facility. Please try again.")
    }
  }

  useEffect(() =>{
    getFacilities({size:5,page:1})
  },[])

  const handleView = (id: string) => {
  setViewId(id);
  setView(true);
  setViewLoading(true);
  console.log(view);
};

const viewFacility = useCallback(async () => {
  try {
    const response = await axiosInstance.get(
      FACILITIES_URLS.getFacilityDetails(viewId)
    );
    console.log(response?.data?.data);
    setViewData(response?.data?.data);
  } catch (error) {
    console.log(error);
  } finally {
    setViewLoading(false);
  }
}, [viewId]);

useEffect(() => {
  viewFacility();
}, [viewFacility]);

    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding:"40px"
  }; 
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 
  return (
    <>
    <div>
      <DashboardHeading label="Facilities" item="Facility" handleClick={handleOpen} />
    </div>
      <DeleteConfirmation
        handleClose={handleCloseDelete}
        open={openDelete}
        deleteFn={deleteFacility}
        deleteItem="Facility"
        deleting={deleting}
      />
    
     <Box component="div">
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
             Add Facility
          </Typography>
          <form style={{marginTop:"80px"}} onSubmit={handleSubmit(addFacility)} >
           <TextField
           hiddenLabel
           id="filled-hidden-label-small"
           defaultValue=""
           placeholder="Name"
           variant="filled"
           size="small"
           sx={{
            width: { xs: "95%", sm: "80%" ,lg :"100%" },
            backgroundColor: "#F5F6F8",
            "& .MuiFilledInput-root": {
              "&:before": { borderBottom: "none" },
              "&:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
              "&:after": { borderBottom: "none" },
            },
            }}

            {...register("name" , {
              required:"please enter name"
            }             
            )}
            />    
            {errors.name && <Typography component="span" sx={{color:"red" , display:"block"}}>{errors.name.message}</Typography>}
            <Box component="div" sx={{textAlign:"end"}}>
              <Button type="submit" variant="contained" disabled={isSubmitting} sx={{textAlign:"end" , mt:"25px"}} >
              {isSubmitting ? "...loading" : "Save"}
            </Button>
            </Box>
          </form>
        </Box>
    </Modal>
    </Box> 

    <Box component="div">
     <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
             Edit Facility
          </Typography>
          <form style={{marginTop:"80px"}} onSubmit={handleSubmit(editFacility)} >
           <TextField
           hiddenLabel
           id="filled-hidden-label-small"
           defaultValue={selectedFacility?.name || ""}
           placeholder="Name"
           variant="filled"
           size="small"
           sx={{
            width: { xs: "95%", sm: "80%" ,lg :"100%" },
            backgroundColor: "#F5F6F8",
            "& .MuiFilledInput-root": {
              "&:before": { borderBottom: "none" },
              "&:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
              "&:after": { borderBottom: "none" },
            },
            }}

            {...register("name" , {
              required:"please enter name"
            }             
            )}
            />    
            {errors.name && <Typography component="span" sx={{color:"red" , display:"block"}}>{errors.name.message}</Typography>}
            <Box component="div" sx={{textAlign:"end"}}>
              <Button type="submit" variant="contained" disabled={isSubmitting} sx={{textAlign:"end" , mt:"25px"}} >
              {isSubmitting ? "...loading" : "Save"}
            </Button>
            </Box>
          </form>
        </Box>
    </Modal>
    </Box> 
    
       <CustomTable 
       loading={loading}
       columnTitles={["Name","createdAt" ,"createdBy","updatedAt" ," "]}
       count={count}
       getListFn={getFacilities}>
    
        {!loading && facilities.length> 0 ? (facilities.map((item) =>(
          <StyledTableRow key={item._id}>
              <StyledTableCell component="th" scope="row" align="center">
                {item.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {formatDate(item.createdAt)}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {item.createdBy.userName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {formatDate(item.updatedAt)}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                <ActionMenu handleShowView={() => handleView(item._id)} editFunction={() =>handleOpenEdit(item)} handleOpenDelete={()=>handleOpenDelete(item._id)}/>
              </StyledTableCell>
          </StyledTableRow>
        ))
        ):(
          !loading &&<NoData />
        )
        } 
       </CustomTable>
       <ViewModal loading={viewLoading} viewData={viewData} view={view} closeView={() => setView(false)} />
    </>
  )
}

export default FacilitiesList
