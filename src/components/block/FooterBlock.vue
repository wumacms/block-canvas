<template>
    <div class="footer-block">
        <div class="footer-content">
            <div class="footer-section">
                <h3 :style="{ color: props.titleColor }">{{ props.companyName }}</h3>
                <p :style="{ color: props.textColor }">{{ props.companyDescription }}</p>
            </div>
            <div class="footer-links">
                <div v-for="(linkGroup, index) in props.linkGroups" :key="index" class="link-group">
                    <h4 :style="{ color: props.linkTitleColor }">{{ linkGroup.title }}</h4>
                    <ul>
                        <li v-for="(link, lIndex) in linkGroup.links" :key="lIndex">
                            <a :href="link.url" :style="{ color: props.linkColor }">{{ link.text }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-bottom" :style="{ backgroundColor: props.bottomBgColor }">
            <p :style="{ color: props.copyrightColor }">{{ props.copyrightText }}</p>
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
.footer-block {
    background: white;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    padding: 40px;
    gap: 40px;
}

.footer-section {
    flex: 1;
}

.footer-section h3 {
    margin-bottom: 16px;
    font-size: 1.5rem;
}

.footer-section p {
    color: #666;
    line-height: 1.6;
}

.footer-links {
    display: flex;
    gap: 40px;
}

.link-group h4 {
    margin-bottom: 16px;
    font-size: 1.1rem;
}

.link-group ul {
    list-style: none;
}

.link-group li {
    margin-bottom: 8px;
}

.link-group a {
    text-decoration: none;
    color: #666;
    transition: color 0.2s;
}

.link-group a:hover {
    color: #4f46e5;
}

.footer-bottom {
    padding: 20px 40px;
    text-align: center;
}
</style>