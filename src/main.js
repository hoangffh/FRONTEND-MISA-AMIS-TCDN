import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import TheCash from "./components/view/TheCash.vue";
import TheProduct from "./components/view/TheProducts"
import TheWareHouse from "./components/view/wareHouse/TheWareHouse.vue"
import TheUnit from './components/view/unit/TheUnit.vue'
import TheInventoryItemCategory from './components/view/InventoryItemCategory/TheInventoryItemCategory.vue'
const routers = [
  {
    path: "/WareHouse",
    component: TheWareHouse,
  },
  {
    path: "/Unit",
    component: TheUnit,
  },
  {
    path: "/TheInventoryItemCategory",
    component: TheInventoryItemCategory,
  },
  {
    path: "/Cash",
    component: TheCash,
  },
  {
    path: "/Hang-hoa",
    component: TheProduct,
  }

];
const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
