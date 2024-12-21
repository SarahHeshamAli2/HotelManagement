export interface facility{
    _id: string,
    name: string,
    createdBy: {
        _id: number,
        userName:string
    },
    createdAt:string,
    updatedAt: string
    totalCount:number
}
export interface getFacilitesResponse{
  success: boolean,
  message: string,
  data:{'facilities':facility[] , 'totalCount':number}
}