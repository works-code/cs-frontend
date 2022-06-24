const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false // 컴포넌트 명칭 단수 명수 가능하도록 함
})
