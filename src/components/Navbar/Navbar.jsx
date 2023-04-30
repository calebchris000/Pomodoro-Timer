import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { toggleMenu } from "../../redux/Menu/MenuSlice";
import Menu from "../Home/Menu/Menu";
import { runningTimer } from "../../redux/Home/HomeSlice";

const Navbar = () => {
  const { menuActive } = useSelector((store) => store.Menu);
  const dispatch = useDispatch();
  function handleSkip() {
    dispatch(runningTimer({ min: 0, sec: 0 }));
  }
  return (
    <nav className="flex select-none text-violet-lighter items-center justify-between m-0 px-8 py-5">
      <button className="text-2xl" onClick={() => dispatch(toggleMenu())}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <button onClick={handleSkip} className="font-[poppins] font-semibold">
        SKIP
      </button>
      {menuActive ? <Menu /> : ""}
    </nav>
  );
};

export default Navbar;
