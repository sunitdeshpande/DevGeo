<template>
    <div
        jest="container"
        class="h-full">
        <loading-overlay v-if="!isloaded"></loading-overlay>
        <project-template>
            <template v-slot:controls>
                <div jest="controls-container" class="flex flex-col px-4">
                    <h1
                        jest="heading-by-project"
                        class="font-bold text-2xl mb-4 mt-0" >
                        Demographic of Contributors
                    </h1>
                    <app-select
                        :options="options"
                        :onChanged="onProjectChanged"
                        :selectedIndex="selectedIndex"></app-select>
                    <div v-if="selectedOption"
                        class="flex mt-4">
                        <img
                            :src="selectedOption.icon"
                            class="w-1/3"/>
                        <div class="flex flex-col px-4">
                            <h1 class="font-bold text-xl">{{ selectedOption.name }}</h1>
                            <a :href="selectedOption.url"
                                class="text-blue-600 underline break-all"
                                target="_blank">{{ selectedOption.url }}</a>
                            <p class="mt-4">{{ selectedOption.description }}</p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:map>
                <geo-heatmap
                    :countryData="countryData"></geo-heatmap>
            </template>
        </project-template>
    </div>
</template>

<script>
import { getProjectData } from '@/api/ProjectData';

import ProjectTemplate from '@/components/templates/ProjectTemplate.vue';
import AppSelect from '@/components/atoms/AppSelect.vue';
import LoadingOverlay from'@/components/atoms/LoadingOverlay.vue';
import GeoHeatmap from '@/components/atoms/GeoHeatmap.vue';

export default {
    name: 'project-page',

    components: {
        ProjectTemplate,
        AppSelect,
        LoadingOverlay,
        GeoHeatmap
    },

    data() {
        return {
            options: [],
            selectedIndex: null,
            selectedOption: null,
            countryData: null,
            isloaded: false,
            projects: null
        };
    },

    mounted: function(){
        // Get data
        getProjectData().then(data => {
            this.projects = data.projects;

            // Populate the options variable
            this.options = Object.keys(this.projects)
                        .sort()
                        .map((key) => ({ text: key, value: key }) );

            // Select the first index
            this.selectedIndex = 0;
            this.selectedOption = {
                ...this.projects[this.options[0].value],
                name: this.options[0]
            }

            // Disable loading
            this.isloaded = true;
        });
    },

    methods: {
        onProjectChanged(value){
            this.selectedOption = {
                ...this.projects[value],
                name: value
            }
            this.countryData = this.projects[value].data;
        }
    }
};
</script>
