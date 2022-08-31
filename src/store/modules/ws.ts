import { EVENT_KICK, EVENT_UPDATE_MENU } from "@/core/socket/event-type";
import {
  SocketIOWrapper,
  SocketIOWrapperType,
  SocketStatus,
  SocketStatusType,
} from "@/core/socket/socket-io";
import { Modal } from "ant-design-vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

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
    // 初始化Socket
    initSocket() {
      // 检查是否为初始化
      if (this.client?.isConnected?.()) {
        return;
      }
      const ws = new SocketIOWrapper();
      ws.subscribe(EVENT_KICK, (data) => {
        const userStore = useUserStore();
        //重置token
        userStore.resetToken();
        Modal.warning({
          title: "警告",
          content: `您已被管理员${data.operater}踢下线`,
          centered: true,
          okText: "重新登录",
          onOk() {
            //刷新页面
            window.location.reload();
          },
        });
      });
      ws.subscribe(EVENT_UPDATE_MENU, () => {
        const userStore = useUserStore();
      });
    },
  },
});
