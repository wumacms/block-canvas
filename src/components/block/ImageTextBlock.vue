<template>
    <div class="image-text-block" :class="props.layout">
        <div class="text-content">
            <h2 :style="{ color: props.titleColor }">{{ props.title }}</h2>
            <p :style="{ color: props.textColor }">{{ props.content }}</p>
        </div>
        <div class="image-placeholder" :style="{ backgroundColor: props.imageBgColor }">
            {{ props.imagePlaceholder }}
        </div>
    </div>
</template>

<script setup>
defineProps({
    props: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.image-text-block {
    display: flex;
    gap: 24px;
    padding: 24px;
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

.text-content h2 {
    margin-bottom: 16px;
    font-size: 1.8rem;
}

.text-content p {
    line-height: 1.6;
    color: #666;
}

.image-placeholder {
    flex: 1;
    height: 200px;
    background: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    border-radius: 6px;
}
</style>