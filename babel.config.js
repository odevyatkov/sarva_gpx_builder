module.exports = (api) => {
  api.cache(false);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {node: 'current'},
        }
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-transform-typescript',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-arrow-functions',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      '@babel/plugin-transform-runtime',
    ],
    exclude: [
      '@babel/plugin-transform-typeof-symbol',
    ],
  };
};
