import useAuth from "../hooks/useContext";
import { IcurrentUser } from "../types/types";


const Navbar = () => {
  const { logout } = useAuth();
  const {currentUser } = useAuth();

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("closed");
    }
  };

  return (
    <div className="w-full border-b flex gap-2 bg-palette2  items-center p-2 pl-8 navbar z-50 ">
      <span
        onClick={toggleSidebar}
        className="material-symbols-outlined pr-4 cursor-pointer text-white "
      >
        menu
      </span>
      <div className="w-full flex justify-end pr-8">
        <p
          className="small cursor-pointer p-2 bg-palette3 hover:bg-palette1 rounded text-white"
          onClick={logout}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default Navbar;