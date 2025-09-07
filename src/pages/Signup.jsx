import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate= useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [role,setRole] = useState("customer");
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
      if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;

    }

     try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post('http://localhost:5000/auth/login', {
          phone,
          password,
          
        });
          if (res.data && res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role",res.data.user.role)
          alert("Login successful!");
          if(res.data.user.role === "farmer"){
            navigate("/dashboard"); 
          }else if(res.data.user.role === "customer"){
            navigate("/user");
          }
          
          }else{
            alert(res.data.message || "Login failed.");
          }

        console.log(res.data); 
      } else {
        // SIGNUP
        const res = await axios.post('http://localhost:5000/auth/signup', {
          phone,
          password,
          role
        });
        alert("Signup successful!");
        console.log(res.data);
        setIsLogin(true); 
      }
    } catch (err) {
      alert("Something went wrong");
      console.error(err.response?.data || err.message);
    }

  
  };

  return (
    <section className="bg-gray-50 dark:bg-blue-50 min-h-screen flex items-center justify-center w-full">
      <div className="w-full bg-white rounded-lg shadow sm:max-w-md p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          {isLogin ? "Log in to your account" : "Create an account"}
        </h1>

        <form className="space-y-4 " onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium" >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
               placeholder="Enter your phone number (10 Digits)"
              className="w-full p-2.5 rounded-lg border"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value ={password}
              onChange={(e) => setPassword(e.target.value)}
               placeholder="Enter Password"
              className="w-full p-2.5 rounded-lg border"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Choose your role
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="farmer"
                      checked={role === "farmer"}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Farmer 🌾</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="customer"
                      checked={role === "customer"}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Customer 🛒</span>
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                   value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2.5 rounded-lg border"
                  required
                />
              </div>

              {/* <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 mt-1 mr-2"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  I accept the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div> */}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p className="text-sm text-gray-500">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:underline"
                >
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:underline"
                >
                  Login here
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
