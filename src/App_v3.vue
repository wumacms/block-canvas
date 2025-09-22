<template>
    <div class="app">
        <!-- 左侧组件库 -->
        <div class="sidebar">
            <div class="section-header">
                <h3>组件库</h3>
            </div>
            <div class="library-category">
                <h4 class="category-title">基础组件</h4>
                <draggable v-model="basicComponents" :group="{ name: 'blocks', pull: 'clone', put: false }"
                    :sort="false" :clone="cloneComponent" item-key="id" :drag="true">
                    <template #item="{ element }">
                        <div class="library-item">
                            <span class="item-icon">
                                <svg v-if="element.type === 'text'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 6H21M3 12H21M3 18H15" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                </svg>
                                <svg v-else-if="element.type === 'button'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor"
                                        stroke-width="2" />
                                    <path d="M12 12H12.01" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                </svg>
                                <svg v-else-if="element.type === 'title'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4V20M18 4V20M6 4V20M3 8H21M3 16H21" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" />
                                </svg>
                            </span>
                            {{ element.name }}
                        </div>
                    </template>
                </draggable>
            </div>

            <div class="library-category">
                <h4 class="category-title">网页区块</h4>
                <draggable v-model="webBlocks" :group="{ name: 'blocks', pull: 'clone', put: false }" :sort="false"
                    :clone="cloneComponent" item-key="id" :drag="true">
                    <template #item="{ element }">
                        <div class="library-item">
                            <span class="item-icon">
                                <svg v-if="element.type === 'hero'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor"
                                        stroke-width="2" />
                                    <path d="M3 10h18M8 14h8" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                </svg>
                                <svg v-else-if="element.type === 'image-text'" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
                                        stroke-width="2" />
                                    <path d="M8 10h8M8 14h4M14 17v-6l3 3" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                </svg>
                                <svg v-else-if="element.type === 'features'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
                                        stroke-width="2" />
                                    <circle cx="8" cy="9" r="1" fill="currentColor" />
                                    <circle cx="16" cy="9" r="1" fill="currentColor" />
                                    <circle cx="12" cy="15" r="1" fill="currentColor" />
                                </svg>
                            </span>
                            {{ element.name }}
                        </div>
                    </template>
                </draggable>
            </div>
        </div>

        <!-- 中间画布 -->
        <div class="canvas-container">
            <div class="section-header">
                <h3>画布</h3>
                <div class="canvas-actions">
                    <button class="action-btn" title="清空画布" @click="clearCanvas">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 6V20H5V6H19ZM19 4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM10 11H8V18H10V11Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                    <button class="action-btn" title="导出配置" @click="exportConfig">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 16L16 11L13.5 11L13.5 8L10.5 8L10.5 11L8 11L12 16ZM19 4.5L19 19.5L5 19.5L5 4.5L19 4.5ZM19 3H5C3.9 3 3 3.9 3 5V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V5C21 3.9 20.1 3 19 3Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="canvas" @click="deselectBlock">
                <draggable v-model="canvasBlocks" group="blocks" item-key="id" @start="dragStart" @end="dragEnd">
                    <template #item="{ element }">
                        <div class="block" :class="{ selected: selectedBlock?.id === element.id }"
                            @click.stop="selectBlock(element)" :style="getBlockStyle(element)">
                            <!-- 根据类型渲染不同UI -->
                            <component :is="getComponentTag(element.type)" :style="getComponentStyle(element)">
                                {{ element.props.text }}
                            </component>

                            <!-- 网页区块渲染 -->
                            <div v-if="element.type === 'hero'" class="hero-block">
                                <h1 :style="{ color: element.props.titleColor }">{{ element.props.title }}</h1>
                                <p :style="{ color: element.props.subtitleColor }">{{ element.props.subtitle }}</p>
                                <button :style="{
                                    backgroundColor: element.props.buttonBgColor,
                                    color: element.props.buttonTextColor
                                }">{{ element.props.buttonText }}</button>
                            </div>

                            <div v-else-if="element.type === 'image-text'" class="image-text-block"
                                :class="element.props.layout">
                                <div class="text-content">
                                    <h2 :style="{ color: element.props.titleColor }">{{ element.props.title }}</h2>
                                    <p :style="{ color: element.props.textColor }">{{ element.props.content }}</p>
                                </div>
                                <div class="image-placeholder" :style="{ backgroundColor: element.props.imageBgColor }">
                                    {{ element.props.imagePlaceholder }}
                                </div>
                            </div>

                            <div v-else-if="element.type === 'features'" class="features-block">
                                <h2 :style="{ color: element.props.titleColor, textAlign: 'center' }">{{
                                    element.props.title }}</h2>
                                <div class="features-grid"
                                    :style="{ gridTemplateColumns: `repeat(${element.props.columns}, 1fr)` }">
                                    <div v-for="(feature, index) in element.props.features" :key="index"
                                        class="feature-item">
                                        <h3 :style="{ color: element.props.featureTitleColor }">{{ feature.title }}</h3>
                                        <p :style="{ color: element.props.featureTextColor }">{{ feature.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </draggable>
                <div v-if="canvasBlocks.length === 0" class="empty-canvas">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"
                            fill="#9CA3AF" />
                    </svg>
                    <p>从左侧拖拽组件到此处</p>
                </div>
            </div>
        </div>

        <!-- 右侧属性面板 -->
        <div class="panel" v-if="selectedBlock">
            <div class="section-header">
                <h3>属性编辑</h3>
                <span class="component-type">{{ selectedBlock.type }}</span>
            </div>

            <!-- 基础属性 -->
            <div class="property-group" v-if="['text', 'button', 'title'].includes(selectedBlock.type)">
                <label class="property-label">文本内容</label>
                <input type="text" v-model="selectedBlock.props.text" class="property-input" />
            </div>
            <div class="property-group" v-if="selectedBlock.type === 'button'">
                <label class="property-label">按钮类型</label>
                <select v-model="selectedBlock.props.buttonType" class="property-select">
                    <option value="primary">主要按钮</option>
                    <option value="secondary">次要按钮</option>
                    <option value="danger">危险操作</option>
                </select>
            </div>
            <div class="property-group" v-if="['text', 'button', 'title'].includes(selectedBlock.type)">
                <label class="property-label">文字颜色</label>
                <input type="color" v-model="selectedBlock.props.color" class="property-color" />
            </div>
            <div class="property-group" v-if="selectedBlock.type === 'title'">
                <label class="property-label">标题级别</label>
                <select v-model="selectedBlock.props.level" class="property-select">
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                </select>
            </div>

            <!-- Hero区块属性 -->
            <div v-if="selectedBlock.type === 'hero'">
                <div class="property-group">
                    <label class="property-label">主标题</label>
                    <input type="text" v-model="selectedBlock.props.title" class="property-input" />
                </div>
                <div class="property-group">
                    <label class="property-label">主标题颜色</label>
                    <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
                </div>
                <div class="property-group">
                    <label class="property-label">副标题</label>
                    <input type="text" v-model="selectedBlock.props.subtitle" class="property-input" />
                </div>
                <div class="property-group">
                    <label class="property-label">副标题颜色</label>
                    <input type="color" v-model="selectedBlock.props.subtitleColor" class="property-color" />
                </div>
                <div class="property-group">
                    <label class="property-label">按钮文字</label>
                    <input type="text" v-model="selectedBlock.props.buttonText" class="property-input" />
                </div>
                <div class="property-group">
                    <label class="property-label">按钮背景色</label>
                    <input type="color" v-model="selectedBlock.props.buttonBgColor" class="property-color" />
                </div>
                <div class="property-group">
                    <label class="property-label">按钮文字颜色</label>
                    <input type="color" v-model="selectedBlock.props.buttonTextColor" class="property-color" />
                </div>
                <div class="property-group">
                    <label class="property-label">背景颜色</label>
                    <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
                </div>
            </div>

            <!-- 图文区块属性 -->
            <div v-if="selectedBlock.type === 'image-text'">
                <div class="property-group">
                    <label class="property-label">布局方式</label>
                    <select v-model="selectedBlock.props.layout" class="property-select">
                        <option value="text-left">左文右图</option>
                        <option value="text-right">左图右文</option>
                        <option value="text-top">上文下图</option>
                    </select>
                </div>
                <div class="property-group">
                    <label class="property-label">标题</label>
                    <input type="text" v-model="selectedBlock.props.title" class="property-input" />
                </div>
                <div class="property-group">
                    <label class="property-label">标题颜色</label>
                    <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
                </div>
                <div class="property-group">
                    <label class="property-label">内容</label>
                    <textarea v-model="selectedBlock.props.content" class="property-textarea" rows="3"></textarea>
                </div>
                <div class="property-group">
                    <label class="property-label">内容颜色</label>
                    <input type="color" v-model="selectedBlock.props.textColor" class="property-color" />
                </div>
                <div class="property-group">
                    <label class="property-label">图片占位符文本</label>
                    <input type="text" v-model="selectedBlock.props.imagePlaceholder" class="property-input" />
                </div>
                <div class="property-group">
                    <label class="property-label">图片背景色</label>
                    <input type="color" v-model="selectedBlock.props.imageBgColor" class="property-color" />
                </div>
                <div class="property-group">
                    <label class="property-label">区块背景色</label>
                    <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
                </div>
            </div>

            <!-- 核心特性区块属性 -->
            <div v-if="selectedBlock.type === 'features'">
                <div class="property-group">
                    <label class="property-label">标题</label>
                    <input type="text" v-model="selectedBlock.props.title" class="property-input" />
                </div>
                <div class="property-group">
                    <label class="property-label">标题颜色</label>
                    <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
                </div>
                <div class="property-group">
                    <label class="property-label">列数</label>
                    <select v-model="selectedBlock.props.columns" class="property-select">
                        <option value="2">2列</option>
                        <option value="3">3列</option>
                        <option value="4">4列</option>
                    </select>
                </div>
                <div class="property-group">
                    <label class="property-label">特性标题颜色</label>
                    <input type="color" v-model="selectedBlock.props.featureTitleColor" class="property-color" />
                </div>
                <div class="property-group">
                    <label class="property-label">特性描述颜色</label>
                    <input type="color" v-model="selectedBlock.props.featureTextColor" class="property-color" />
                </div>
                <div class="property-group">
                    <label class="property-label">区块背景色</label>
                    <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
                </div>

                <div class="property-group" v-for="(feature, index) in selectedBlock.props.features" :key="index">
                    <label class="property-label">特性 {{ index + 1 }}</label>
                    <input type="text" v-model="feature.title" class="property-input" placeholder="特性标题" />
                    <textarea v-model="feature.description" class="property-textarea" rows="2"
                        placeholder="特性描述"></textarea>
                </div>
            </div>
        </div>
        <div class="panel" v-else>
            <div class="section-header">
                <h3>属性编辑</h3>
            </div>
            <div class="no-selection">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11 17H13V11H11V17ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 9H13V7H11V9Z"
                        fill="#9CA3AF" />
                </svg>
                <p>请选择画布中的组件进行编辑</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import draggable from "vuedraggable";

// 基础组件库
const basicComponents = ref([
    { id: 1, name: "文本", type: "text", props: { text: "默认文本", color: "#000000" } },
    { id: 2, name: "按钮", type: "button", props: { text: "点击按钮", color: "#000000", buttonType: "primary" } },
    { id: 3, name: "标题", type: "title", props: { text: "我是标题", color: "#000000", level: "h2" } }
]);

// 网页区块组件库
const webBlocks = ref([
    {
        id: 10,
        name: "Hero区块",
        type: "hero",
        props: {
            title: "欢迎标题",
            titleColor: "#000000",
            subtitle: "这里是副标题文本",
            subtitleColor: "#666666",
            buttonText: "了解更多",
            buttonBgColor: "#3b82f6",
            buttonTextColor: "#ffffff",
            bgColor: "#f8fafc"
        }
    },
    {
        id: 11,
        name: "图文区块",
        type: "image-text",
        props: {
            layout: "text-left",
            title: "图文区块标题",
            titleColor: "#000000",
            content: "这里是图文区块的内容描述，可以详细介绍相关功能或特点。",
            textColor: "#333333",
            imagePlaceholder: "图片占位区域",
            imageBgColor: "#e5e7eb",
            bgColor: "#ffffff"
        }
    },
    {
        id: 12,
        name: "核心特性区块",
        type: "features",
        props: {
            title: "核心特性",
            titleColor: "#000000",
            columns: 3,
            featureTitleColor: "#3b82f6",
            featureTextColor: "#666666",
            bgColor: "#ffffff",
            features: [
                { title: "特性一", description: "特性一的详细描述" },
                { title: "特性二", description: "特性二的详细描述" },
                { title: "特性三", description: "特性三的详细描述" }
            ]
        }
    }
]);

// 画布区块 - 从本地存储加载或初始化为空数组
const canvasBlocks = ref([]);

// 当前选中区块
const selectedBlock = ref(null);

// 用于跟踪拖拽状态
const isDragging = ref(false);

// 本地存储键名
const STORAGE_KEY = 'canvas-blocks';

// 加载本地存储的数据
const loadFromLocalStorage = () => {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            canvasBlocks.value = JSON.parse(savedData);
        }
    } catch (error) {
        console.error('Failed to load data from localStorage:', error);
        canvasBlocks.value = [];
    }
};

// 保存数据到本地存储
const saveToLocalStorage = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(canvasBlocks.value));
    } catch (error) {
        console.error('Failed to save data to localStorage:', error);
    }
};

// 清空画布
const clearCanvas = () => {
    canvasBlocks.value = [];
    selectedBlock.value = null;
    // 同时清空本地存储
    localStorage.removeItem(STORAGE_KEY);
};

// 导出配置
const exportConfig = () => {
    const config = {
        blocks: canvasBlocks.value.map(block => ({
            type: block.type,
            props: { ...block.props }
        }))
    };

    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'canvas-config.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

// 选择区块
const selectBlock = (block) => {
    selectedBlock.value = block;
};

// 取消选择区块
const deselectBlock = () => {
    if (!isDragging.value) {
        selectedBlock.value = null;
    }
};

// 克隆组件（用于拖拽）
const cloneComponent = (original) => {
    return {
        ...original,
        id: Date.now() + Math.random(), // 生成唯一ID
        props: { ...original.props } // 深拷贝props
    };
};

// 根据类型映射渲染标签
const getComponentTag = (type) => {
    switch (type) {
        case "title":
            return "h2";
        case "button":
            return "button";
        case "text":
        default:
            return "p";
    }
};

// 获取组件样式
const getComponentStyle = (element) => {
    return {
        color: element.props.color
    };
};

// 获取区块样式
const getBlockStyle = (element) => {
    const baseStyle = {};

    // 为网页区块添加背景色
    if (['hero', 'image-text', 'features'].includes(element.type) && element.props.bgColor) {
        baseStyle.backgroundColor = element.props.bgColor;
    }

    if (element.type === 'button') {
        baseStyle.backgroundColor = element.props.buttonType === 'primary' ? '#3b82f6' :
            element.props.buttonType === 'secondary' ? '#6b7280' :
                element.props.buttonType === 'danger' ? '#ef4444' : '#3b82f6';
    }

    return baseStyle;
};

// 拖拽开始
const dragStart = () => {
    isDragging.value = true;
};

// 拖拽结束
const dragEnd = () => {
    isDragging.value = false;
};

// 组件挂载时加载本地存储的数据
onMounted(() => {
    loadFromLocalStorage();
});

// 监听canvasBlocks的变化，自动保存到本地存储
watch(canvasBlocks, (newVal) => {
    saveToLocalStorage();
}, { deep: true });

// 监听selectedBlock的变化，确保始终指向canvasBlocks中的实际对象
watch(selectedBlock, (newVal) => {
    if (newVal) {
        // 找到canvasBlocks中对应的区块
        const actualBlock = canvasBlocks.value.find(block => block.id === newVal.id);
        if (actualBlock) {
            selectedBlock.value = actualBlock;
        }
    }
}, { deep: true });
</script>

<style>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif;
    background: #f8fafc;
    color: #334155;
}

.app {
    display: flex;
    height: 100vh;
    min-width: 900px;
    overflow: hidden;
}

/* 左侧组件库 */
.sidebar {
    width: 240px;
    min-width: 240px;
    background: #ffffff;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    z-index: 10;
    overflow-y: auto;
}

.section-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 5;
}

.section-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
}

.library-category {
    margin-bottom: 16px;
}

.category-title {
    padding: 8px 20px;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
    background-color: #f8fafc;
}

.library-item {
    padding: 12px 16px;
    margin: 8px 12px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: grab;
    color: #475569;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.library-item:hover {
    border-color: #3b82f6;
    background: #f0f7ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.item-icon {
    display: flex;
    align-items: center;
    color: #64748b;
}

/* 中间画布 */
.canvas-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 300px;
    background: #f8fafc;
}

.canvas {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    position: relative;
}

.canvas-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    background: white;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;
}

.action-btn:hover {
    background: #f1f5f9;
    color: #3b82f6;
}

.empty-canvas {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #94a3b8;
    text-align: center;
}

.empty-canvas p {
    margin-top: 16px;
    font-size: 15px;
}

.block {
    padding: 16px;
    margin-bottom: 16px;
    background: #ffffff;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.block:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.block.selected {
    border-color: #2563eb;
    background: #eff6ff;
    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.1);
}

.block p {
    margin: 0;
}

.block h1,
.block h2,
.block h3 {
    margin: 0;
    font-weight: 600;
}

.block h1 {
    font-size: 24px;
}

.block h2 {
    font-size: 20px;
}

.block h3 {
    font-size: 18px;
}

.block button {
    padding: 10px 18px;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
}

/* 网页区块样式 */
.hero-block {
    text-align: center;
    padding: 40px 20px;
}

.hero-block h1 {
    font-size: 2.5rem;
    margin-bottom: 16px;
}

.hero-block p {
    font-size: 1.2rem;
    margin-bottom: 24px;
    opacity: 0.8;
}

.image-text-block {
    display: flex;
    padding: 30px 20px;
    gap: 30px;
}

.image-text-block.text-left {
    flex-direction: row;
}

.image-text-block.text-right {
    flex-direction: row-reverse;
}

.image-text-block.text-top {
    flex-direction: column;
}

.text-content {
    flex: 1;
}

.image-placeholder {
    flex: 1;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #6b7280;
    font-weight: 500;
}

.features-block {
    padding: 40px 20px;
}

.features-grid {
    display: grid;
    gap: 24px;
    margin-top: 30px;
}

.feature-item {
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.7);
}

.feature-item h3 {
    margin-bottom: 12px;
}

/* 右侧属性面板 */
.panel {
    width: 280px;
    min-width: 280px;
    background: #ffffff;
    border-left: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    z-index: 10;
    overflow-y: auto;
}

.component-type {
    font-size: 12px;
    padding: 4px 8px;
    background: #eef2ff;
    color: #4338ca;
    border-radius: 4px;
    font-weight: 500;
}

.property-group {
    padding: 16px 20px;
    border-bottom: 1px solid #f1f5f9;
}

.property-label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
}

.property-input,
.property-select,
.property-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s;
    font-family: inherit;
}

.property-input:focus,
.property-select:focus,
.property-textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.property-color {
    width: 100%;
    height: 40px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    cursor: pointer;
    padding: 2px;
}

.property-textarea {
    resize: vertical;
    min-height: 80px;
}

.no-selection {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 20px;
    text-align: center;
    color: #94a3b8;
}

.no-selection p {
    margin-top: 16px;
    font-size: 15px;
}
</style>