<template>
  <div>
    <div class="flex flex-wrap container m-auto">
      <div class="w-full md:w-2/6">
        <img
          v-if="gameDataIsLoaded"
          class="w-full"
          :src="game.covers[0].url"
          alt="Game Cover"
        />
      </div>
      <div v-if="gameDataIsLoaded" class="w-full p-4 md:w-4/6 md:p-0 md:pl-4">
        <div class="text-5xl lg:text-6xl">{{ game.name }}</div>
        <div class="text-xl">Release Date: {{ game.first_release_date }}</div>
        <div class="text-base whitespace-pre-wrap pt-2">{{ game.summary }}</div>
        <div class="flex flex-wrap">
          <div
            v-for="(website, index) in game.websites"
            :key="index"
            :website="website"
          >
            <div class="mr-5 mt-5">
              <a
                :href="website.url"
                target="_blank"
                rel="noopener"
                class="flex"
              >
                <img class="h-8 w-8 mr-2" :src="website.logo" />
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
          v-if="totalScreenshots > 0"
          class="-mb-px mr-1"
          :class="[
            image === 'screenshot' ? 'is-active bg-gray-200 text-blue-700' : '',
          ]"
        >
          <a
            class="inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold hover:text-blue-700 cursor-pointer"
            @click="image = 'screenshot'"
            >Screenshots</a
          >
        </li>
        <li
          v-if="totalArtworks > 0"
          class="-mb-px mr-1"
          :class="[
            image === 'artwork' ? 'is-active bg-gray-200 text-blue-700' : '',
          ]"
        >
          <a
            class="inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold hover:text-blue-700 cursor-pointer"
            @click="image = 'artwork'"
            >Artwork</a
          >
        </li>
        <li
          v-if="totalVideos > 0"
          class="-mb-px mr-1"
          :class="[
            image === 'video' ? 'is-active bg-gray-200 text-blue-700' : '',
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
      <div v-show="image === 'screenshot'" class="flex container m-auto">
        <swiper
          v-if="gameDataIsLoaded"
          class="swiper w-full"
          :options="swiperOption"
        >
          <swiper-slide
            v-for="(screenshot, index) in game.screenshots"
            :key="index"
            :screenshot="screenshot"
          >
            <img
              class="m-auto swiper-lazy"
              :src="game.screenshots[index].url"
              alt="Game Screenshot"
            />
          </swiper-slide>

          <div slot="pagination" class="swiper-pagination"></div>

          <div slot="button-prev" class="swiper-button-prev"></div>

          <div slot="button-next" class="swiper-button-next"></div>
        </swiper>
      </div>
      <div v-show="image === 'artwork'" class="flex container m-auto">
        <swiper
          v-if="gameDataIsLoaded"
          class="swiper w-full"
          :options="swiperOption"
        >
          <swiper-slide
            v-for="(artwork, index) in game.artworks"
            :key="index"
            :artwork="artwork"
          >
            <img
              class="m-auto swiper-lazy"
              :src="game.artworks[index].url"
              alt="Game Artwork"
            />
          </swiper-slide>

          <div slot="pagination" class="swiper-pagination"></div>

          <div slot="button-prev" class="swiper-button-prev"></div>

          <div slot="button-next" class="swiper-button-next"></div>
        </swiper>
      </div>
      <div v-show="image === 'video'" class="flex container m-auto">
        <swiper
          v-if="gameDataIsLoaded"
          class="swiper w-full"
          :options="swiperOption"
        >
          <swiper-slide
            v-for="(video, index) in game.videos"
            :key="index"
            :video="video"
          >
            <vue-plyr class="swiper-no-swiping">
              <div
                data-plyr-provider="youtube"
                :data-plyr-embed-id="game.videos[index].video_id"
              ></div>
            </vue-plyr>
          </swiper-slide>

          <div slot="button-prev" class="swiper-button-prev"></div>

          <div slot="button-next" class="swiper-button-next"></div>
        </swiper>
      </div>
    </div>
    <div
      v-for="(album, albumIndex) in albums"
      :key="albumIndex"
      :album="album"
      class="pt-20"
    >
      <div class="flex flex-wrap container m-auto">
        <div class="w-full md:w-3/6 lg:w-2/6">
          <!--
          <img
            v-if="album.data.covers.length"
            :src="album.data.covers[0].full"
            :alt="album.data.name + ' Album Cover'"
          />
          -->
          <swiper
            v-if="album.data.covers.length"
            class="swiper w-full h-120"
            :options="swiperOption"
          >
            <swiper-slide
              v-for="(cover, index) in album.data.covers"
              :key="index"
              :cover="cover"
            >
              <img
                class="m-auto w-full h-auto"
                :src="album.data.covers[index].full"
                alt="Album cover"
              />
            </swiper-slide>

            <div slot="pagination" class="swiper-pagination"></div>

            <div slot="button-prev" class="swiper-button-prev"></div>

            <div slot="button-next" class="swiper-button-next"></div>
          </swiper>
        </div>
        <div
          v-if="albumDataIsLoaded"
          class="w-full p-4 md:w-3/6 md:p-0 md:pl-4 lg:w-4/6"
        >
          <div class="text-4xl">{{ album.data.name }}</div>
          <!-- some albums are missing release date info-->
          <div v-if="album.data.release_date !== null" class="text-xl">
            Release Date: {{ album.data.release_date }}
          </div>
          <div
            v-if="album.data.arrangers.length"
            class="text-base flex flex-wrap"
          >
            Arrangers:
            <div
              v-for="(arranger, arrangerIndex) in album.data.arrangers"
              :key="arrangerIndex"
              :arranger="arranger"
              class="text-base flex pl-2"
            >
              {{ arranger.artist.name
              }}<span v-if="arrangerIndex != album.data.arrangers.length - 1"
                >,</span
              >
            </div>
          </div>
          <div
            v-if="album.data.composers.length"
            class="text-base flex flex-wrap"
          >
            Composers:
            <div
              v-for="(composer, composerIndex) in album.data.composers"
              :key="composerIndex"
              :composer="composer"
              class="text-base flex ml-2"
            >
              {{ composer.artist.name
              }}<span v-if="composerIndex != album.data.composers.length - 1"
                >,</span
              >
            </div>
          </div>
          <div
            v-if="album.data.lyricists.length"
            class="text-base flex flex-wrap"
          >
            Lyricists:
            <div
              v-for="(lyricist, lyricistIndex) in album.data.lyricists"
              :key="lyricistIndex"
              :lyricist="lyricist"
              class="text-base flex ml-2"
            >
              {{ lyricist.artist.name
              }}<span v-if="lyricistIndex != album.data.lyricists.length - 1"
                >,</span
              >
            </div>
          </div>
          <div
            v-if="album.data.performers.length"
            class="text-base flex flex-wrap"
          >
            Performers:
            <div
              v-for="(performer, performerIndex) in album.data.performers"
              :key="performerIndex"
              :performer="performer"
              class="text-base flex ml-2"
            >
              {{ performer.artist.name
              }}<span v-if="performerIndex != album.data.performers.length - 1"
                >,</span
              >
            </div>
          </div>

          <div class="flex flex-wrap">
            <div
              v-for="(store, storeIndex) in album.data.stores"
              :key="storeIndex"
              :store="store"
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
        <!-- TODO: add more elegant way to hide large bodies of text -->
        <div
          class="text-base whitespace-pre-wrap w-full p-4 lg:w-1/2 lg:p-0 max-h-200 overflow-y-auto"
        >
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
            placeholder: 'Search this table',
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
            allLabel: 'All',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameDataService from "../services/GameDataService";
import AlbumDataService from "../services/AlbumDataService";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "Game",
  components: {
    swiper: Swiper,
    "swiper-slide": SwiperSlide,
    "vue-good-table": VueGoodTable,
  },
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
      columns: [
        {
          label: "Disc #",
          field: "disc_id",
          type: "number",
        },
        {
          label: "Track #",
          field: "id",
          type: "number",
        },
        {
          label: "Track Name",
          field: "name",
        },
        {
          label: "Duration",
          field: "length",
        },
      ],
      totalScreenshots: 0,
      totalArtworks: 0,
      totalVideos: 0,
    };
  },
  directive: {
    swiper: directive,
  },
  async mounted() {
    await this.loadGameData();
    await this.loadAlbumData();
  },
  methods: {
    async loadGameData() {
      await GameDataService.get(this.$route.params.id)
        .then((response) => {
          console.log(response.data);
          this.game = response.data;
          this.gameDataIsLoaded = true;
          this.totalScreenshots = this.game.screenshots.length;
          this.totalArtworks = this.game.artworks.length;
          this.totalVideos = this.game.videos.length;
          if (this.totalScreenshots > 0) {
            this.image = "screenshot";
          } else if (this.totalArtworks > 0) {
            this.image = "artwork";
          } else if (this.totalVideos > 0) {
            this.image = "video";
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    async loadAlbumData() {
      this.game.albums.map(async (album) => {
        await AlbumDataService.get(album.album_id)
          .then((response) => {
            console.log(response.data);
            this.albums.push(response);
            this.albumDataIsLoaded = true;
          })
          .catch((err) => {
            console.error(err.message);
          });
      });
    },
  },
};
</script>
<style scoped>
@import "./../../node_modules/swiper/css/swiper.css";
@import "./../../node_modules/vue-good-table/dist/vue-good-table.css";</style
>>
