import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next"; 

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative z-10 bg-white shadow-lg w-full max-w-6xl min-h-[600px] flex flex-col md:flex-row">
  {/* Left side */}
  <div className="w-full h-60 md:h-auto md:w-1/2 bg-[url('/src/assets/img/login_bg.jpg')] bg-cover relative flex items-center justify-center">
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
    <div className="z-10 text-center text-white">
      <h1
        className="text-5xl font-mono"
        style={{ fontFamily: "Monoton, cursive" }}
      >
        Room X
      </h1>
      <h4 className="text-lg mt-4">{t("label_slogan")}</h4>
    </div>
  </div>
  {/* Right side */}
  <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-8 md:px-12">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      {t("button_dang_nhap")}
    </h2>
    <form className="w-full">
      <div className="mb-6">
        <label
          htmlFor="account"
          className="block text-gray-700 font-medium mb-2"
        >
          {t("label_tai_khoan")}
        </label>
        <input
          type="text"
          id="account"
          className="w-full border-b-2 border-gray-300 p-3 focus:outline-none focus:border-blue-500 transition duration-300 bg-transparent rounded-md"
          placeholder={t("placeholder_tai_khoan")}
        />
      </div>
      <div className="mb-6 relative">
        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-2"
        >
          {t("label_mat_khau")}
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full border-b-2 border-gray-300 p-3 pr-10 focus:outline-none focus:border-blue-500 transition duration-300 bg-transparent rounded-md"
            placeholder={t("placeholder_mat_khau")}
          />
          <div
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#3970b0] text-white font-bold py-3 rounded-lg hover:bg-[#2f5a8d] transition duration-300"
      >
        {t("button_dang_nhap")}
      </button>
    </form>
    <p className="mt-6 text-gray-600">
      <a href="#" className="text-blue-500 font-medium hover:no-underline">
        {t("link_quen_mat_khau")}
      </a>
    </p>
  </div>
</div>

  );
};

export default LoginForm;
