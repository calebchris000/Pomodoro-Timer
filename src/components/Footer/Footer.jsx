import { useSelector } from "react-redux";


const Footer = () => {
  const { rounds, goals } = useSelector((store) => store.Pomodoro);
  return (
    <footer className="bg-violet-lighter m-auto max-w-xl text-center text-lg font-semibold text-violet-bg flex justify-between p-8 rounded-t-xl font-[poppins] fixed bottom-0 left-0 right-0">
      <div className="">
        <h3 className="text-2xl">ROUND</h3>
        <p className="">
          <span className="text-3xl mr-1">{rounds}</span>
          <span className="font-normal text-1xl">/4</span>
        </p>
      </div>
      <span className="border border-1 border-violet-bg"></span>
      <div>
        <h3 className="text-2xl">GOAL</h3>
        <p className="">
          <span className="text-3xl mr-1">{goals}</span>
          <span className="font-normal text-1xl">/4</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
