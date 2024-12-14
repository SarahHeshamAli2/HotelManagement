import { UseFormWatch } from "react-hook-form";
import { User } from "../modules/Authentictation/Components/Registeration/Registeration";
// type PasswordFormData = {
//   password: string;
//   confirmPassword: string;
//   newPassword: string;
// };
export const getRequiredMessage = (filedName: string) =>
  `${filedName} is required`;
// export const getRequiredMessage = (fieldName: string, value?: FileList) => {
//   if (
//     fieldName === "Profile Image" &&
//     value instanceof FileList &&
//     value.length === 0
//   ) {
//     return "";
//   }
//   return `${fieldName} is required`;
// };
export const getValidationRules = (watch: UseFormWatch<User> | null) => {
  return {
    userName: {
      required: getRequiredMessage("Username"),
      //   pattern: {
      //     value: /^[a-zA-Z]+[0-9]+$/i,
      //     message:
      //       "The userName must contain characters and end with numbers without spaces.",
      //   },
    },
    email: {
      required: getRequiredMessage("Email"),
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        message: "Email is not valid",
      },
    },
    phoneNumber: {
      required: getRequiredMessage("Phone Number"),
      pattern: {
        value: /^01\d{9}$/,
        message: "Phone number must start with 01 and be 11 digits in total",
      },
    },
    password: {
      required: getRequiredMessage("Password"),
      // minLength: {
      //   value: 6,
      //   message: "Password must be at least 6 characters",
      // },
      // pattern: {
      //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
      //   message:
      //     "Password must include at least one lowercase letter, one uppercase letter, one digit, one special character",
      // },
    },
    confirmPassword: {
      required: getRequiredMessage("Confirm Password"),
      validate: (value: string) =>
        value === watch!("password") || "The passwords do not match ",
    },
    // confirmNewPassword: {
    //   required: getRequiredMessage("Confirm New Password"),
    //   validate: (value: string) =>
    //     value === watch!("newPassword") || "The passwords do not match ",
    // },
    country: {
      required: getRequiredMessage("Country"),
      pattern: {
        value: /^[a-zA-Z\s]+$/i,
        message: "Country must contain only letters and spaces.",
      },
    },
    profileImage: {
      required: getRequiredMessage("Profile Image"),
    },
  };
};
