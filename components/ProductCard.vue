<template>
  <div class="relative md:p-5">
    <div class="p-4">
      <img
        class="lg:w-[234px] lg:h-[286px] rounded-lg mx-auto"
        :src="product.image"
        :alt="product.title"
      />
      <div class="mt-4">
        <p class="text-base font-medium text-[#363842] lg:h-12 leading-sm">
          {{ product.title }}
        </p>
        <app-ratings
          :productRatesCount="product.ratesCount"
          :productRating="product.rating"
        />

        <div
          class="mt-3 flex flex-col lg:flex-row justify-between gap-4 lg:gap-0"
        >
          <div>
            <div
              class="h-5 flex flex-col lg:flex-row gap-0 lg:gap-4 align-center"
              v-if="product.discount"
            >
              <p class="line-through text-[#979797]">
                {{ prices.old }}
              </p>
              <div
                class="bg-[#F63B00] h-5 w-12 rounded-full flex justify-center align-center"
              >
                <p class="text-white text-[12px]">-{{ product.discount }}</p>
              </div>
            </div>
            <div class="h-5" v-else></div>
            <h2
              class="mt-8 lg:mt-3 text-lg lg:text-[32px] text-[#322F38] font-bold"
            >
              {{ prices.discounted }}
            </h2>
          </div>
          <app-button type="primary" class="mt-auto w-full lg:w-[unset] p-0">
            <img
              class="w-full lg:w-10 h-10 rounded-lg"
              src="~/assets/images/Button.svg"
            />
          </app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Product } from "~/types";

let prices = reactive({
  old: "...",
  discounted: "...",
});

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});

onMounted(async () => {
  const { discountedPrice, oldPrice } = await countDiscountPrice(
    props.product.price,
    props.product.discount
  );

  prices.old = oldPrice;
  prices.discounted = discountedPrice;
});
</script>

<style></style>
