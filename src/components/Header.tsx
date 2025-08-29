import Logo from "@/assets/logo-black.svg";
import UserIcon from "@/assets/user-icon.svg";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export interface SubCategoryProps {
  name: string;
  url: string;
}
export interface CategoryProps {
  name: string;
  id: number;
  url: string;
  img?: string;
  subcategories?: SubCategoryProps[];
}

export default function Header() {
  return (
    <header className="w-full h-auto  bg-white-50/50 py-3 sticky top-0 z-50 backdrop-blur-lg shadow-md transition-all duration-300 ease-in-out">
      <div className="container mx-auto  flex items-center justify-between">
        <div className="logo ml-2">
          <Link to="/">
            <img
              src={Logo}
              alt="swish.ma"
              className="max-w-[90%] md:max-w-full"
            />
          </Link>
        </div>

        <div className="nav-items mr-2 flex items-center justify-around gap-4">
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/comment"
              className="hover:underline transition-all duration-300"
            >
              Comment ça marche
            </Link>
            <Link
              to="/secteurs"
              className="hover:underline transition-all duration-300"
            >
              Secteurs
            </Link>
            <Link
              to="/enterprises"
              className="hover:underline transition-all duration-300"
            >
              Enterprises
            </Link>

            {/* <Link to="/post-job">
              <Button>Post a job</Button>
            </Link> */}
          </div>
          <Button
            variant="outline"
            className="rounded-full  lg:hidden flex justify-center items-center"
          >
            <img src={UserIcon} alt="User" className="max-w-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}
