<template>
<div>
    <div class="flex container m-auto pt-20">
        <div class="w-1/5 bg-gray-400">
            <img class="w-full" :src="game.covers[0].url" v-if="gameDataIsLoaded" alt="Game Cover" />
        </div>
        <div class="w-3/5 bg-gray-500 ml-8" v-if="gameDataIsLoaded">
            <div class="text-6xl">{{ game.name }}</div>
            <div class="text-xl">Release Date: {{ game.first_release_date }}</div>
            <div class="text-base">{{ game.summary }}</div>
            <div v-for="(website, index) in game.websites" :website="website" :key="index"></div>
        </div>
        <div class="w-1/5 bg-gray-400"></div>
    </div>
    <div class="flex container m-auto pt-20">
        <ul class="flex border-b">
            <li class="-mb-px mr-1" :class="[image === 'screenshot' ? 'is-active bg-gray-200' : '']">
                <a class=" inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" @click="image = 'screenshot'">Screenshots</a>
            </li>
            <li class="-mb-px mr-1" :class="[image === 'artwork' ? 'is-active bg-gray-200' : '']">
                <a class=" inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" @click="image = 'artwork'">Artwork</a>
            </li>
            <li class="-mb-px mr-1" :class="[image === 'video' ? 'is-active bg-gray-200' : '']">
                <a class=" inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" @click="image = 'video'">Videos</a>
            </li>
        </ul>
    </div>
    <div class="image-content">
        <div class="flex container m-auto mb-20" v-show="image === 'screenshot'">
            <swiper v-if="gameDataIsLoaded" class="swiper" :options="swiperOption">
                <swiper-slide v-for="(screenshot, index) in game.screenshots" :screenshot="screenshot" :key="index">
                    <img class="m-auto swiper-lazy" :src="game.screenshots[index].url" alt="Game Screenshot" />
                </swiper-slide>
                <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
                <div class="swiper-pagination" slot="pagination"></div>
                <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
                <div class="swiper-button-prev" slot="button-prev"></div>
                <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
        <div class="flex container m-auto mb-20" v-show="image === 'artwork'">
            <swiper v-if="gameDataIsLoaded" class="swiper" :options="swiperOption">
                <swiper-slide v-for="(artwork, index) in game.artworks" :artwork="artwork" :key="index">
                    <img class="w-auto m-auto swiper-lazy" :src="game.artworks[index].url" alt="Game Artwork" />
                </swiper-slide>
                <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
                <div class="swiper-pagination" slot="pagination"></div>
                <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
                <div class="swiper-button-prev" slot="button-prev"></div>
                <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
        <div class="flex container m-auto mb-20" v-show="image === 'video'">
            <swiper v-if="gameDataIsLoaded" class="swiper" :options="swiperOption">
                <swiper-slide v-for="(video, index) in game.videos" :video="video" :key="index">
                    <vue-plyr class="swiper-no-swiping">
                        <div data-plyr-provider="youtube" :data-plyr-embed-id="game.videos[index].video_id"></div>
                    </vue-plyr>

                    <!-- <img class="w-full" :src="game.videos[index].video_id" alt="Game Video" />-->
                </swiper-slide>

                <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
                <div class="swiper-button-prev" slot="button-prev"></div>
                <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
    </div>
</div>
</template>

<script>
import GameDataService from "../services/GameDataService";
import AlbumDataService from "../services/AlbumDataService";
import {
    Swiper,
    SwiperSlide,
    directive
} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
    name: "Game",
    data: () => {
        return {
            game: {},
            albums: [],
            gameDataIsLoaded: false,
            albumDataIsLoaded: false,
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 30,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            },
            playerVars: {
                autoplay: 0,
            },
            image: "screenshot",
        };
    },
    directive: {
        swiper: directive,
    },
    components: {
        swiper: Swiper,
        "swiper-slide": SwiperSlide,
    },
    methods: {
        async loadGameData() {
            await GameDataService.get(this.$route.params.id)
                .then((response) => {
                    console.log(response.data);
                    this.game = response.data;
                    this.gameDataIsLoaded = true;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        async loadAlbumData() {
            this.game.albums.map(async (album) => {
                await AlbumDataService.get(album.id)
                    .then((response) => {
                        console.log(response.data);
                        this.albums.push(response);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
        },
    },
    async mounted() {
        await this.loadGameData();
        await this.loadAlbumData();
    },
};
</script>
