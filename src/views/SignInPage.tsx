import { defineComponent, PropType } from 'vue';
import s from './SignInPage.module.scss';

export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>登录</div>
    )
  }
})