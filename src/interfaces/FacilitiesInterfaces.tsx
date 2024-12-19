export interface facility{
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
export interface getFacilitesResponse{
  success: boolean,
  message: string,
  data:{'facilities':facility[] , 'totalCount':number}
}
