import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import s from './Welcome.module.scss'
import logo from '../assets/icons/mangosteen.svg'
import { useSwipe } from '../hooks/useSwipe';

export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement | null>(null)
    const { direction, swiping } = useSwipe(main)
    watchEffect(() => {
      console.log(swiping.value, direction.value)
    })    
    return () => <div class={s.wrapper}>
      <header>
        <img src={logo} />
        <h1>山竹记账</h1>
      </header>
      <main class={s.main} ref={main}>
        <RouterView name='main'>
          {({ Component: Content, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
            <Transition
              enterFromClass={s.slide_fade_enter_from}
              enterActiveClass={s.slide_fade_enter_active}
              leaveToClass={s.slide_fade_leave_to}
              leaveActiveClass={s.slide_fade_leave_active}
            >
              {Content}
            </Transition>
          }
        </RouterView>
      </main>
      <footer>
        <RouterView name='footer' />
      </footer>
    </div>
  }
})