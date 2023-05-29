<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["isButtonNone"]);
const router = useRouter();
const productData = ref([]);

const totalPrice = () => {
  return productData.value.reduce((acc, cur) => {
    return (acc += cur.buyAmount * cur.price);
  }, 0);
};
const updateProductData = () => {
  const toyShoppingCart = localStorage.getItem("LEO-toyShoppingCart");

  const initialValue = JSON.parse(toyShoppingCart) || [];

  productData.value = initialValue;
};
const switchSelect = (e, data) => {
  const updateBuyAmount = productData?.value?.map((item) => {
    if (item.id === data.id) {
      return {
        ...item,
        buyAmount: e.target.value,
      };
    } else {
      return { ...item };
    }
  });

  localStorage.setItem("LEO-toyShoppingCart", JSON.stringify(updateBuyAmount));
  updateProductData();
};

const handleDeleteProduct = (id) => {
  const resultDeleteData = productData?.value.filter((item) => {
    return item.id !== id;
  });

  localStorage.setItem("LEO-toyShoppingCart", JSON.stringify(resultDeleteData));

  updateProductData();
};

onMounted(() => {
  const toyShoppingCart = localStorage.getItem("LEO-toyShoppingCart");

  const initialValue = JSON.parse(toyShoppingCart) || [];

  productData.value = initialValue;
});

watch(
  () => productData.value,
  (newData) => {
    if (newData.length <= 0) {
      alert("尚未加入商品到購物車");
      router.push({ name: "home" });
    }
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="shopping-cart-container">
    <div class="title font-bold">購物清單</div>
    <div v-for="data in productData" class="product" :key="data.id">
      <img :src="data?.img" alt="" />
      <div class="name">{{ data?.name }}</div>
      <div class="price"><span>單價:</span>$NT {{ data.price }}</div>
      <div class="amount">
        <span>數量:</span>
        <select
          name="selectBuyAmount"
          id="selectBuyAmount"
          :value="data.buyAmount"
          @change="switchSelect($event, data)"
        >
          <option v-for="list in data?.amount" :value="list" :key="list">
            {{ list }}
          </option>
        </select>
      </div>
      <div class="total">
        <span>小計 :</span>
        <div>{{ data.buyAmount * data.price }}</div>
      </div>
      <div class="delete" @click="handleDeleteProduct(data?.id)">X</div>
    </div>
    <div class="all-total-price">商品金額總計 NT$ {{ totalPrice() }}</div>
    <div class="buttons" v-if="!props.isButtonNone">
      <a href="#" class="continue">繼續購物</a>
      <a href="#/productCheckout" class="checkout">前往結帳</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/utils/_variables.scss";
.shopping-cart-container {
  .title {
    padding: 30px 10px;
    border-top: 1px solid #dcdcdc;
    margin: 30px 0 0 0;
  }
  .product {
    border-top: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
    margin: 0px 20px;
    padding: 10px;
    display: flex;
    align-items: center;
    color: $product-text;
    > div {
      flex: 1;
      justify-content: center;
      text-align: center;
    }
    span {
      color: #ccc;
      margin: 0px 10px;
    }
    img {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
      width: 120px;
      height: 120px;
      object-fit: cover;
    }
    .name {
      margin-left: 6px;
    }
    .amount {
      display: flex;
    }
    .total {
      display: flex;
    }
    .delete {
      cursor: pointer;
    }
  }
  .all-total-price {
    background-color: #f0f0f0;
    text-align: end;
    padding: 15px;
    margin-top: 30px;
    border-radius: 3px;
  }
  .buttons {
    text-align: center;
    margin-top: 60px;
    a {
      margin: 0 16px;
    }
    .continue,
    .checkout {
      padding: 15px 25px;
      background: #a67f78;
      border-radius: 3px;
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
