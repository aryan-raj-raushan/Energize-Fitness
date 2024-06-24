import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import React from "react";
import { useAuth } from "../context/AuthContext";
import AuthenticatedWith from "../HOC/AuthenticatedWith";

const Signup = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const {
    signUpWithEmail,
  } = useAuth();
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(name, mobile, email, password);
      navigate("/");
      goTop();
    } catch (error) {
      console.log(error.message);
    }
  };

  const goTop = () => { 
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      <section className="login-section ">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Sign Up
          </h1>
        </div>
        {/* form  */}
        <div className="py-10 flex justify-center page-padding">
          <form
            onSubmit={handleEmailSignUp}
            className="flex flex-col py-10 px-20 bg-black w-[55rem] min450:w-full shadow-xl"
          >
            <label className="text-[2rem] text-white mb-3 font-medium ">
              Name
            </label>
            <input
              className="text-[1.7rem] px-8 py-4 mb-10 w-full outline-[#ff0336] "
              placeholder="Your Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>

            <label className="text-[2rem] text-white mb-3 font-medium ">
              Mobile
            </label>
            <input
              className="text-[1.7rem] px-8 py-4 mb-10 w-full outline-[#ff0336] "
              placeholder="Your Mobile Number"
              type="text"
              onChange={(e) => setMobile(e.target.value)}
            ></input>

            <label className="text-[2rem] text-white mb-3 font-medium ">
              Email
            </label>
            <input
              className="text-[1.7rem] px-8 py-4 mb-10 w-full outline-[#ff0336] "
              placeholder="gymate@gymail.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <label className="text-[2rem] text-white mb-3 font-medium ">
              Password
            </label>
            <input
              className="text-[1.7rem] px-8 py-4 mb-10 w-full outline-[#ff0336] "
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <button
              type="submit"
              className="bg-[#ff0336] text-white py-4 font-medium text-[2rem] w-full mt-10"
            >
              Sign Up
            </button>
            <div className="flex gap-4 items-center mt-16 min450:flex-col">
              <p className="text-white text-[1.5rem]">Already have account?</p>
              <Link
                to="/login"
                className="text-[#ff0336] font-bold text-[1.5rem]"
              >
                Sign In
              </Link>
            </div>
            <p className="text-[#ffffffbc] text-[1.3rem] mt-5">
              ( Make <span className="text-[#ff0336]">new Accout</span> or go to
              <span className="text-[#ff0336]"> Sign In</span> Page for Test
              Account )
            </p>
            <AuthenticatedWith title="Sign up"/>
          </form>
        </div>
        <Footer />
      </section>
      <div id="recaptcha-container"></div>
    </>
  );
}

export default Signup;
