<script setup>
import { onMounted, reactive, onBeforeMount, ref, watch } from "vue";
import ShoppingCart from "./ShoppingCart.vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";

const router = useRouter();
const productData = ref(
  JSON.parse(localStorage.getItem("LEO-toyShoppingCart"))
);
const formData = reactive({
  orderNumber: "",
  name: "",
  phoneNumber: "",
  email: "",
  address: "",
  remark: "",
  time: "",
});

const handleSubmit = () => {
  if (
    formData.name === "" ||
    formData.phoneNumber === "" ||
    formData.email === "" ||
    formData.address === ""
  ) {
    alert("請輸入完整資料");
    return;
  }

  formData.orderNumber = "TOY001";
  formData.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
  alert(`訂單成功送出
  訂單編號:${formData.orderNumber}
  訂購資訊: ${formData.name},
  連絡電話: ${formData.phoneNumber},
  E-mail: ${formData.email},
  remark: ${formData.remark}
  訂單成立時間:${dayjs().format("YYYY-MM-DD HH:mm:ss")}
  `);
  router.push({ name: "home" });
  localStorage.setItem("LEO-toyShoppingCart", JSON.stringify([]));
};

onMounted(() => {
  const toyShoppingCart = localStorage.getItem("LEO-toyShoppingCart");

  const initialValue = JSON.parse(toyShoppingCart) || [];

  initialValue >= 0 && router.push({ name: "home" });
});
</script>

<template>
  <ShoppingCart :isButtonNone="true" />
  <div class="product-checkout">
    <form
      @submit.prevent="handleSubmit"
      class="subscriber-information"
      :rules="rules"
    >
      <div>中文全名</div>
      <input type="text" name="" id="" v-model="formData.name" />
      <div>連絡電話</div>
      <input type="text" v-model="formData.phoneNumber" />
      <div>E-mail</div>
      <input type="text" v-model="formData.email" />
      <div>聯絡地址</div>
      <input type="text" v-model="formData.address" />
      <div>訂單備註</div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="formData.remark"
      ></textarea>
      <button type="submit">確認送出</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/utils/_variables.scss";
.subscriber-information {
  border: 1px solid #ccc;
  width: 800px;
  margin: auto;
  padding: 16px;
  margin-top: 24px;
  border-radius: 3px;
  > div {
    color: #666;
    margin: 12px 0;
  }
  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }
  textarea {
    width: 100%;
  }
  button {
    background: #a67f78;
    color: #fff;
    border: none;
    padding: 16px;
    margin-top: 12px;
    text-align: center;
    width: 100%;
  }
}
</style>
