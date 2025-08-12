import React from "react";
import Spinner from "@/components/Spinner";
type AuthButtonProps = {
  loading: boolean;
  name: string;
  onclick?: () => void;
};

const Button: React.FC<AuthButtonProps> = ({ loading, name, onclick }) => (
  <button
    type="submit"
    className="w-full h-10 md:h-[50px] bg-[#60cc22] text-white rounded-md m-2 cursor-pointer hover:bg-[#0000ffb3] transition duration-300 ease-in-out"
    disabled={loading}
    onClick={() => {
      if (typeof onclick === "function") {
        onclick();
      }
    }}
  >
    {loading ? <Spinner /> : name}
  </button>
);

export default Button;
