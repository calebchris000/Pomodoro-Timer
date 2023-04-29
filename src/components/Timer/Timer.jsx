import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CountDownTimer from "../TimerLogic/TimerLogic";
import { runningTimer, setTimer, startPause } from "../../redux/Home/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import { renderNotification } from "../../redux/Notification/NotificationSlice";
import { Goals, ResetRound, Rounds, goOnBreak } from "../../redux/Timer/TimerSlice";

const Timer = () => {
  const { currentMinutes } = useSelector((store) => store.Home);
  const { rounds, goals, onBreak } = useSelector((store) => store.Pomodoro);
  const dispatch = useDispatch();
  const [button, setButton] = useState(false);
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [relaxAudio] = useState(new Audio("./audio/relaxed.mp3"));
  const [alarm] = useState(new Audio("./audio/alarm.mp3"));
  const [timerState, setTimerState] = useState({
    start: false,
    pause: false,
    stop: false,
  });

  useEffect(() => {
    relaxAudio.loop = true;
    relaxAudio.volume = 0.5;
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Welcome to Pomodoro Timer");
        } else if (permission === "denied") {
          alert("Enable notification to get the most out of the app.");
        }
      });
  }, []);

  useEffect(() => {
    function handleTimerState(start, pause, stop) {
      setTimerState((timerState) => {
        return {
          ...timerState,
          start,
          pause,
          stop,
        };
      });
    }

    if (minute === 0 && second === 0) {
      if (rounds >= 3) {
        setButton(true);
        dispatch(renderNotification("1 goal complete. Long break begins."));
        new Notification("1 goal complete. Long break begins.");
        setMinute(30);
        handleTimerState(true, false, false);
        dispatch(setTimer(30));
        dispatch(goOnBreak(true));
        dispatch(ResetRound());
        dispatch(Goals());
        return;
      }
      if (!onBreak) {
        setButton(true);
        setMinute(15);
        handleTimerState(true, false, false);
        dispatch(setTimer(15));
        dispatch(renderNotification("Short break started."));
        new Notification("Short break started");
        dispatch(Rounds());
        dispatch(goOnBreak(true));
        return;
      } else if (onBreak) {
        setButton(true);
        dispatch(setTimer(25));
        setMinute(25);
        handleTimerState(true, false, false);
        new Notification("Resume Activity.");
        dispatch(renderNotification("Resume Activity."));
        dispatch(goOnBreak(false));
        return;
      }
    }
    if (goals > 3) {
      setButton(false);
      relaxAudio.pause();
      relaxAudio.currentTime = 0;
      alarm.play();
      alarm.loop = false;
      new Notification("Timer complete, Good job!.");
      dispatch(renderNotification("Timer complete, Good job!."));

      return;
    }
  }, [minute, second]);

  useEffect(() => {
    const timer = new CountDownTimer(minute, second, (min, sec) => {
      dispatch(runningTimer({ min, sec }));
      setMinute(min);
      setSecond(sec);
    });

    const { start, pause } = timerState;
    start ? timer.start() : pause ? timer.pause() : timer.stop();

    return () => {
      timer.pause();
    };
  }, [timerState, isAdded]);

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

  function handleReset() {
    dispatch(startPause(false));
    setButton(false);
    setMinute(25);
    setSecond(0);
    relaxAudio.pause();
    relaxAudio.currentTime = 0;
    setTimerState((state) => {
      return {
        ...state,
        pause: false,
        start: false,
        stop: true,
      };
    });
  }

  function addFiveMinutes() {
    setIsAdded(!isAdded);
    setMinute((minute) => {
      if (minute < 60 && minute + 5 <= 59) {
        dispatch(renderNotification("Five minutes added"));
        return minute + 5;
      } else {
        dispatch(renderNotification("Cannot add minutes more than 60"));
        setSecond(59);
        return (minute = 59);
      }
    });
  }

  function removeFiveMinutes() {
    setIsAdded(!isAdded);
    setMinute((minute) => {
      if (minute > 0 && minute - 5 >= 0) {
        dispatch(renderNotification("Five minutes remove"));
        return minute - 5;
      } else {
        alarm.pause();
        alarm.currentTime = 0;
        return (minute = 0);
      }
    });
  }

  return (
    <section className="flex box-border flex-col mx-5 my-10 text-violet-lighter">
      <h2 className="text-8xl select-none font-[poppins] font-semibold text-center">
        {minute}:{second < 10 ? `0${second}` : second}
      </h2>
      <button onClick={handleClick} className="text-8xl w-fit p-0 m-auto text-center my-2 ">
        {button ? <FontAwesomeIcon icon={faCirclePause} /> : <FontAwesomeIcon icon={faCirclePlay} />}
      </button>
      <button type="button" className="select-none w-fit m-auto" onClick={handleReset}>
        RESET
      </button>
      <span className="flex mt-5 m-auto gap-5">
        <button className="h-16 w-28 p-2 text-violet-bg text-sm rounded-xl bg-violet-lighter" onClick={addFiveMinutes}>
          ADD 5 MINUTES
        </button>

        <button className="h-16 w-28 text-sm text-violet-bg rounded-xl bg-violet-lighter" onClick={removeFiveMinutes}>
          REMOVE 5 MINUTES
        </button>
      </span>
    </section>
  );
};

export default Timer;
