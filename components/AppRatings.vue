<template>
  <div class="flex flex-col md:flex-row md:gap-2 text-sm text-[#5C5C5C]">
    <div class="flex gap-1 items-center">
      <span :key="idx" v-for="idx in [1, 2, 3, 4, 5]">
        <img :src="idx <= countRate ? StarDark : Star" />
      </span>
    </div>
    <p>{{ props.productRatesCount }} отзывов</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import Star from "~/assets/images/Star.svg";
import StarDark from "~/assets/images/StarDark.svg";

const props = defineProps({
  productRating: {
    type: Number,
    required: true,
  },
  productRatesCount: {
    type: Number,
    required: true,
  },
});

const countRate = Math.round(props.productRating / 20);
</script>

<style></style>
