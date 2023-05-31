import { defineComponent, PropType } from "vue"
import { Center } from "./Center"
import s from "./ComingSoon.module.scss"
import { Icon } from "./Icon"
import { useRouter } from "vue-router"
import { Button } from "./Button"

export const ComingSoon = defineComponent({
  setup: (_props, _context) => {
    const router = useRouter()
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>
        <p class={s.return_button} >
          <Button onClick={router.back}>返回</Button>
        </p>
      </div>
    )
  }
})

export default ComingSoon