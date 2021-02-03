const path = require("path");

const ROOT = path.resolve(__dirname, "../../");

module.exports = env => {
  const plugins = require("./plugins")(env, ROOT);
  const module = require("./module")(env, ROOT);
  const optimization = require("./optimization")(env);

  return {
    mode: env.production ? "production" : "development",
    entry: path.resolve(ROOT, "src/index.js"),
    devtool: env.production ? "source-map" : "cheap-module-source-map",
    resolve: {
      modules: ["node_modules"],
      alias: {
        Styles: path.resolve(ROOT, "src/styles"),
      },
    },
    output: {
      path: env.production ? path.resolve(ROOT, "build") : undefined,
      pathinfo: env.development,
      filename: `react-stack/js/[name].[${
        env.production ? "contenthash" : "hash"
      }].js`,
      publicPath: env.production ? "react-stack" : "/",
    },
    optimization,
    module,
    plugins,
  };
};
