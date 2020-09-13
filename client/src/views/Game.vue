<template>
  <div>
    <div class="flex flex-wrap container m-auto pt-20">
      <div class="w-full md:w-2/6">
        <img
          class="w-full"
          :src="game.covers[0].url"
          v-if="gameDataIsLoaded"
          alt="Game Cover"
        />
      </div>
      <div class="w-full p-4 md:w-4/6 md:p-0 md:pl-4" v-if="gameDataIsLoaded">
        <div class="text-5xl lg:text-6xl">{{ game.name }}</div>
        <div class="text-xl">Release Date: {{ game.first_release_date }}</div>
        <div class="text-base whitespace-pre-wrap pt-2">{{ game.summary }}</div>
        <div class="flex">
          <div
            v-for="(website, index) in game.websites"
            :website="website"
            :key="index"
          >
            <div class="mr-5 mt-5">
              <a
                :href="website.url"
                target="_blank"
                rel="noopener"
                class="flex"
              >
                <img class="h-8 w-8 mr-2 flex" :src="website.logo" />
                <p class="flex items-center hover:text-blue-700">
                  {{ website.type }}
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex container m-auto pt-20">
      <ul class="flex border-b">
        <li
          class="-mb-px mr-1"
          :class="[
            image === 'screenshot' ? 'is-active bg-gray-200 text-blue-700' : ''
          ]"
        >
          <a
            class="inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold hover:text-blue-700 cursor-pointer"
            @click="image = 'screenshot'"
            >Screenshots</a
          >
        </li>
        <li
          class="-mb-px mr-1"
          :class="[
            image === 'artwork' ? 'is-active bg-gray-200 text-blue-700' : ''
          ]"
        >
          <a
            class="inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold hover:text-blue-700 cursor-pointer"
            @click="image = 'artwork'"
            >Artwork</a
          >
        </li>
        <li
          class="-mb-px mr-1"
          :class="[
            image === 'video' ? 'is-active bg-gray-200 text-blue-700' : ''
          ]"
        >
          <a
            class="inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold hover:text-blue-700 cursor-pointer"
            @click="image = 'video'"
            >Videos</a
          >
        </li>
      </ul>
    </div>
    <div class="image-content">
      <div class="flex container m-auto" v-show="image === 'screenshot'">
        <swiper v-if="gameDataIsLoaded" class="swiper" :options="swiperOption">
          <swiper-slide
            v-for="(screenshot, index) in game.screenshots"
            :screenshot="screenshot"
            :key="index"
          >
            <img
              class="m-auto swiper-lazy"
              :src="game.screenshots[index].url"
              alt="Game Screenshot"
            />
          </swiper-slide>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="flex container m-auto" v-show="image === 'artwork'">
        <swiper v-if="gameDataIsLoaded" class="swiper" :options="swiperOption">
          <swiper-slide
            v-for="(artwork, index) in game.artworks"
            :artwork="artwork"
            :key="index"
          >
            <img
              class="w-auto m-auto swiper-lazy"
              :src="game.artworks[index].url"
              alt="Game Artwork"
            />
          </swiper-slide>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="flex container m-auto" v-show="image === 'video'">
        <swiper v-if="gameDataIsLoaded" class="swiper" :options="swiperOption">
          <swiper-slide
            v-for="(video, index) in game.videos"
            :video="video"
            :key="index"
          >
            <vue-plyr class="swiper-no-swiping">
              <div
                data-plyr-provider="youtube"
                :data-plyr-embed-id="game.videos[index].video_id"
              ></div>
            </vue-plyr>
          </swiper-slide>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute  -->
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>
    <div
      v-for="(album, index) in albums"
      :album="album"
      :key="index"
      class="pt-20"
    >
      <div class="flex flex-wrap container m-auto">
        <div class="w-full md:w-2/6">
          <img
            :src="album.data.covers[0].full"
            v-if="albumDataIsLoaded"
            :alt="album.data.name + ' Album Cover'"
          />
        </div>
        <div
          class="w-full p-4 md:w-4/6 md:p-0 md:pl-4"
          v-if="albumDataIsLoaded"
        >
          <div class="text-4xl">{{ album.data.name }}</div>
          <div class="text-xl">Release Date: {{ album.data.release_date }}</div>

          <div class="flex">
            <div
              v-for="(store, index) in album.data.stores"
              :store="store"
              :key="index"
            >
              <div class="mr-5 mt-5">
                <a
                  :href="store.link"
                  target="_blank"
                  rel="noopener"
                  class="flex"
                >
                  <img class="h-8 w-8 mr-2 flex" :src="store.logo" />
                  <p class="flex items-center hover:text-blue-700">
                    {{ store.name }}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap container m-auto justify-center mt-4">
        <div class="text-base whitespace-pre-wrap w-full p-4 lg:w-1/2 lg:p-0 ">
          {{ album.data.notes }}
        </div>
        <vue-good-table
          class="w-full lg:w-1/2 mt-4"
          :columns="columns"
          :rows="album.data.tracks"
          :search-options="{
            enabled: true,
            trigger: 'enter',
            skipDiacritics: true,
            placeholder: 'Search this table'
          }"
          :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 10,
            position: 'top',
            perPageDropdown: [20, 30, 50],
            dropdownAllowAll: true,
            setCurrentPage: 1,
            nextLabel: 'next',
            prevLabel: 'prev',
            rowsPerPageLabel: 'Rows per page',
            ofLabel: 'of',
            pageLabel: 'page',
            allLabel: 'All'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameDataService from "../services/GameDataService";
import AlbumDataService from "../services/AlbumDataService";
import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
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
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      playerVars: {
        autoplay: 0
      },
      image: "screenshot",
      columns: [
        {
          label: "Disc #",
          field: "disc_id",
          type: "number"
        },
        {
          label: "Track #",
          field: "id",
          type: "number"
        },
        {
          label: "Track Name",
          field: "name"
        },
        {
          label: "Duration",
          field: "length"
        }
      ]
    };
  },
  directive: {
    swiper: directive
  },
  components: {
    swiper: Swiper,
    "swiper-slide": SwiperSlide,
    "vue-good-table": VueGoodTable
  },
  methods: {
    async loadGameData() {
      await GameDataService.get(this.$route.params.id)
        .then(response => {
          console.log(response.data);
          this.game = response.data;
          this.gameDataIsLoaded = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    async loadAlbumData() {
      this.game.albums.map(async album => {
        await AlbumDataService.get(album.id)
          .then(response => {
            console.log(response.data);
            this.albums.push(response);
            this.albumDataIsLoaded = true;
          })
          .catch(err => {
            console.error(err);
          });
      });
    }
  },
  async mounted() {
    await this.loadGameData();
    await this.loadAlbumData();
  }
};
</script>
