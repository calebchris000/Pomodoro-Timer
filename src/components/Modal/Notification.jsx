import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderNotification } from "../../redux/Notification/NotificationSlice";

const Modal = () => {
  const { info } = useSelector((store) => store.Notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (info !== null) {
      setTimeout(() => {
        dispatch(renderNotification(null));
      }, 3000);
    }
  }, [info]);
  if (info !== null) {
    return (
      <>
        <h3 className="w-fit z-10 font-bold m-auto fixed top-10 p-3 rounded-xl bg-orange-400 left-0 right-0 text-violet-bg">{info}</h3>
      </>
    );
  }
};

export default Modal;
