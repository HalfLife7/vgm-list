<template>
  <div class="w-full p-4 lg:w-1/2 lg:p-0 ">
    <div
      :class="[isExpanded ? 'overflow-y-auto' : 'overflow-y-hidden pr-4']"
      class="text-base whitespace-pre-wrap max-h-180"
    >
      {{ notes }}
    </div>
    <div
      v-if="showToggle"
      class="text-center cursor-pointer fill hover:bg-gray-200 shadow-md"
      @click="toggleHeight()"
    >
      {{ expandText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpandableText",
  props: {
    notes: {
      type: String,
    },
  },
  data: () => {
    return {
      isExpanded: false,
      expandText: "Read More...",
      showToggle: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$el.clientHeight);
      if (this.$el.clientHeight === 720) {
        this.showToggle = true;
      }
    });
  },
  methods: {
    toggleHeight() {
      this.isExpanded = !this.isExpanded;
      this.expandText = this.isExpanded ? "Read Less..." : "Read More...";
    },
  },
};
</script>
