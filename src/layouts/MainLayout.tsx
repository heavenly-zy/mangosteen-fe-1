import { defineComponent } from 'vue';
import { Navbar } from '../shared/Navbar';

export const MainLayout = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <Navbar>
          {{
            icon: () => context.slots.icon?.(),
            default: () => context.slots.title?.(),
          }}
        </Navbar>
        {context.slots.default?.()}
      </div>
    );
  },
});
