<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Cookies from "js-cookie";
const store = useStore();

const isLogin = computed(() => store.state.isLogin);

const removeCookie = () => {
  Cookies.remove("login");

  store.commit("setLoginData", {
    account: "",
    token: "",
  });

  alert("登出成功");
  store.commit("setIsLogin", false);
};

const handleSearch = () => {
  store.commit("setToggleSearchModal", true);
};
</script>

<template>
  <header>
    <a href="#" class="logo">
      <img src="../assets/logo.png" alt="" />
    </a>

    <ul class="menus font-bold">
      <a href="#"
        ><div>關於</div>
        <div>About</div></a
      >

      <!-- <a href="#" class="menu"
        ><div>
          全部商品
          <div>All Product</div>
        </div></a
      > -->
      <a href="#" class="menu" @click="handleSearch"
        ><div>搜尋</div>
        <div>Search</div></a
      >
      <a href="#/shoppingCart" class="menu">
        <div>購物車</div>
        <div>Cart</div>
      </a>
      <a v-if="isLogin" href="#" @click="removeCookie" class="menu"
        ><div>登出</div>
        <div>SignOut</div></a
      >
      <a v-else href="#/login" class="menu"
        ><div>登入</div>
        <div>Login</div></a
      >
    </ul>
  </header>
</template>

<style lang="scss" scoped>
@import "../assets/css/utils/_variables.scss";

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  color: $text-color;
  background: #b8b0b0;

  .menus {
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      color: $text-color;
    }
    .menu {
      padding: 10px;
      margin: 0px 8px;
    }
  }
}
</style>
