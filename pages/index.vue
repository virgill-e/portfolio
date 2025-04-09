<template>
    <!-- main screen -->
    <!-- computer screen-->
    <div class="hidden md:flex h-screen justify-center items-center">
        <div id="container-customs-blocs" class="w-full h-4/5 grid grid-rows-3">
            <div id="fist-row" class="grid grid-cols-3 gap-4 m-4">
                <CustomBlock 
                    bgColor="bg-instagram-gradient" 
                    textColor="text-white" 
                    :svgContent='instagramSvg'
                    link="https://www.instagram.com/virgill_e/"
                    :isExternal="true" 
                />
                <CustomBlock 
                    bgColor="bg-linkedin-blue" 
                    textColor="text-white" 
                    :svgContent='linkedinSvg'
                    link="https://www.linkedin.com/in/virgile-bigar%C3%A9/" 
                    :isExternal="true" 
                />                              
                <CustomBlock 
                    bgColor="bg-discord-purple" 
                    textColor="text-white" 
                    :svgContent="discordSvg"
                    link="https://discordapp.com/users/216953621848260608"
                    :isExternal="true" 
                />
            </div>

            <div id="second-row" class="grid grid-cols-3 gap-4 m-4">
                <CustomBlock 
                    bgColor="bg-custom-amber" 
                    textColor="text-white" 
                    :svgContent='projectsSvg'
                    link="#projects" 
                />

                <div class="flex items-center justify-center h-full overflow-hidden">
                    <span
                        class="font-lostar text-custom-bronze text-center w-full text-5xl lg:text-6xl xl:text-8xl truncate">Virgill_e</span>
                </div>
                <CustomBlock 
                    bgColor="bg-custom-olive" 
                    textColor="text-white" 
                    :svgContent='cvSvg'
                    link="cv.pdf" 
                    isExternal="true"
                />
            </div>

            <div id="third-row" class="grid grid-cols-3 gap-4 m-4">
                <CustomBlock 
                    bgColor="bg-github-grey" 
                    textColor="text-white" 
                    :svgContent='githubSvg'
                    link="https://github.com/Virgill-e"
                    :isExternal="true" 
                />  
                <CustomBlock 
                    bgColor="bg-black" 
                    textColor="text-white" 
                    :svgContent='xSvg'
                    link="https://x.com/Virgill_e"
                    :isExternal="true" 
                />
                <CustomBlock 
                    bgColor="bg-mail-blue" 
                    textColor="text-white" 
                    :svgContent='mailSvg'
                    link="mailto:virgile.bigare@gmail.com"
                    :isExternal="true" 
                />        
            </div>
        </div>
    </div>

    <!-- mobile screen -->
    <div class="md:hidden flex h-screen justify-center items-center p-16">
        <div id="container-customs-blocs-mobile" class="w-full h-full grid grid-rows-5 gap-4 ">
            <!-- Première rangée: 2 éléments -->
            <div class="grid grid-cols-2 gap-4">
                <CustomBlock 
                    bgColor="bg-instagram-gradient" 
                    textColor="text-white" 
                    :svgContent='instagramSvg'
                    link="https://www.instagram.com/virgilledev/"
                    :isExternal="true" 
                />
                <CustomBlock 
                    bgColor="bg-linkedin-blue" 
                    textColor="text-white" 
                    :svgContent='linkedinSvg'
                    link="https://www.linkedin.com/in/virgile-bigaré-9b3635265/"
                    :isExternal="true" 
                />
            </div>

            <!-- Deuxième rangée: 2 éléments -->
            <div class="grid grid-cols-2 gap-4">
                <CustomBlock 
                    bgColor="bg-discord-purple" 
                    textColor="text-white" 
                    :svgContent="discordSvg"
                    link="https://discord.com/users/virgill_e"
                    :isExternal="true" 
                />
                <CustomBlock 
                    bgColor="bg-github-grey" 
                    textColor="text-white" 
                    :svgContent='githubSvg'
                    link="https://github.com/Virgill96"
                    :isExternal="true" 
                />
            </div>

            <!-- Troisième rangée: 1 élément (nom) -->
            <div class="flex items-center justify-center overflow-hidden">
                <span
                    class="font-lostar text-custom-bronze text-center w-full lg:text-2xl xl:text-3xl text-5xl truncate">Virgill_e</span>
            </div>

            <!-- Quatrième rangée: 2 éléments -->
            <div class="grid grid-cols-2 gap-4">
                <CustomBlock 
                    bgColor="bg-black" 
                    textColor="text-white" 
                    :svgContent='xSvg'
                    link="https://twitter.com/Virgill_e"
                    :isExternal="true" 
                />
                <CustomBlock 
                    bgColor="bg-mail-blue" 
                    textColor="text-white" 
                    :svgContent='mailSvg'
                    link="mailto:virgile.bigare@gmail.com"
                    :isExternal="true" 
                />
            </div>

            <!-- Cinquième rangée: 2 éléments -->
            <div class="grid grid-cols-2 gap-4">
                <CustomBlock 
                    bgColor="bg-custom-olive" 
                    textColor="text-white" 
                    :svgContent='cvSvg'
                    link="/cv" 
                />
                <CustomBlock 
                    bgColor="bg-custom-amber" 
                    textColor="text-white" 
                    :svgContent='projectsSvg'
                    link="#projects" 
                />
            </div>
        </div>
    </div>

    <!-- About me -->
    <div id="about" class="flex flex-col items-center center min-h-screen">
        <h2 class="font-lostar text-custom-bronze text-6xl lg:text-8xl m-4">About me</h2>
        <p
            class="text-custom-forest leading-relaxed text-left mb-6 lg:w-7/12 mx-8 font-neuemontreal text-2xl lg:text-3xl ">
            Bonjour, je suis Virgile Bigaré, un développeur passionné par la création d'applications web et mobiles. Ma passion pour le code a commencé dès mes premieres année d'étude en transition informatique, et depuis, je n'ai jamais cessé d'explorer cet univers en constante évolution.
        </p>
        <p
            class="text-custom-forest leading-relaxed text-left mb-6 lg:w-7/12 mx-8 font-neuemontreal text-2xl lg:text-3xl ">
            Actuellement en dernière année de bachelier en développement d'applications à Helmo, j'ai acquis une solide expérience en tant que développeur full stack. Mon parcours académique m'a permis de maîtriser diverses technologies front-end et back-end, tout en développant une approche méthodique face aux défis techniques qui se présentent dans le développement de solutions digitales.
        </p>
        <p
            class="text-custom-forest leading-relaxed text-left mb-6 lg:w-7/12 mx-8 font-neuemontreal text-2xl lg:text-3xl ">
            Ce qui me distingue, c'est ma volonté d'apprentissage et ma curiosité. Je consacre une partie de mon temps libre à explorer pour des projets perso. J'aime me lancer dans des aventures qui me poussent hors de ma zone de confort et enrichissent constamment mes compétences.
        </p>
    </div>

    <!--Projects-->
    <div id="projects" class="flex flex-col items-center center min-h-screen p-8">
        <h2 class="font-lostar text-custom-bronze text-6xl lg:text-8xl m-4">Projects</h2>

        <div class="w-full max-w-5xl">
            <ProjectCard title="ArtConnect" year="2024" :tags="['Vue', 'ASP.NET']" :descriptions="[
                'Pour un projet scolaire j\'ai du développer une application web dans le framework web ainsi que dans la technologie back de mon choix.',
                'ArtConnect est une application web dédiée à la promotion des artistes émergents et de leurs œuvres. Cette plateforme sert de vitrine pour les artistes, leur permettant de partager leurs créations, d\'interagir avec des amateurs d\'art, et de vendre leurs œuvres en ligne.'
            ]" :image="artConnectImage" />


            <ProjectCard title="Math project" year="2023" :tags="['Java', 'Gradle', 'JGraphT']" :descriptions="[
                'Trois projets réalisés dans le cadre de mon cours de mathématiques : LexicographicTree, Boggle, et DictionaryBasedAnalysis. Chaque projet démontre l\'importance des structures de données et de l\'efficacité algorithmique dans le traitement de grandes quantités de données.',
                'LexicographicTree consiste en la création d\'une structure de données arborescente permettant de stocker et manipuler des mots de manière efficace.',
                'Boggle consiste à trouver un maximum de mots dans une grille de lettres en suivant des règles spécifiques de déplacement. Il utilise l\'arbre lexicographique du projet précédent pour vérifier rapidement la validité des mots trouvés.',
                'DictionaryBasedAnalysis se concentre sur l\'analyse cryptographique basée sur un dictionnaire. Il vise à décoder un texte chiffré à l\'aide d\'un dictionnaire de mots et d\'une technique de substitution alphabétique.'
            ]" :image="mathProjectImage" />

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

import mathProjectImage from '@/assets/images/projects/projet_math.webp';
import artConnectImage from '@/assets/images/projects/artConnect_project.webp'
</script>
