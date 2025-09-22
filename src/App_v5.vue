<template>
    <div class="app">
        <!-- 左侧组件库 -->
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
                                <svg v-if="element.type === 'hero'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor"
                                        stroke-width="2" />
                                    <path d="M3 10h18M8 14h8" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                </svg>
                                <svg v-else-if="element.type === 'image-text'" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
                                        stroke-width="2" />
                                    <path d="M8 10h8M8 14h4M14 17v-6l3 3" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                </svg>
                                <svg v-else-if="element.type === 'features'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
                                        stroke-width="2" />
                                    <circle cx="8" cy="9" r="1" fill="currentColor" />
                                    <circle cx="16" cy="9" r="1" fill="currentColor" />
                                    <circle cx="12" cy="15" r="1" fill="currentColor" />
                                </svg>
                                <svg v-else-if="element.type === 'testimonials'" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <svg v-else-if="element.type === 'pricing'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L20 8.5V15.5L12 22L4 15.5V8.5L12 2Z" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 12.5L20 8.5" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 12.5V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M12 12.5L4 8.5" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <svg v-else-if="element.type === 'cta'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
                                        stroke-width="2" />
                                    <path d="M9 12h6m-3-3v6" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                </svg>
                                <svg v-else-if="element.type === 'footer'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"
                                        stroke-width="2" />
                                    <path d="M8 12h8M8 16h8M8 8h2" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" />
                                </svg>
                                <svg v-else-if="element.type === 'team'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <svg v-else-if="element.type === 'contact'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </span>
                            {{ element.name }}
                        </div>
                    </template>
                </draggable>
            </div>
        </div>

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
                            <!-- 网页区块渲染 -->
                            <div v-if="element.type === 'hero'" class="hero-block">
                                <h1 :style="{ color: element.props.titleColor }">{{ element.props.title }}</h1>
                                <p :style="{ color: element.props.subtitleColor }">{{ element.props.subtitle }}</p>
                                <button :style="{
                                    backgroundColor: element.props.buttonBgColor,
                                    color: element.props.buttonTextColor
                                }">{{ element.props.buttonText }}</button>
                            </div>

                            <div v-else-if="element.type === 'image-text'" class="image-text-block"
                                :class="element.props.layout">
                                <div class="text-content">
                                    <h2 :style="{ color: element.props.titleColor }">{{ element.props.title }}</h2>
                                    <p :style="{ color: element.props.textColor }">{{ element.props.content }}</p>
                                </div>
                                <div class="image-placeholder" :style="{ backgroundColor: element.props.imageBgColor }">
                                    {{ element.props.imagePlaceholder }}
                                </div>
                            </div>

                            <div v-else-if="element.type === 'features'" class="features-block">
                                <h2 :style="{ color: element.props.titleColor, textAlign: 'center' }">{{
                                    element.props.title }}</h2>
                                <div class="features-grid"
                                    :style="{ gridTemplateColumns: `repeat(${element.props.columns}, 1fr)` }">
                                    <div v-for="(feature, index) in element.props.features" :key="index"
                                        class="feature-item">
                                        <h3 :style="{ color: element.props.featureTitleColor }">{{ feature.title }}</h3>
                                        <p :style="{ color: element.props.featureTextColor }">{{ feature.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div v-else-if="element.type === 'testimonials'" class="testimonials-block">
                                <h2 :style="{ color: element.props.titleColor, textAlign: 'center' }">{{
                                    element.props.title }}</h2>
                                <div class="testimonials-grid"
                                    :style="{ gridTemplateColumns: `repeat(${element.props.columns}, 1fr)` }">
                                    <div v-for="(testimonial, index) in element.props.testimonials" :key="index"
                                        class="testimonial-item">
                                        <div class="testimonial-content">
                                            <p :style="{ color: element.props.textColor }">"{{ testimonial.content }}"
                                            </p>
                                        </div>
                                        <div class="testimonial-author">
                                            <h4 :style="{ color: element.props.authorColor }">{{ testimonial.name }}
                                            </h4>
                                            <p :style="{ color: element.props.roleColor }">{{ testimonial.role }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else-if="element.type === 'pricing'" class="pricing-block">
                                <h2 :style="{ color: element.props.titleColor, textAlign: 'center' }">{{
                                    element.props.title }}</h2>
                                <div class="pricing-grid"
                                    :style="{ gridTemplateColumns: `repeat(${element.props.columns}, 1fr)` }">
                                    <div v-for="(plan, index) in element.props.plans" :key="index" class="pricing-plan">
                                        <h3 :style="{ color: element.props.planTitleColor }">{{ plan.name }}</h3>
                                        <div class="price" :style="{ color: element.props.priceColor }">{{ plan.price }}
                                        </div>
                                        <ul class="features-list">
                                            <li v-for="(feature, fIndex) in plan.features" :key="fIndex"
                                                :style="{ color: element.props.featureColor }">{{ feature }}</li>
                                        </ul>
                                        <button :style="{
                                            backgroundColor: element.props.buttonBgColor,
                                            color: element.props.buttonTextColor
                                        }">{{ plan.buttonText }}</button>
                                    </div>
                                </div>
                            </div>

                            <div v-else-if="element.type === 'cta'" class="cta-block">
                                <h2 :style="{ color: element.props.titleColor }">{{ element.props.title }}</h2>
                                <p :style="{ color: element.props.textColor }">{{ element.props.content }}</p>
                                <div class="cta-buttons">
                                    <button :style="{
                                        backgroundColor: element.props.primaryButtonBgColor,
                                        color: element.props.primaryButtonTextColor
                                    }">{{ element.props.primaryButtonText }}</button>
                                    <button :style="{
                                        backgroundColor: element.props.secondaryButtonBgColor,
                                        color: element.props.secondaryButtonTextColor,
                                        border: `1px solid ${element.props.secondaryButtonBorderColor}`
                                    }">{{ element.props.secondaryButtonText }}</button>
                                </div>
                            </div>

                            <div v-else-if="element.type === 'footer'" class="footer-block">
                                <div class="footer-content">
                                    <div class="footer-section">
                                        <h3 :style="{ color: element.props.titleColor }">{{ element.props.companyName }}
                                        </h3>
                                        <p :style="{ color: element.props.textColor }">{{
                                            element.props.companyDescription }}</p>
                                    </div>
                                    <div class="footer-links">
                                        <div v-for="(linkGroup, index) in element.props.linkGroups" :key="index"
                                            class="link-group">
                                            <h4 :style="{ color: element.props.linkTitleColor }">{{ linkGroup.title }}
                                            </h4>
                                            <ul>
                                                <li v-for="(link, lIndex) in linkGroup.links" :key="lIndex">
                                                    <a :href="link.url" :style="{ color: element.props.linkColor }">{{
                                                        link.text }}</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer-bottom" :style="{ backgroundColor: element.props.bottomBgColor }">
                                    <p :style="{ color: element.props.copyrightColor }">{{ element.props.copyrightText
                                    }}</p>
                                </div>
                            </div>

                            <div v-else-if="element.type === 'team'" class="team-block">
                                <h2 :style="{ color: element.props.titleColor, textAlign: 'center' }">{{
                                    element.props.title }}</h2>
                                <div class="team-grid"
                                    :style="{ gridTemplateColumns: `repeat(${element.props.columns}, 1fr)` }">
                                    <div v-for="(member, index) in element.props.members" :key="index"
                                        class="team-member">
                                        <div class="member-image"
                                            :style="{ backgroundColor: element.props.imageBgColor }">
                                            {{ member.initials }}
                                        </div>
                                        <h3 :style="{ color: element.props.nameColor }">{{ member.name }}</h3>
                                        <p :style="{ color: element.props.roleColor }">{{ member.role }}</p>
                                        <p :style="{ color: element.props.bioColor }">{{ member.bio }}</p>
                                    </div>
                                </div>
                            </div>

                            <div v-else-if="element.type === 'contact'" class="contact-block">
                                <h2 :style="{ color: element.props.titleColor, textAlign: 'center' }">{{
                                    element.props.title }}</h2>
                                <div class="contact-content">
                                    <div class="contact-info">
                                        <div v-for="(info, index) in element.props.contactInfo" :key="index"
                                            class="info-item">
                                            <h4 :style="{ color: element.props.infoTitleColor }">{{ info.title }}</h4>
                                            <p :style="{ color: element.props.infoTextColor }">{{ info.details }}</p>
                                        </div>
                                    </div>
                                    <div class="contact-form">
                                        <input type="text" placeholder="姓名" :style="{
                                            border: `1px solid ${element.props.inputBorderColor}`,
                                            color: element.props.inputTextColor
                                        }">
                                        <input type="email" placeholder="邮箱" :style="{
                                            border: `1px solid ${element.props.inputBorderColor}`,
                                            color: element.props.inputTextColor
                                        }">
                                        <textarea placeholder="消息" :style="{
                                            border: `1px solid ${element.props.inputBorderColor}`,
                                            color: element.props.inputTextColor
                                        }"></textarea>
                                        <button :style="{
                                            backgroundColor: element.props.buttonBgColor,
                                            color: element.props.buttonTextColor
                                        }">发送消息</button>
                                    </div>
                                </div>
                            </div>
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

<script>
import { ref } from 'vue';
import draggable from 'vuedraggable';

export default {
    name: 'WebBuilder',
    components: {
        draggable
    },
    setup() {
        // 网页区块组件库
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

        return {
            webBlocks,
            canvasBlocks,
            selectedBlock,
            cloneComponent,
            selectBlock,
            deselectBlock,
            removeBlock,
            clearCanvas,
            exportConfig,
            exportHTML,
            getBlockStyle,
            dragStart,
            dragEnd,
            updatePlanFeatures
        };
    }
};
</script>

<style>
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

/* 侧边栏样式 */
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

/* 网页区块样式 */
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

.image-text-block {
    display: flex;
    gap: 24px;
    padding: 24px;
}

.image-text-block.text-left {
    flex-direction: row;
}

.image-text-block.text-right {
    flex-direction: row-reverse;
}

.image-text-block.text-top {
    flex-direction: column;
}

.text-content {
    flex: 1;
}

.text-content h2 {
    margin-bottom: 16px;
    font-size: 1.8rem;
}

.text-content p {
    line-height: 1.6;
    color: #666;
}

.image-placeholder {
    flex: 1;
    height: 200px;
    background: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    border-radius: 6px;
}

.features-block {
    padding: 40px 20px;
}

.features-block h2 {
    margin-bottom: 32px;
    font-size: 2rem;
}

.features-grid {
    display: grid;
    gap: 24px;
}

.feature-item {
    text-align: center;
    padding: 20px;
}

.feature-item h3 {
    margin-bottom: 12px;
    font-size: 1.3rem;
}

.feature-item p {
    color: #666;
    line-height: 1.6;
}

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

.pricing-block {
    padding: 40px 20px;
}

.pricing-block h2 {
    margin-bottom: 32px;
    font-size: 2rem;
}

.pricing-grid {
    display: grid;
    gap: 24px;
}

.pricing-plan {
    background: white;
    padding: 32px 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.pricing-plan h3 {
    margin-bottom: 16px;
    font-size: 1.5rem;
}

.price {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 24px;
}

.features-list {
    list-style: none;
    margin-bottom: 24px;
}

.features-list li {
    padding: 8px 0;
    border-bottom: 1px solid #e5e7eb;
}

.features-list li:last-child {
    border-bottom: none;
}

.pricing-plan button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
}

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

.team-block {
    padding: 40px 20px;
}

.team-block h2 {
    margin-bottom: 32px;
    font-size: 2rem;
}

.team-grid {
    display: grid;
    gap: 24px;
}

.team-member {
    text-align: center;
    padding: 24px;
}

.member-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    font-weight: bold;
    font-size: 1.5rem;
}

.team-member h3 {
    margin-bottom: 8px;
    font-size: 1.3rem;
}

.team-member p {
    color: #666;
    margin-bottom: 8px;
}

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