import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Room() {
  const secondRender = useRef(false);
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    if (secondRender.current) {
      if (queryParams.get("roomId")) {
        setRoomId(queryParams.get("roomId") || "");
        navigate("/room");
      } else {
        alert(`REQUEST ${roomId}`);
      }
    }
  }, [queryParams]);

  return (
    <div className="max-w-[500px] p-5 m-5 rounded-sm mx-auto bg-slate-300 relative">
      <h1>Y: {roomId}</h1>
    </div>
  );
}
