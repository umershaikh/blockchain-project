import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import CloseEye from "../../svg/CloseEye";
import OpenEye from "../../svg/OpenEye";

// Country code data
const COUNTRY_CODES = [
  { code: "+92", label: "Pakistan" },
  { code: "+1", label: "Canada" },
  { code: "+966", label: "Saudi Arabia" },
  { code: "+962", label: "Jordan" },
  { code: "+34", label: "Spain" },
  { code: "+55", label: "Brazil" },
  { code: "+65", label: "Singapore" },
  // ... add more as needed
];

// Interface for form data
interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  referral_code?: string;
  country_code: string;        // e.g. +92
  mobile_number: string;       // e.g. 7-12 digits
  password: string;
  confirm_password: string;
  verification_code: string;
}

// For tracking password criteria
interface PasswordCriteria {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

// Yup schema
const schema = yup.object({
  first_name: yup.string().required().label("First Name"),
  last_name: yup.string().required().label("Last Name"),
  email: yup.string().required().email().label("Email"),
  referral_code: yup.string().notRequired().label("Referral Code"),
  country_code: yup.string().required("Country code is required"),
  mobile_number: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{7,12}$/, "Enter a valid mobile number (7-12 digits)"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters required"),
  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  verification_code: yup.string().required("Verification code is required"),
}).required();

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  // For password visibility toggle
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible);

  // Timer for "Get Code" button
  const [timer, setTimer] = useState<number>(0);
  const [timesRequested, setTimesRequested] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Track password criteria
  const [criteria, setCriteria] = useState<PasswordCriteria>({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Show/hide password requirement panel
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Watch password changes for real-time validation
  const passwordValue = watch("password", "");
  useEffect(() => {
    setCriteria({
      minLength: passwordValue.length >= 8,
      hasUpperCase: /[A-Z]/.test(passwordValue),
      hasLowerCase: /[a-z]/.test(passwordValue),
      hasNumber: /[0-9]/.test(passwordValue),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
    });
  }, [passwordValue]);

  // Final submission
  const onSubmit = async (data: FormData) => {
    try {
      // If your backend expects combined phone, do: const full_phone = data.country_code + data.mobile_number
      // Otherwise, just send them separately
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Registration failed");
      }
      toast.success("User registered successfully");
      reset();
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Send verification code
  const handleSendCode = async (email: string) => {
    if (!email) {
      toast.error("Please enter an email address first.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (timesRequested >= 3) {
      toast.error("Max attempts reached. Try again in 24 hours.");
      return;
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/api/send-verification-code/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        throw new Error("Unexpected server response. Please try again later.");
      }
      if (!res.ok) {
        throw new Error(data.error || "Failed to send code.");
      }
      toast.success("Verification code sent!");
      setTimesRequested(data.times_requested);
      setTimer(60);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
   <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "left" }}>
      {/* First Name */}
      <div style={{ marginBottom: "1rem" }}>
         <label style={{ display: "block", marginBottom: "0.25rem" }}>First Name</label>
         <input
         {...register("first_name")}
         type="text"
         placeholder="John"
         style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #333",
            backgroundColor: "#1f1f2e",
            color: "#fff",
         }}
         />
         {errors.first_name && (
         <p style={{ color: "red", fontSize: "0.85rem" }}>{errors.first_name.message}</p>
         )}
      </div>

      {/* Last Name */}
      <div style={{ marginBottom: "1rem" }}>
         <label style={{ display: "block", marginBottom: "0.25rem" }}>Last Name</label>
         <input
         {...register("last_name")}
         type="text"
         placeholder="Doe"
         style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #333",
            backgroundColor: "#1f1f2e",
            color: "#fff",
         }}
         />
         {errors.last_name && (
         <p style={{ color: "red", fontSize: "0.85rem" }}>{errors.last_name.message}</p>
         )}
      </div>

      {/* Email + "Get Code" */}
      <div style={{ marginBottom: "1rem" }}>
         <label style={{ display: "block", marginBottom: "0.25rem" }}>Email</label>
         <div style={{ display: "flex", gap: "0.5rem" }}>
         <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="john@doe.com"
            style={{
               flex: 1,
               padding: "0.5rem",
               borderRadius: "4px",
               border: "1px solid #333",
               backgroundColor: "#1f1f2e",
               color: "#fff",
            }}
         />
         <button
            type="button"
            disabled={timer > 0 || timesRequested >= 3}
            onClick={() =>
               handleSendCode(
               (document.getElementById("email") as HTMLInputElement)?.value
               )
            }
            style={{
               width: "120px",
               borderRadius: "4px",
               border: "none",
               backgroundColor: "#0cf",
               color: "#14141f",
               fontWeight: 600,
               cursor: "pointer",
            }}
         >
            {timer > 0
               ? `Resend in ${timer}s`
               : timesRequested >= 3
               ? "Max Reached"
               : timesRequested === 0
               ? "Get Code"
               : "Resend Code"}
         </button>
         </div>
         {errors.email && (
         <p style={{ color: "red", fontSize: "0.85rem" }}>{errors.email.message}</p>
         )}
      </div>

      {/* Verification Code */}
      <div style={{ marginBottom: "1rem" }}>
         <label style={{ display: "block", marginBottom: "0.25rem" }}>Verification Code</label>
         <input
         {...register("verification_code")}
         type="text"
         placeholder="6-digit code"
         style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #333",
            backgroundColor: "#1f1f2e",
            color: "#fff",
         }}
         />
         {errors.verification_code && (
         <p style={{ color: "red", fontSize: "0.85rem" }}>
            {errors.verification_code.message}
         </p>
         )}
      </div>

      {/* Country Code + Mobile Number */}
      <div style={{ marginBottom: "1rem" }}>
         <label style={{ display: "block", marginBottom: "0.25rem" }}>Mobile No.</label>
         <div style={{ display: "flex", gap: "0.5rem" }}>
         <select
            {...register("country_code")}
            style={{
               width: "140px",
               borderRadius: "4px",
               padding: "0.5rem",
               border: "1px solid #333",
               backgroundColor: "#1f1f2e",
               color: "#fff",
            }}
         >
            <option value="">Select Code</option>
            {COUNTRY_CODES.map((c) => (
               <option key={c.code} value={c.code}>
               {c.code} ({c.label})
               </option>
            ))}
         </select>
         <input
            {...register("mobile_number")}
            type="text"
            placeholder="Enter Mobile No."
            style={{
               flex: 1,
               padding: "0.5rem",
               borderRadius: "4px",
               border: "1px solid #333",
               backgroundColor: "#1f1f2e",
               color: "#fff",
            }}
         />
         </div>
         {(errors.country_code || errors.mobile_number) && (
         <p style={{ color: "red", fontSize: "0.85rem" }}>
            {errors.country_code?.message || errors.mobile_number?.message}
         </p>
         )}
      </div>

      {/* Password */}
      <div style={{ marginBottom: "1rem" }}>
         <label style={{ display: "block", marginBottom: "0.25rem" }}>Password</label>
         <div style={{ position: "relative" }}>
         <input
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Min. 8 characters"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            style={{
               width: "100%",
               padding: "0.5rem",
               borderRadius: "4px",
               border: "1px solid #333",
               backgroundColor: "#1f1f2e",
               color: "#fff",
            }}
         />
         <div
            onClick={togglePasswordVisibility}
            style={{
               position: "absolute",
               top: "50%",
               right: "10px",
               transform: "translateY(-50%)",
               cursor: "pointer",
            }}
         >
            {isPasswordVisible ? <CloseEye /> : <OpenEye />}
         </div>
         </div>
         {errors.password && (
         <p style={{ color: "red", fontSize: "0.85rem" }}>{errors.password.message}</p>
         )}

         {/* Animated Password Criteria */}
         <div
         style={{
            maxHeight: isPasswordFocused ? "300px" : "0px",
            opacity: isPasswordFocused ? 1 : 0,
            transition: "max-height 0.3s ease, opacity 0.3s ease",
            overflow: "hidden",
            backgroundColor: "#1e1e1e",
            borderRadius: "8px",
            padding: isPasswordFocused ? "0.75rem" : "0rem",
            marginTop: isPasswordFocused ? "0.5rem" : "0rem",
         }}
         >
         {isPasswordFocused && (
            <>
               <p
               style={{
                  margin: "0 0 0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#ccc",
               }}
               >
               Password Requirements:
               </p>
               <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
               <li style={{ display: "flex", alignItems: "center", marginBottom: "0.4rem" }}>
                  {criteria.minLength ? (
                     <FaCheckCircle style={{ color: "#00c087", marginRight: "0.5rem" }} />
                  ) : (
                     <FaTimesCircle style={{ color: "#999", marginRight: "0.5rem" }} />
                  )}
                  <span style={{ fontSize: "0.9rem", color: "#ccc" }}>
                     Minimum 8 characters
                  </span>
               </li>
               <li style={{ display: "flex", alignItems: "center", marginBottom: "0.4rem" }}>
                  {criteria.hasUpperCase ? (
                     <FaCheckCircle style={{ color: "#00c087", marginRight: "0.5rem" }} />
                  ) : (
                     <FaTimesCircle style={{ color: "#999", marginRight: "0.5rem" }} />
                  )}
                  <span style={{ fontSize: "0.9rem", color: "#ccc" }}>
                     At least one uppercase letter
                  </span>
               </li>
               <li style={{ display: "flex", alignItems: "center", marginBottom: "0.4rem" }}>
                  {criteria.hasLowerCase ? (
                     <FaCheckCircle style={{ color: "#00c087", marginRight: "0.5rem" }} />
                  ) : (
                     <FaTimesCircle style={{ color: "#999", marginRight: "0.5rem" }} />
                  )}
                  <span style={{ fontSize: "0.9rem", color: "#ccc" }}>
                     At least one lowercase letter
                  </span>
               </li>
               <li style={{ display: "flex", alignItems: "center", marginBottom: "0.4rem" }}>
                  {criteria.hasNumber ? (
                     <FaCheckCircle style={{ color: "#00c087", marginRight: "0.5rem" }} />
                  ) : (
                     <FaTimesCircle style={{ color: "#999", marginRight: "0.5rem" }} />
                  )}
                  <span style={{ fontSize: "0.9rem", color: "#ccc" }}>At least one number</span>
               </li>
               <li style={{ display: "flex", alignItems: "center", marginBottom: "0.4rem" }}>
                  {criteria.hasSpecialChar ? (
                     <FaCheckCircle style={{ color: "#00c087", marginRight: "0.5rem" }} />
                  ) : (
                     <FaTimesCircle style={{ color: "#999", marginRight: "0.5rem" }} />
                  )}
                  <span style={{ fontSize: "0.9rem", color: "#ccc" }}>
                     At least one special character (e.g., !@#$%)
                  </span>
               </li>
               </ul>
            </>
         )}
         </div>
      </div>

      {/* Confirm Password */}
      <div style={{ marginBottom: "1rem" }}>
         <label style={{ display: "block", marginBottom: "0.25rem" }}>Confirm Password</label>
         <input
         {...register("confirm_password")}
         type="password"
         placeholder="Repeat password"
         style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #333",
            backgroundColor: "#1f1f2e",
            color: "#fff",
         }}
         />
         {errors.confirm_password && (
         <p style={{ color: "red", fontSize: "0.85rem" }}>{errors.confirm_password.message}</p>
         )}
      </div>
      {/* Referral Code (optional) */}
      <div style={{ marginBottom: "1rem" }}>
         <label style={{ display: "block", marginBottom: "0.25rem" }}>Referral Code (Optional)</label>
         <input
            {...register("referral_code")}
            type="text"
            placeholder="AB12XY"
            style={{
               width: "100%",
               padding: "0.5rem",
               borderRadius: "4px",
               border: "1px solid #333",
               backgroundColor: "#1f1f2e",
               color: "#fff",
            }}
         />
      </div>
      <button
         type="submit"
         style={{
         width: "100%",
         padding: "0.75rem",
         borderRadius: "4px",
         border: "none",
         color: "#14141f",
         fontWeight: 600,
         cursor: "pointer",
         }}
      >
         Register
      </button>
   </form>
  );
};

export default RegisterForm;
