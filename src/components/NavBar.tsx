import Logo from "../assets/Logo.png";
import { Menu } from "lucide-react";

export function NavBar() {
  return (
    <nav className="relative flex flex-row items-center justify-between w-full h-[10%] bg-black px-6 md:px-10">
      <img className="w-auto h-[90%]" src={Logo} alt="logo" />
      <button className="z-10">
        <Menu className="md:hidden text-white" size={30} />
      </button>
    </nav>
  );
}
