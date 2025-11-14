import type { RegisterFormData } from "./register.interface";

export default function registerValidation(inputs: RegisterFormData) {
  const error: {
    email: string;
    password: string;
    userName: string;
    phone: string;
    nid: string;
  } = {
    email: "",
    password: "",
    userName: "",
    phone: "",
    nid: "",
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PassPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const nidPattern = /^\d{14}$/;
  const userNamePattern = /^[a-zA-Z0-9_]{3,20}$/;
  const phonePattern = /^(010|011|012|015)\d{8}$/;

  if (!inputs.email) {
    error.email = "shouldn't be empty";
  } else if (!emailPattern.test(inputs.email)) {
    error.email = "Please enter valid email";
  }

  if (!inputs.password) {
    error.password = "shouldn't be empty";
  } else if (!PassPattern.test(inputs.password)) {
    error.password = "Please enter valid password, It must contain capital letter , @#$% and numbers";
  }else{
    error.password=""
  }

  if (!inputs.nid) {
    error.nid = "shouldn't be empty";
  } else if (!nidPattern.test(inputs.nid)) {
    error.nid = "National Id should be 14 numbers";
  }else{
    error.nid=""
  }

  if (!inputs.phone) {
    error.phone = "shouldn't be empty";
  } else if (!phonePattern.test(inputs.phone)) {
    error.phone = "Please enter valid egyptian Phone";
  }else{
    error.phone=""
  }

  if (!inputs.userName) {
    error.userName = "shouldn't be empty at least 3 letters";
  } else if (!userNamePattern.test(inputs.userName)) {
    error.userName = "it can contain small or capital letters or numbers or _";
  }else{
    error.userName=""
  }

  return error;
}