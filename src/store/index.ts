import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { HTTP_SERVICE_INSTANCE } from "@/services/http.service";

export type State = { botMessages: Array<any> };

const state: State = { botMessages: [] };

Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations: {
    addBotMessages(state: State, payload: any) {
      state.botMessages = [...state.botMessages, payload];
    },
  },
  actions: {
    async fetchInitalMessages({ commit }: any) {
      const messages = await HTTP_SERVICE_INSTANCE.get(
        "https://jsonbox.io/box_1091c3b238600908236f"
      );
      commit("addBotMessages", messages);
    },
  },
  modules: {},
});
