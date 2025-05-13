import { PiStudentFill } from "react-icons/pi";
import { IoLogoVimeo } from "react-icons/io";

const Header = () => {
  
  return (
    <>
      <div className="flex justify-between bg-white text-sky-600 shadow-lg top-0 fixed w-full z-50 h-16">
        {/* Logo and Home link */}
        <div
          className="flex items-center text-2xl lg:text-3xl font-bold italic mx-2 sm:mx-6"
        >
          <PiStudentFill className="text-4xl xl:text-5xl text-sky-600" />
          {/* Shopify icon */}
          <span className="hidden sm:inline">
            Student
            <IoLogoVimeo className="hidden sm:inline self-center" />
            {/* Globe icon */}
            ista
          </span>
        </div>
        
      </div>
    </>
  );
};

export default Header;