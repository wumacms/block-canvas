// htmlExporter.js - 独立的HTML导出模块

// 生成HTML内容
export const generateHTML = (canvasBlocks) => {
    if (!canvasBlocks || canvasBlocks.length === 0) {
        return '<!DOCTYPE html><html><body><p>画布为空</p></body></html>';
    }

    const blocksHTML = canvasBlocks.map(block => {
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

// 导出HTML文件
export const exportHTMLFile = (canvasBlocks, filename = 'website.html') => {
    console.log('导出HTML文件', canvasBlocks.length);

    if (!canvasBlocks || canvasBlocks.length === 0) {
        alert('画布为空，无法导出HTML');
        return false;
    }

    try {
        const htmlContent = generateHTML(canvasBlocks);
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        return true;
    } catch (error) {
        console.error('导出HTML失败:', error);
        alert('导出HTML失败，请重试');
        return false;
    }
};

// 预览HTML（在新窗口打开）
export const previewHTML = (canvasBlocks) => {
    console.log('预览HTML', canvasBlocks.length);
    if (!canvasBlocks || canvasBlocks.length === 0) {
        alert('画布为空，无法预览');
        return false;
    }

    try {
        const htmlContent = generateHTML(canvasBlocks);
        const previewWindow = window.open('', '_blank');
        //previewWindow.document.write(htmlContent);
        previewWindow.document.writeln(htmlContent);
        previewWindow.document.close();
        return true;
    } catch (error) {
        console.error('预览HTML失败:', error);
        alert('预览HTML失败，请重试');
        return false;
    }
};