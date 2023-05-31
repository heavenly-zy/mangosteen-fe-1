import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { svgstore } from "./src/vite_plugins/svgstore"
import Components from "unplugin-vue-components/vite"
import { VantResolver } from "unplugin-vue-components/resolvers"

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    define: command === "build" ? { DEBUG: false } : { DEBUG: true },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes("echarts")) {
              return "echarts"
            }
            if (id.includes("mock") || id.includes("faker")) {
              return "mock"
            }
            if (id.includes("vant")) {
              return "vant"
            }
            if (id.includes("node_modules")) {
              return "vendor"
            }
          }
        }
      }
    },
    plugins: [
      vue(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
        transformOn: true,
        mergeProps: true
      }),
      svgstore(),
      Components({
        resolvers: [VantResolver()]
      })
    ],
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 3000,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      proxy: {
        "/api/v1": {
          target: "https://mangosteen2.hunger-valley.com",
          /** 绕过 https 的安全验证 */
          secure: false
        }
      }
    }
  }
})
