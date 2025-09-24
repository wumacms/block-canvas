<template>
    <div class="app">
        <!-- 左侧组件库 -->
        <ComponentLibrary />

        <!-- 中间画布 -->
        <CanvasArea v-model:modelValue="canvasBlocks" :selectedBlock="selectedBlock" @update:selectedBlock="selectBlock"
            @clear="clearCanvas" @exportConfig="exportConfig" @exportHTML="exportHTMLFile" @previewHTML="previewHTML"
            @dragStart="dragStart" @dragEnd="dragEnd" />

        <!-- 右侧属性面板 -->
        <PropertyPanel :selectedBlock="selectedBlock" @removeBlock="removeBlock"
            @updatePlanFeatures="handleUpdatePlanFeatures" />
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { exportHTMLFile, previewHTML } from '@/utils/htmlExporter';

// 导入组件
import ComponentLibrary from '@/components/sidebar/ComponentLibrary.vue';
import PropertyPanel from '@/components/panel/PropertyPanel.vue';
import CanvasArea from '@/components/canvas/CanvasArea.vue';

// 存储键名
const STORAGE_KEY = 'page-builder-data';

// 画布上的组件
const canvasBlocks = ref([]);
const selectedBlock = ref(null);
const isDragging = ref(false);

// 从本地存储加载数据
const loadFromStorage = () => {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            canvasBlocks.value = parsedData || [];
            console.log('数据加载成功', canvasBlocks.value);
        }
    } catch (error) {
        console.error('加载数据失败:', error);
        // 如果数据损坏，清空存储
        localStorage.removeItem(STORAGE_KEY);
        canvasBlocks.value = [];
    }
};

// 保存数据到本地存储
const saveToStorage = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(canvasBlocks.value));
        console.log('数据保存成功');
    } catch (error) {
        console.error('保存数据失败:', error);
    }
};

// 深度监听画布数据变化，自动保存
watch(canvasBlocks, (newValue) => {
    saveToStorage();
}, {
    deep: true, // 深度监听对象内部变化
    immediate: false // 初始化时不触发
});

// 组件挂载时加载数据
onMounted(() => {
    loadFromStorage();
});

// 选择组件
const selectBlock = (block) => {
    selectedBlock.value = block;
};

// 删除组件
const removeBlock = () => {
    if (selectedBlock.value) {
        const index = canvasBlocks.value.findIndex(block => block.id === selectedBlock.value.id);
        if (index !== -1) {
            canvasBlocks.value.splice(index, 1);
            selectedBlock.value = null;
            // 删除操作会触发watch，自动保存
        }
    }
};

// 清空画布
const clearCanvas = () => {
    if (confirm('确定要清空画布吗？此操作将删除所有数据且不可恢复！')) {
        canvasBlocks.value = [];
        selectedBlock.value = null;
        // 清空本地存储
        localStorage.removeItem(STORAGE_KEY);
    }
};

// 导出配置
const exportConfig = () => {
    const config = JSON.stringify(canvasBlocks.value, null, 2);
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-config.json';
    a.click();
    URL.revokeObjectURL(url);
};

// 拖拽开始
const dragStart = () => {
    isDragging.value = true;
};

// 拖拽结束
const dragEnd = () => {
    isDragging.value = false;
};

const handleUpdatePlanFeatures = ({ index, featuresText }) => {
    if (selectedBlock.value && selectedBlock.value.type === 'pricing') {
        selectedBlock.value.props.plans[index].features = featuresText.split('\n').filter(f => f.trim());
        // 属性更新会触发watch，自动保存
    }
};

// 提供手动保存方法（可选）
const manualSave = () => {
    saveToStorage();
    alert('数据已保存！');
};

// 提供重置方法（可选）
const resetData = () => {
    if (confirm('确定要重置所有数据吗？此操作将无法撤销！')) {
        canvasBlocks.value = [];
        selectedBlock.value = null;
        localStorage.removeItem(STORAGE_KEY);
        alert('数据已重置！');
    }
};
</script>

<style scoped>
.app {
    display: flex;
    height: 100vh;
    overflow: hidden;
}
</style>