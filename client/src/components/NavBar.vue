<template>
  <div id="nav" class="h-12 mb-20 md:mb-20">
    <div class="antialiased bg-gray-100">
      <div class="w-full text-gray-700 bg-white">
        <div
          class="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        >
          <div class="flex items-center p-4">
            <router-link
              to="/games"
              class="mr-4 text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline"
              >VGML</router-link
            >
            <div class="ml-0 relative mx-auto text-gray-600">
              <input
                id="search"
                v-model="search"
                class="border-2 border-gray-300 bg-white h-10 pl-5 pr-10 rounded-lg text-sm focus:outline-none"
                type="search"
                placeholder="search"
                name="search"
                @keyup.enter="searchQuery"
              />
              <button
                type="submit"
                class="absolute right-0 top-0 ml-5 mt-3 mr-4"
                @click="searchQuery"
              >
                <svg
                  id="Capa_1"
                  class="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style="enable-background:new 0 0 56.966 56.966;"
                  xml:space="preserve"
                  width="512px"
                  height="512px"
                >
                  <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                  />
                </svg>
              </button>
            </div>
            <div class="relative">
              <!-- Mobile menu button -->
              <div class="flex md:hidden">
                <button
                  type="button"
                  class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  aria-label="toggle menu"
                  @click="isOpen = !isOpen"
                >
                  <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                    <path
                      fill-rule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
                <button
                  v-if="isOpen"
                  tabindex="-1"
                  class="fixed inset-0  z-20 h-full w-full bg-black opacity-25 cursor cursor-default"
                  @click="isOpen = false"
                ></button>
              </div>
              <div
                v-if="isOpen"
                class="absolute right-0 top-auto py-2 bg-gray-100 rounded-lg shadow-md z-30 md:hidden"
              >
                <router-link
                  to="/"
                  class="block w-32 px-4 py-2 text-gray-800 hover:bg-indigo-300 hover:text-white"
                  >Home</router-link
                >
                <router-link
                  to="/games"
                  class="block w-32 px-4 py-2 text-gray-800 hover:bg-indigo-300 hover:text-white"
                  >Games</router-link
                >
              </div>
            </div>
          </div>
          <nav
            class="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row"
          >
            <router-link
              to="/"
              class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >Home</router-link
            >
            <!-- <router-link
              to="/about"
              class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >About</router-link
            > -->
            <router-link
              to="/games"
              class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >Games</router-link
            >
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: set it so clicking on 'games' reloads new games
export default {
  name: "AppNavBar",
  data: () => {
    return {
      search: "",
      isOpen: false,
    };
  },
  created() {
    const handleEscape = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isOpen = false;
      }
    };

    document.addEventListener("keydown", handleEscape);

    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", handleEscape);
    });
  },
  methods: {
    searchQuery() {
      if (this.search === "") {
        return;
      } else {
        this.$router.push({
          path: "/games/search",
          query: {
            name: this.search,
          },
        });
      }
    },
  },
};
</script>
