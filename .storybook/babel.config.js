module.exports = {
    "presets": [
      "@babel/preset-env",
      [
        "@babel/preset-typescript",
        {
          "onlyRemoveTypeImports": true,
          "allExtensions": true,
          "isTSX": true
        }
      ]
    ]
  }