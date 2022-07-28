import { FunctionalComponent } from 'vue';
import s from './welcome.module.scss';

export const Second: FunctionalComponent = () => (
  <div class={s.card}>
    <svg>
      <use xlinkHref='#clock'></use>
    </svg>
    <h2>每日提醒<br />不遗漏每一笔账单</h2>
  </div>
)

Second.displayName = 'Second'
