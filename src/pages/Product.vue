<script setup>
import productData from "../data/productData";
import { ref, onMounted, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const newProductData = reactive({});
const loading = ref(false);
const selectBuyAmount = ref("1");

onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    const filterData = productData.filter(
      (item) => item.id === route.params.product_id
    );
    loading.value = false;
    newProductData.value = filterData[0];
  }, 500);
});

// 加入購物車邏輯
const handleAddShoppingCart = (type) => {
  const buyProductData = [
    {
      ...newProductData?.value,
      buyAmount: selectBuyAmount.value,
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

  type === "addShoppingCart"
    ? alert("加入購物車成功")
    : router.push({ name: "ProductCheckout" });
};
</script>

<template>
  <div v-if="loading" class="loading">資料快好了...</div>
  <div v-else class="product-container">
    <div class="product-data">
      <img :src="newProductData?.value?.img" alt="" />

      <div class="details">
        <div class="name">{{ newProductData?.value?.name }}</div>
        <div class="describe">很可愛</div>
        <div class="price font-bold">NT${{ newProductData?.value?.price }}</div>
        <div class="buy-amount">
          購買數量
          <select
            name="selectBuyAmount"
            id="selectBuyAmount"
            v-model="selectBuyAmount"
          >
            <option
              v-for="list in newProductData?.value?.amount"
              :value="list"
              :key="list"
            >
              {{ list }}
            </option>
          </select>
        </div>
        <div class="button-container">
          <button
            @click="handleAddShoppingCart('addShoppingCart')"
            class="add-shopping-cart font-bold"
          >
            加入購物車
          </button>
          <button
            @click="handleAddShoppingCart('getCheckout')"
            class="buy-now font-bold"
          >
            立即買
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="line font-bold">購買須知</div>
      <div class="purchase-notes">
        <div>關於退貨</div>
        <br />
        <div>
          購物的消費者，都可以依照消費者保護法的規定，享有商品貨到次日起七天猶豫期的權益。但猶豫期並非試用期，請留意，您所退回的商品必須回復原狀（須回復至商品到貨時的原始狀態）並且保持完整包裝（包括商品本體、配件、贈品、保證書、原廠包裝及所有附隨文件或資料的完整性），切勿缺漏任何配件或損毀原廠外盒。
        </div>
        <br />
        <div>
          如果您所購買商品是下列特殊商品，請留意下述退貨注意事項：
          易於腐敗之商品、保存期限較短之商品、客製化商品、報紙、期刊、雜誌，依據消費者保護法之規定，於收受商品後將無法享有七天猶豫期之權益且不得辦理退貨。
          影音商品、電腦軟體或個人衛生用品等一經拆封即無法回復原狀的商品，在您還不確定是否要辦理退貨以前，請勿拆封，一經拆封則依消費者保護法之規定，無法享有七天猶豫期之權益且不得辦理退貨。
          非以有形媒介提供之數位內容或一經提供即為完成之線上服務，一經您事先同意後始提供者，依消費者保護法之規定，您將無法享有七天猶豫期之權益且不得辦理退貨。
        </div>
        <br />
        <div>
          組合商品於辦理退貨時，應將組合銷售商品一同退貨，若有遺失、毀損或缺件，可能影響您退貨的權益，也可能依照損毀程度扣除為回復原狀所必要的費用。
          若您需辦理退貨，請利用顧客中心「查訂單」或「退訂/退款查詢」的「退訂/退貨」功能填寫申請，我們將於接獲申請之次日起1個工作天內檢視您的退貨要求，檢視完畢後將以E-mail回覆通知您，並將委託本公司指定之宅配公司，在5個工作天內透過電話與您連絡前往取回退貨商品。請您保持電話暢通，並備妥原商品及所有包裝及附件，以便於交付予本公司指定之宅配公司取回（宅配公司僅負責收件，退貨商品仍由特約廠商進行驗收），宅配公司取件後會提供簽收單據給您，請注意留存。
        </div>
        <br />
        <div>
          退回商品時，請以本公司或特約廠商寄送商品給您時所使用的外包裝（紙箱或包裝袋），原封包裝後交付給前來取件的宅配公司；如果本公司或特約廠商寄送商品給您時所使用的外包裝（紙箱或包裝袋）已經遺失，請您在商品原廠外盒之外，再以其他適當的包裝盒進行包裝，切勿任由宅配單直接粘貼在商品原廠外盒上或書寫文字。
          提醒您，原廠外盒及原廠包裝都屬於商品的一部分，若有遺失、毀損或缺件，可能影響您退貨的權益，也可能依照損毀程度扣除為回復原狀所必要的費用。
          若因您要求退貨或換貨、或因本公司無法接受您全部或部分之訂單、或因契約解除或失其效力，而需為您辦理退款事宜時，您同意本公司得代您處理發票或折讓單等相關法令所要求之單據，以利本公司為您辦理退款。
          本公司收到您所提出的申請後，若經確認無誤，將依消費者保護法之相關規定，返還您已支付之對價（含信用卡交易），退款日當天會再發送E-mail通知函給您。
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/utils/_variables.scss";

.loading {
  text-align: center;
  margin-top: 24px;
}
.product-container {
  margin-top: 50px;

  .product-data {
    display: flex;

    color: $product-text;
    img {
      width: 600px;
      height: 600px;
      object-fit: cover;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
    .details {
      flex: 1;
      margin-left: 50px;
      div {
        margin: 30px 0;
      }
      .name {
        font-size: 28px;
      }
      .describe {
        width: 100%;
      }

      .price {
        font-size: 28px;
        color: rgb(189, 46, 46);
      }

      .buy-amount {
      }

      .button-container {
        display: flex;
        .add-shopping-cart,
        .buy-now {
          border: none;
          background: #b8b0b0;
          color: #fff;
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 6px;
          cursor: pointer;
          display: block;
        }
        .add-shopping-cart {
          margin: 0 12px 0 0;
        }
        .buy-now {
        }
      }
    }
  }
  .line {
    background: #b8b0b0;
    margin: 16px 0 0 0;
    color: #fff;
    padding: 12px 6px;
    border-radius: 6px;
  }
  .purchase-notes {
    margin: 6px 0;

    padding: 12px 6px;
    color: $product-text;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  }
}
</style>
