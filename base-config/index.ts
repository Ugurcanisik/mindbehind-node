const baseConfig = {
    SERVER_PORT: process.env.PORT || '3000',
    JWT_KEY: process.env.JWT_KEY || 'secret-key'
};

export default baseConfig;
