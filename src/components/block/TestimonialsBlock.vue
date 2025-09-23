<template>
    <div class="testimonials-block">
        <h2 :style="{ color: props.titleColor, textAlign: 'center' }">{{ props.title }}</h2>
        <div class="testimonials-grid" :style="{ gridTemplateColumns: `repeat(${props.columns}, 1fr)` }">
            <div v-for="(testimonial, index) in props.testimonials" :key="index" class="testimonial-item">
                <div class="testimonial-content">
                    <p :style="{ color: props.textColor }">"{{ testimonial.content }}"</p>
                </div>
                <div class="testimonial-author">
                    <h4 :style="{ color: props.authorColor }">{{ testimonial.name }}</h4>
                    <p :style="{ color: props.roleColor }">{{ testimonial.role }}</p>
                </div>
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
.testimonials-block {
    padding: 40px 20px;
}

.testimonials-block h2 {
    margin-bottom: 32px;
    font-size: 2rem;
}

.testimonials-grid {
    display: grid;
    gap: 24px;
}

.testimonial-item {
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.testimonial-content {
    margin-bottom: 16px;
    font-style: italic;
}

.testimonial-author h4 {
    margin-bottom: 4px;
}
</style>