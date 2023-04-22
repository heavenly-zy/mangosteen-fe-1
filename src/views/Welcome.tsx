import { defineComponent, ref, Transition, VNode, watchEffect } from "vue"
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from "vue-router"
import s from "./Welcome.module.scss"
import logo from "../assets/icons/mangosteen.svg"
import { useSwipe } from "../hooks/useSwipe"
import { throttle } from "../shared/throttle"

export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>()
    const { direction, swiping } = useSwipe(main, { beforeStart: (e) => e.preventDefault() })
    const route = useRoute()
    const router = useRouter()
    const replaceMap: Record<string, string> = {
      Welcome1: "/welcome/2",
      Welcome2: "/welcome/3",
      Welcome3: "/welcome/4",
      Welcome4: "/start"
    }
    const replace = throttle(() => {
      const name = (route.name || "Welcome1").toString()
      router.replace(replaceMap[name])
    }, 500)
    watchEffect(() => {
      if (swiping.value && direction.value === "left") {
        replace()
      }
    })
    return () => (
      <div class={s.wrapper}>
        <header>
          <img src={logo} />
          <h1>山竹记账</h1>
        </header>
        <main class={s.main} ref={main}>
          <RouterView name="main">
            {({ Component: Content, route: R }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
              <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}
              >
                {Content}
              </Transition>
            )}
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer" />
        </footer>
      </div>
    )
  }
})
