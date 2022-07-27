import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { FunctionalComponent } from 'vue';

export const ForthActions: FunctionalComponent = () => (
  <div class={s.actions}>
    <RouterLink class={s.fake} to="/start" >跳过</RouterLink>
    <RouterLink to="/start" >开启应用</RouterLink>
    <RouterLink class={s.fake} to="/start" >跳过</RouterLink>
  </div>
)

ForthActions.displayName = 'ForthActions'