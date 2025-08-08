<template>
    <div class="page-404 h-screen w-screen p-8 md:p-32 flex justify-center items-center">
        <div class="bg-custom-amber rounded-full h-full w-full p-8 md:p-32 inset-shadow-deep border-amber">
            <div
                class="bg-custom-bronze rounded-full h-full w-full flex flex-col justify-center items-center gap-8 inset-shadow-deep border-bronze">
                <h1 class="text-custom-cream text-6xl md:text-9xl font-lostar text-center">404</h1>
                <button type="button"
                    class="bg-custom-cream text-custom-bronze px-6 py-3 rounded-full font-lostar text-lg md:text-xl hover:bg-custom-amber hover:text-custom-cream transition-colors duration-300"
                    @click="handleGoHome">
                    Back Home
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const handleGoHome = () => {
    clearError({ redirect: '/' });
};
</script>

<style scoped>
.page-404 * {
    cursor: default !important;
}

.inset-shadow-deep {
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(0, 0, 0, 0.15);
}

.border-amber {
    border: 3px solid rgba(0, 0, 0, 0.2);
}

.border-bronze {
    border: 3px solid rgba(0, 0, 0, 0.25);
}
</style>
