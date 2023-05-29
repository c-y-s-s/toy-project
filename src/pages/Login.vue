<script setup>
import { onMounted, reactive, computed } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const loginData = reactive({
  account: "",
  password: "",
  token: "",
});

const isLogin = computed(() => store.state.isLogin);

const handleLogin = () => {
  let account = loginData?.account;
  let password = loginData?.password;

  if (account === "" || password === "") {
    return alert("帳號密碼不能為空");
  }

  const token = "asds32adsavrAS3Fadf5567";
  // 帳號密碼需驗證不能為空

  loginData.token = token;

  Cookies.set("login", JSON.stringify(loginData), { expires: 1 });

  store.commit("setLoginData", {
    account,
    token,
  });

  store.commit("setIsLogin", true);
  // cookie當中有token被設置才能改變路由
  alert("登入成功");
  if (Cookies.get("login") && loginData.token) {
    router.push({ name: "home" });
  }
};

onMounted(() => {
  if (isLogin.value) {
    router.push({ name: "home" });
  }
});
</script>
<template>
  <div>
    <div class="title">會員登入</div>
  </div>
  <!-- <div class="button-container">
    <button class="login-button">會員登入</button>
    <button class="register-button">會員註冊</button>
  </div> -->
  <form class="" @submit.prevent="handleLogin">
    <input
      type="text"
      placeholder="請輸入電子郵件 / 帳號"
      v-model="loginData.account"
    />
    <input type="text" placeholder="密碼" v-model="loginData.password" />
    <button class="submit-button">確認送出</button>
  </form>
</template>
<style lang="scss" scoped>
.title {
  padding: 16px 0;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
  margin: 24px 0;
}
.button-container {
  text-align: center;
  .login-button,
  .register-button {
    border: 1px solid #ccc;
    background: none;
    padding: 10px;
    margin: 0 10px;
  }
}

form {
  display: flex;
  flex-direction: column;

  align-items: center;
  input {
    padding: 16px 8px;
    margin: 16px 0;
    display: block;
    border: 1px solid #ccc;
    width: 50%;
    border-radius: 3px;
  }
  .submit-button {
    width: 50%;
    display: block;
    background: #a67f78;
    border: none;
    padding: 16px;
    color: #fff;
    border-radius: 3px;
    font-size: 16px;
  }
}
</style>
