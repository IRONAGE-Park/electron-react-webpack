const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

const paths = require("./paths");

module.exports = function makeESLintConfiguration(
  isEnvDevelopment,
  emitErrorsAsWarnings,
  hasJsxRuntime
) {
  return new ESLintPlugin({
    // Plugin options
    extensions: ["js", "mjs", "jsx", "ts", "tsx"],
    formatter: require.resolve("react-dev-utils/eslintFormatter"),
    eslintPath: require.resolve("eslint"),
    failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
    context: paths.appSrc,
    cache: true,
    cacheLocation: path.resolve(paths.appNodeModules, ".cache/.eslintcache"),
    // ESLint class options
    cwd: paths.appPath,
    resolvePluginsRelativeTo: __dirname,
    baseConfig: {
      extends: [require.resolve("eslint-config-react-app/base")],
      rules: {
        ...(!hasJsxRuntime && {
          "react/react-in-jsx-scope": "error",
        }),
      },
    },
  });
};
