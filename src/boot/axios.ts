import { defineBoot } from '#q-app/wrappers'
import { useAuthStore } from '@/stores/auth'
import axios, { type AxiosInstance } from 'axios'
import { useRouter } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'https://reminder-app-api-production.up.railway.app',
  withCredentials: true,
})

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const router = useRouter()

    if (err.response?.status === 401) {
      await useAuthStore().logout()
      await router.push('/login')
    }
    return Promise.reject(new Error(err))
  },
)

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
