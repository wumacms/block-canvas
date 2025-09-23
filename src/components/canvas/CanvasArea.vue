<template>
    <div class="canvas-container">
        <div class="section-header">
            <h3>画布</h3>
            <div class="canvas-actions">
                <button class="action-btn" title="清空画布" @click="emit('clear')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19 6V20H5V6H19ZM19 4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM10 11H8V18H10V11Z"
                            fill="currentColor" />
                    </svg>
                </button>
                <button class="action-btn" title="导出配置" @click="emit('exportConfig')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 16L16 11L13.5 11L13.5 8L10.5 8L10.5 11L8 11L12 16ZM19 4.5L19 19.5L5 19.5L5 4.5L19 4.5ZM19 3H5C3.9 3 3 3.9 3 5V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V5C21 3.9 20.1 3 19 3Z"
                            fill="currentColor" />
                    </svg>
                </button>
                <button class="action-btn" title="导出HTML" @click="emit('exportHTML', blocks)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 3L10.35 4.65L16 10.3V22H8V10.3L3.65 5.95L2 7.6L12 17.6L22 7.6L20.35 5.95L14 12.3V2H12V3Z"
                            fill="currentColor" />
                    </svg>
                </button>
                <button class="action-btn" title="预览HTML" @click="emit('previewHTML', blocks)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="canvas" @click="deselect">
            <draggable v-model="blocks" group="blocks" item-key="id" @start="dragStart" @end="dragEnd">
                <template #item="{ element }">
                    <div class="block" :class="{ selected: selectedBlock?.id === element.id }"
                        @click.stop="select(element)" :style="getBlockStyle(element)">
                        <component :is="getBlockComponent(element.type)" :props="element.props" />
                    </div>
                </template>
            </draggable>
            <EmptyCanvas v-if="blocks.length === 0" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import draggable from 'vuedraggable';
import EmptyCanvas from '@/components/canvas/EmptyCanvas.vue';
import { blockComponents } from '@/utils/blockComponents.js';

const props = defineProps({
    modelValue: {
        type: Array,
        required: true
    },
    selectedBlock: {
        type: Object,
        default: null
    }
});

const emit = defineEmits([
    'update:modelValue',
    'update:selectedBlock',
    'clear',
    'exportConfig',
    'exportHTML',
    'previewHTML',
    'dragStart',
    'dragEnd'
]);

const blocks = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const getBlockComponent = (type) => {
    return blockComponents[type] || null;
};

const getBlockStyle = (element) => {
    return {
        backgroundColor: element.props.bgColor || 'transparent'
    };
};

const select = (block) => {
    emit('update:selectedBlock', block);
};

const deselect = () => {
    emit('update:selectedBlock', null);
};

const dragStart = () => {
    emit('dragStart');
};

const dragEnd = () => {
    emit('dragEnd');
};
</script>

<style scoped>
.canvas-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
    padding: 16px;
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