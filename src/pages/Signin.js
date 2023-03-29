import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { amazon } from "../assets/index";
import { ColorRing } from "react-loader-spinner";
import { motion } from 'framer-motion'
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch } from "react-redux";
import { LogIn } from "../redux/amazonSlice";

const Signin = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [userEmailErr,setUserEmailErr]=useState("")
  const [userPassErr,setUserPassErr]=useState("")

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setUserEmailErr("");
 
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
    setUserPassErr("");
    
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter your email");
    }
    if (!password) {
      setErrPassword("Enter your password");
    }
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(LogIn({
            _id: user.uid,
            userName: user.displayName,
            email: user.email,
            image:user.photoURL
          }))
          setLoading(false);
          setSuccessMsg("Logged in successfully")
          setTimeout(() => {
            navigate("/")
          },2000)

        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-email")) {
            setUserEmailErr("Invalid email ")
          }
          if (errorCode.includes("auth/wrong-password")) {
            setUserPassErr("Wrong password ")
          }
          console.log("Something is wrong please try again")
        });
      setEmail("")
      setPassword("")
      setUserEmailErr("");
      setUserPassErr("");
    }
    
  };
  return (
    <div className="w-full">
      <div className="w-full bg-white pb-10">
        {successMsg ? (
          <div className="w-full flex justify-center items-center py-32">
            <p
              className="text-lg font-titleFont font-semibold text-green-500 px-6 py-2 text-center flex items-center justify-center gap-1"
            >
              <CheckCircleIcon className="text-green-500 flex justify-center items-center" />
              {successMsg}
            </p>
          </div>
        ) : (
          <form className="w-[350px] mx-auto flex flex-col items-center">
            <Link to="/">
              <img className="w-32 -mb-[30px]" src={amazon} alt="darkLogo" />
            </Link>
            <div className="w-full border border-zinc-200 p-6">
              <h2 className="font-titleFont text-3xl font-medium mb-4">
                Sign in
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    Email or mobile phone number
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="email"
                  />
                  {errEmail && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {errEmail}
                    </p>
                  )}
                  {userEmailErr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="flex items-center justify-center">
                        <CancelIcon fontSize="small" />
                      </span>
                      {userEmailErr}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Password</p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="password"
                  />
                  {errPassword && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {errPassword}
                    </p>
                  )}
                  {userPassErr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="flex items-center justify-center">
                        <CancelIcon fontSize="small" />
                      </span>
                      {userPassErr}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLogin}
                  className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
                >
                  Continue
                </button>
                {loading && (
                  <div className="flex justify-center">
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#f1b04c",
                        "#ee9f27",
                        "#ec9006",
                        "#e88504",
                        "#e27602",
                      ]}
                    />
                  </div>
                )}
              </div>

              <p className="text-xs text-black leading-4 mt-4">
                By Continuing, you agree to Amazon's{" "}
                <span className="text-blue-600">Conditions of Use </span>and{" "}
                <span className="text-blue-600">Privace Notice.</span>
              </p>
              <p className="text-xs text-gray-600 mt-4 cursor-pointer group">
                <ArrowRightIcon />{" "}
                <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                  Need help?
                </span>
              </p>
            </div>
            <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
              <span className="w-1/3 text-center">New to Amazon?</span>
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            </p>
            <Link className="w-full" to="/registration">
              <button className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
                Create your Amazon account
              </button>
            </Link>
          </form>
        )}
      </div>
      <div className="w-full  bg-gradient-to-r from-[#fff] via-[rgba(255,255,255,0)] to-[#fff]  flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2023, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Signin;
