<template>
    <div class="app">
        <!-- 左侧组件库 -->
        <ComponentLibrary />

        <!-- 中间画布 -->
        <div class="canvas-container">
            <div class="section-header">
                <h3>画布</h3>
                <div class="canvas-actions">
                    <button class="action-btn" title="清空画布" @click="clearCanvas">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 6V20H5V6H19ZM19 4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM10 11H8V18H10V11Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                    <button class="action-btn" title="导出配置" @click="exportConfig">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 16L16 11L13.5 11L13.5 8L10.5 8L10.5 11L8 11L12 16ZM19 4.5L19 19.5L5 19.5L5 4.5L19 4.5ZM19 3H5C3.9 3 3 3.9 3 5V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V5C21 3.9 20.1 3 19 3Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                    <!-- 新增导出HTML按钮 -->
                    <button class="action-btn" title="导出HTML" @click="exportHTML">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 3L10.35 4.65L16 10.3V22H8V10.3L3.65 5.95L2 7.6L12 17.6L22 7.6L20.35 5.95L14 12.3V2H12V3Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="canvas" @click="deselectBlock">
                <draggable v-model="canvasBlocks" group="blocks" item-key="id" @start="dragStart" @end="dragEnd">
                    <template #item="{ element }">
                        <div class="block" :class="{ selected: selectedBlock?.id === element.id }"
                            @click.stop="selectBlock(element)" :style="getBlockStyle(element)">

                            <!-- 网页区块组件 -->
                            <HeroBlock v-if="element.type === 'hero'" :props="element.props" />
                            <ImageTextBlock v-else-if="element.type === 'image-text'" :props="element.props" />
                            <FeaturesBlock v-else-if="element.type === 'features'" :props="element.props" />
                            <TestimonialsBlock v-else-if="element.type === 'testimonials'" :props="element.props" />
                            <PricingBlock v-else-if="element.type === 'pricing'" :props="element.props" />
                            <CTABlock v-else-if="element.type === 'cta'" :props="element.props" />
                            <FooterBlock v-else-if="element.type === 'footer'" :props="element.props" />
                            <TeamBlock v-else-if="element.type === 'team'" :props="element.props" />
                            <ContactBlock v-else-if="element.type === 'contact'" :props="element.props" />

                        </div>
                    </template>
                </draggable>
                <div v-if="canvasBlocks.length === 0" class="empty-canvas">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"
                            fill="#9CA3AF" />
                    </svg>
                    <p>从左侧拖拽组件到此处</p>
                </div>
            </div>
        </div>

        <!-- 右侧属性面板 -->
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

                <div class="property-group" v-for="(testimonial, index) in selectedBlock.props.testimonials"
                    :key="index">
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
                    <input type="color" v-model="selectedBlock.props.secondaryButtonBorderColor"
                        class="property-color" />
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
                <button class="danger-btn" @click="removeBlock">删除组件</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

// 导入组件
import ComponentLibrary from '@/components/sidebar/ComponentLibrary.vue';

import HeroBlock from '@/components/block/HeroBlock.vue';
import ImageTextBlock from '@/components/block/ImageTextBlock.vue';
import FeaturesBlock from '@/components/block/FeaturesBlock.vue';
import TestimonialsBlock from '@/components/block/TestimonialsBlock.vue';
import PricingBlock from '@/components/block/PricingBlock.vue';
import CTABlock from '@/components/block/CTABlock.vue';
import FooterBlock from '@/components/block/FooterBlock.vue';
import TeamBlock from '@/components/block/TeamBlock.vue';
import ContactBlock from '@/components/block/ContactBlock.vue';

// 画布上的组件
const canvasBlocks = ref([]);
const selectedBlock = ref(null);
const isDragging = ref(false);

// 克隆组件（确保每个拖拽的组件都是独立的）
const cloneComponent = (component) => {
    return JSON.parse(JSON.stringify({
        ...component,
        id: `${component.type}-${Date.now()}`
    }));
};

// 选择组件
const selectBlock = (block) => {
    selectedBlock.value = block;
};

// 取消选择组件
const deselectBlock = () => {
    if (!isDragging.value) {
        selectedBlock.value = null;
    }
};

// 删除组件
const removeBlock = () => {
    if (selectedBlock.value) {
        const index = canvasBlocks.value.findIndex(block => block.id === selectedBlock.value.id);
        if (index !== -1) {
            canvasBlocks.value.splice(index, 1);
            selectedBlock.value = null;
        }
    }
};

// 清空画布
const clearCanvas = () => {
    if (confirm('确定要清空画布吗？')) {
        canvasBlocks.value = [];
        selectedBlock.value = null;
    }
};

// 导出配置
const exportConfig = () => {
    const config = JSON.stringify(canvasBlocks.value, null, 2);
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-config.json';
    a.click();
    URL.revokeObjectURL(url);
};

// 导出HTML文件
const exportHTML = () => {
    if (canvasBlocks.value.length === 0) {
        alert('画布为空，无法导出HTML');
        return;
    }

    const htmlContent = generateHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    a.click();
    URL.revokeObjectURL(url);
};

// 生成HTML内容
const generateHTML = () => {
    const blocksHTML = canvasBlocks.value.map(block => {
        return generateBlockHTML(block);
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生成的网页</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .hero-block { text-align: center; padding: 60px 20px; }
        .image-text-block { display: flex; gap: 24px; padding: 40px 20px; }
        .image-text-block.text-left { flex-direction: row; }
        .image-text-block.text-right { flex-direction: row-reverse; }
        .image-text-block.text-top { flex-direction: column; }
        .text-content { flex: 1; }
        .image-placeholder { flex: 1; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 6px; }
        .features-block { padding: 60px 20px; }
        .features-grid { display: grid; gap: 24px; margin-top: 32px; }
        .feature-item { text-align: center; padding: 20px; }
        .testimonials-block { padding: 60px 20px; }
        .testimonials-grid { display: grid; gap: 24px; margin-top: 32px; }
        .testimonial-item { background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .pricing-block { padding: 60px 20px; }
        .pricing-grid { display: grid; gap: 24px; margin-top: 32px; }
        .pricing-plan { background: white; padding: 32px 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
        .cta-block { text-align: center; padding: 80px 40px; }
        .cta-buttons { display: flex; gap: 16px; justify-content: center; margin-top: 32px; }
        .footer-block { background: white; }
        .footer-content { display: flex; justify-content: space-between; padding: 40px; gap: 40px; }
        .footer-links { display: flex; gap: 40px; }
        .footer-bottom { padding: 20px 40px; text-align: center; }
        .team-block { padding: 60px 20px; }
        .team-grid { display: grid; gap: 24px; margin-top: 32px; }
        .team-member { text-align: center; padding: 24px; }
        .member-image { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-weight: bold; font-size: 1.5rem; }
        .contact-block { padding: 60px 20px; }
        .contact-content { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .contact-form { display: flex; flex-direction: column; gap: 16px; }
        .contact-form input, .contact-form textarea { padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; }
        button { padding: 12px 24px; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; transition: opacity 0.2s; }
        button:hover { opacity: 0.9; }
        @media (max-width: 768px) {
            .image-text-block { flex-direction: column; }
            .features-grid, .testimonials-grid, .pricing-grid, .team-grid { grid-template-columns: 1fr; }
            .cta-buttons { flex-direction: column; }
            .footer-content { flex-direction: column; }
            .footer-links { flex-direction: column; gap: 20px; }
            .contact-content { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    ${blocksHTML}
</body>
</html>`;
};

// 生成单个区块的HTML
const generateBlockHTML = (block) => {
    const style = `background-color: ${block.props.bgColor || 'transparent'};`;

    switch (block.type) {
        case 'hero':
            return `
    <div class="hero-block" style="${style}">
        <div class="container">
            <h1 style="color: ${block.props.titleColor}">${block.props.title}</h1>
            <p style="color: ${block.props.subtitleColor}">${block.props.subtitle}</p>
            <button style="background-color: ${block.props.buttonBgColor}; color: ${block.props.buttonTextColor}">
                ${block.props.buttonText}
            </button>
        </div>
    </div>`;

        case 'image-text':
            return `
    <div class="image-text-block ${block.props.layout}" style="${style}">
        <div class="container">
            <div class="text-content">
                <h2 style="color: ${block.props.titleColor}">${block.props.title}</h2>
                <p style="color: ${block.props.textColor}">${block.props.content}</p>
            </div>
            <div class="image-placeholder" style="background-color: ${block.props.imageBgColor}">
                ${block.props.imagePlaceholder}
            </div>
        </div>
    </div>`;

        case 'features':
            return `
    <div class="features-block" style="${style}">
        <div class="container">
            <h2 style="color: ${block.props.titleColor}; text-align: center">${block.props.title}</h2>
            <div class="features-grid" style="grid-template-columns: repeat(${block.props.columns}, 1fr)">
                ${block.props.features.map(feature => `
                <div class="feature-item">
                    <h3 style="color: ${block.props.featureTitleColor}">${feature.title}</h3>
                    <p style="color: ${block.props.featureTextColor}">${feature.description}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </div>`;

        case 'testimonials':
            return `
    <div class="testimonials-block" style="${style}">
        <div class="container">
            <h2 style="color: ${block.props.titleColor}; text-align: center">${block.props.title}</h2>
            <div class="testimonials-grid" style="grid-template-columns: repeat(${block.props.columns}, 1fr)">
                ${block.props.testimonials.map(testimonial => `
                <div class="testimonial-item">
                    <div class="testimonial-content">
                        <p style="color: ${block.props.textColor}">"${testimonial.content}"</p>
                    </div>
                    <div class="testimonial-author">
                        <h4 style="color: ${block.props.authorColor}">${testimonial.name}</h4>
                        <p style="color: ${block.props.roleColor}">${testimonial.role}</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </div>`;

        case 'pricing':
            return `
    <div class="pricing-block" style="${style}">
        <div class="container">
            <h2 style="color: ${block.props.titleColor}; text-align: center">${block.props.title}</h2>
            <div class="pricing-grid" style="grid-template-columns: repeat(${block.props.columns}, 1fr)">
                ${block.props.plans.map(plan => `
                <div class="pricing-plan">
                    <h3 style="color: ${block.props.planTitleColor}">${plan.name}</h3>
                    <div class="price" style="color: ${block.props.priceColor}">${plan.price}</div>
                    <ul class="features-list">
                        ${plan.features.map(feature => `
                        <li style="color: ${block.props.featureColor}">${feature}</li>
                        `).join('')}
                    </ul>
                    <button style="background-color: ${block.props.buttonBgColor}; color: ${block.props.buttonTextColor}">
                        ${plan.buttonText}
                    </button>
                </div>
                `).join('')}
            </div>
        </div>
    </div>`;

        case 'cta':
            return `
    <div class="cta-block" style="${style}">
        <div class="container">
            <h2 style="color: ${block.props.titleColor}">${block.props.title}</h2>
            <p style="color: ${block.props.textColor}">${block.props.content}</p>
            <div class="cta-buttons">
                <button style="background-color: ${block.props.primaryButtonBgColor}; color: ${block.props.primaryButtonTextColor}">
                    ${block.props.primaryButtonText}
                </button>
                <button style="background-color: ${block.props.secondaryButtonBgColor}; color: ${block.props.secondaryButtonTextColor}; border: 1px solid ${block.props.secondaryButtonBorderColor}">
                    ${block.props.secondaryButtonText}
                </button>
            </div>
        </div>
    </div>`;

        case 'footer':
            return `
    <div class="footer-block" style="${style}">
        <div class="footer-content">
            <div class="footer-section">
                <h3 style="color: ${block.props.titleColor}">${block.props.companyName}</h3>
                <p style="color: ${block.props.textColor}">${block.props.companyDescription}</p>
            </div>
            <div class="footer-links">
                ${block.props.linkGroups.map(linkGroup => `
                <div class="link-group">
                    <h4 style="color: ${block.props.linkTitleColor}">${linkGroup.title}</h4>
                    <ul>
                        ${linkGroup.links.map(link => `
                        <li><a href="${link.url}" style="color: ${block.props.linkColor}">${link.text}</a></li>
                        `).join('')}
                    </ul>
                </div>
                `).join('')}
            </div>
        </div>
        <div class="footer-bottom" style="background-color: ${block.props.bottomBgColor}">
            <p style="color: ${block.props.copyrightColor}">${block.props.copyrightText}</p>
        </div>
    </div>`;

        case 'team':
            return `
    <div class="team-block" style="${style}">
        <div class="container">
            <h2 style="color: ${block.props.titleColor}; text-align: center">${block.props.title}</h2>
            <div class="team-grid" style="grid-template-columns: repeat(${block.props.columns}, 1fr)">
                ${block.props.members.map(member => `
                <div class="team-member">
                    <div class="member-image" style="background-color: ${block.props.imageBgColor}">
                        ${member.initials}
                    </div>
                    <h3 style="color: ${block.props.nameColor}">${member.name}</h3>
                    <p style="color: ${block.props.roleColor}">${member.role}</p>
                    <p style="color: ${block.props.bioColor}">${member.bio}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </div>`;

        case 'contact':
            return `
    <div class="contact-block" style="${style}">
        <div class="container">
            <h2 style="color: ${block.props.titleColor}; text-align: center">${block.props.title}</h2>
            <div class="contact-content">
                <div class="contact-info">
                    ${block.props.contactInfo.map(info => `
                    <div class="info-item">
                        <h4 style="color: ${block.props.infoTitleColor}">${info.title}</h4>
                        <p style="color: ${block.props.infoTextColor}">${info.details}</p>
                    </div>
                    `).join('')}
                </div>
                <div class="contact-form">
                    <input type="text" placeholder="姓名" style="border: 1px solid ${block.props.inputBorderColor}; color: ${block.props.inputTextColor}">
                    <input type="email" placeholder="邮箱" style="border: 1px solid ${block.props.inputBorderColor}; color: ${block.props.inputTextColor}">
                    <textarea placeholder="消息" style="border: 1px solid ${block.props.inputBorderColor}; color: ${block.props.inputTextColor}"></textarea>
                    <button style="background-color: ${block.props.buttonBgColor}; color: ${block.props.buttonTextColor}">发送消息</button>
                </div>
            </div>
        </div>
    </div>`;

        default:
            return `
    <div class="block" style="${style}">
        <div class="container">
            <h3>${block.type} 区块</h3>
            <p>此区块类型暂不支持HTML导出预览</p>
        </div>
    </div>`;
    }
};

// 获取区块样式
const getBlockStyle = (element) => {
    return {
        backgroundColor: element.props.bgColor || 'transparent'
    };
};

// 拖拽开始
const dragStart = () => {
    isDragging.value = true;
};

// 拖拽结束
const dragEnd = () => {
    isDragging.value = false;
};

// 更新定价方案特性
const updatePlanFeatures = (index, featuresText) => {
    if (selectedBlock.value && selectedBlock.value.type === 'pricing') {
        selectedBlock.value.props.plans[index].features = featuresText.split('\n').filter(f => f.trim());
    }
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: #333;
    background-color: #f9fafb;
}

.app {
    display: flex;
    height: 100vh;
    overflow: hidden;
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

/* 画布样式 */
.canvas-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
    padding: 16px;
    overflow: hidden;
}

.canvas-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: white;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
}

.action-btn:hover {
    background: #f3f4f6;
    color: #374151;
}

.canvas {
    flex: 1;
    background: white;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    padding: 24px;
    overflow-y: auto;
    position: relative;
}

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

.block {
    position: relative;
    margin-bottom: 16px;
    padding: 20px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    transition: all 0.2s;
    cursor: pointer;
}

.block:hover {
    border-color: #4f46e5;
}

.block.selected {
    border: 2px solid #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* 右侧面板样式 */
.panel {
    width: 320px;
    background: white;
    border-left: 1px solid #e5e7eb;
    padding: 16px;
    overflow-y: auto;
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