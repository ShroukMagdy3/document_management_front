import React, { useState, type FormEvent, type JSX } from "react";
import { User, Key, Mail, Phone, IdCard } from "lucide-react";
import AuthLayout from "../../layout/authLayout/authLayout";
import type { RegisterFormData } from "./register.interface";
import registerValidation from "./registerValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterForm(): JSX.Element {
  const [inputs, setInput] = useState<RegisterFormData>({
    userName: "",
    nid: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = registerValidation(inputs);
    setErrors(validationErrors);

    if (!Object.values(validationErrors).every((err) => err === "")) return;

    axios
      .post("http://localhost:3000/api/v1/users/signUp", inputs)
      .then((res) => {
        if (res.data.message === "Created") {
          toast.success("Account created!", {
            style: {
              background: "#1F2937",
              color: "#F59E0B",
              borderRadius: "12px",
              fontWeight: "bold",
              padding: "14px",
            },
          });

          setTimeout(() => navigate("/confirm"), 900);
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;

        toast.error(msg, {
          style: {
            background: "#FF6666",
            padding: "20px",
            color: "#000",
            fontWeight: "bold",
            borderRadius: "12px",
          },
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-3xl bg-gray-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <AuthLayout />

        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-amber-400 mb-6">
            Create your
            <span className="font-signature text-5xl text-amber-500"> Keeply.</span>
            account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* USERNAME */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <User className="w-5 h-5" />
              </div>
              <input
                name="userName"
                placeholder="Username"
                value={inputs.userName}
                onChange={(e) => setInput({ ...inputs, userName: e.target.value })}
                className="pl-12 w-full border border-amber-200 rounded-xl py-3 text-white bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}

            {/* NID */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <IdCard className="w-5 h-5" />
              </div>
              <input
                name="nid"
                placeholder="National ID (NID)"
                value={inputs.nid}
                onChange={(e) => setInput({ ...inputs, nid: e.target.value })}
                className="pl-12 w-full border border-amber-200 rounded-xl py-3 text-white bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {errors.nid && <p className="text-red-500 text-sm">{errors.nid}</p>}

            {/* EMAIL */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                name="email"
                placeholder="Email address"
                type="email"
                value={inputs.email}
                onChange={(e) => setInput({ ...inputs, email: e.target.value })}
                className="pl-12 w-full border border-amber-200 rounded-xl py-3 text-white bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            {/* PHONE */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="w-5 h-5" />
              </div>
              <input
                name="phone"
                placeholder="Phone number"
                type="tel"
                value={inputs.phone}
                onChange={(e) => setInput({ ...inputs, phone: e.target.value })}
                className="pl-12 w-full border border-amber-200 rounded-xl py-3 text-white bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

            {/* PASSWORD */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Key className="w-5 h-5" />
              </div>
              <input
                name="password"
                placeholder="Create password"
                type="password"
                value={inputs.password}
                onChange={(e) => setInput({ ...inputs, password: e.target.value })}
                className="pl-12 w-full border border-amber-200 rounded-xl py-3 text-white bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={
                !inputs.userName ||
                !inputs.nid ||
                !inputs.email ||
                !inputs.phone ||
                !inputs.password ||
                !Object.values(errors).every((err) => err === "")
              }
              className={`w-full py-3 rounded-xl transition ${
                inputs.userName &&
                inputs.nid &&
                inputs.email &&
                inputs.phone &&
                inputs.password &&
                Object.values(errors).every((err) => err === "")
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
            >
              Sign Up
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
