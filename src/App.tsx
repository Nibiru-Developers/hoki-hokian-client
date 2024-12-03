import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useAtom } from "jotai";
import Hero from "./components/Hero";
import Log from "./components/Log";
import Router from "./router";
import { isOnlineAtom } from "./global/GlobalData";

export default function App() {
  const [isOnline] = useAtom(isOnlineAtom);

  useEffect(() => {
    if (isOnline) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [isOnline]);

  return (
    <>
      <div className="p-2 relative">
        <Hero />
        <Router />
        <Log />
      </div>
      <ToastContainer />
    </>
  );
}
