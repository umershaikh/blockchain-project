import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../components/AuthContext";
import { toast } from "react-toastify";
import React from "react";
import axiosInstance from "../../axiosSetup";

// Define form data interface
interface FormData {
  email: string;
  password: string;
}

// Yup validation schema
const schema = yup.object({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().label("Password"),
}).required();

const LoginForm: React.FC = () => {
  const { login } = useAuth();  // Access the login method from context
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post("login/", {
        username: data.email,
        password: data.password,
      });

      // Store tokens in localStorage
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      toast.success("Login successful!");
      login(); // Update global authentication state
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "left" }}>
    <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.25rem" }}>Email:</label>
        <input
        {...register("email")}
        type="email"
        placeholder="Enter your email"
        style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #333",
            backgroundColor: "#1f1f2e",
            color: "#fff",
        }}
        />
        {errors.email && (
        <p style={{ color: "red", fontSize: "0.85rem" }}>{errors.email.message}</p>
        )}
    </div>

    <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "0.25rem" }}>Password:</label>
        <input
        {...register("password")}
        type="password"
        placeholder="Enter your password"
        style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #333",
            backgroundColor: "#1f1f2e",
            color: "#fff",
        }}
        />
        {errors.password && (
        <p style={{ color: "red", fontSize: "0.85rem" }}>{errors.password.message}</p>
        )}
    </div>
    <div className="eg-login__bottom">
        <button type="submit" className="btn w-100">
            Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
