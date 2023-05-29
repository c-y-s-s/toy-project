<script setup>
import ProductList from "../components/ProductList.vue";
</script>

<template>
  <div class="home-product-list">
    <div class="home-product-title">
      <div class="home-title">PRODUCT</div>
      <div>產品</div>
    </div>

    <ProductList />
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/utils/_variables.scss";
.home-product-list {
  color: $text-color;
  text-align: center;
  .loading {
    margin: 20px 0 0 0;
    font-size: 18px;
  }
  .home-product-title {
    .home-title {
      font-size: 32px;
      letter-spacing: 10px;
      margin: 0 0 16px 0;
    }
  }
}
</style>
