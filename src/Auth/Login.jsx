import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// 🎯 Import the Redux actions we created
import { loginUser, clearAuthError } from "../store/slices/authuserSlice";

const Login = () => {
  // Local state for form inputs is still perfect
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🎯 Get loading, error, and userInfo state from Redux instead of local state
  const { loading, error, userInfo } = useSelector((state) => state.auth);

  // This effect handles redirection after a successful login
  useEffect(() => {
    if (userInfo) {
      navigate("/"); // Redirect to the homepage if login is successful
    }
    // Clean up any previous login errors when the component loads
    return () => {
      dispatch(clearAuthError());
    };
  }, [userInfo, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🎯 Dispatch the Redux thunk instead of making a direct API call
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
           {" "}
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
               {" "}
        <h2 className="text-2xl font-bold text-center mb-6">
                    Login to Your Account        {" "}
        </h2>
        {/* 🎯 Display the error from the Redux state */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Login Failed: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
               {" "}
        <form onSubmit={handleSubmit} className="space-y-4">
                   {" "}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
                   {" "}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
                   {" "}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
          >
                       {" "}
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
                     {" "}
          </button>
                 {" "}
        </form>
               {" "}
        <p className="text-center mt-4">
                    Don't have an account?          {" "}
          <Link to="/register" className="text-blue-500">
                        Register          {" "}
          </Link>
                 {" "}
        </p>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Login;
