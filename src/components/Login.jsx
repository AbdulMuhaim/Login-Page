import { useState } from "react";
import illustration from "../../public/Screenshot_2024-03-25_144326-removebg-preview.png";
import logo from "../../public/Screenshot 2024-03-25 144353.png";
import blurredLogo from "../../public/Screenshot_2024-03-25_144339-removebg-preview (1).png";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { notification } from "antd";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [signup, setSignup] = useState(false);
  const [userEmail] = useState("smage@gmail.com");
  const [userPassword] = useState("12345");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  notification.config({
    duration: 2,
  });

  const handleSignup = () => {
    setSignup(!signup);
  };

  const handleLogin = () => {
    if (signup) {
      return notification.error({
        message: "This service is temporarily suspended",
      });
    }
    try {
      if (email === userEmail) {
        if (password === userPassword) {
          notification.success({ message: "You have successfully logged in" });
        } else {
          notification.error({
            message: "Incorrect password. Please try again.",
          });
        }
      } else {
        notification.error({ message: "Incorrect email. Please try again." });
      }
     setEmail('')
     setPassword('')
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  const handleFogotPass = () => {
    setShowModal(true);
  };

  const sendOtp = ()=> {
     notification.error({message: "This service is temporarily suspended"});
  }

  return (
    <>

        <div className="flex items-center justify-cente w-[100vw] h-[100vh]">
          <div className="login-form w-1/2">
            <div className="flex items-center justify-center">
              <img
                className="md:w-[15vw] md:h-[8vw] w-[25vw] h-[10vh]"
                src={logo}
                alt=""
              />
            </div>
            <div className="flex">
              <h1 className="login-text lg:pl-56 md:pl-20 pl-12 font-sans text-black">
                {signup ? "Sign Up" : "Login"}
              </h1>
            </div>
            <div className={`${signup ? "hidden" : "block"}`}>
              <p
                className="lg:pl-56 md:pl-20 pl-12 text-xs md:text-base"
                style={{ color: "#8A92A6" }}
              >
                Login with your credential received from Smage Systems
              </p>
            </div>

            <div className="max-w-md mx-auto m-8 bg-white pl-11 text-xs md:text-base">
              <label
                className="block mb-2"
                htmlFor="username"
                style={{ color: "#8A92A6" }}
              >
                Email
              </label>

              <input
                className="custom-input block w-full px-4 py-2 mb-4 border rounded-md text-base focus:outline-none focus:ring focus:border-blue-500 "
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                <label
                  className="block mb-2 text-xs md:text-base"
                  htmlFor="password"
                  style={{ color: "#8A92A6" }}
                >
                  Password
                </label>
                <input
                  className="custom-input block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  style={{ color: "#8A92A6", fontSize: "16px" }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute inset-y-0 right-0 px-4 pt-8 flex items-center text-gray-500 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoEyeSharp className="text-xs md:text-base" />
                  ) : (
                    <IoEyeOffSharp className="text-xs md:text-base" />
                  )}
                </button>
              </div>

              <div className={`${signup ? "block" : "hidden"} relative`}>
                <label
                  className="block mb-2 text-xs md:text-base"
                  htmlFor="password"
                  style={{ color: "#8A92A6" }}
                >
                  Confirm Password
                </label>
                <input
                  className="custom-input block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500 "
                  type={showPassword2 ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter your password"
                  style={{ color: "#8A92A6", fontSize: "16px" }}
                />
                <button
                  className="absolute inset-y-0 right-0 px-4 pt-8 flex items-center text-gray-500 focus:outline-none"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? (
                    <IoEyeSharp className="text-xs md:text-base" />
                  ) : (
                    <IoEyeOffSharp className="text-xs md:text-base" />
                  )}
                </button>
              </div>

              <div
                className={` ${
                  signup ? "hidden" : "block"
                } flex justify-between items-center gap-2`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="md:h-5 md:w-5 h-3 w-3 text-blue-500 focus:ring-blue-400 rounded"
                    style={{ color: "#8A92A6", fontSize: "16px" }}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 md:text-base text-xs"
                    style={{ color: "#8A92A6" }}
                  >
                    Remember me
                  </label>
                </div>

                <div className="relative">
                  <p
                    onClick={handleFogotPass}
                    style={{ color: "#3A57E8" }}
                    className="md:text-base text-xs cursor-pointer"
                  >
                    Forgot Password
                  </p>

                  {showModal && (
                    <>
                      <div className="modal-backdrop"></div>
                      <div className="modal">
                        <div className="modal-content">
                          <div className="flex items-center justify-end cursor-pointer">
                            <span
                              className="text-2xl font-bold"
                              onClick={handleCloseModal}
                            >
                              &times;
                            </span>
                          </div>
                          <h2 className="text-black text-xl">
                            Forgot Password
                          </h2>
                          <p className="text-black opacity-70">
                            Enter your email address to reset your password.
                          </p>
                          <br />
                          <input
                            className="py-2 pl-3 w-[45vw] md:w-[15vw] mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            type="text"
                            id="mailid"
                            name="mailid"
                            placeholder="Please enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ color: "#8A92A6", fontSize: "14px" }}
                          />
                          <button onClick={sendOtp} className="mb-4 bg-blue-500 ml-3 p-2 rounded hover:bg-blue-600 text-white">
                            Send OTP
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <br />

              <div className="flex items-center justify-center">
                <button
                  className="login-button block w-[15vw] md:text-base text-xs px-4 py-2 text-white rounded-md focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                  type="submit"
                  onClick={handleLogin}
                >
                  {signup ? "SignUp" : "Login"}
                </button>
              </div>
              <br />
              <div className="flex items-center justify-center">
                <p
                  style={{ color: "#232D42" }}
                  className="text-xs md:text-base"
                >
                  {signup ? `Already have an account` : `Don't have an account`}{" "}
                  ?{" "}
                  <span
                    style={{ color: "#3A57E8" }}
                    className="text-xs md:text-base cursor-pointer"
                    onClick={handleSignup}
                  >
                    {signup ? "Click here to login." : "Click here to signup."}
                  </span>
                </p>
              </div>
              <div className="fixed left-10 bottom-2">
                <img
                  className="w-[9vw] h-[30vh]  opacity-20"
                  src={blurredLogo}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="illustration flex items-center justify-center w-1/2">
            <img src={illustration} alt="Illustration" />
          </div>
        </div>
    </>
  );
}

export default Login;
