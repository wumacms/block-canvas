<template>
    <div class="features-block">
        <h2 :style="{ color: props.titleColor, textAlign: 'center' }">{{ props.title }}</h2>
        <div class="features-grid" :style="{ gridTemplateColumns: `repeat(${props.columns}, 1fr)` }">
            <div v-for="(feature, index) in props.features" :key="index" class="feature-item">
                <h3 :style="{ color: props.featureTitleColor }">{{ feature.title }}</h3>
                <p :style="{ color: props.featureTextColor }">{{ feature.description }}</p>
            </div>
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
.features-block {
    padding: 40px 20px;
}

.features-block h2 {
    margin-bottom: 32px;
    font-size: 2rem;
}

.features-grid {
    display: grid;
    gap: 24px;
}

.feature-item {
    text-align: center;
    padding: 20px;
}

.feature-item h3 {
    margin-bottom: 12px;
    font-size: 1.3rem;
}

.feature-item p {
    color: #666;
    line-height: 1.6;
}
</style>