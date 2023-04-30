import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const Splash = () => {
  const [displaySplash, setDisplaySplash] = useState(true);
  const splashRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      splashRef.current.style.opacity = "0";
      setDisplaySplash(false);
    }, 2000);
  }, []);

  if (displaySplash) {
    return (
      <section ref={splashRef} className="fixed transition-all opacity-100 flex-wrap flex flex-col items-center z-20 top-0 left-0 right-0 bottom-0 bg-violet-bg">
        <h2 className="relative top-36 text-center text-6xl font-[poppins] text-violet-lighter font-bold">POMODORO TIMER</h2>
        <i className="text-violet-lighter relative top-36 mt-10 text-5xl">
          <FontAwesomeIcon icon={faClock} />
        </i>
      </section>
    );
  }
};

export default Splash;
