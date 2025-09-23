<template>
    <div class="panel" v-if="selectedBlock">
        <div class="section-header">
            <h3>属性编辑</h3>
            <span class="component-type">{{ selectedBlock.type }}</span>
        </div>

        <!-- Hero区块属性 -->
        <div v-if="selectedBlock.type === 'hero'">
            <div class="property-group">
                <label class="property-label">主标题</label>
                <input type="text" v-model="selectedBlock.props.title" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">主标题颜色</label>
                <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">副标题</label>
                <input type="text" v-model="selectedBlock.props.subtitle" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">副标题颜色</label>
                <input type="color" v-model="selectedBlock.props.subtitleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">按钮文字</label>
                <input type="text" v-model="selectedBlock.props.buttonText" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">按钮背景色</label>
                <input type="color" v-model="selectedBlock.props.buttonBgColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">按钮文字颜色</label>
                <input type="color" v-model="selectedBlock.props.buttonTextColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">背景颜色</label>
                <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
            </div>
        </div>

        <!-- 图文区块属性 -->
        <div v-if="selectedBlock.type === 'image-text'">
            <div class="property-group">
                <label class="property-label">布局方式</label>
                <select v-model="selectedBlock.props.layout" class="property-select">
                    <option value="text-left">左文右图</option>
                    <option value="text-right">左图右文</option>
                    <option value="text-top">上文下图</option>
                </select>
            </div>
            <div class="property-group">
                <label class="property-label">标题</label>
                <input type="text" v-model="selectedBlock.props.title" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">标题颜色</label>
                <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">内容</label>
                <textarea v-model="selectedBlock.props.content" class="property-textarea" rows="3"></textarea>
            </div>
            <div class="property-group">
                <label class="property-label">内容颜色</label>
                <input type="color" v-model="selectedBlock.props.textColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">图片占位符文本</label>
                <input type="text" v-model="selectedBlock.props.imagePlaceholder" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">图片背景色</label>
                <input type="color" v-model="selectedBlock.props.imageBgColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">区块背景色</label>
                <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
            </div>
        </div>

        <!-- 核心特性区块属性 -->
        <div v-if="selectedBlock.type === 'features'">
            <div class="property-group">
                <label class="property-label">标题</label>
                <input type="text" v-model="selectedBlock.props.title" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">标题颜色</label>
                <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">列数</label>
                <select v-model="selectedBlock.props.columns" class="property-select">
                    <option value="2">2列</option>
                    <option value="3">3列</option>
                    <option value="4">4列</option>
                </select>
            </div>
            <div class="property-group">
                <label class="property-label">特性标题颜色</label>
                <input type="color" v-model="selectedBlock.props.featureTitleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">特性描述颜色</label>
                <input type="color" v-model="selectedBlock.props.featureTextColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">区块背景色</label>
                <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
            </div>

            <div class="property-group" v-for="(feature, index) in selectedBlock.props.features" :key="index">
                <label class="property-label">特性 {{ index + 1 }}</label>
                <input type="text" v-model="feature.title" class="property-input" placeholder="特性标题" />
                <textarea v-model="feature.description" class="property-textarea" rows="2"
                    placeholder="特性描述"></textarea>
            </div>
        </div>

        <!-- 客户评价区块属性 -->
        <div v-if="selectedBlock.type === 'testimonials'">
            <div class="property-group">
                <label class="property-label">标题</label>
                <input type="text" v-model="selectedBlock.props.title" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">标题颜色</label>
                <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">列数</label>
                <select v-model="selectedBlock.props.columns" class="property-select">
                    <option value="2">2列</option>
                    <option value="3">3列</option>
                    <option value="4">4列</option>
                </select>
            </div>
            <div class="property-group">
                <label class="property-label">文本颜色</label>
                <input type="color" v-model="selectedBlock.props.textColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">作者名称颜色</label>
                <input type="color" v-model="selectedBlock.props.authorColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">作者职位颜色</label>
                <input type="color" v-model="selectedBlock.props.roleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">区块背景色</label>
                <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
            </div>

            <div class="property-group" v-for="(testimonial, index) in selectedBlock.props.testimonials" :key="index">
                <label class="property-label">评价 {{ index + 1 }}</label>
                <input type="text" v-model="testimonial.name" class="property-input" placeholder="评价者姓名" />
                <input type="text" v-model="testimonial.role" class="property-input" placeholder="评价者职位" />
                <textarea v-model="testimonial.content" class="property-textarea" rows="2"
                    placeholder="评价内容"></textarea>
            </div>
        </div>

        <!-- 定价区块属性 -->
        <div v-if="selectedBlock.type === 'pricing'">
            <div class="property-group">
                <label class="property-label">标题</label>
                <input type="text" v-model="selectedBlock.props.title" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">标题颜色</label>
                <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">列数</label>
                <select v-model="selectedBlock.props.columns" class="property-select">
                    <option value="2">2列</option>
                    <option value="3">3列</option>
                    <option value="4">4列</option>
                </select>
            </div>
            <div class="property-group">
                <label class="property-label">方案标题颜色</label>
                <input type="color" v-model="selectedBlock.props.planTitleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">价格颜色</label>
                <input type="color" v-model="selectedBlock.props.priceColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">特性颜色</label>
                <input type="color" v-model="selectedBlock.props.featureColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">按钮背景色</label>
                <input type="color" v-model="selectedBlock.props.buttonBgColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">按钮文字颜色</label>
                <input type="color" v-model="selectedBlock.props.buttonTextColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">区块背景色</label>
                <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
            </div>

            <div class="property-group" v-for="(plan, index) in selectedBlock.props.plans" :key="index">
                <label class="property-label">方案 {{ index + 1 }}</label>
                <input type="text" v-model="plan.name" class="property-input" placeholder="方案名称" />
                <input type="text" v-model="plan.price" class="property-input" placeholder="价格" />
                <input type="text" v-model="plan.buttonText" class="property-input" placeholder="按钮文字" />
                <div class="property-group">
                    <label class="property-label">特性列表 (每行一个特性)</label>
                    <textarea v-model="plan.featuresText" class="property-textarea" rows="3"
                        @change="updatePlanFeatures(index, plan.featuresText)"></textarea>
                </div>
            </div>
        </div>

        <!-- CTA区块属性 -->
        <div v-if="selectedBlock.type === 'cta'">
            <div class="property-group">
                <label class="property-label">标题</label>
                <input type="text" v-model="selectedBlock.props.title" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">标题颜色</label>
                <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">内容</label>
                <textarea v-model="selectedBlock.props.content" class="property-textarea" rows="3"></textarea>
            </div>
            <div class="property-group">
                <label class="property-label">内容颜色</label>
                <input type="color" v-model="selectedBlock.props.textColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">主按钮文字</label>
                <input type="text" v-model="selectedBlock.props.primaryButtonText" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">主按钮背景色</label>
                <input type="color" v-model="selectedBlock.props.primaryButtonBgColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">主按钮文字颜色</label>
                <input type="color" v-model="selectedBlock.props.primaryButtonTextColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">次按钮文字</label>
                <input type="text" v-model="selectedBlock.props.secondaryButtonText" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">次按钮背景色</label>
                <input type="color" v-model="selectedBlock.props.secondaryButtonBgColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">次按钮文字颜色</label>
                <input type="color" v-model="selectedBlock.props.secondaryButtonTextColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">次按钮边框颜色</label>
                <input type="color" v-model="selectedBlock.props.secondaryButtonBorderColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">区块背景色</label>
                <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
            </div>
        </div>

        <!-- 页脚区块属性 -->
        <div v-if="selectedBlock.type === 'footer'">
            <div class="property-group">
                <label class="property-label">公司名称</label>
                <input type="text" v-model="selectedBlock.props.companyName" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">公司描述</label>
                <textarea v-model="selectedBlock.props.companyDescription" class="property-textarea"
                    rows="2"></textarea>
            </div>
            <div class="property-group">
                <label class="property-label">标题颜色</label>
                <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">文本颜色</label>
                <input type="color" v-model="selectedBlock.props.textColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">链接标题颜色</label>
                <input type="color" v-model="selectedBlock.props.linkTitleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">链接颜色</label>
                <input type="color" v-model="selectedBlock.props.linkColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">底部背景色</label>
                <input type="color" v-model="selectedBlock.props.bottomBgColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">版权文本</label>
                <input type="text" v-model="selectedBlock.props.copyrightText" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">版权文本颜色</label>
                <input type="color" v-model="selectedBlock.props.copyrightColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">区块背景色</label>
                <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
            </div>

            <div class="property-group" v-for="(linkGroup, index) in selectedBlock.props.linkGroups" :key="index">
                <label class="property-label">链接组 {{ index + 1 }}</label>
                <input type="text" v-model="linkGroup.title" class="property-input" placeholder="链接组标题" />
                <div class="property-group" v-for="(link, lIndex) in linkGroup.links" :key="lIndex">
                    <input type="text" v-model="link.text" class="property-input" placeholder="链接文本" />
                    <input type="text" v-model="link.url" class="property-input" placeholder="链接URL" />
                </div>
            </div>
        </div>

        <!-- 团队区块属性 -->
        <div v-if="selectedBlock.type === 'team'">
            <div class="property-group">
                <label class="property-label">标题</label>
                <input type="text" v-model="selectedBlock.props.title" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">标题颜色</label>
                <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">列数</label>
                <select v-model="selectedBlock.props.columns" class="property-select">
                    <option value="2">2列</option>
                    <option value="3">3列</option>
                    <option value="4">4列</option>
                </select>
            </div>
            <div class="property-group">
                <label class="property-label">姓名颜色</label>
                <input type="color" v-model="selectedBlock.props.nameColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">职位颜色</label>
                <input type="color" v-model="selectedBlock.props.roleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">简介颜色</label>
                <input type="color" v-model="selectedBlock.props.bioColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">图片背景色</label>
                <input type="color" v-model="selectedBlock.props.imageBgColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">区块背景色</label>
                <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
            </div>

            <div class="property-group" v-for="(member, index) in selectedBlock.props.members" :key="index">
                <label class="property-label">成员 {{ index + 1 }}</label>
                <input type="text" v-model="member.name" class="property-input" placeholder="成员姓名" />
                <input type="text" v-model="member.role" class="property-input" placeholder="成员职位" />
                <input type="text" v-model="member.initials" class="property-input" placeholder="姓名首字母" />
                <textarea v-model="member.bio" class="property-textarea" rows="2" placeholder="成员简介"></textarea>
            </div>
        </div>

        <!-- 联系区块属性 -->
        <div v-if="selectedBlock.type === 'contact'">
            <div class="property-group">
                <label class="property-label">标题</label>
                <input type="text" v-model="selectedBlock.props.title" class="property-input" />
            </div>
            <div class="property-group">
                <label class="property-label">标题颜色</label>
                <input type="color" v-model="selectedBlock.props.titleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">信息标题颜色</label>
                <input type="color" v-model="selectedBlock.props.infoTitleColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">信息文本颜色</label>
                <input type="color" v-model="selectedBlock.props.infoTextColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">输入框边框颜色</label>
                <input type="color" v-model="selectedBlock.props.inputBorderColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">输入框文字颜色</label>
                <input type="color" v-model="selectedBlock.props.inputTextColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">按钮背景色</label>
                <input type="color" v-model="selectedBlock.props.buttonBgColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">按钮文字颜色</label>
                <input type="color" v-model="selectedBlock.props.buttonTextColor" class="property-color" />
            </div>
            <div class="property-group">
                <label class="property-label">区块背景色</label>
                <input type="color" v-model="selectedBlock.props.bgColor" class="property-color" />
            </div>

            <div class="property-group" v-for="(info, index) in selectedBlock.props.contactInfo" :key="index">
                <label class="property-label">联系信息 {{ index + 1 }}</label>
                <input type="text" v-model="info.title" class="property-input" placeholder="信息标题" />
                <textarea v-model="info.details" class="property-textarea" rows="2" placeholder="详细信息"></textarea>
            </div>
        </div>

        <div class="property-actions">
            <button class="danger-btn" @click="$emit('removeBlock')">删除组件</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    selectedBlock: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['removeBlock', 'updatePlanFeatures']);

// 更新定价方案特性
const updatePlanFeatures = (index, featuresText) => {
    // 可选：添加验证逻辑
    if (!props.selectedBlock || props.selectedBlock.type !== 'pricing') {
        console.warn('当前选中的区块不是定价区块');
        return;
    }

    emit('updatePlanFeatures', { index, featuresText });
};

// 删除区块
const removeBlock = () => {
    emit('removeBlock');
};
</script>

<style scoped>
.panel {
    width: 320px;
    background: white;
    border-left: 1px solid #e5e7eb;
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

.component-type {
    font-size: 12px;
    color: #6b7280;
    background: #f3f4f6;
    padding: 4px 8px;
    border-radius: 4px;
}

.property-group {
    margin-bottom: 16px;
}

.property-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
}

.property-input,
.property-select,
.property-textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s;
}

.property-input:focus,
.property-select:focus,
.property-textarea:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.property-color {
    width: 100%;
    height: 40px;
    padding: 4px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
}

.property-actions {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
}

.danger-btn {
    width: 100%;
    padding: 10px 16px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.danger-btn:hover {
    background: #dc2626;
}
</style>