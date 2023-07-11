export const appEnv = import.meta.env.VITE_ENV;
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

type AppBaseConfig = {
  API: { baseURL: string };
};

type AppConfigType = {
  dev: AppBaseConfig;

  uat: AppBaseConfig;

  prod: AppBaseConfig;

  local: AppBaseConfig;
};

const config: AppConfigType = {
  dev: {
    API: {
      baseURL: apiBaseUrl,
    },
  },
  uat: {
    API: {
      baseURL: apiBaseUrl,
    },
  },
  prod: {
    API: {
      baseURL: apiBaseUrl,
    },
  },
  local: {
    API: {
      baseURL: apiBaseUrl,
    },
  },
};

function getEnvironment() {
  const env = appEnv?.toLowerCase() || "local";
  return env;
}

type EnvKeyType = keyof typeof config;

const env = getEnvironment() as EnvKeyType;

export default config[env];
