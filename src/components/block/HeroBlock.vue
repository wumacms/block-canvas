<template>
    <div class="hero-block">
        <h1 :style="{ color: props.titleColor }">{{ props.title }}</h1>
        <p :style="{ color: props.subtitleColor }">{{ props.subtitle }}</p>
        <button :style="{
            backgroundColor: props.buttonBgColor,
            color: props.buttonTextColor
        }">{{ props.buttonText }}</button>
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
    color: #666;
}

.hero-block button {
    padding: 12px 24px;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
</style>