const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

module.exports = (() => {
  const projectRoot = __dirname
  const workspaceRoot = path.resolve(__dirname,'../..')
  const config = getDefaultConfig(__dirname)

  const { transformer, resolver } = config

  config.watchFolders = [workspaceRoot]
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  }
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
    nomeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    disableHierarchicalLookup: true
  }

  return config
})()
