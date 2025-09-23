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
import { ref } from 'vue';
import { exportHTMLFile, previewHTML } from '@/utils/htmlExporter';

// 导入组件
import ComponentLibrary from '@/components/sidebar/ComponentLibrary.vue';
import PropertyPanel from '@/components/panel/PropertyPanel.vue';
import CanvasArea from '@/components/canvas/CanvasArea.vue';

// 画布上的组件
const canvasBlocks = ref([]);
const selectedBlock = ref(null);
const isDragging = ref(false);

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
        }
    }
};

// 清空画布
const clearCanvas = () => {
    if (confirm('确定要清空画布吗？')) {
        canvasBlocks.value = [];
        selectedBlock.value = null;
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
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    display: flex;
    height: 100vh;
    overflow: hidden;
}
</style>