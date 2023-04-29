import { useDispatch, useSelector } from "react-redux";
import { setTimer } from "../../../redux/Home/HomeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toggleMenu } from "../../../redux/Menu/MenuSlice";

const TimerButtons = () => {
  const dispatch = useDispatch();
  return (
    <section className="">
      <button
        onClick={() => dispatch(toggleMenu())}
        className="fixed right-5 text-violet-lighter text-5xl"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <h2 className="text-center relative top-20 text-2xl font-bold text-violet-lighter">TIMER</h2>
      <div className="grid relative max-w-md m-auto gap-3 box-border top-36 grid-cols-3 button-collection">
        <button className="bg-violet-lighter text-violet-bg text-center p-4 flex flex-col justify-center rounded-xl">
          <span className="font-semibold self-center text-4xl mb-2">25</span>
          <span className="self-center text-xs font-normal">SESSIONS</span>
        </button>
        <button className="bg-violet-lighter text-violet-bg text-center p-4 flex flex-col justify-center rounded-xl">
          <span className="font-semibold self-center text-4xl mb-2">5</span>
          <span className="self-center text-xs font-normal">SHORT BREAKS</span>
        </button>
        <button className="bg-violet-lighter text-violet-bg text-center p-4 flex flex-col justify-center rounded-xl">
          <span className="font-semibold self-center text-4xl mb-2">15</span>
          <span className="self-center text-xs font-normal">LONG BREAKS</span>
        </button>
        <button className="bg-violet-lighter text-violet-bg text-center p-4 flex flex-col justify-center rounded-xl">
          <span className="font-semibold self-center text-4xl mb-2">4</span>
          <span className="self-center text-xs font-normal">GOALS</span>
        </button>
        <button className="bg-violet-lighter text-violet-bg text-center p-4 flex flex-col justify-center rounded-xl">
          <span className="font-semibold self-center text-4xl mb-2">15</span>
          <span className="self-center text-xs font-normal">LONG BREAKS</span>
        </button>
        <button className="bg-violet-lighter text-violet-bg text-center p-4 flex flex-col justify-center rounded-xl">
          <span className="font-semibold self-center text-4xl mb-2">15</span>
          <span className="self-center text-xs font-normal">LONG BREAKS SESSIONS</span>
        </button>
      </div>
    </section>
  );
};

const SoundButtons = () => {
  return (
    <section className="relative top-20">
      <h2 className="text-center relative top-36 w-auto text-2xl font-bold text-violet-bg">
        SOUND
      </h2>

      <div className="grid relative max-w-md m-auto text-violet-bg gap-3 box-border top-40 grid-cols-3 button-collection">
        <button className="bg-violet-lighter text-center p-4 flex flex-col justify-center rounded-xl">
          <span className="font-semibold self-center text-md mb-2">FOCUS MUSIC</span>
          <span className="self-center text-xs font-normal">Ticking</span>
        </button>

        <button className="bg-violet-lighter text-violet-bg text-center p-4 flex flex-col justify-center rounded-xl">
          <span className="font-semibold self-center text-md mb-2">LONG BREAK</span>
          <span className="self-center text-xs font-normal">Ticking</span>
        </button>
        <button className="bg-violet-lighter text-violet-bg text-center p-4 flex flex-col justify-center rounded-xl">
          <span className="font-semibold self-center text-md mb-2">SHORT BREAK</span>
          <span className="self-center text-xs font-normal">Ticking</span>
        </button>
      </div>
    </section>
  );
};

const Menu = () => (
  <section className="bg-violet-bg overflow-y-scroll p-3 z-20 fixed top-0 right-0 bottom-0 left-0 ">
    <TimerButtons />
    <SoundButtons />
  </section>
);

export default Menu;
