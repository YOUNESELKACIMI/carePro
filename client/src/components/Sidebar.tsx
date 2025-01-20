import { Link } from "react-router-dom";
import useAuth from "../hooks/useContext";
import { IcurrentUser, Iparam } from "../types/types";

const Sidebar = ({ activePage }) => {
  const { currentUser }: Iparam = useAuth();

  return (
    <div className="left sidebar h-screen w-[240px] min-w-[240px] flex flex-col  items-center bg-palette1 font-light small text-white">
      <div className="img mt-10 bg-white border-white border-2 rounded-full w-[100px] h-[100px] overflow-hidden">
        <img
          src={`https://cdn-icons-png.freepik.com/512/9706/9706583.png`}
          className="w-[100px] h-[100px]"
        />
      </div>
      <p className="text-white mt-2 ">{(currentUser as IcurrentUser).name}</p>

      <div className=" w-full mt-12 ">
        <p
          className={`hover:bg-palette2 p-4 pl-10 ${
            activePage == "map" ? "isactive" : ""
          }`}
        >
          <Link to="/map">Map</Link>
        </p>
        <p
          className={`hover:bg-palette2 p-4 pl-10 ${
            activePage == "saved" ? "isactive" : ""
          }`}
        >
          <Link to={`/saved`}>Saved Doctors</Link>
        </p>

        <p
          className={`hover:bg-palette2 p-4 pl-10 ${
            activePage == "chat" ? "isactive" : ""
          }`}
        >
          <Link to="/chat">Chat</Link>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
