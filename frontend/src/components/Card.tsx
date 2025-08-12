import React, { ReactNode } from "react";
import clsx from "clsx";

type AuthCardProps = {
  children: ReactNode;
};

const Card = ({ children }: AuthCardProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center w-full md:px-10 md:w-[60%] h-auto min-h-full"
      )}
    >
      <div
        className={clsx(
          "flex flex-col justify-center items-center w-[97%] md:w-[600px]  h-auto px-5 md:px-10 bg-[#0000005f] rounded-xl shadow-lg my-4 pt-3 pb-8"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
