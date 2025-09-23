<template>
    <div class="app">
        <!-- 左侧组件库 -->
        <ComponentLibrary />

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
                    <!-- 导出HTML按钮 -->
                    <button class="action-btn" title="导出HTML" @click="exportHTMLFile(canvasBlocks)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 3L10.35 4.65L16 10.3V22H8V10.3L3.65 5.95L2 7.6L12 17.6L22 7.6L20.35 5.95L14 12.3V2H12V3Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                    <!-- 新增预览HTML按钮 -->
                    <button class="action-btn" title="预览HTML" @click="previewHTML(canvasBlocks)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z"
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

                            <!-- 网页区块组件 -->
                            <HeroBlock v-if="element.type === 'hero'" :props="element.props" />
                            <ImageTextBlock v-else-if="element.type === 'image-text'" :props="element.props" />
                            <FeaturesBlock v-else-if="element.type === 'features'" :props="element.props" />
                            <TestimonialsBlock v-else-if="element.type === 'testimonials'" :props="element.props" />
                            <PricingBlock v-else-if="element.type === 'pricing'" :props="element.props" />
                            <CTABlock v-else-if="element.type === 'cta'" :props="element.props" />
                            <FooterBlock v-else-if="element.type === 'footer'" :props="element.props" />
                            <TeamBlock v-else-if="element.type === 'team'" :props="element.props" />
                            <ContactBlock v-else-if="element.type === 'contact'" :props="element.props" />

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
        <PropertyPanel :selectedBlock="selectedBlock" @removeBlock="removeBlock"
            @updatePlanFeatures="handleUpdatePlanFeatures" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

// 导入HTML导出模块
import { exportHTMLFile, previewHTML } from '@/utils/htmlExporter';

// 导入组件
import ComponentLibrary from '@/components/sidebar/ComponentLibrary.vue';
import PropertyPanel from '@/components/panel/PropertyPanel.vue';

import HeroBlock from '@/components/block/HeroBlock.vue';
import ImageTextBlock from '@/components/block/ImageTextBlock.vue';
import FeaturesBlock from '@/components/block/FeaturesBlock.vue';
import TestimonialsBlock from '@/components/block/TestimonialsBlock.vue';
import PricingBlock from '@/components/block/PricingBlock.vue';
import CTABlock from '@/components/block/CTABlock.vue';
import FooterBlock from '@/components/block/FooterBlock.vue';
import TeamBlock from '@/components/block/TeamBlock.vue';
import ContactBlock from '@/components/block/ContactBlock.vue';

// 画布上的组件
const canvasBlocks = ref([]);
const selectedBlock = ref(null);
const isDragging = ref(false);

// 克隆组件（确保每个拖拽的组件都是独立的）
const cloneComponent = (component) => {
    return JSON.parse(JSON.stringify({
        ...component,
        id: `${component.type}-${Date.now()}`
    }));
};

// 选择组件
const selectBlock = (block) => {
    selectedBlock.value = block;
};

// 取消选择组件
const deselectBlock = () => {
    if (!isDragging.value) {
        selectedBlock.value = null;
    }
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

// 获取区块样式
const getBlockStyle = (element) => {
    return {
        backgroundColor: element.props.bgColor || 'transparent'
    };
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
/* 原有的样式保持不变 */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: #333;
    background-color: #f9fafb;
}

.app {
    display: flex;
    height: 100vh;
    overflow: hidden;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e5e7eb;
}

.section-header h3 {
    font-size: 16px;
    font-weight: 600;
    color: #374151;
}

/* 画布样式 */
.canvas-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
    padding: 16px;
    overflow: hidden;
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
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: white;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
}

.action-btn:hover {
    background: #f3f4f6;
    color: #374151;
}

.canvas {
    flex: 1;
    background: white;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    padding: 24px;
    overflow-y: auto;
    position: relative;
}

.empty-canvas {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #9ca3af;
}

.empty-canvas p {
    margin-top: 16px;
    font-size: 16px;
}

.block {
    position: relative;
    margin-bottom: 16px;
    padding: 20px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    transition: all 0.2s;
    cursor: pointer;
}

.block:hover {
    border-color: #4f46e5;
}

.block.selected {
    border: 2px solid #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
</style>