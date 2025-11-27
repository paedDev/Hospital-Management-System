import { Link } from "react-router-dom";

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
  } catch (error) { }
};

const Login = () => {
  return (
    <section className="bg max-w-8xl mx-auto flex items-center min-h-screen justify-center ">
      <div className="bg-white opacity-60 w-full max-w-lg p-6 relative rounded-xl shadow-2xl ">
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
              type="text"
              id="email"
              name="email"
              placeholder="e.g., jannoelpaed123@gmail.com"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-blue-500  focus:border-blue-500"
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
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
