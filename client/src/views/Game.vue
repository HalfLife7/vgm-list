<template>
<div>
    <div class="flex container m-auto pt-20">
        <div class="w-1/5 bg-gray-400">
            <img class="w-full p-8" :src="game.covers[0].url" v-if="gameDataIsLoaded" alt="Game Cover" />
        </div>
        <div class="w-3/5 bg-gray-500" v-if="gameDataIsLoaded">
            <div class="text-6xl">{{ game.name }}</div>
            <div class="text-xl">Release Date: {{ game.first_release_date }}</div>
            <div class="text-base">{{ game.summary }}</div>
        </div>
        <div class="w-1/5 bg-gray-400"></div>
    </div>
    <div class="flex container m-auto mb-20" v-if="gameDataIsLoaded">
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(screenshot, index) in game.screenshots" :screenshot="screenshot" :key="index">
                <img class="w-full" :src="game.screenshots[index].url" alt="Game Screenshot" />
            </swiper-slide>
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
            <div class="swiper-pagination" slot="pagination"></div>
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
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
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            },
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
