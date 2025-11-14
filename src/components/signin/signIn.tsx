import { Key, Mail } from "lucide-react";
import AuthLayout from "../../layout/authLayout/authLayout";
import {  useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import type { signInFormData } from "./signin.interface";
import signInvalidation from "./signInValidation";
import toast from "react-hot-toast";
import axios from "axios";


const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function SignInForm() {
  const [input, setInput] = useState<signInFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<signInFormData>>({});

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = signInvalidation(input);
    setErrors(validationErrors);

    axios
      .post(`${VITE_API_URL}/users/signIn`, input)
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          toast.success("Welcome To Keeply!");
          localStorage.setItem("accessToken" , res.data.tokens.accessToken)
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        console.log(msg);
        toast.error(
          <div className="flex flex-col items-center">
            <p>{String(msg)}</p>
            <h1 className="font-signature text-white mt-2">Keeply</h1>
          </div>
        );
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">

      <div className="w-full max-w-3xl  rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <AuthLayout />
        <div className="w-full max-w-md bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-amber-500 mb-6 text-center">
            SignIN To your
            <span className="font-signature text-4xl m-2 text-amber-600">
              Keeply
            </span>
            Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="sr-only">Email</label>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                name="email"
                placeholder="Email address"
                value={input.email}
                onBlur={() => setErrors((p) => ({ ...p, email: signInvalidation(input).email }))}
                type="email"
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                className="pl-12 w-full border text-white rounded-xl py-3 placeholder-gray-400 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 bg-red-100 px-2 py-1 rounded">
                {errors.email}
              </p>
            )}

            <div className="relative">
              <label className="sr-only">Password</label>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Key className="w-5 h-5" />
              </div>
              <input
                name="password"
                placeholder="password"
                onBlur={() => setErrors((p) => ({ ...p, password: signInvalidation(input).password }))}
                value={input.password}
                type="password"
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                className="pl-12 w-full border rounded-xl text-white py-3 placeholder-gray-400 bg-gray-800  focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 bg-red-100 px-2 py-1 rounded">
                {errors.password}
              </p>
            )}
            <button
              type="submit"
              disabled={!Object.values(errors).every((err) => err === "")}
              className={`w-full py-2 rounded-lg transition 
      ${
        Object.values(errors).every((err) => err === "")
          ? "bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
          : "bg-gray-400 text-gray-200 cursor-not-allowed"
      }`}
            >
              SignIn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
