# BlockCanvas - 积木画布

[![Vue 3](https://img.shields.io/badge/Vue-3-4fc08d.svg)](https://vuejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

一个基于 Vue 3 的可视化拖拽组件编辑器，让界面构建像搭积木一样简单直观。

![截图](screenshot.png)

## 功能特性

- 🖱️ 直观的拖拽式界面构建
- 🎨 实时属性编辑与预览
- 💾 自动本地存储，数据不丢失
- 📤 一键导出配置为JSON文件
- 🧩 可扩展的组件系统

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **拖拽库**: vuedraggable
- **样式**: 纯CSS (Flexbox/Grid布局)
- **构建工具**: Vite (推荐)

## 安装与使用

### 环境要求

- Node.js 14.0+
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/wumacms/blockcanvas.git
cd blockcanvas
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 使用指南

### 添加组件
1. 从左側组件库拖动所需组件到画布
2. 组件将自动添加到画布中

### 编辑属性
1. 点击画布中的组件选中它
2. 在右侧属性面板中修改属性
3. 更改将实时反映在画布中

### 导出配置
1. 点击画布右上角的导出按钮
2. 系统将生成并下载JSON配置文件

### 清空画布
1. 点击画布右上角的清空按钮
2. 确认后所有组件将被移除

## 自定义组件

要添加自定义组件，编辑 `src/components/App.vue` 中的 `componentLibrary` 数组：

```javascript
const componentLibrary = ref([
  {
    id: 4,
    name: "我的组件",
    type: "custom",
    props: { text: "默认文本", color: "#000000" }
  }
]);
```

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 致谢

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [vuedraggable](https://github.com/SortableJS/vuedraggable) - Vue拖拽组件
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

## 联系方式

- 邮箱: wumacms@foxmail.com
- GitHub: [@wumacms](https://github.com/wumacms)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！