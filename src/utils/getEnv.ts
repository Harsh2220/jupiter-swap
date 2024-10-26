const ENV = {
    dev: {
        SHYFT_API: `${process.env.EXPO_PUBLIC_SHYFT_API_KEY_DEV}`
    },
    prod: {
        SHYFT_API: `${process.env.EXPO_PUBLIC_SHYFT_API_KEY_PROD}`
    },
};

export default function getEnv() {
    if (__DEV__) {
        return ENV.dev;
    } else {
        return ENV.prod;
    }
}
