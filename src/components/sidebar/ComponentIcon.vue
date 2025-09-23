<template>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Hero 区块图标 -->
        <rect v-if="type === 'hero'" x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2" />
        <path v-if="type === 'hero'" d="M3 10h18M8 14h8" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" />

        <!-- 图文区块图标 -->
        <rect v-else-if="type === 'image-text'" x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
            stroke-width="2" />
        <path v-else-if="type === 'image-text'" d="M8 10h8M8 14h4M14 17v-6l3 3" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" />

        <!-- 特性展示图标 -->
        <rect v-else-if="type === 'features'" x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
            stroke-width="2" />
        <circle v-else-if="type === 'features'" cx="8" cy="9" r="1" fill="currentColor" />
        <circle v-else-if="type === 'features'" cx="16" cy="9" r="1" fill="currentColor" />
        <circle v-else-if="type === 'features'" cx="12" cy="15" r="1" fill="currentColor" />

        <!-- 客户评价图标 -->
        <path v-else-if="type === 'testimonials'"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

        <!-- 定价方案图标 -->
        <path v-else-if="type === 'pricing'" d="M12 2L20 8.5V15.5L12 22L4 15.5V8.5L12 2Z" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path v-else-if="type === 'pricing'" d="M12 12.5L20 8.5" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
        <path v-else-if="type === 'pricing'" d="M12 12.5V22" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
        <path v-else-if="type === 'pricing'" d="M12 12.5L4 8.5" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />

        <!-- CTA 区块图标 -->
        <rect v-else-if="type === 'cta'" x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
            stroke-width="2" />
        <path v-else-if="type === 'cta'" d="M9 12h6m-3-3v6" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" />

        <!-- 页脚区块图标 -->
        <rect v-else-if="type === 'footer'" x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
            stroke-width="2" />
        <path v-else-if="type === 'footer'" d="M8 12h8M8 16h8M8 8h2" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" />

        <!-- 团队介绍图标 -->
        <path v-else-if="type === 'team'"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

        <!-- 联系我们图标 -->
        <path v-else-if="type === 'contact'"
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        required: true
    }
});
</script>