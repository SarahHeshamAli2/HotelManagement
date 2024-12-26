import { UseFormWatch } from "react-hook-form";
import { User } from "../modules/Authentictation/Components/Registeration/Registeration";

export const getRequiredMessage = (filedName: string) =>
  `${filedName} is required`;

export const getValidationRules = (watch: UseFormWatch<User> | null) => {
  return {
    userName: {
      required: getRequiredMessage("Username"),
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
export const getRoomValidationRules = () => {
  return {
    imgs: {
      required: getRequiredMessage("Images"),
      // validate: (value: FileList | null | undefined) =>
      //   value && value!.length > 6 ? "Please upload at least 5 images" : false,
      validate: (files: File[] | null) =>
        files!.length <= 5 || "You can only upload up to 5 images",
    },
  };
};
export const getCommentValidationRules = () => {
  return {
    comment: {
      required: {
        value: true,
        message: getRequiredMessage("Your Comment"),
      },
      maxLength: {
        value: 200,
        message: "Comment must be less than 200 characters",
      },
    },
  };
};
export const getReviewValidationRules = () => {
  return {
    rating: {
      required: {
        value: true,
        message: getRequiredMessage("Your Rating"),
      },
      min: { value: 1, message: "Rating must be at least 1" },
      max: { value: 5, message: "Rating cannot exceed 5" },
    },
    review: {
      required: {
        value: true,
        message: getRequiredMessage("Your Review"),
      },
    },
  };
};
