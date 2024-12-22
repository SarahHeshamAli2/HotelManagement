import { User } from "../modules/Authentictation/Components/Registeration/Registeration";

export interface ResetPasswordFormData extends User {
  seed?: string;
}

export interface changePasswordFormData extends User {
  oldPassword?: string;
  newPassword?: string;
}

export interface UserListType extends User {
  _id?: string;
  role?: string;
}

export interface ad {
  room: {
    roomNumber: string;
    price: string;
    discount: string;
    capacity: string;
  };

  isActive: boolean;
  _id: string;
}


export interface room {
  images: string[],
  _id:string
}