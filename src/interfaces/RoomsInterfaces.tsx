export interface GetRoomsResponse{
    "success": boolean,
    "message": string,
    "data": { 'rooms':Room[],"totalCount": number},
} 
export interface Room {
  _id: string;
  roomNumber: number;
  price: number;
  capacity: number;
  discount: number;
  facilities: RoomFacilities[];
  createdBy: {
    _id: string;
    userName: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomFacilities {
  _id: string;
  name: string;
}
