module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          api: './src/api',
          assets: './src/assets',
          components: './src/components',
          config: './src/config',
          context: './src/context',
          hooks: './src/hooks',
          navigation: './src/navigation',
          screens: './src/screens',
        },
      },

    ],

    'react-native-reanimated/plugin',

  ],
};
