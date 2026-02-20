import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Banner from "../../components/common/Banner";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("login"); // "login" or "register"
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  // Login form handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Register form handlers
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegisterForm((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/user/login`, {
        email: loginForm.email,
        password: loginForm.password,
      });

      if (response.data.status === "success") {
        // Store user data and token
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("token", response.data.data.token);
        toast.success(response.data.message || "Login successful!");
        navigate("/");
        window.location.reload();
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  // Register submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    if (!registerForm.image) {
      toast.error("Please upload a profile image!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BaseUrl}/user/register`, {
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        image: registerForm.image,
      });

      if (response.data.status === "success") {
        // Store user data and token
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("token", response.data.data.token);
        toast.success(response.data.message || "Registration successful!");
        navigate("/");
        window.location.reload();
      } else {
        toast.error(response.data.message || "Registration failed!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>My Account - Login & Register | X Custom Packaging</title>
        <meta
          name="description"
          content="Login or create an account to access your X Custom Packaging account"
        />
        <meta property="og:title" content="My Account - X Custom Packaging" />
        <meta
          property="og:description"
          content="Login or create an account to access your X Custom Packaging account"
        />
        <meta property="og:url" content={`${BaseUrl}/my-account`} />
        <link rel="canonical" href={`${BaseUrl}/my-account`} />
      </Helmet> */}

      <Banner title="My Account" subTitle="My Account" />

      <div className=" bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
              <button
                onClick={() => setActiveTab("login")}
                className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-[#213554] text-white shadow-md"
                    : "text-gray-600 hover:text-[#213554]"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === "register"
                    ? "bg-[#213554] text-white shadow-md"
                    : "text-gray-600 hover:text-[#213554]"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-[#213554] mb-6 text-center">
                Login to Your Account
              </h2>
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                  star="*"
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                    star="*"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[42px] text-gray-500 hover:text-[#213554] flex items-center justify-center h-5 w-5"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                <Button
                  type="submit"
                  label={loading ? "Logging in..." : "Login"}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                />
              </form>
            </div>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-[#213554] mb-6 text-center">
                Create New Account
              </h2>
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                  required
                  star="*"
                />

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required
                  star="*"
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password (min 6 characters)"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                    star="*"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[42px] text-gray-500 hover:text-[#213554] flex items-center justify-center h-5 w-5"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                    star="*"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-[42px] text-gray-500 hover:text-[#213554] flex items-center justify-center h-5 w-5"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                <div>
                  <label className="block pb-1.5 text-[#213554] text-sm font-semibold mb-1">
                    Profile Image <span className="text-[#EE334B] ml-1">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border-2 border-gray-200 rounded-lg bg-white text-sm text-[#213554] px-4 py-3 outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300"
                    required
                  />
                  {registerForm.image && (
                    <div className="mt-2">
                      <img
                        src={registerForm.image}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  label={loading ? "Registering..." : "Register"}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccount;

