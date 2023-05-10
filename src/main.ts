import { createApp } from "vue"
import { App } from "./App"
import { createRouter } from "vue-router"
import { routes } from "./config/routes"
import { history } from "./shared/history"
import "@svgstore"
import { createPinia, storeToRefs } from "pinia"
import { useMeStore } from "./stores/useMeStore"
/* --------------------------------
Vant 中有个别组件是以函数的形式提供的，
包括 Toast，Dialog，Notify 和 ImagePreview 组件。
在使用函数组件时，unplugin-vue-components
无法自动引入对应的样式，因此需要手动引入样式。
------------------------------------- */
import "vant/es/toast/style"
import "vant/es/dialog/style"

const router = createRouter({ history, routes })

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

const meStore = useMeStore()
const {mePromise} = storeToRefs(meStore)
meStore.fetchMe()

const whiteList: Record<string, "exact" | "startsWith"> = {
  "/": "exact",
  "/items": "exact",
  "/welcome": "startsWith",
  "/sign_in": "startsWith"
}

router.beforeEach(async (to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === "exact" && to.path === key) {
      return true
    }
    if (value === "startsWith" && to.path.startsWith(key)) {
      return true
    }
  }
  return mePromise!.value!.then(
    () => true,
    () => "/sign_in?return_to=" + to.path
  )
})
