<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import shoppingCartIconSrc from "../assets/svg/shoppingCart.svg";
import productData from "../data/productData";

const AllProductData = ref([]);
const loading = ref(false);

const store = useStore();
const searchValue = computed(() => store.state.searchValue);
const isSearchSend = computed(() => store.state.isSearchSend);

// 搜尋邏輯
store.subscribe((mutation, state) => {
  if (mutation.type === "setIsSearchSend") {
    if (state.isSearchModalOpen) {
      loading.value = true;

      setTimeout(() => {
        const searchData = productData?.filter((item) => {
          return item.name.indexOf(searchValue.value) !== -1;
        });

        const resultData = searchData.map((item) => {
          const currentImgUrl = new URL(
            "../assets/productPicture/" + item.img,
            import.meta.url
          ).href;

          loading.value = false;
          return {
            ...item,
            img: currentImgUrl,
          };
        });

        AllProductData.value = resultData;

        loading.value = false;
      }, 500);
    }
  }
});

const handleChangeProduct = (data) => {
  store.commit({
    type: "setProductData",
    data,
  });
};

// 加入購物車邏輯
const handleAddShoppingCart = (event, data) => {
  event.preventDefault();
  const buyProductData = [
    {
      ...data,
      buyAmount: 1,
    },
  ];

  const toyShoppingCart = localStorage.getItem("LEO-toyShoppingCart");

  const initialValue = JSON.parse(toyShoppingCart) || [];

  const totalQuantity = initialValue.map((data) => {
    if (data.id === buyProductData[0].id) {
      const oldBuyAmount =
        Number(buyProductData[0].buyAmount) + Number(data.buyAmount);

      // 最大購買數判斷
      const maxBuyAmount =
        oldBuyAmount > buyProductData[0].amount
          ? buyProductData[0].amount
          : oldBuyAmount;

      return {
        ...buyProductData[0],
        buyAmount: maxBuyAmount,
      };
    } else {
      return data;
    }
  });

  const isDataHasId = initialValue.some((item) => {
    return item.id === buyProductData[0].id;
  });

  if (initialValue.length > 0 && isDataHasId) {
    const newData = [...totalQuantity];
    localStorage.setItem("LEO-toyShoppingCart", JSON.stringify(newData));
  } else {
    const newData = [...totalQuantity, ...buyProductData];
    localStorage.setItem("LEO-toyShoppingCart", JSON.stringify(newData));
  }

  alert("加入購物車成功");
};

onMounted(() => {
  loading.value = true;
  // mock call all product api
  setTimeout(() => {
    AllProductData.value = productData;

    loading.value = false;
  }, 500);
  // mock search text product api
});
</script>

<template>
  <div v-if="loading" class="loading">商品列表就快送來了...請稍等</div>
  <div v-else class="product-list">
    <a
      :href="['#/product/' + product.id]"
      v-for="product in AllProductData"
      class="product"
      :key="product.id"
      @click="handleChangeProduct(product)"
    >
      <div class="img-container">
        <img :src="product.img" :alt="product.name" />
      </div>
      <div class="product-name">
        <div>{{ product.name }}</div>
      </div>
      <div class="price font-bold">
        NT$ {{ product.price }}
        <div
          @click.stop
          class="shopping-cart-icon"
          @click="(event) => handleAddShoppingCart(event, product)"
        >
          <img :src="shoppingCartIconSrc" alt="" />
        </div>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/utils/_variables.scss";
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 25px;
  color: $product-text;
  transition: 0.3s all;
  .product {
    flex: 0 0 33%;
    margin: 20px 0;
    cursor: pointer;
    text-decoration: none;

    widows: 100%;
    max-width: 360px;

    &:visited {
      color: $product-text;
    }
    .img-container {
      border-radius: 6px;
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
        rgba(0, 0, 0, 0.24) 0px 1px 2px;
      width: 350px;
      margin: auto;
      img {
        min-width: 350px;
        min-height: 350px;
        max-width: 350px;
        max-height: 350px;
        object-fit: cover;

        transition: all 0.5s;
      }
    }

    .product-name {
      display: flex;
      justify-content: center;
      padding: 6px 0;
      font-size: 16px;
      margin: 12px 0 0;
      position: relative;
      color: $product-text;
      .shopping-cart-icon {
        position: absolute;
        right: 0;
      }
    }
    .price {
      font-size: 16px;
      text-align: left;
      color: rgb(189, 46, 46);
      display: flex;
      justify-content: space-between;
    }
    &:hover img {
      transform: scale(1.1);
    }
  }
}
</style>
