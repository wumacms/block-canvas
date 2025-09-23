<template>
    <div class="empty-canvas">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"
                fill="#9CA3AF" />
        </svg>
        <p>从左侧拖拽组件到此处</p>
    </div>
</template>

<style scoped>
.empty-canvas {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #9ca3af;
}

.empty-canvas p {
    margin-top: 16px;
    font-size: 16px;
}
</style>