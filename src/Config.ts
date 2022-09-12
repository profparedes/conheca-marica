const Config = {
  app: {
    name: import.meta.env.VITE_APP_NAME,
    version: import.meta.env.PACKAGE_VERSION,
  },
  i18n: {
    debbug: JSON.parse(
      (import.meta.env.VITE_I18N_DEBBUG ?? 'false').toLocaleLowerCase(),
      // Converts 'true' to true and 'false' to false
    ),
  },

  api: {
    baseUrl: import.meta.env.VITE_MARICA_BASE_URL,
    token: import.meta.env.VITE_API_TOKEN,
  },
}

export default Config
