import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { BASE_URL } from "../../config/config";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

const Login = () => {
  const { navigate, loading, error, setLoading, setError, login } = useGlobalContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      console.log(response.data);
      const token = response.data.token;
      const userData = response.data.user;
      login(token, userData);
    } catch (error) {
      console.error(`Error Login`);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      else {
        toast.error("Failed to login");
        console.log(`Error in Login`, error);

      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg max-w-8xl mx-auto flex items-center min-h-screen justify-center ">
      <div className="bg-white/60 w-full max-w-lg p-6 relative rounded-xl shadow-2xl ">
        <div className="flex items-center justify-center flex-col my-10">
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
        <form action="" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={handleValueChange}
              value={formData.email}
              type="text"
              id="email"
              name="email"
              placeholder="e.g., jannoelpaed123@gmail.com"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-blue-500  focus:border-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={handleValueChange}
              value={formData.password}
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <p className=" text-right text-xs text-gray-500">
            Don't have an account?{" "}
            <Link to={"/register"} className="">
              <span className="text-blue-500 hover:text-blue-800 duration-500 cursor-pointer">
                Register
              </span>
            </Link>
          </p>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
