<template>
    <div class="contact-block">
        <h2 :style="{ color: props.titleColor, textAlign: 'center' }">{{ props.title }}</h2>
        <div class="contact-content">
            <div class="contact-info">
                <div v-for="(info, index) in props.contactInfo" :key="index" class="info-item">
                    <h4 :style="{ color: props.infoTitleColor }">{{ info.title }}</h4>
                    <p :style="{ color: props.infoTextColor }">{{ info.details }}</p>
                </div>
            </div>
            <div class="contact-form">
                <input type="text" placeholder="姓名" :style="{
                    border: `1px solid ${props.inputBorderColor}`,
                    color: props.inputTextColor
                }">
                <input type="email" placeholder="邮箱" :style="{
                    border: `1px solid ${props.inputBorderColor}`,
                    color: props.inputTextColor
                }">
                <textarea placeholder="消息" :style="{
                    border: `1px solid ${props.inputBorderColor}`,
                    color: props.inputTextColor
                }"></textarea>
                <button :style="{
                    backgroundColor: props.buttonBgColor,
                    color: props.buttonTextColor
                }">发送消息</button>
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
.contact-block {
    padding: 40px 20px;
}

.contact-block h2 {
    margin-bottom: 32px;
    font-size: 2rem;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.info-item h4 {
    margin-bottom: 8px;
    font-size: 1.2rem;
}

.info-item p {
    color: #666;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.contact-form input,
.contact-form textarea {
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
}

.contact-form textarea {
    min-height: 120px;
    resize: vertical;
}

.contact-form button {
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
}
</style>