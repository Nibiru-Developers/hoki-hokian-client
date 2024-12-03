import { atom } from "jotai";

export const isOnlineAtom = atom<boolean>(false);

export const logsAtom = atom<{ message: string }[]>([]);

type Guest = {
  socketId: string;
  name: string;
};
export const usersAtom = atom<Guest[]>([]);

type Player = {
  socketId: string;
  name: string;
  isLeader: boolean;
};
type Room = {
  roomId: string;
  roomName: string;
  alreadyPlaying: string;
  players: Player[];
  password: string;
};
export const roomsAtom = atom<Room[]>([]);
