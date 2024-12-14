export interface ForgetPasswordFormData {

  

    email: string;
  }


  export interface ResetPasswordFormData extends ForgetPasswordFormData {

    seed:string,
    password:string,
    confirmPassword:string

  }