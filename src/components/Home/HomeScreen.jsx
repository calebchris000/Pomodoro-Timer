import "../../styles/HomeScreen.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Timer from "../Timer/Timer";
import Splash from "../WelcomeScreen/Splash";

const Home = () => {
  return (
    <>
      <Splash />
      <Navbar />
      <Timer />
      <Footer />
    </>
  );
};

export default Home;
