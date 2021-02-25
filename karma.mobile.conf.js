const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
    config.set(
        merge(createDefaultConfig(config), {
            frameworks: [ 'mocha', 'chai' ],
            client    : {
                mocha: { ui: 'bdd' },
            },
            browsers: ["MobileHeadlessChrome"],
            customLaunchers: {
                MobileHeadlessChrome: {
                    base: "Chrome",
                    // base: "HeadlessChrome",
                    flags: [
                        "--use-mobile-user-agent",
                        "--window-size=400,600",
                    ]
                }
            },
            files: [
                {
                    pattern: config.grep ? config.grep : 'test/mobile/**/*.test.js',
                    type   : 'module',
                },
            ],
            esm: {
                nodeResolve: true,
            }
        }),
    );
    return config;
};