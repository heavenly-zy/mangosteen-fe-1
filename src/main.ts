import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'
import '@svgstore'
import { fetchMe, mePromise } from './shared/me'

const router = createRouter({ history, routes })

fetchMe()

const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/start': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
};

router.beforeEach(async (to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key];
    if (value === 'exact' && to.path === key) {
      return true;
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true;
    }
  }
  return mePromise!.then(
    () => true,
    () => '/sign_in?return_to=' + to.path
  );
});

const app = createApp(App)
app.use(router)
app.mount('#app')
