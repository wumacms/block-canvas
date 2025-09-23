import HeroBlock from '@/components/block/HeroBlock.vue';
import ImageTextBlock from '@/components/block/ImageTextBlock.vue';
import FeaturesBlock from '@/components/block/FeaturesBlock.vue';
import TestimonialsBlock from '@/components/block/TestimonialsBlock.vue';
import PricingBlock from '@/components/block/PricingBlock.vue';
import CTABlock from '@/components/block/CTABlock.vue';
import FooterBlock from '@/components/block/FooterBlock.vue';
import TeamBlock from '@/components/block/TeamBlock.vue';
import ContactBlock from '@/components/block/ContactBlock.vue';

// 将区块组件映射到对应的标识符
export const blockComponents = {
    hero: HeroBlock,
    'image-text': ImageTextBlock,
    features: FeaturesBlock,
    testimonials: TestimonialsBlock,
    pricing: PricingBlock,
    cta: CTABlock,
    footer: FooterBlock,
    team: TeamBlock,
    contact: ContactBlock
};