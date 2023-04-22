import { defineComponent } from "vue"
import { Navbar } from "../shared/Navbar"
import s from "./MainLayout.module.scss"

export const MainLayout = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <Navbar class={s.navbar}>
          {{
            icon: () => context.slots.icon?.(),
            default: () => context.slots.title?.()
          }}
        </Navbar>
        {context.slots.default?.()}
      </div>
    )
  }
})
