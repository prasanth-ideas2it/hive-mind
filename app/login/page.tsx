"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";

import styles from "./login.module.css";
import { magicLogin } from "@/lib/magic";
import { USERACTION_TYPES, UserContext } from "@/context/user-context";

const Login = () => {
  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [userMessage, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //     // Prefetch the dashboard page
  //     router.prefetch('/');
  // }, [router]);

  // React.useEffect(() => {
  //     const handleComplete = () => {
  //       setIsLoading(false);
  //     };
  //     router.events.on("routeChangeComplete", handleComplete);
  //     router.events.on("routeChangeError", handleComplete);

  //     return () => {
  //       router.events.off("routeChangeComplete", handleComplete);
  //       router.events.off("routeChangeError", handleComplete);
  //     };
  // }, [router]);

  // useEffect(() => {
  //     if (user === null) {
  //         setIsLoading(false)
  //     }
  //     else {
  //         user?.issuer && router.push("/")
  //     }
  // }, [user])

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setMessage("");
  };

  const handleLoginButtonClicked = async (e: React.MouseEventHandler<HTMLButtonElement>) => {
    // e.preventDefault();
    console.log(email);
    if (email.trim() === "") {
      setMessage("Please enter a valid email address.");
    } else {
      setMessage("");
      setIsLoading(true);
      const userMetadata = await magicLogin(email);
      console.log(userMetadata);
      dispatch({
        type: USERACTION_TYPES.LOG_IN,
        user: {
          email: userMetadata?.email as string,
          issuer: userMetadata?.issuer as string,
          wallet: userMetadata?.publicAddress as string
        },
      });
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('/images/login_bg_2x.png')] bg-no-repeat bg-cover">
      <div className="">
        <h2 className="text-[32px] leading-[28px] text-white text-center font-extrabold">Welcome to HiveMind</h2>
        <h4 className="text-center text-[16px] leading-[24px] text-white font-medium">Shaping Tomorrow Together</h4>
        <div className="bg-white rounded-lg w-[400px] mx-auto py-[32px] mt-[32px]">
          <div className="flex items-center justify-center gap-2">
            <img src="/icons/hive_mind_logo.svg" alt="logo" />
            <p className=" text-[26px] leading-[19px] font-semibold">
              Hive<span className="text-[#FF6B00]">Mind</span>
            </p>
          </div>
          <form className="px-6 pt-[30px] flex flex-col items-center">
            <input
              type="text"
              placeholder="Email Address"
              onChange={handleEmailInputChange}
              className="p-1.5 rounded-lg border border-blue-600 w-full"
            ></input>
            <p className={styles.message}>{userMessage}</p>
            <button type="button" onClick={handleLoginButtonClicked} className="mt-5 border border-blue-600 rounded-xl bg-white font-semibold px-3 py-1.5 hover:bg-blue-500 hover:text-white">
              {isLoading ? "Loading" : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
