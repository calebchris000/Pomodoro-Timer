import { faBars, faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/HomeScreen.css";
import { useEffect, useRef, useState } from "react";
import CountDownTimer from "../Timer/Timer";
import { runningTimer, setTimer, startPause } from "../../redux/Home/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu/Menu";
import { toggleMenu } from "../../redux/Menu/MenuSlice";

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

const Timer = () => {
  const dispatch = useDispatch();
  const [button, setButton] = useState(false);
  const [range, setRange] = useState(25);
  const { isRunning, currentMinutes } = useSelector((store) => store.Home);
  const [minute, setMinute] = useState(range);
  const [second, setSecond] = useState(0);
  const [relaxAudio] = useState(new Audio("./audio/relaxed.mp3"));
  const [alarm] = useState(new Audio("./audio/alarm.mp3"));
  const [timerState, setTimerState] = useState({
    start: false,
    pause: false,
    stop: false,
  });
  const rangeRef = useRef(null);

  useEffect(() => {
    dispatch(setTimer(minute));
    relaxAudio.loop = true;
    relaxAudio.volume = 0.5;
  }, []);

  useEffect(() => {
    if (minute === 0 && second === 0) {
      setButton(false);
      relaxAudio.pause();
      relaxAudio.currentTime = 0;
      alarm.play();
      alarm.loop = false;
    }
  }, [minute, second]);
  useEffect(() => {
    const timer = new CountDownTimer(minute, second, (min, sec) => {
      dispatch(runningTimer({ min, sec }));
      setMinute(min);
      setSecond(sec);
    });
    const { start, pause, stop } = timerState;
    if (start) {
      timer.start();
    } else if (pause) {
      timer.pause();
    } else if (stop) {
      timer.stop();
    }

    isRunning ? (rangeRef.current.style.opacity = "0.5") : (rangeRef.current.style.opacity = "1");
    return () => {
      timer.pause();
    };
  }, [timerState]);

  function handleClick() {
    setButton(!button);
    button ? relaxAudio.pause() : relaxAudio.play();
    dispatch(startPause());
    timerState.start
      ? setTimerState((state) => {
          return {
            ...state,
            start: false,
            pause: true,
          };
        })
      : setTimerState((state) => {
          return {
            ...state,
            start: true,
            pause: false,
          };
        });
  }

  function handleSetTime() {
    const value = rangeRef.current.value;
    dispatch(setTimer(value));
    setRange(value);
    setMinute(currentMinutes);
    setButton(false);
  }

  return (
    <section className="flex box-border flex-col mx-5 my-10 text-violet-lighter">
      <h2 className="text-8xl select-none font-[poppins] font-semibold text-center">
        {minute}:{second < 10 ? `0${second}` : second}
      </h2>
      <input
        type="range"
        ref={rangeRef}
        className="my-5 w-64 max-w-5xl m-auto range"
        min={0}
        max={60}
        onChange={handleSetTime}
      />
      <i onClick={handleClick} className="text-8xl text-center my-5 ">
        {button ? (
          <FontAwesomeIcon icon={faCirclePause} />
        ) : (
          <FontAwesomeIcon icon={faCirclePlay} />
        )}
      </i>
      <button
        type="button"
        className="select-none"
        onClick={() => {
          dispatch(startPause(false));
          setButton(false);
          setMinute(range);
          setSecond(0);
          relaxAudio.currentTime = 0;
          relaxAudio.pause();
          setTimerState((state) => {
            return {
              ...state,
              pause: false,
              start: false,
              stop: true,
            };
          });
        }}
      >
        RESET
      </button>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-violet-lighter m-auto max-w-xl text-center text-lg font-semibold text-violet-bg flex justify-between p-8 rounded-t-2xl fixed bottom-0 left-0 right-0">
      <div className="">
        <h3 className="text-2xl ">ROUND</h3>
        <p className="">
          <span className="text-3xl mr-1">2</span>
          <span className="font-normal text-1xl">/4</span>
        </p>
      </div>
      <span className="border border-1 border-violet-bg"></span>
      <div>
        <h3 className="text-2xl">GOAL</h3>
        <p className="">
          <span className="text-3xl mr-1">1</span>
          <span className="font-normal text-1xl">/4</span>
        </p>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      <Timer />
      <Footer />
    </>
  );
};

export default Home;
