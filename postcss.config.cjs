module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿宽度（与你的 common.scss 中 375px 匹配）
      unitPrecision: 5, // 转换精度
      viewportUnit: 'vw', // 目标单位
      selectorBlackList: ['.ignore'], // 忽略转换的类名
      minPixelValue: 1, // 最小转换像素
      mediaQuery: true // 允许媒体查询中转换
    },
    autoprefixer: {}
  }
}
