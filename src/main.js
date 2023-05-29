import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";
import Carousel from "v3-carousel"; // import

const store = createStore({
  state() {
    return {
      productData: {},
      loginData: {
        account: "",
        token: "",
      },
      isLogin: false,
      isSearchModalOpen: false,
      searchValue: "",
      isSearchSend:false,
    };
  },
  mutations: {
    setProductData(state, payload) {
      state.productData = payload;
    },
    setLoginData(state, payload) {
      if (payload) {
        state.loginData = {
          account: payload.account,
          token: payload.token,
        };
      } else {
        state.loginData = undefined;
      }
    },
    setIsLogin(state, payload) {
      state.isLogin = payload;
    },
    setToggleSearchModal(state, payload) {
      state.isSearchModalOpen = payload;
    },
    setSearchValue(state,payload){
      state.searchValue = payload
    },
    setIsSearchSend(state,payload){
      state.isSearchModalOpen = payload
    }
  },
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Carousel); // use

app.mount("#app");
