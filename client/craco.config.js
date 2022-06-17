const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    { plugin: CracoAntDesignPlugin } ,
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
       
        modifyLessRule: (lessRule, context) => {
            lessRule.use = lessRule.use.filter(i => !i.loader.includes('resolve-url-loader'));
            return lessRule;
        },
      },
       
    },
  ],
};