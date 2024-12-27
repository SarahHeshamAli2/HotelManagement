import { Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { Controller, FieldValues, useForm } from "react-hook-form";
import { axiosInstance, BOOKING_URLS } from "../../services/urls";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function PaymentInfo() {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const location = useLocation();
  const { bookingId } = location.state || {};
  const [information] = useState(() => {
    const name = localStorage.getItem("name");
    const country = localStorage.getItem("country");
    const city = localStorage.getItem("city");
    return { name, country, city };
  });
  const payBooking = async (bookingId: string, token: string) => {
    try {
      const response = await axiosInstance.post(
        BOOKING_URLS.payBooking(bookingId),
        { token }
      );
      if (response.status === 201) {
        console.log(response);
        toast.success(response?.data?.message || "Payment successful");
        navigate(`/booking/${roomId}/booking-success`);
      }
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
    if (data?.card?.empty === true)
      return toast.error("Please add a card number");
    try {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const { error, token } = await stripe.createToken(cardElement, {
        name: information.name ?? "",
        address_country: information.country ?? "",
        address_city: information.city ?? "",
      });
      if (error) {
        console.error(error);
      } else {
        if (token) {
          const tokenValue = token.id;
          console.log("tokenValue:", tokenValue);
          // send the token to the backend
          await payBooking(bookingId, tokenValue);
        }
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
