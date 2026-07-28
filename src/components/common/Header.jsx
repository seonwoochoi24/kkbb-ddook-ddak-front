// src/components/common/Header.jsx
import star from "../../assets/logo/star.svg";
import { Icon } from "@iconify/react";

function Header() {
  return (
    <header className="sticky top-0 z-10 flex justify-between h-14 items-center bg-white px-5">
       <button className="mr-2">
        <Icon icon="heroicons:arrow-left-16-solid" className="h-6 w-6" />
      </button>
      <div className="flex items-start">
        <h1 className="text-header text-darkgray">
        깨비뚝딱
        </h1>
        <img src={star} alt="Star" className="ml-2" />
      </div>
     <button className="mr-2">
        <Icon icon="ci:hamburger-md" className="h-6 w-6" />
      </button>
    </header>
  );
}

export default Header;