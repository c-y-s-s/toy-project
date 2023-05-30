<script setup>
import NavBar from "./components/NavBar.vue";
import "./assets/css/app.scss";
import { useStore } from "vuex";
import { onMounted, computed, watch, ref, reactive } from "vue";
import Cookies from "js-cookie";
import { useRouter, useRoute } from "vue-router";

import carouseImg01 from "./assets/carouselPicture/0-6926-efba4474064a93fa543b83259d75cdea.jpg";
import carouseImg02 from "./assets/carouselPicture/0-7867-42894872ef1bcce3fb7b04a6f08fc63b.jpg";
import carouseImg03 from "./assets/carouselPicture/0-8085-b00d10720ea4b4bda17d10190b1ea8f9.jpg";
import SearchVue from "./components/Search.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const info = ref(Cookies.get("login"));
const isSearchModalOpen = computed(() => store.state.isSearchModalOpen);

const carouselUrl = reactive({
  data: [carouseImg01, carouseImg02, carouseImg03],
});

onMounted(() => {
  if (info.value !== undefined) {
    const userData = JSON.parse(info.value);
    store.commit("setIsLogin", true);
    store.commit("setLoginData", {
      account: userData?.account,
      token: userData?.token,
    });
  } else {
    store.commit("setLoginData", info.value);
  }
});

onMounted(async () => {
  await router.isReady();
  // console.log("route.path", route.path);
});
</script>

<template>
  <NavBar />
  <div v-if="route.path === '/'" class="carouse-container">
    <Carousel
      :autoplay="true"
      :duration="2000"
      :initIndex="2"
      :direction="true"
      directionMode="hover"
      :directionSize="20"
      directionColor="white"
      :indicator="true"
      indicatorMode="always"
      indicatorColor="white"
      indicatorActiveColor="white"
    >
      <CarouselItem
        v-for="(item, index) in carouselUrl.data"
        :key="index"
        :idx="index"
      >
        <img :src="item" class="carouse-img" />
      </CarouselItem>
    </Carousel>
  </div>
  <SearchVue v-if="isSearchModalOpen" />
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin: 0 auto;
  max-width: 1400px;
}
.carouse-container {
  width: 100%;
  height: 400px;
  margin-bottom: 32px;
  .carouse-img {
    object-fit: cover;
  }
}
</style>
