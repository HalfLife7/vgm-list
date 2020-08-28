<template>
<div>
    <div class="flex flex-col justify-center">
        <div class="pt-2 relative mx-auto text-gray-600">
            <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type="search" id="search" placeholder="search" name="query" v-model="query" v-on:keyup.enter="searchQuery" />
            <button type="submit" class="absolute right-0 top-0 mt-5 mr-4" @click="searchQuery">
                <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
            </button>
        </div>
    </div>

    <div class="flex flex-wrap justify-center">
        <app-game-card v-for="(game, index) in games" :game="game" :key="index"></app-game-card>
    </div>
</div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import GameDataService from "../services/GameDataService";
export default {
    name: "games-list",
    data: () => {
        return {
            games: [],
            query: "",
        };
    },
    components: {
        "app-game-card": GameCard,
    },
    methods: {
        retrieveGames() {
            GameDataService.getAll()
                .then((response) => {
                    this.games = response.data;
                    console.log(response.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        searchQuery() {
            console.log(this.query);
            // stop it from querying if it's an empty string
            // OR get some defaults ??
            if (this.query === "") {
                return;
            }
            GameDataService.search(this.query)
                .then((response) => {
                    this.games = response.data;
                    console.log(response.data);
                    // TODO: update url with routing indicating that a search has been performed
                    // this.$router.push({
                    //   path: "/games/search",
                    //   query: { name: this.query },
                    // });
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
    mounted() {
        this.retrieveGames();
    },
};
</script>
