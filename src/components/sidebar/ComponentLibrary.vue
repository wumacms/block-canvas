<template>
    <div class="sidebar">
        <div class="section-header">
            <h3>组件库</h3>
        </div>

        <div class="library-category">
            <h4 class="category-title">网页区块</h4>
            <draggable v-model="webBlocks" :group="{ name: 'blocks', pull: 'clone', put: false }" :sort="false"
                :clone="cloneComponent" item-key="id" :drag="true">
                <template #item="{ element }">
                    <div class="library-item">
                        <span class="item-icon">
                            <ComponentIcon :type="element.type" />
                        </span>
                        {{ element.name }}
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
import ComponentIcon from './ComponentIcon.vue';

// 网页区块组件库数据
const webBlocks = ref([
    {
        id: 'hero',
        type: 'hero',
        name: 'Hero 区块',
        props: {
            title: '欢迎来到我们的网站',
            titleColor: '#333333',
            subtitle: '这是一个精彩的Hero区块，用于展示您的主要信息',
            subtitleColor: '#666666',
            buttonText: '了解更多',
            buttonBgColor: '#4f46e5',
            buttonTextColor: '#ffffff',
            bgColor: '#f9fafb'
        }
    },
    {
        id: 'image-text',
        type: 'image-text',
        name: '图文区块',
        props: {
            layout: 'text-left',
            title: '图文区块标题',
            titleColor: '#333333',
            content: '这是一个图文区块，可以展示图片和相关的文本内容。您可以根据需要调整布局方式。',
            textColor: '#666666',
            imagePlaceholder: '图片占位符',
            imageBgColor: '#e5e7eb',
            bgColor: '#ffffff'
        }
    },
    {
        id: 'features',
        type: 'features',
        name: '特性展示',
        props: {
            title: '我们的核心特性',
            titleColor: '#333333',
            columns: 3,
            featureTitleColor: '#333333',
            featureTextColor: '#666666',
            bgColor: '#f9fafb',
            features: [
                { title: '特性一', description: '这是第一个特性的描述文本' },
                { title: '特性二', description: '这是第二个特性的描述文本' },
                { title: '特性三', description: '这是第三个特性的描述文本' }
            ]
        }
    },
    {
        id: 'testimonials',
        type: 'testimonials',
        name: '客户评价',
        props: {
            title: '客户评价',
            titleColor: '#333333',
            columns: 3,
            textColor: '#666666',
            authorColor: '#333333',
            roleColor: '#666666',
            bgColor: '#ffffff',
            testimonials: [
                { name: '张三', role: 'CEO, 公司A', content: '这是一个非常棒的产品，我们非常满意！' },
                { name: '李四', role: '设计师, 公司B', content: '设计精美，用户体验极佳。' },
                { name: '王五', role: '开发者, 公司C', content: '功能强大，易于集成和使用。' }
            ]
        }
    },
    {
        id: 'pricing',
        type: 'pricing',
        name: '定价方案',
        props: {
            title: '选择适合您的方案',
            titleColor: '#333333',
            columns: 3,
            planTitleColor: '#333333',
            priceColor: '#4f46e5',
            featureColor: '#666666',
            buttonBgColor: '#4f46e5',
            buttonTextColor: '#ffffff',
            bgColor: '#f9fafb',
            plans: [
                {
                    name: '基础版',
                    price: '¥99/月',
                    buttonText: '立即购买',
                    features: ['功能一', '功能二', '功能三'],
                    featuresText: "功能一\n功能二\n功能三"
                },
                {
                    name: '专业版',
                    price: '¥199/月',
                    buttonText: '立即购买',
                    features: ['功能一', '功能二', '功能三', '功能四'],
                    featuresText: "功能一\n功能二\n功能三\n功能四"
                },
                {
                    name: '企业版',
                    price: '¥399/月',
                    buttonText: '立即购买',
                    features: ['所有功能', '优先支持', '专属客服'],
                    featuresText: "所有功能\n优先支持\n专属客服"
                }
            ]
        }
    },
    {
        id: 'cta',
        type: 'cta',
        name: '行动号召',
        props: {
            title: '立即开始使用我们的产品',
            titleColor: '#333333',
            content: '加入数千满意客户的行列，体验我们产品的卓越性能。',
            textColor: '#666666',
            primaryButtonText: '开始免费试用',
            primaryButtonBgColor: '#4f46e5',
            primaryButtonTextColor: '#ffffff',
            secondaryButtonText: '了解更多',
            secondaryButtonBgColor: 'transparent',
            secondaryButtonTextColor: '#4f46e5',
            secondaryButtonBorderColor: '#4f46e5',
            bgColor: '#f9fafb'
        }
    },
    {
        id: 'footer',
        type: 'footer',
        name: '页脚',
        props: {
            companyName: '您的公司名称',
            companyDescription: '提供优质的产品和服务',
            titleColor: '#333333',
            textColor: '#666666',
            linkTitleColor: '#333333',
            linkColor: '#666666',
            bottomBgColor: '#f3f4f6',
            copyrightText: '© 2023 您的公司名称。保留所有权利。',
            copyrightColor: '#666666',
            bgColor: '#ffffff',
            linkGroups: [
                {
                    title: '产品',
                    links: [
                        { text: '功能', url: '#' },
                        { text: '定价', url: '#' },
                        { text: '案例', url: '#' }
                    ]
                },
                {
                    title: '支持',
                    links: [
                        { text: '帮助中心', url: '#' },
                        { text: '联系我们', url: '#' }
                    ]
                }
            ]
        }
    },
    {
        id: 'team',
        type: 'team',
        name: '团队介绍',
        props: {
            title: '认识我们的团队',
            titleColor: '#333333',
            columns: 3,
            nameColor: '#333333',
            roleColor: '#666666',
            bioColor: '#666666',
            imageBgColor: '#e5e7eb',
            bgColor: '#ffffff',
            members: [
                { name: '张三', role: '首席执行官', initials: 'ZS', bio: '拥有10年行业经验' },
                { name: '李四', role: '首席设计师', initials: 'LS', bio: '设计思维倡导者' },
                { name: '王五', role: '技术总监', initials: 'WW', bio: '全栈开发专家' }
            ]
        }
    },
    {
        id: 'contact',
        type: 'contact',
        name: '联系我们',
        props: {
            title: '联系我们',
            titleColor: '#333333',
            infoTitleColor: '#333333',
            infoTextColor: '#666666',
            inputBorderColor: '#d1d5db',
            inputTextColor: '#333333',
            buttonBgColor: '#4f46e5',
            buttonTextColor: '#ffffff',
            bgColor: '#f9fafb',
            contactInfo: [
                { title: '地址', details: '北京市朝阳区某某大厦' },
                { title: '电话', details: '+86 123-4567-8900' },
                { title: '邮箱', details: 'contact@example.com' }
            ]
        }
    }
]);

// 克隆组件（确保每个拖拽的组件都是独立的）
const cloneComponent = (component) => {
    return JSON.parse(JSON.stringify({
        ...component,
        id: `${component.type}-${Date.now()}`
    }));
};

// 暴露组件数据和方法给父组件
defineExpose({
    webBlocks,
    cloneComponent
});
</script>

<style scoped>
.sidebar {
    width: 280px;
    background: white;
    border-right: 1px solid #e5e7eb;
    padding: 16px;
    overflow-y: auto;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e5e7eb;
}

.section-header h3 {
    font-size: 16px;
    font-weight: 600;
    color: #374151;
}

.library-category {
    margin-bottom: 24px;
}

.category-title {
    font-size: 14px;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.library-item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    margin-bottom: 8px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    cursor: grab;
    font-size: 14px;
    transition: all 0.2s;
}

.library-item:hover {
    border-color: #4f46e5;
    box-shadow: 0 2px 4px rgba(79, 70, 229, 0.1);
}

.item-icon {
    margin-right: 8px;
    color: #6b7280;
}
</style>