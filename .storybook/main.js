const path = require('path');

const UI_DIR = path.join(path.dirname(__dirname), 'src', 'ui');

module.exports = {
    stories: ['../src/**/*.stories.js'],

    addons: ['@storybook/addon-actions/register'],

    webpack: async (config) => {
        config.resolve = {
            ...config.resolve,
            alias:{
                ...config.resolve.alias,
                '@': UI_DIR
            }
        }

        return config;
    }
};
