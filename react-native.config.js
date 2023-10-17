module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./src/assets/fonts/'],
    dependencies: {
      'react-native-config': {
        platforms: {
          android: null, // disable Android platform, other platforms will still autolink if provided
        },
      },
    },
  };
  