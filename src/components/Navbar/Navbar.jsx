import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { toggleMenu } from "../../redux/Menu/MenuSlice";
import Menu from "../Home/Menu/Menu";

const Navbar = () => {
    const { menuActive } = useSelector((store) => store.Menu);
    const dispatch = useDispatch();
    return (
      <nav className="flex select-none text-violet-lighter items-center justify-between m-0 px-8 py-5">
        <button className="text-2xl" onClick={() => dispatch(toggleMenu())}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <p className="font-[poppins] font-semibold">SKIP</p>
        {menuActive ? <Menu /> : ""}
      </nav>
    );
  };

  export default Navbar