import { useState } from "react";
import { useAtom } from "jotai";
import { isOnlineAtom, logsAtom, usersAtom } from "../global/GlobalData";

export default function Log() {
  const [isOnline] = useAtom(isOnlineAtom);
  const [showLog, setShowLog] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const [logs] = useAtom(logsAtom);
  const [users] = useAtom(usersAtom);

  return (
    <>
      <div
        className={`bg-slate-300 p-2 rounded-sm absolute top-2 left-2 cursor-pointer border border-black ${
          !isOnline && "hidden"
        } ${showLog ? "w-[300px]" : "w-[70px]"}`}
        onClick={() => {
          setShowLog(!showLog);
        }}
      >
        {!showLog ? (
          <p className="text-center">LOGS</p>
        ) : (
          <div>
            <p>LOGS</p>
            {logs.map((log) => (
              <p>- {log.message}</p>
            ))}
          </div>
        )}
      </div>
      <div
        className={`bg-slate-300 p-2 rounded-sm absolute top-2 right-2 cursor-pointer border border-black ${
          !isOnline && "hidden"
        } ${showUsers ? "w-[300px]" : "w-[70px]"}`}
        onClick={() => {
          setShowUsers(!showUsers);
        }}
      >
        {!showUsers ? (
          <p className="text-center">USERS</p>
        ) : (
          <div>
            <p>USERS IN ROOM</p>
            {users.map((user) => (
              <p>- {user.name}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
