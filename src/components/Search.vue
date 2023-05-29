<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const searchValue = computed(() => store.state.searchValue);

const handleCloseSearchModal = (event) => {
  event.stopPropagation();
  store.commit("setToggleSearchModal", false);
};

const handleChange = (event) => {
  store.commit("setSearchValue", event.target.value);
};

const handleSubmitSearch = () => {
  store.commit("setIsSearchSend", true);
  store.commit("setToggleSearchModal", false);
};
</script>

<template>
  <div
    class="search-container"
    @click="(event) => handleCloseSearchModal(event)"
  >
    <div class="search-block" @click.stop>
      <input
        type="text"
        placeholder="輸入商品關鍵字"
        :value="searchValue.value"
        @change="(event) => handleChange(event)"
      />
      <button @click="handleSubmitSearch">搜尋</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  .search-block {
    display: flex;
    width: 650px;
    height: 50px;
    input {
      box-sizing: border-box;
      border: none;
      background: #ccc;
      height: 100%;
      width: 80%;
      font-size: 20px;
      padding: 20px;
    }
    button {
      height: 100%;
      border: none;
      background: #b8b0b0;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
