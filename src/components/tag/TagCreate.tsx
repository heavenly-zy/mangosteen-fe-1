import { defineComponent, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { TagForm } from './TagForm';

export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        icon: () => <Icon name="left" onClick={() => { }} />,
        title: () => '新建标签',
        default: () => <TagForm />
      }}</MainLayout>
    )
  }
})