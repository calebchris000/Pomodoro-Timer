import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CountDownTimer from "../../logic/TimerLogic/TimerLogic";
import { addTimer, removeTimer, runningTimer, setTimer } from "../../redux/Home/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import { renderNotification } from "../../redux/Notification/NotificationSlice";
import { Goals, ResetGoals, ResetRound, Rounds, goOnBreak } from "../../redux/Timer/TimerSlice";

const Timer = () => {
  const { currentMinutes, currentSeconds } = useSelector((store) => store.Home);
  const { rounds, goals, onBreak } = useSelector((store) => store.Pomodoro);
  const dispatch = useDispatch();
  const [button, setButton] = useState(false);
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

    if (currentMinutes === 0 && currentSeconds === 0) {
      if (rounds === 4) {
        setButton(true);
        dispatch(renderNotification("1 goal complete. Long break begins."));
        // new Notification("1 goal complete. Long break begins.");
        dispatch(setTimer(30));
        handleTimerState(true, false, false);
        dispatch(goOnBreak(true));
        dispatch(ResetRound());
        dispatch(Goals());
        return;
      }
      if (!onBreak) {
        setButton(true);
        handleTimerState(true, false, false);
        dispatch(setTimer(15));
        dispatch(renderNotification("Short break started."));
        // new Notification("Short break started");
        dispatch(goOnBreak(true));
        return;
      } else if (onBreak) {
        setButton(true);
        dispatch(Rounds());
        dispatch(setTimer(25));
        handleTimerState(true, false, false);
        // new Notification("Resume Activity.");
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
      // new Notification("Timer complete, Good job!.");
      dispatch(runningTimer({ min: 25, sec: 0 }));
      handleTimerState(false, false, true);
      dispatch(ResetGoals())
      dispatch(ResetRound())
      dispatch(renderNotification("Timer complete, Good job!."));

      return;
    }
  }, [currentMinutes, currentSeconds]);

  useEffect(() => {
    const timer = new CountDownTimer(currentMinutes, currentSeconds, (min, sec) => {
      dispatch(runningTimer({ min, sec }));
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
    dispatch(ResetRound());
    dispatch(ResetGoals());
    setButton(false);
    dispatch(runningTimer({ min: 25, sec: 0 }));
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
    if (currentMinutes < 60 && currentMinutes + 5 <= 59) {
      dispatch(addTimer(5));
      dispatch(renderNotification("Five minutes added"));
    } else {
      dispatch(setTimer(59));
    }
  }

  function removeFiveMinutes() {
    setIsAdded(!isAdded);
    if (currentMinutes > 0 && currentMinutes - 5 >= 0) {
      dispatch(removeTimer(5));
      dispatch(renderNotification("Five minutes removed"));
    } else {
      dispatch(setTimer(0));
    }
  }

  return (
    <section className="flex box-border flex-col mx-5 my-10 text-violet-lighter">
      <h2 className="text-8xl select-none font-[poppins] font-semibold text-center">
        {currentMinutes}:{currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </h2>
      <button onClick={handleClick} className="text-8xl w-fit p-0 m-auto text-center my-2 ">
        {button ? <FontAwesomeIcon icon={faCirclePause} /> : <FontAwesomeIcon icon={faCirclePlay} />}
      </button>
      <button type="button" className="select-none font-bold relative top-1 w-fit m-auto" onClick={handleReset}>
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
