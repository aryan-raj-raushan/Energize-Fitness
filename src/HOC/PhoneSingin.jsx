import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  const setupRecaptcha = () => {
    const verifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("reCAPTCHA solved");
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log("reCAPTCHA expired");
        },
      },
      auth
    );
    setRecaptchaVerifier(verifier);
  };

  const handlePhoneSignIn = () => {
    if (!recaptchaVerifier) {
      setupRecaptcha();
    }

    const formattedPhoneNumber = `+91${phoneNumber}`;

    signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        console.error("SMS not sent", error);
      });
  };

  const handleVerifyOtp = () => {
    if (confirmationResult) {
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          console.log("User signed in", result.user);
          // Redirect to homepage
          window.location.href = "/";
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          console.error("Error signing in", error);
        });
    }
  };

  useEffect(() => {
    setupRecaptcha();
  }, []);

  return (
    <div className="h-96 flex justify-center items-center flex-col gap-3">
      <p className="text-2xl font-bold">Sign in with Mobile Number</p>
      {!confirmationResult ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="text-2xl font-medium border rounded px-4 py-2 outline-none text-gray-400"
          />
          <div id="recaptcha-container"></div>
          <button
            onClick={handlePhoneSignIn}
            className="bg-black text-white drop-shadow-sm shadow-inner px-4 py-2 text-lg"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default PhoneSignIn;
