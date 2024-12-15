import { User } from "../modules/Authentictation/Components/Registeration/Registeration";



  export interface ResetPasswordFormData extends User {

    seed?:string


  }

export interface changePasswordFormData extends User {
  oldPassword?: string,
  newPassword?: string ,
  
}