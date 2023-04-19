import { defineComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
import { BackIcon } from '../../shared/BackIcon';
import { useRoute, useRouter } from 'vue-router';
import { Dialog } from 'vant';
import { http } from '../../shared/Http';
import { AxiosError } from 'axios';

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const tagId = parseInt(route.params.id!.toString())
    if (Number.isNaN(tagId)) {
      return () => <div>标签不存在</div>
    }
    const onError = (error: AxiosError<ResourceError>) => {
      Dialog.alert({ title: "提示", message: "删除失败" })
      throw error
    }
    const onDelete = async (options?: { withItems?: boolean }) => {
      await Dialog.confirm({
        title: "确认",
        message: "你真的要删除吗？"
      })
      await http
        .delete(`/tags/${tagId}`, {
          withItems: options?.withItems ? "true" : "false"
        })
        .catch(onError)
      router.back()
    }
    return () => (
      <MainLayout>{{
        title: () => '编辑标签',
        icon: () => <BackIcon />,
        default: () => <>
          <TagForm id={tagId} />
          <div class={s.actions}>
            <Button level='danger' class={s.removeTags} onClick={() => onDelete()}>删除标签</Button>
            <Button level='danger' class={s.removeTagsAndItems} onClick={() => onDelete({withItems: true})}>删除标签和记账</Button>
          </div>
        </>
      }}</MainLayout>
    )
  }
})