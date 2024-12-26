import { Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { Controller, FieldValues, useForm } from "react-hook-form";
import { axiosInstance, BOOKING_URLS } from "../../services/urls";
import { toast } from "react-toastify";
import axios from "axios";

export default function PaymentInfo() {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const stripe = useStripe();
  const elements = useElements();

  const payBooking = async (bookingId: string, token: string) => {
    try {
      const response = await axiosInstance.post(
        BOOKING_URLS.payBooking(bookingId),
        { token }
      );
      console.log(response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Something went wrong, try again"
        );
      } else {
        console.error(error);
      }
    }
  };

  const paymentHandler = async (data: FieldValues) => {
    console.log(data);
    // if (data.card.empty) return;
    try {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);
      // const addressElement = elements.getElement(AddressElement);
      if (!cardElement) return;

      const { error, token } = await stripe.createToken(cardElement);
      if (error) {
        console.error(error);
      } else {
        console.log("token:", { token });
        const tokenValue = token.id;
        console.log("tokenValue:", tokenValue);

        // send the token to the backend
        await payBooking("676de020c01e1856618b95ee", tokenValue);
      }
    } catch (finalError) {
      console.log(finalError);
    }
  };

  return (
    <form onSubmit={handleSubmit(paymentHandler)}>
      PaymentInfo
      <Controller
        name="card"
        control={control}
        render={({ field }) => <CardElement {...field} />}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Pay"}
      </Button>
    </form>
  );
}
