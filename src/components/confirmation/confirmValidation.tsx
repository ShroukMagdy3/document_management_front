import type { confirmFormData } from "./confirm.interface";

export default function confirmValidation(inputs:confirmFormData) {
  const error: {
    email: string;
    otp: string;
   
  } = {
    email: "",
    otp: "",
   
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const otpPattern =/^\d{6}$/



  if (!inputs.email) {
    error.email = "shouldn't be empty";
  } else if (!emailPattern.test(inputs.email)) {
    error.email = "Please enter valid email";
  }else{
    error.email =""
  }

  if (!inputs.otp) {
    error.otp = "shouldn't be empty";
  } else if (!otpPattern.test(inputs.otp)) {
    error.otp = "Please enter valid otp";
  }else{
    error.otp=""
  }

  
  return error;
}