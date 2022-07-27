import { FunctionalComponent } from 'vue';
import s from './welcome.module.scss';
import chart from '../../assets/icons/chart.svg'

export const Third: FunctionalComponent = () => (
  <div class={s.card}>
    <img src={chart} />
    <h2>数据可视化<br/>收支一目了然</h2>
  </div>
)

Third.displayName = 'Third'