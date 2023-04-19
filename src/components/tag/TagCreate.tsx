import { defineComponent, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { TagForm } from './TagForm';
import { BackIcon } from '../../shared/BackIcon';

export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        icon: () => <BackIcon />,
        title: () => '新建标签',
        default: () => <TagForm />
      }}</MainLayout>
    )
  }
})