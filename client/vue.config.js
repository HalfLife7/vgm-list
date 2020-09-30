module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "VGM List";
      return args;
    });
  },
  runtimeCompiler: true,
};
