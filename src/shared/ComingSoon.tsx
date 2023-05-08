import { defineComponent, PropType } from "vue"
import { Center } from "./Center"
import s from "./ComingSoon.module.scss"
import { Icon } from "./Icon"

export const ComingSoon = defineComponent({
  setup: (_props, _context) => {
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>
      </div>
    )
  }
})
