// src/components/common/Header.jsx
import star from "../../assets/icons/star.svg";
import arrow from "../../assets/icons/arrow.svg";
import hamburger from "../../assets/icons/hamburger.svg";
function Header() {
  return (
    <header className="sticky top-0 z-10 flex justify-between h-14 items-center bg-white px-5">
       <button className="mr-2">
        <img src={arrow} alt="Arrow" />
      </button>
      <div className="flex items-start">
        <h1 className="text-header text-darkgray">
        깨비뚝딱
        </h1>
        <img src={star} alt="Star" className="ml-2" />
      </div>
      <button className="mr-2">
        <img src={hamburger} alt="Hamburger" />
      </button>
    </header>
  );
}

export default Header;