import { defineComponent, PropType, reactive, ref } from "vue"
import { MainLayout } from "../layouts/MainLayout"
import { Button } from "../shared/Button"
import { Form, FormItem } from "../shared/Form"
import { Icon } from "../shared/Icon"
import { hasError, validate } from "../shared/validate"
import s from "./SignInPage.module.scss"
import { http } from "../shared/Http"
import { useBool } from "../hooks/useBool"
import { useRoute, useRouter } from "vue-router"
import { BackIcon } from "../shared/BackIcon"
import { useMeStore } from "../stores/useMeStore"

export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const meStore = useMeStore()
    const formData = reactive({
      email: "1457715339@qq.com",
      code: ""
    })
    const errors = reactive({
      email: [],
      code: []
    })
    const refValidationCode = ref<any>()
    const { ref: refDisabled, on: disabled, off: enable } = useBool(false)
    const route = useRoute()
    const router = useRouter()
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      Object.assign(errors, {
        email: [],
        code: []
      })
      Object.assign(
        errors,
        validate(formData, [
          { key: "email", type: "required", message: "必填" },
          { key: "email", type: "pattern", regex: /.+@.+/, message: "必须是邮箱地址" },
          { key: "code", type: "required", message: "必填" }
        ])
      )
      if (!hasError(errors)) {
        const response = await http.post<{ jwt: string }>("/session", formData, { _autoLoading: true }).catch(onError)
        console.log("response: ", response)
        localStorage.setItem("jwt", response.data.jwt)
        // router.push('/sign_in?return_to='+ encodeURIComponent(route.fullPath))
        const returnTo = route.query.return_to?.toString()
        meStore.refreshMe()
        router.push(returnTo || "/")
      }
    }
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
      throw error
    }
    const onClickSendValidationCode = async () => {
      disabled()
      await http
        .post("/validation_codes", { email: formData.email }, { _autoLoading: true })
        .catch(onError)
        .finally(enable)
      // 成功后开始倒计时
      refValidationCode.value.startCount()
    }
    return () => (
      <MainLayout>
        {{
          icon: () => <BackIcon />,
          title: () => "登录",
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen" />
                <h1 class={s.appName}>吼姆记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  placeholder="请输入邮箱，然后点击发送验证码"
                  v-model={formData.email}
                  error={errors.email?.[0]}
                />
                <FormItem
                  ref={refValidationCode}
                  label="验证码"
                  type="validationCode"
                  placeholder="请输入六位数字"
                  countFrom={3}
                  disabled={refDisabled.value}
                  v-model={formData.code}
                  error={errors.code?.[0]}
                  onClick={onClickSendValidationCode}
                />
                <FormItem style={{ paddingTop: "96px" }}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }}
      </MainLayout>
    )
  }
})

export default SignInPage