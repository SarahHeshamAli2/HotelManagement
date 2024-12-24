import { Grid2 as Grid } from '@mui/material';
import { useEffect, useState } from "react";
import { axiosInstance, ROOMS_URLS } from "../../../../services/urls";
import { Box, CircularProgress, Grid2, Typography } from "@mui/material";
import NoData from "../../../Shared/Components/NoData/NoData";
import roomImg from '../../../../assets/images/room.png';
import UserPageTitle from '../../../Users-Portal/Component/UsersShared/UserPageTitle/UserPageTitle';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

export default function ExplorePage() {
	const[availableRooms , setAvailableRooms]= useState<roomsdata[]>([])
	const [loading, setLoading] = useState<boolean>(false);

	interface roomsdata{
		roomNumber: string,
		price: number,
		capacity: number,
		discount: number,
		facilities:{name:string}[],
		createdBy:string,
		images: string[],
		isBooked:boolean,
		createdAt:string,
		updatedAt:string
	}
	interface availableRoomsResponse{
		success: boolean,
		message: string,
		data:{ rooms: roomsdata[] , totalCount:number}

	}

	const location = useLocation()
	const { startDate, endDate } = location.state || {};
/* 	console.log("Start date:", startDate);
    console.log("End date:", endDate);
 */	
const getAvailableRooms = async () => {
	try {
	  setLoading(true);
  
	  const params: any = {};
	  if (startDate && endDate) {
		params.startDate = dayjs(startDate).format("YYYY-MM-DD");
		params.endDate = dayjs(endDate).format("YYYY-MM-DD");
	  }
  
	  const response = await axiosInstance.get<availableRoomsResponse>(
		ROOMS_URLS.GET_ALL_ROOMS,
		{ params }
	  );
  
	  console.log(response.data.data.rooms);
	  setAvailableRooms(response.data.data.rooms);
	} catch (error) {
	  console.log(error);
	} finally {
	  setLoading(false);
	}
  };
  

	useEffect(() => {
		getAvailableRooms();
	}, []);
  
	  
	return (
		<>
		<Typography variant="h4" sx={{color:"#152C5B", textAlign:"center" ,fontWeight:"600" , mt:"50px"}}>Explore ALL Rooms</Typography>
		<Box sx={{ width: "85%", margin: "auto", padding: "20px 0" }}>
      <Box>
        <Grid container alignItems="center">
          <Grid size={{ xs: 12, sm: 3 }}>
            <UserPageTitle current="Explore" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              component={"h2"}
              sx={{
                fontWeight: "600",
                fontSize: "2.1rem",
                lineHeight: "0.5rem",
                color: "#152C5B",
                marginBlock: { xs: "0.5rem", sm: "1rem" },
              }}>
            </Typography>
          </Grid>
			
			</Grid>
		</Box>
		</Box>

		{loading?(
					<CircularProgress
					sx={{
						color: 'blue',
						marginBlock: '4rem',
						marginInline: 'auto',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
					}}
					size={'4rem'}
			
					/>

		):(
			<Box sx={{
				paddingInline: "20px",
				maxWidth: "1400px",   
				margin: "0 auto",      
				}}>
				<Typography sx={{color:"#152C5B" , fontWeight:"500" , fontSize:"24px" , marginBlock:"30px" , pl:"10px"}}>All Rooms</Typography>
	
				{availableRooms?.length > 0 ? (
				availableRooms.map((room, index) => (
					
					<Grid2
					container
					spacing={4}
					sx={{
						marginBottom: "20px",
						textAlign: "center",
						justifyContent: "space-around",
					  }}
					key={index}
					>
					{[0, 1, 2].map((imageIndex) => (
						<Grid2 size={4} key={imageIndex} sx={{ position: "relative"}}>
						
						{room.images && room.images[imageIndex] ? (
							
							<>
							<Box 
							sx={{ 
								position: "relative", 
								width: "100%", 
								height: "250px", 
								borderRadius: "15px", 
								overflow: "hidden" ,
							}}
							>
							
							<img
								src={room.images[imageIndex]}
								style={{
								width: "100%",
								height: "100%",					
								}}
								alt="room image"
							/>
						
							<Box
								sx={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6))",
								zIndex: 1,
								}}
							/>
	
							<Typography
								variant="h5"
								sx={{
								position: "absolute",
								color: "#FFFFFF",
								fontWeight: "500",
								fontSize: "16px",
								top: "0rem",
								right: "0rem",
								backgroundColor: "#FF498B",
								borderRadius: "0px 15px",
								padding: "10px 15px",
								zIndex: 2,
								}}
							>
								${room.price}<span style={{ fontWeight: "300" }}> per night</span>
							</Typography>
	
							<Typography						
								variant="h5"
								sx={{
								position: "absolute",
								color: "#FFFFFF",
								fontWeight: "400",
								bottom: "3.5rem",
								left: "1.5rem",
								fontSize: "20px",
								zIndex: 2,
								}}
							>
								Ocean Land
							</Typography>
							<Typography
								variant="h5"
								sx={{
								position: "absolute",
								color: "#FFFFFF",
								fontWeight: "300",
								bottom: "2rem",
								left: "1.5rem",
								fontSize: "15px",
								zIndex: 2,
								}}
							>
								Bandung, Indonesia
							</Typography>
							</Box>
	
							</>
						) : (
							<>
							<Box 
							sx={{ 
								position: "relative", 
								width: "100%", 
								height: "250px", 
								borderRadius: "15px", 
								overflow: "hidden" ,
							}}
							>
							<img
								src={roomImg}
								style={{
								width: "100%",
								height: "100%",					
								}}
								alt="room image"
							/>
							<Box
								sx={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6))",
								zIndex: 1,
								}}
							/>
	
							<Typography
								variant="h5"
								sx={{
								position: "absolute",
								color: "#FFFFFF",
								fontWeight: "500",
								fontSize: "16px",
								top: "0rem",
								right: "0rem",
								backgroundColor: "#FF498B",
								borderRadius: "0px 15px",
								padding: "10px 15px",
								zIndex: 2,
								}}
							>
								$100<span style={{ fontWeight: "300" }}> per night</span>
							</Typography>
	
							<Typography						
								variant="h5"
								sx={{
								position: "absolute",
								color: "#FFFFFF",
								fontWeight: "400",
								bottom: "3.5rem",
								left: "1.5rem",
								fontSize: "20px",
								zIndex: 2,
								}}
							>
								Ocean Land
							</Typography>
							<Typography
								variant="h5"
								sx={{
								position: "absolute",
								color: "#FFFFFF",
								fontWeight: "300",
								bottom: "2rem",
								left: "1.5rem",
								fontSize: "15px",
								zIndex: 2,
								}}
							>
								Bandung, Indonesia
							</Typography>
							</Box>
							</>
	
	
						)}
						</Grid2>
					))}
					</Grid2>
				))
				) : (
				<NoData />
				)}
	
	
	
							
			  </Box>
		)

		}

		 

			
		</>

	);
}                                           