"use strict";

const path = require("path");

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  async process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));
    // eslint-disable-next-line import/no-extraneous-dependencies
    const camelcase = await import("camelcase");

    if (filename.match(/\.svg$/)) {
      // Based on how SVGR generates a component name:
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
      const pascalCaseFilename = camelcase.default(path.parse(filename).name, {
        pascalCase: true,
      });
      const componentName = `Svg${pascalCaseFilename}`;
      return {
        code: `
          const React = require('react');
          module.exports = {
            __esModule: true,
            default: ${assetFilename},
            ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
              return {
                $$typeof: Symbol.for('react.element'),
                type: 'svg',
                ref: ref,
                key: null,
                props: Object.assign({}, props, {
                  children: ${assetFilename}
                })
              };
            }),
          };
        `,
      };
    }

    return { code: `module.exports = ${assetFilename};` };
  },
};
