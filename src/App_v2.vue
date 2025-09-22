<template>
    <div class="app">
        <!-- 顶部导航栏 -->
        <div class="navbar">
            <div class="navbar-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z"
                        fill="currentColor" />
                    <path
                        d="M4 13C4 12.4477 4.44772 12 5 12H11C11.5523 12 12 12.4477 12 13V19C12 19.5523 11.5523 20 11 20H5C4.44772 20 4 19.5523 4 19V13Z"
                        fill="currentColor" />
                    <path
                        d="M14 13C14 12.4477 14.4477 12 15 12H19C19.5523 12 20 12.4477 20 13V19C20 19.5523 19.5523 20 19 20H15C14.4477 20 14 19.5523 14 19V13Z"
                        fill="currentColor" />
                </svg>
                <span>网页搭建工具</span>
            </div>
            <div class="navbar-actions">
                <button class="btn btn-secondary" @click="togglePreview">
                    {{ isPreviewMode ? '退出预览' : '预览' }}
                </button>
                <button class="btn btn-primary" @click="exportConfig">
                    导出配置
                </button>
                <button class="btn btn-danger" @click="clearCanvas">
                    清空
                </button>
            </div>
        </div>

        <div class="main-content">
            <!-- 左侧组件库 -->
            <div class="sidebar" :class="{ 'hidden': isPreviewMode }">
                <div class="section-header">
                    <h3>组件库</h3>
                    <input type="text" v-model="componentSearch" placeholder="搜索组件..." class="search-input" />
                </div>
                <div class="component-categories">
                    <button v-for="category in categories" :key="category.id"
                        :class="['category-btn', { active: activeCategory === category.id }]"
                        @click="activeCategory = category.id">
                        {{ category.name }}
                    </button>
                </div>
                <draggable v-model="filteredComponents" :group="{ name: 'blocks', pull: 'clone', put: false }"
                    :sort="false" :clone="cloneComponent" item-key="id" :drag="true" class="component-list">
                    <template #item="{ element }">
                        <div class="library-item">
                            <span class="item-icon">
                                <component :is="element.icon" />
                            </span>
                            {{ element.name }}
                            <span class="component-desc">{{ element.description }}</span>
                        </div>
                    </template>
                </draggable>
            </div>

            <!-- 中间画布 -->
            <div class="canvas-container">
                <div class="section-header">
                    <h3>画布</h3>
                    <div class="canvas-info">
                        <span>组件数: {{ canvasBlocks.length }}</span>
                        <div class="canvas-actions">
                            <button class="action-btn" title="撤销" @click="undo" :disabled="!canUndo">
                                <UndoIcon />
                            </button>
                            <button class="action-btn" title="重做" @click="redo" :disabled="!canRedo">
                                <RedoIcon />
                            </button>
                            <button class="action-btn" title="清空画布" @click="clearCanvas">
                                <TrashIcon />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="canvas" @click="deselectBlock" :class="{ 'preview-mode': isPreviewMode }">
                    <draggable v-model="canvasBlocks" group="blocks" item-key="id" @start="dragStart" @end="dragEnd"
                        :move="checkMove" :disabled="isPreviewMode">
                        <template #item="{ element }">
                            <div class="block" :class="{
                                selected: selectedBlock?.id === element.id,
                                [element.type]: true
                            }" @click.stop="selectBlock(element)" :style="getBlockStyle(element)">
                                <!-- 区块操作栏 -->
                                <div class="block-actions" v-if="!isPreviewMode && selectedBlock?.id === element.id">
                                    <button class="block-action-btn" @click.stop="moveUp(element)" title="上移">
                                        <ArrowUpIcon />
                                    </button>
                                    <button class="block-action-btn" @click.stop="moveDown(element)" title="下移">
                                        <ArrowDownIcon />
                                    </button>
                                    <button class="block-action-btn" @click.stop="duplicateBlock(element)" title="复制">
                                        <CopyIcon />
                                    </button>
                                    <button class="block-action-btn" @click.stop="removeBlock(element)" title="删除">
                                        <XIcon />
                                    </button>
                                </div>

                                <!-- 根据类型渲染不同UI -->
                                <component :is="getComponentTag(element.type)" :style="getComponentStyle(element)"
                                    :class="getComponentClass(element)">
                                    {{ element.props.text }}
                                </component>
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
            <div class="panel" :class="{ 'hidden': isPreviewMode }" v-if="selectedBlock">
                <div class="section-header">
                    <h3>属性编辑</h3>
                    <span class="component-type">{{ selectedBlock.type }}</span>
                </div>
                <div class="property-groups">
                    <div class="property-group">
                        <h4>内容</h4>
                        <div class="property-item">
                            <label class="property-label">文本内容</label>
                            <input type="text" v-model="selectedBlock.props.text" class="property-input" />
                        </div>
                        <div class="property-item" v-if="selectedBlock.type === 'image'">
                            <label class="property-label">图片地址</label>
                            <input type="text" v-model="selectedBlock.props.src" class="property-input"
                                placeholder="输入图片URL" />
                        </div>
                        <div class="property-item" v-if="selectedBlock.type === 'button'">
                            <label class="property-label">链接地址</label>
                            <input type="text" v-model="selectedBlock.props.link" class="property-input"
                                placeholder="输入链接URL" />
                        </div>
                    </div>

                    <div class="property-group">
                        <h4>样式</h4>
                        <div class="property-item">
                            <label class="property-label">文字颜色</label>
                            <input type="color" v-model="selectedBlock.props.color" class="property-color" />
                        </div>
                        <div class="property-item">
                            <label class="property-label">背景颜色</label>
                            <input type="color" v-model="selectedBlock.props.backgroundColor" class="property-color" />
                        </div>
                        <div class="property-item">
                            <label class="property-label">字体大小</label>
                            <input type="range" v-model="selectedBlock.props.fontSize" min="12" max="48"
                                class="property-range" />
                            <span class="range-value">{{ selectedBlock.props.fontSize }}px</span>
                        </div>
                        <div class="property-item">
                            <label class="property-label">内边距</label>
                            <input type="range" v-model="selectedBlock.props.padding" min="0" max="30"
                                class="property-range" />
                            <span class="range-value">{{ selectedBlock.props.padding }}px</span>
                        </div>
                        <div class="property-item" v-if="selectedBlock.type === 'button'">
                            <label class="property-label">按钮类型</label>
                            <select v-model="selectedBlock.props.buttonType" class="property-select">
                                <option value="primary">主要按钮</option>
                                <option value="secondary">次要按钮</option>
                                <option value="danger">危险操作</option>
                                <option value="outline">线框按钮</option>
                            </select>
                        </div>
                        <div class="property-item" v-if="selectedBlock.type === 'title'">
                            <label class="property-label">标题级别</label>
                            <select v-model="selectedBlock.props.level" class="property-select">
                                <option value="h1">H1</option>
                                <option value="h2">H2</option>
                                <option value="h3">H3</option>
                            </select>
                        </div>
                    </div>

                    <div class="property-group" v-if="selectedBlock.type !== 'divider'">
                        <h4>布局</h4>
                        <div class="property-item">
                            <label class="property-label">对齐方式</label>
                            <div class="alignment-buttons">
                                <button :class="['align-btn', { active: selectedBlock.props.textAlign === 'left' }]"
                                    @click="selectedBlock.props.textAlign = 'left'" title="左对齐">
                                    <AlignLeftIcon />
                                </button>
                                <button :class="['align-btn', { active: selectedBlock.props.textAlign === 'center' }]"
                                    @click="selectedBlock.props.textAlign = 'center'" title="居中">
                                    <AlignCenterIcon />
                                </button>
                                <button :class="['align-btn', { active: selectedBlock.props.textAlign === 'right' }]"
                                    @click="selectedBlock.props.textAlign = 'right'" title="右对齐">
                                    <AlignRightIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel" :class="{ 'hidden': isPreviewMode }" v-else>
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

        <!-- 预览模式遮罩 -->
        <div class="preview-overlay" v-if="isPreviewMode" @click="togglePreview">
            <div class="preview-message">预览模式 - 点击任意处退出</div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import draggable from "vuedraggable";

// 图标组件
const TextIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21M3 12H21M3 18H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>`
};

const ButtonIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" stroke-width="2" />
    <path d="M12 12H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>`
};

const TitleIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4V20M18 4V20M6 4V20M3 8H21M3 16H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>`
};

const ImageIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2"/>
  </svg>`
};

const DividerIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M12 3V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
};

const UndoIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4V8H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.5 20C14.6421 20 18 16.6421 18 12.5C18 8.35786 14.6421 5 10.5 5C6.35786 5 3 8.35786 3 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
};

const RedoIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 4V8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.5 20C9.35786 20 6 16.6421 6 12.5C6 8.35786 9.35786 5 13.5 5C17.6421 5 21 8.35786 21 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
};

const TrashIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
};

const ArrowUpIcon = {
    template: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
};

const ArrowDownIcon = {
    template: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12L12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
};

const CopyIcon = {
    template: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
    <path d="M16 8V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H8" stroke="currentColor" stroke-width="2"/>
  </svg>`
};

const XIcon = {
    template: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
};

const AlignLeftIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21M3 12H17M3 18H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
};

const AlignCenterIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21M5 12H19M7 18H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
};

const AlignRightIcon = {
    template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21M7 12H21M9 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
};

// 组件分类
const categories = ref([
    { id: 'basic', name: '基础组件' },
    { id: 'media', name: '媒体组件' },
    { id: 'layout', name: '布局组件' }
]);

const activeCategory = ref('basic');
const componentSearch = ref('');

// 左侧组件库（每个组件有类型 + 默认属性）
const componentLibrary = ref([
    {
        id: 1,
        name: "文本",
        type: "text",
        description: "普通文本内容",
        category: 'basic',
        icon: TextIcon,
        props: {
            text: "默认文本",
            color: "#000000",
            backgroundColor: "transparent",
            fontSize: 16,
            padding: 10,
            textAlign: 'left'
        }
    },
    {
        id: 2,
        name: "按钮",
        type: "button",
        description: "可点击的按钮",
        category: 'basic',
        icon: ButtonIcon,
        props: {
            text: "点击按钮",
            color: "#ffffff",
            buttonType: "primary",
            backgroundColor: "#3b82f6",
            fontSize: 16,
            padding: 10,
            textAlign: 'center',
            link: '#'
        }
    },
    {
        id: 3,
        name: "标题",
        type: "title",
        description: "文章标题",
        category: 'basic',
        icon: TitleIcon,
        props: {
            text: "我是标题",
            color: "#000000",
            level: "h2",
            backgroundColor: "transparent",
            fontSize: 24,
            padding: 10,
            textAlign: 'left'
        }
    },
    {
        id: 4,
        name: "图片",
        type: "image",
        description: "显示图片",
        category: 'media',
        icon: ImageIcon,
        props: {
            text: "图片描述",
            src: "https://via.placeholder.com/300x200",
            color: "#000000",
            backgroundColor: "transparent",
            padding: 0,
            textAlign: 'center'
        }
    },
    {
        id: 5,
        name: "分隔线",
        type: "divider",
        description: "内容分隔线",
        category: 'layout',
        icon: DividerIcon,
        props: {
            text: "",
            color: "#e2e8f0",
            backgroundColor: "transparent",
            padding: 20,
            textAlign: 'center'
        }
    }
]);

// 过滤组件列表
const filteredComponents = computed(() => {
    return componentLibrary.value.filter(component => {
        const matchesCategory = activeCategory.value === 'all' || component.category === activeCategory.value;
        const matchesSearch = component.name.toLowerCase().includes(componentSearch.value.toLowerCase()) ||
            component.description.toLowerCase().includes(componentSearch.value.toLowerCase());
        return matchesCategory && matchesSearch;
    });
});

// 画布区块 - 从本地存储加载或初始化为空数组
const canvasBlocks = ref([]);

// 历史记录
const history = ref([]);
const historyIndex = ref(-1);

// 当前选中区块
const selectedBlock = ref(null);

// 预览模式
const isPreviewMode = ref(false);

// 用于跟踪拖拽状态
const isDragging = ref(false);

// 本地存储键名
const STORAGE_KEY = 'canvas-blocks';
const HISTORY_KEY = 'canvas-history';

// 加载本地存储的数据
const loadFromLocalStorage = () => {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            canvasBlocks.value = JSON.parse(savedData);
        }

        const savedHistory = localStorage.getItem(HISTORY_KEY);
        if (savedHistory) {
            history.value = JSON.parse(savedHistory);
            historyIndex.value = history.value.length - 1;
        }
    } catch (error) {
        console.error('Failed to load data from localStorage:', error);
        canvasBlocks.value = [];
        history.value = [];
        historyIndex.value = -1;
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

// 保存历史记录
const saveHistory = () => {
    try {
        // 只保留最近50条历史记录
        if (history.value.length > 50) {
            history.value = history.value.slice(history.value.length - 50);
        }

        localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value));
    } catch (error) {
        console.error('Failed to save history to localStorage:', error);
    }
};

// 添加历史记录
const addHistory = () => {
    // 移除当前索引之后的所有历史记录
    if (historyIndex.value < history.value.length - 1) {
        history.value = history.value.slice(0, historyIndex.value + 1);
    }

    // 添加新记录
    history.value.push(JSON.parse(JSON.stringify(canvasBlocks.value)));
    historyIndex.value = history.value.length - 1;

    saveHistory();
};

// 撤销操作
const undo = () => {
    if (canUndo.value) {
        historyIndex.value--;
        canvasBlocks.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]));
        selectedBlock.value = null;
    }
};

// 重做操作
const redo = () => {
    if (canRedo.value) {
        historyIndex.value++;
        canvasBlocks.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]));
        selectedBlock.value = null;
    }
};

// 检查是否可以撤销
const canUndo = computed(() => historyIndex.value > 0);

// 检查是否可以重做
const canRedo = computed(() => historyIndex.value < history.value.length - 1);

// 清空画布
const clearCanvas = () => {
    if (confirm('确定要清空画布吗？此操作不可撤销。')) {
        canvasBlocks.value = [];
        selectedBlock.value = null;
        addHistory();
    }
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
        case "image":
            return "div";
        case "divider":
            return "div";
        case "text":
        default:
            return "p";
    }
};

// 获取组件样式
const getComponentStyle = (element) => {
    const style = {
        color: element.props.color,
        'background-color': element.props.backgroundColor,
        'font-size': `${element.props.fontSize}px`,
        padding: `${element.props.padding}px`,
        'text-align': element.props.textAlign
    };

    if (element.type === 'divider') {
        style['border-bottom'] = `2px solid ${element.props.color}`;
        style['width'] = '100%';
    }

    return style;
};

// 获取组件类名
const getComponentClass = (element) => {
    if (element.type === 'button') {
        return `btn-${element.props.buttonType}`;
    }
    return '';
};

// 获取区块样式
const getBlockStyle = (element) => {
    const style = {};

    if (element.type === 'button') {
        switch (element.props.buttonType) {
            case 'primary':
                style.backgroundColor = '#3b82f6';
                break;
            case 'secondary':
                style.backgroundColor = '#6b7280';
                break;
            case 'danger':
                style.backgroundColor = '#ef4444';
                break;
            case 'outline':
                style.backgroundColor = 'transparent';
                style.border = `2px solid ${element.props.color || '#3b82f6'}`;
                break;
        }
    }

    return style;
};

// 拖拽开始
const dragStart = () => {
    isDragging.value = true;
};

// 拖拽结束
const dragEnd = () => {
    isDragging.value = false;
    addHistory();
};

// 检查拖拽移动
const checkMove = (evt) => {
    // 可以在这里添加拖拽限制逻辑
    return true;
};

// 上移区块
const moveUp = (block) => {
    const index = canvasBlocks.value.findIndex(b => b.id === block.id);
    if (index > 0) {
        const temp = canvasBlocks.value[index];
        canvasBlocks.value.splice(index, 1);
        canvasBlocks.value.splice(index - 1, 0, temp);
        addHistory();
    }
};

// 下移区块
const moveDown = (block) => {
    const index = canvasBlocks.value.findIndex(b => b.id === block.id);
    if (index < canvasBlocks.value.length - 1) {
        const temp = canvasBlocks.value[index];
        canvasBlocks.value.splice(index, 1);
        canvasBlocks.value.splice(index + 1, 0, temp);
        addHistory();
    }
};

// 复制区块
const duplicateBlock = (block) => {
    const duplicated = cloneComponent(block);
    const index = canvasBlocks.value.findIndex(b => b.id === block.id);
    canvasBlocks.value.splice(index + 1, 0, duplicated);
    addHistory();
};

// 删除区块
const removeBlock = (block) => {
    const index = canvasBlocks.value.findIndex(b => b.id === block.id);
    if (index !== -1) {
        canvasBlocks.value.splice(index, 1);
        if (selectedBlock.value && selectedBlock.value.id === block.id) {
            selectedBlock.value = null;
        }
        addHistory();
    }
};

// 切换预览模式
const togglePreview = () => {
    isPreviewMode.value = !isPreviewMode.value;
};

// 组件挂载时加载本地存储的数据
onMounted(() => {
    loadFromLocalStorage();

    // 如果没有历史记录，添加初始记录
    if (history.value.length === 0) {
        addHistory();
    }
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
    flex-direction: column;
    height: 100vh;
    min-width: 900px;
    overflow: hidden;
}

/* 导航栏样式 */
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    z-index: 100;
}

.navbar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    color: #1e293b;
}

.navbar-actions {
    display: flex;
    gap: 10px;
}

.btn {
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    background: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
}

.btn-primary {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.btn-primary:hover {
    background: #2563eb;
}

.btn-secondary {
    background: #f1f5f9;
    color: #475569;
}

.btn-secondary:hover {
    background: #e2e8f0;
}

.btn-danger {
    background: #fef2f2;
    color: #dc2626;
}

.btn-danger:hover {
    background: #fee2e2;
}

.main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
}

/* 左侧组件库 */
.sidebar {
    width: 280px;
    min-width: 280px;
    background: #ffffff;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    z-index: 10;
    overflow-y: auto;
    transition: transform 0.3s ease;
}

.sidebar.hidden {
    transform: translateX(-100%);
}

.section-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    gap: 12px;
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

.search-input {
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    background: white;
}

.search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.component-categories {
    display: flex;
    padding: 10px 20px;
    gap: 8px;
    border-bottom: 1px solid #e2e8f0;
    background: white;
    overflow-x: auto;
}

.category-btn {
    padding: 6px 12px;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    background: white;
    font-size: 13px;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s;
}

.category-btn.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.component-list {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
}

.library-item {
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: white;
    cursor: grab;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.library-item:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.library-item:active {
    cursor: grabbing;
}

.item-icon {
    display: inline-flex;
    margin-right: 8px;
    color: #64748b;
}

.component-desc {
    font-size: 12px;
    color: #64748b;
}

/* 中间画布 */
.canvas-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #f8fafc;
}

.canvas-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #64748b;
}

.canvas-actions {
    display: flex;
    gap: 4px;
}

.action-btn {
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.action-btn:hover {
    background: #f1f5f9;
}

.action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.canvas {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    position: relative;
    background-image:
        linear-gradient(45deg, #f1f5f9 25%, transparent 25%),
        linear-gradient(-45deg, #f1f5f9 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #f1f5f9 75%),
        linear-gradient(-45deg, transparent 75%, #f1f5f9 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.canvas.preview-mode {
    background: white;
    padding: 0;
}

.empty-canvas {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #94a3b8;
    font-size: 16px;
    gap: 16px;
}

.block {
    position: relative;
    margin-bottom: 16px;
    border: 2px dashed transparent;
    border-radius: 8px;
    transition: all 0.2s;
    min-height: 50px;
}

.block:hover {
    border-color: #93c5fd;
}

.block.selected {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.block-actions {
    position: absolute;
    top: -40px;
    right: 0;
    display: flex;
    gap: 4px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.block-action-btn {
    padding: 6px;
    border-radius: 4px;
    border: none;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.block-action-btn:hover {
    background: #f1f5f9;
}

/* 组件样式 */
.text,
.title,
.button,
.image,
.divider {
    width: 100%;
    min-height: 50px;
    display: flex;
    align-items: center;
    word-break: break-word;
}

.button {
    justify-content: center;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
}

.button:hover {
    opacity: 0.9;
}

.btn-primary {
    background: #3b82f6;
    color: white;
}

.btn-secondary {
    background: #6b7280;
    color: white;
}

.btn-danger {
    background: #ef4444;
    color: white;
}

.btn-outline {
    background: transparent;
    border: 2px solid #3b82f6;
    color: #3b82f6;
}

.image {
    flex-direction: column;
    gap: 10px;
}

.image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

.divider {
    justify-content: center;
}

/* 右侧属性面板 */
.panel {
    width: 300px;
    min-width: 300px;
    background: #ffffff;
    border-left: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    z-index: 10;
    overflow-y: auto;
    transition: transform 0.3s ease;
}

.panel.hidden {
    transform: translateX(100%);
}

.component-type {
    font-size: 12px;
    color: #64748b;
    background: #f1f5f9;
    padding: 4px 8px;
    border-radius: 4px;
}

.property-groups {
    flex: 1;
    overflow-y: auto;
}

.property-group {
    padding: 16px 20px;
    border-bottom: 1px solid #e2e8f0;
}

.property-group h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
}

.property-item {
    margin-bottom: 12px;
}

.property-label {
    display: block;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
}

.property-input,
.property-select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
}

.property-input:focus,
.property-select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.property-color {
    width: 100%;
    height: 40px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
}

.property-range {
    width: 100%;
    margin-bottom: 8px;
}

.range-value {
    font-size: 12px;
    color: #64748b;
    text-align: right;
    display: block;
}

.alignment-buttons {
    display: flex;
    gap: 4px;
}

.align-btn {
    flex: 1;
    padding: 8px;
    border: 1px solid #d1d5db;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.align-btn.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.no-selection {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #94a3b8;
    gap: 16px;
    padding: 20px;
    text-align: center;
}

/* 预览模式遮罩 */
.preview-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.preview-message {
    color: white;
    font-size: 18px;
    background: rgba(0, 0, 0, 0.8);
    padding: 16px 24px;
    border-radius: 8px;
}

/* 响应式调整 */
@media (max-width: 1200px) {

    .sidebar,
    .panel {
        position: absolute;
        height: 100%;
        z-index: 20;
    }

    .panel {
        right: 0;
    }
}
</style>