import React from "react";
import GoogleLogo from "../assets/logo/google.png";
import AppleLogo from "../assets/logo/apple-white-logo.png";
import GuestLogo from "../assets/logo/user.png";
import PhoneLogo from "../assets/logo/phone.png";
import PhoneSignIn from "../HOC/PhoneSingin";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthenticatedWith = ({title}) => {
  const [showPopup, setShowPopup] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();

  const handlePhoneSignIn = () => {
    setShowPopup(true);
  };

  return (
    <div className="flex items-center my-5 gap-8 flex-col">
      <p className="text-white text-3xl">{title} with</p>
      <div className="flex items-center gap-8">
        <img
          src={GoogleLogo}
          alt="Google"
          className="w-12 h-12 cursor-pointer"
          onClick={signInWithGoogle}
        />
        <img
          src={AppleLogo}
          alt="Google"
          className="w-12 h-12 cursor-pointer"
          onClick={signInWithApple}
        />
        <div>
          <img
            src={PhoneLogo}
            alt="Google"
            className="w-12 h-12 cursor-pointer"
            onClick={handlePhoneSignIn}
          />
          {showPopup && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 bg-white border border-solid border-[#ccc] !z-50 min-w-[40vh] min-h-96">
              <PhoneSignIn />
            </div>
          )}
        </div>
        <img
          src={GuestLogo}
          alt="Google"
          className="w-12 h-12 bg-white cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AuthenticatedWith;
