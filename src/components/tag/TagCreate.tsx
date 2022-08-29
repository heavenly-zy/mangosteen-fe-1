import { defineComponent, PropType } from 'vue';

export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>TagCreate</div>
    )
  }
})