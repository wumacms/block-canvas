<template>
    <div class="team-block">
        <h2 :style="{ color: props.titleColor, textAlign: 'center' }">{{ props.title }}</h2>
        <div class="team-grid" :style="{ gridTemplateColumns: `repeat(${props.columns}, 1fr)` }">
            <div v-for="(member, index) in props.members" :key="index" class="team-member">
                <div class="member-image" :style="{ backgroundColor: props.imageBgColor }">
                    {{ member.initials }}
                </div>
                <h3 :style="{ color: props.nameColor }">{{ member.name }}</h3>
                <p :style="{ color: props.roleColor }">{{ member.role }}</p>
                <p :style="{ color: props.bioColor }">{{ member.bio }}</p>
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
</style>