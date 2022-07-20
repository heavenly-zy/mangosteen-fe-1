import { FunctionalComponent } from 'vue';
import { RouterLink } from 'vue-router';
import s from './WelcomeLayout.module.scss';
import cloud from '../../assets/icons/cloud.svg'
import { WelcomeLayout } from './WelcomeLayout';
export const Forth: FunctionalComponent = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={cloud} />,
      title: () => <h2>云备份<br/>再也不怕数据丢失</h2>,
      buttons: () => <>
        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        <RouterLink to="/start">开启应用</RouterLink>
        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
      </>
    }}
  </WelcomeLayout>
)

Forth.displayName = 'Forth'