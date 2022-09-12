import axios from 'axios'

import Config from 'Config'

const Api = axios.create({
  baseURL: Config.api.baseUrl,
})

Api.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      ...config.params,
      token: Config.api.token,
    },
  }
})

export default Api
