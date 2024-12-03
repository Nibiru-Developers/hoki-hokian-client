import { useState } from "react";
import io, { Socket } from "socket.io-client";
import Swal from "sweetalert2";
import { useAtom } from "jotai";
import axios from "axios";
import { showToastError, showToastSuccess } from "../utils/toast";
import {
  isOnlineAtom,
  logsAtom,
  roomsAtom,
  usersAtom,
} from "../global/GlobalData";
import getError from "../utils/getError";

export default function Lobby() {
  const [isOnline, setIsOnline] = useAtom(isOnlineAtom);

  const [name, setName] = useState("");
  const [isLoadingConnect, setIsLoadingConnect] = useState(false);
  const [socketConnection, setSocketConnection] = useState<Socket | null>(null);

  const [roomName, setRoomName] = useState("");
  const [createRoomPassword, setCreateRoomPassword] = useState("");
  const [joinRoomPassword, setJoinRoomPassword] = useState("");
  const [isLoadingCreateRoom, setIsLoadingCreateRoom] = useState(false);

  const [logs, setLogs] = useAtom(logsAtom);
  const [, setUsers] = useAtom(usersAtom);
  const [rooms, setRooms] = useAtom(roomsAtom);

  const goOnline = () => {
    if (name) {
      setIsLoadingConnect(true);
      const socketIO = io(`${import.meta.env.VITE_APP_SOCKET_URL}/lobby`, {
        query: {
          name,
        },
      });

      socketIO.on("connect", () => {
        setIsLoadingConnect(false);
        setSocketConnection(socketIO);
        setIsOnline(true);

        showToastSuccess("Entered Lobby");
      });

      socketIO.on("disconnect", () => {
        showToastSuccess("Leaving Lobby");

        setName("");
        setSocketConnection(null);
        setIsOnline(false);

        setRoomName("");
        setCreateRoomPassword("");

        setLogs([]);
        setUsers([]);
        setRooms([]);
      });

      socketIO.on("error", (data) => {
        showToastError(data);
      });

      socketIO.on("userList", (data) => {
        setUsers(data);
      });

      socketIO.on("roomList", (data) => {
        setRooms(data);
      });

      socketIO.on("log", (data) => {
        const logsClone = logs;
        logsClone.push({
          message: data,
        });

        setLogs(logsClone);
      });
    } else {
      showToastError("Name Is Required");
    }
  };

  const goOffline = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be disconnected from server!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Disconnect!",
    }).then((result) => {
      if (result.isConfirmed) {
        socketConnection?.disconnect();
      }
    });
  };

  const createRoom = async () => {
    if (roomName) {
      try {
        setIsLoadingCreateRoom(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_SOCKET_URL}/create-room`,
          {
            roomName,
            password: createRoomPassword,
          }
        );

        const { roomId } = response.data.data;

        socketConnection?.disconnect();
        window.open(
          `/room?roomId=${roomId}&name=${name}&password=${createRoomPassword}`,
          "_blank"
        );
      } catch (error) {
        showToastError(getError(error));
      } finally {
        setIsLoadingCreateRoom(false);
      }
    } else {
      showToastError("Room Name Required");
    }
  };

  return (
    <div className="max-w-[500px] p-5 m-5 rounded-sm mx-auto bg-slate-300 relative">
      <div className={`absolute top-1 right-1 ${!isOnline && "hidden"}`}>
        <button
          className="rounded-md bg-red-500 text-white py-1 px-3"
          onClick={goOffline}
        >
          Disconnect
        </button>
      </div>
      <div className={`${!isOnline && "hidden"}`}>
        <p>
          Hello, <span className="font-bold">{name}</span>
        </p>
        <hr className="border-black mt-2 mb-1.5" />
      </div>
      <div className={`flex gap-3 items-center ${isOnline && "hidden"}`}>
        <input
          className="rounded-md p-1"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          placeholder="Input Name"
          disabled={isLoadingConnect}
        />
        <button
          className="rounded-md bg-slate-500 text-white py-1 px-3"
          onClick={goOnline}
          disabled={isLoadingConnect}
        >
          {isLoadingConnect ? "Entering Lobby..." : "Enter Lobby"}
        </button>
      </div>
      <div className={`${!isOnline && "hidden"}`}>
        <p className="mb-1">CREATE ROOM</p>
        <div className={`flex gap-3 items-center mb-2.5`}>
          <input
            className="rounded-md p-1"
            type="text"
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
            value={roomName}
            placeholder="Room Name"
            disabled={isLoadingCreateRoom}
          />
          <input
            className="rounded-md p-1"
            type="text"
            onChange={(e) => {
              setCreateRoomPassword(e.target.value);
            }}
            value={createRoomPassword}
            placeholder="Create Room Password"
            disabled={isLoadingCreateRoom}
          />
        </div>
        <button
          className="rounded-md bg-slate-500 text-white py-1 px-3 mb-5"
          onClick={createRoom}
          disabled={isLoadingCreateRoom}
        >
          {isLoadingCreateRoom ? "Creating Room..." : "Create Room"}
        </button>

        <p className={`text-center mb-1`}>OR JOIN TO EXISTING ROOM</p>
        <div className="flex justify-center">
          <input
            className="rounded-md p-1 mb-2 max-w-[300px] w-full"
            type="text"
            onChange={(e) => {
              setJoinRoomPassword(e.target.value);
            }}
            value={joinRoomPassword}
            placeholder="Join Room Password"
            disabled={isLoadingCreateRoom}
          />
        </div>
        {!rooms.length && (
          <p className="border border-black py-1 px-3 rounded-md">
            No room exist right now, let's create one
          </p>
        )}
        {rooms.map((room, index) => (
          <div
            key={index}
            className="border border-black py-1 px-2 rounded-md flex items-center justify-between mb-2"
          >
            <p>
              {room.roomName} ({room.players.length})
            </p>
            <button
              className="rounded-md bg-slate-500 text-white py-1 px-3"
              onClick={() => {
                window.open(
                  `/room?roomId=${room.roomId}&name=${name}&password=${joinRoomPassword}`,
                  "_blank"
                );
              }}
              disabled={isLoadingConnect}
            >
              {isLoadingConnect ? "Joining Room..." : "Join Room"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
