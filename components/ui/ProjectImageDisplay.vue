<template>
    <div class="flex flex-row h-full overflow-hidden">
        <div class="w-2/3 pr-8 rounded-lg h-full">
            <img :src="mainImage" :alt="projectName"
                class="h-full object-contain transition-transform duration-300 ease-in-out hover:scale-105 shadow-xl rounded-lg">
        </div>
        <div class="w-1/3 pl-8 h-full flex flex-col">
            <div class="rounded-lg pb-4 md:pb-8 flex-1 overflow-hidden">
                <img :src="secondaryImage" :alt="projectName"
                    class="h-full object-contain object-top transition-transform duration-300 ease-in-out hover:scale-105 shadow-xl rounded-lg">
            </div>
            <span class="text-sm font-medium">{{ projectName }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    projectName: string
    mainImage: string
    secondaryImage: string
}

defineProps<Props>()
</script>
