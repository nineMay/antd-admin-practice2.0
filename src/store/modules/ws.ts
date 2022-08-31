import {
  SocketIOWrapperType,
  SocketStatus,
  SocketStatusType,
} from "@/core/socket/socket-io";
import { defineStore } from "pinia";

interface WsState {
  client: SocketIOWrapperType | null;
  status: SocketStatusType;
}

export const useWsStore = defineStore({
  id: "ws",
  state: (): WsState => ({
    //socket wrapper 实例
    client: null,
    //socket 连接状态
    status: SocketStatus.CLOSE,
  }),
  actions: {
    setClient(client: SocketIOWrapperType | null) {
      this.client = client as any;
    },
    setStatus(status: SocketStatusType) {
      if (this.status === status) {
        return;
      }
      this.status = status;
    },
  },
});
