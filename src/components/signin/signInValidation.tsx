import type { signInFormData } from "./signin.interface";

export default function signInvalidation(inputs: signInFormData) {
  const error: {
    email: string;
    password: string;
   
  } = {
    email: "",
    password: "",
   
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PassPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
  if (!inputs.email) {
    error.email = "shouldn't be empty";
  } else if (!emailPattern.test(inputs.email)) {
    error.email = "Please enter valid email";
  }else{
    error.email=""
  }

  if (!inputs.password) {
    error.password = "shouldn't be empty";
  } else if (!PassPattern.test(inputs.password)) {
    error.password = "Wrong Password";
  }else{
    error.password=""
  }

  return error;
}