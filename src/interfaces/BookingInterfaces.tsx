export interface GetBookingsResponse{
    "success": boolean,
    "message": string,
    "data": { 'booking':Booking[],"totalCount": number},
} 

export interface Booking{
    
        "_id":string,
        "startDate": string,
        "endDate": string,
        "totalPrice": number,
        "user": {
            "_id": string,
            "userName": string
        },
        "room": {
            "_id": string,
            "roomNumber": string
        },
        "status": string,
        "createdAt": string,
        "updatedAt": string
    
}