import { RouteRecordRaw } from "vue-router"
import { First } from "../components/welcome/First"
import { FirstActions } from "../components/welcome/FirstActions"
import { Second } from "../components/welcome/Second"
import { SecondActions } from "../components/welcome/SecondActions"
import { Third } from "../components/welcome/Third"
import { ThirdActions } from "../components/welcome/ThirdActions"
import { Forth } from "../components/welcome/Forth"
import { ForthActions } from "../components/welcome/ForthActions"
import { ItemCreate } from "../components/item/ItemCreate"
import { ItemList } from "../components/item/ItemList"
import { TagCreate } from "../components/tag/TagCreate"
import { TagEdit } from "../components/tag/TagEdit"

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome" },
  {
    path: "/welcome",
    component: () => import("../views/Welcome"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("skipFeatures") === "yes" ? next("/items") : next()
    },
    children: [
      { path: "", redirect: "/welcome/1" },
      { path: "1", name: "Welcome1", components: { main: First, footer: FirstActions } },
      { path: "2", name: "Welcome2", components: { main: Second, footer: SecondActions } },
      { path: "3", name: "Welcome3", components: { main: Third, footer: ThirdActions } },
      { path: "4", name: "Welcome4", components: { main: Forth, footer: ForthActions } }
    ]
  },
  {
    path: "/items",
    component: () => import("../views/ItemPage"),
    children: [
      { path: "", component: ItemList },
      { path: "create", component: ItemCreate }
    ]
  },
  {
    path: "/tags",
    component: () => import("../views/TagPage"),
    // 没有必要把子路由也改为动态引入，因为父路由已经是动态引入的了
    children: [
      { path: "create", component: TagCreate },
      { path: ":id/edit", component: TagEdit }
    ]
  },
  {
    path: "/sign_in",
    component: () => import("../views/SignInPage")
  },
  {
    path: "/statistics",
    component: () => import("../views/StatisticsPage")
  },
  {
    path: "/export",
    component: () => import("../shared/ComingSoon")
  },
  {
    path: "/notify",
    component: () => import("../shared/ComingSoon")
  }
]
