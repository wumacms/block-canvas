<template>
    <div class="pricing-block">
        <h2 :style="{ color: props.titleColor, textAlign: 'center' }">{{ props.title }}</h2>
        <div class="pricing-grid" :style="{ gridTemplateColumns: `repeat(${props.columns}, 1fr)` }">
            <div v-for="(plan, index) in props.plans" :key="index" class="pricing-plan">
                <h3 :style="{ color: props.planTitleColor }">{{ plan.name }}</h3>
                <div class="price" :style="{ color: props.priceColor }">{{ plan.price }}</div>
                <ul class="features-list">
                    <li v-for="(feature, fIndex) in plan.features" :key="fIndex" :style="{ color: props.featureColor }">
                        {{ feature }}</li>
                </ul>
                <button :style="{
                    backgroundColor: props.buttonBgColor,
                    color: props.buttonTextColor
                }">{{ plan.buttonText }}</button>
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
.pricing-block {
    padding: 40px 20px;
}

.pricing-block h2 {
    margin-bottom: 32px;
    font-size: 2rem;
}

.pricing-grid {
    display: grid;
    gap: 24px;
}

.pricing-plan {
    background: white;
    padding: 32px 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.pricing-plan h3 {
    margin-bottom: 16px;
    font-size: 1.5rem;
}

.price {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 24px;
}

.features-list {
    list-style: none;
    margin-bottom: 24px;
}

.features-list li {
    padding: 8px 0;
    border-bottom: 1px solid #e5e7eb;
}

.features-list li:last-child {
    border-bottom: none;
}

.pricing-plan button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
}
</style>