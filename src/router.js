import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue"
import Product from "./pages/Product.vue"
import Register from "./pages/Register.vue"
import ShoppingCart from "./pages/ShoppingCart.vue"
import ProductCheckout from "./pages/ProductCheckout.vue"
import Cookies from "js-cookie";
const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: Login },
  { path: "/product/:product_id", name: "product", component: Product },
  { path: "/register", name: "register", component: Register },
  {
    path: "/shoppingCart",
    name: "shoppingCart",
    component: ShoppingCart,
    meta: { requireAuth: true },
  },
  {
    path: "/productCheckout",
    name: "ProductCheckout",
    component: ProductCheckout,
  },
];



const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // 看看 to 和 from 兩個 arguments 會吐回什麼訊息
  // console.log("to: ", to);
  // console.log("from: ", from);

  // 目的路由在meta上是否有設置requireAuth: true
  if (to.meta.requireAuth) {
    // 獲取Cookies當中的login資訊並取得token
    const info = Cookies.get("login");
    // console.log(info);
    if (info) {
      const token = JSON.parse(info).token;
      // 如果token不為空，且確實有這個欄位則讓路由變更
      if (token.length > 0 || token === undefined) {
        next();
      } else {
        // 未通過則導回login頁面
        next({ name: "login" });
      }
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});
export default router;
