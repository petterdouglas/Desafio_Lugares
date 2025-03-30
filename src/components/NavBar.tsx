import Logo from "../assets/Logo.png";
import { Menu } from "lucide-react";
import { useMenuBar } from "../context/Context";

export function NavBar() {
  const { isActived, setIsActived } = useMenuBar();

  return (
    <nav className="relative flex flex-row items-center justify-between w-full h-[10%] shadow-xl bg-black px-6 md:px-10">
      <img className="w-auto h-[90%]" src={Logo} alt="logo" />
      <button className="z-10" onClick={() => setIsActived(!isActived)}>
        <Menu className="md:hidden text-white" size={30} />
      </button>
    </nav>
  );
}
