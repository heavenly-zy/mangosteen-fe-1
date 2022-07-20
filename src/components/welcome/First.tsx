import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import s from './WelcomeLayout.module.scss';
import pig from '../../assets/icons/pig.svg'
import { WelcomeLayout } from './WelcomeLayout'
export const First = defineComponent({
  setup: (props, context) => {
    const slots = {
      icon: () => <img src={pig} />,
      title: () => <h2>会挣钱<br />还要会省钱</h2>,
      buttons: () => <>
        <RouterLink class={s.fake} to="/start" >跳过</RouterLink>
        <RouterLink to="/welcome/2" >下一页</RouterLink>
        <RouterLink to="/start" >跳过</RouterLink>
      </>
    }    
    return () => (
      <WelcomeLayout v-slots={slots}></WelcomeLayout>
    );
  },
});
