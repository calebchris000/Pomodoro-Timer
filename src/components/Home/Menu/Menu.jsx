import { useDispatch, useSelector } from "react-redux";
import { setTimer } from "../../../redux/Home/HomeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { loadMusicFiles, toggleMenu } from "../../../redux/Menu/MenuSlice";
import { renderNotification } from "../../../redux/Notification/NotificationSlice";
import { useEffect } from "react";
import fs from 'fs';
const TimerButtons = () => {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(renderNotification("Coming soon"));
  }
  const Buttons = ({ number, text }) => (
    <button onClick={handleClick} className="bg-violet-lighter text-violet-bg text-center p-3 flex flex-col justify-center rounded-xl">
      <span className="font-semibold self-center text-4xl mb-2">{number}</span>
      <span className="self-center text-xs font-normal">{text}</span>
    </button>
  );
  return (
    <section className="">
      <button onClick={() => dispatch(toggleMenu())} className="fixed right-5 text-violet-lighter text-5xl">
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <h2 className="text-center relative top-20 text-2xl font-bold text-violet-lighter">TIMER</h2>
      <div className="grid relative max-w-md m-auto gap-3 box-border top-24 grid-cols-3 button-collection">
        <Buttons number={25} text={"MINUTES"} />
        <Buttons number={4} text={"SHORT BREAKS"} />
        <Buttons number={8} text={"LONG BREAKS"} />
        <Buttons number={4} text={"GOALS"} />
        <Buttons number={4} text={"ROUND"} />
        <Buttons number={15} text={"MINUTES BREAK"} />
      </div>
    </section>
  );
};

const SoundButtons = () => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(renderNotification("Coming soon"));
  }
  const Buttons = ({ type, music }) => (
    <button onClick={handleClick} className="bg-violet-lighter text-center p-4 flex flex-col justify-center rounded-xl">
      <span className="font-semibold self-center text-md mb-2">{type}</span>
      <span className="self-center text-xs font-normal">{music}</span>
    </button>
  );
  return (
    <section className="relative top-20">
      <h2 className="text-center relative top-36 w-auto text-2xl font-bold text-violet-lighter">SOUND</h2>
      <div className="grid relative max-w-md m-auto text-violet-bg gap-3 box-border top-40 grid-cols-3 button-collection">
        <Buttons type={"FOCUS"} music={"Relaxing"} />
        <Buttons type={"LONG BREAK"} music={"Ticking"} />
        <Buttons type={"SHORT BREAKS"} music={"Ticking"} />
      </div>
    </section>
  );
};

const Menu = () => (
  <section className="bg-violet-bg overflow-y-scroll p-3 z-[1] fixed top-0 right-0 bottom-0 left-0 ">
    <TimerButtons />
    <SoundButtons />
  </section>
);

export default Menu;
