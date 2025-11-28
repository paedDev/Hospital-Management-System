import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../config/config";
import { useGlobalContext } from "../../context/context";
import { toast } from 'react-toastify';
import axios from 'axios';
const optionRole = ["admin", "doctor", "patient"];
const Register = () => {
  const { navigate, loading, error, setLoading, setError } = useGlobalContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });
  const handleChange = (
    e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // const { firstName,
      //   lastName,
      //   email,
      //   role,
      //   password } = formData;
      const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        formData
      );
      toast.success("Successfully created an account!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log(response.data);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      // toast.error(error.response?.data?.message);
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg max-w-8xl mx-auto flex items-center min-h-screen justify-center ">
      <div className="bg-white opacity-60 w-full max-w-lg p-6 relative rounded-xl shadow-2xl ">
        <div className="flex items-center justify-center flex-col mt-8 mb-8">
          <img
            src="/images/health_logo.png"
            alt="Logo"
            className="size-40 absolute top-[-50px] "
          />

          <h1 className="lg:text-2xl font-bold text-gray-800 mt-2">
            Hospital Management System
          </h1>
          <p className="text-sm text-gray-600">Access Portal</p>
        </div>
        {/* <div className="  justify-center flex items-center mb-4">
          <div className="hover:bg-blue-400 duration-300 rounded-full size-12 bg-blue-200 relative cursor-pointer group">
            <Upload
              className="absolute top-1/2 left-1/2 group-hover:text-blue-100 duration-300 -translate-x-1/2 -translate-y-1/2  text-blue-900"
              size={20}
            />
          </div>
        </div> */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form action="" onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full flex gap-2 ">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                placeholder="e.g., Jan Noel"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-blue-500  focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                LastName
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                placeholder="e.g., Paed"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-blue-500  focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              placeholder="e.g., jannoelpaed123@gmail.com"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-blue-500  focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              value={formData.role}
              required
              className="mt-1 block w-full px-3
            py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
            focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a role
              </option>
              {optionRole.map((opt, index) => (
                <option value={opt} key={index}>
                  {opt.charAt(0).toLocaleUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={formData.password}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <p className=" text-right text-xs text-gray-500">
            Already have an account?{" "}
            <Link to={"/login"} className="">
              <span className="text-blue-500 hover:text-blue-800 duration-500 cursor-pointer">
                Login
              </span>
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
