import { io } from "socket.io-client";
import { USER_FETCH_HOST } from "./Exports";

export const socket = io(USER_FETCH_HOST);