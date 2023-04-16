import { defineComponent, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tabs, Tab } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';
import { Tags } from './Tags';

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref('支出');
    const refTagId = ref<number>()
    const refHappenAt = ref<string>(new Date().toISOString())
    const refAmount = ref<number>(0)
    return () => (
      <MainLayout>{{
        icon: () => <Icon name="left" class={s.navIcon} />,
        title: () => '记一笔',
        default: () => <>
          <div class={s.wrapper}>
            <Tabs v-model:selected={refKind.value} class={s.tabs}>
              <Tab name="支出">
                {refKind.value} | {refHappenAt.value} | {refAmount.value} | {refTagId.value}
                <Tags kind="expenses" v-model:selected={refTagId.value} />
              </Tab>
              <Tab name="收入">
                {refKind.value} | {refHappenAt.value} | {refAmount.value} | {refTagId.value}
                <Tags kind="income" v-model:selected={refTagId.value} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad v-model:happenAt={refHappenAt.value} v-model:amount={refAmount.value} />
            </div>
          </div>
        </>
      }}</MainLayout>
    );
  },
});
