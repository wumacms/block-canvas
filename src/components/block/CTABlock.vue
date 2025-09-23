<template>
    <div class="cta-block">
        <h2 :style="{ color: props.titleColor }">{{ props.title }}</h2>
        <p :style="{ color: props.textColor }">{{ props.content }}</p>
        <div class="cta-buttons">
            <button :style="{
                backgroundColor: props.primaryButtonBgColor,
                color: props.primaryButtonTextColor
            }">{{ props.primaryButtonText }}</button>
            <button :style="{
                backgroundColor: props.secondaryButtonBgColor,
                color: props.secondaryButtonTextColor,
                border: `1px solid ${props.secondaryButtonBorderColor}`
            }">{{ props.secondaryButtonText }}</button>
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
.cta-block {
    text-align: center;
    padding: 60px 40px;
}

.cta-block h2 {
    margin-bottom: 16px;
    font-size: 2.2rem;
}

.cta-block p {
    margin-bottom: 32px;
    font-size: 1.2rem;
    color: #666;
}

.cta-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
}

.cta-buttons button {
    padding: 12px 24px;
    font-size: 1rem;
    border-radius: 6px;
    cursor: pointer;
}

.cta-buttons button:first-child {
    border: none;
}

.cta-buttons button:last-child {
    background: transparent;
}
</style>