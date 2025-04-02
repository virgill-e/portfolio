<template>
    <!-- main screen -->
    <!-- computer screen-->
    <div class="hidden md:flex h-screen justify-center items-center">
        <div id="container-customs-blocs" class="w-full h-4/5 grid grid-rows-3">
            <div id="fist-row" class="grid grid-cols-3 gap-4 m-4">
                <CustomBlock bgColor="bg-instagram-gradient" textColor="text-white" :svgContent='instagramSvg' />
                <CustomBlock bgColor="bg-linkedin-blue" textColor="text-white" :svgContent='linkedinSvg' />
                <CustomBlock bgColor="bg-discord-purple" textColor="text-white" :svgContent="discordSvg" />
            </div>

            <div id="second-row" class="grid grid-cols-3 gap-4 m-4">
                <CustomBlock bgColor="bg-custom-amber" textColor="text-white" :svgContent='projectsSvg' />

                <div class="flex items-center justify-center h-full overflow-hidden">
                    <span
                        class="font-lostar text-custom-bronze text-center w-full text-5xl lg:text-6xl xl:text-8xl truncate">Virgill_e</span>
                </div>
                <CustomBlock bgColor="bg-custom-olive" textColor="text-white" :svgContent='cvSvg' />
            </div>

            <div id="third-row" class="grid grid-cols-3 gap-4 m-4">
                <CustomBlock bgColor="bg-github-grey" textColor="text-white" :svgContent='githubSvg' />
                <CustomBlock bgColor="bg-black" textColor="text-white" :svgContent='xSvg' />
                <CustomBlock bgColor="bg-mail-blue" textColor="text-white" :svgContent='mailSvg' />
            </div>
        </div>


    </div>

    <!-- mobile screen -->
    <div class="md:hidden flex h-screen justify-center items-center p-16">
        <div id="container-customs-blocs-mobile" class="w-full h-full grid grid-rows-5 gap-4 ">
            <!-- Première rangée: 2 éléments -->
            <div class="grid grid-cols-2 gap-4">
                <CustomBlock bgColor="bg-instagram-gradient" textColor="text-white" :svgContent='instagramSvg' />
                <CustomBlock bgColor="bg-linkedin-blue" textColor="text-white" :svgContent='linkedinSvg' />
            </div>

            <!-- Deuxième rangée: 2 éléments -->
            <div class="grid grid-cols-2 gap-4">
                <CustomBlock bgColor="bg-discord-purple" textColor="text-white" :svgContent="discordSvg" />
                <CustomBlock bgColor="bg-github-grey" textColor="text-white" :svgContent='githubSvg' />

            </div>

            <!-- Troisième rangée: 1 élément (nom) -->
            <div class="flex items-center justify-center overflow-hidden">
                <span
                    class="font-lostar text-custom-bronze text-center w-full lg:text-2xl xl:text-3xl text-5xl truncate">Virgill_e</span>
            </div>

            <!-- Quatrième rangée: 2 éléments -->
            <div class="grid grid-cols-2 gap-4">
                <CustomBlock bgColor="bg-black" textColor="text-white" :svgContent='xSvg' />
                <CustomBlock bgColor="bg-mail-blue" textColor="text-white" :svgContent='mailSvg' />
            </div>

            <!-- Cinquième rangée: 2 éléments -->
            <div class="grid grid-cols-2 gap-4">
                <CustomBlock bgColor="bg-custom-olive" textColor="text-white" :svgContent='cvSvg' />
                <CustomBlock bgColor="bg-custom-amber" textColor="text-white" :svgContent='projectsSvg' />

            </div>



        </div>
    </div>

    <!-- About me -->
    <div class="flex flex-col items-center center min-h-screen">
        <h2 class="font-lostar text-custom-bronze text-6xl lg:text-8xl m-4">About me</h2>
        <p class="text-custom-forest leading-relaxed text-left mb-6 lg:w-7/12 mx-8 font-neuemontreal text-2xl lg:text-3xl ">
            JE DOIS AMELIORER MON TEXTE ! Bonjour, je suis un développeur passionné, actuellement étudiant en développement d'applications à HELMo.
            Mon parcours est guidé par une curiosité constante pour les nouvelles technologies et une volonté
            d'apprendre et d'innover dans le domaine du développement logiciel.
        </p>
    </div>

    <!--Projects-->
    <div class="flex flex-col items-center center min-h-screen p-8">
        <h2 class="font-lostar text-custom-bronze text-6xl lg:text-8xl m-4">Projects</h2>
        
        <div class="w-full max-w-5xl">
            <ProjectCard 
                title="Project 1"
                year="2022"
                :tags="['Vue', 'JavaScript', 'Tailwind CSS']"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl."
                :image="testImage"
                />

                <ProjectCard 
                title="Project 1"
                year="2022"
                :tags="['Vue', 'JavaScript', 'Tailwind CSS']"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl."
                :image="testImage"
                />

            
            <!-- Vous pouvez ajouter plus de projets ici -->
        </div>
    </div>

</template>

<script setup>
import instagramSvg from '@/assets/svg/instagram.svg?raw';
import linkedinSvg from '@/assets/svg/linkedin.svg?raw';
import discordSvg from '@/assets/svg/discord.svg?raw';
import githubSvg from '@/assets/svg/github.svg?raw';
import xSvg from '@/assets/svg/x.svg?raw';
import mailSvg from '@/assets/svg/mail.svg?raw';
import cvSvg from '@/assets/svg/cv.svg?raw';
import projectsSvg from '@/assets/svg/project.svg?raw';

import testImage from '@/assets/images/projects/test.png'; // Importez votre image
</script>
