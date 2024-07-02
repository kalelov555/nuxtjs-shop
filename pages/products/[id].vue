<template>
  <div>
    <Teleport to="body">
      <div v-if="open === true" class="dialog" @click="open = false">
        <div @click.stop class="dialog__content">
          <div class="flex flex-col justify-center text-center gap-2">
            <img class="w-1/2 mx-auto" :src="Success" />
            <h2 class="text-2xl font-bold text-[#322F38]">Спасибо за заказ!</h2>
            <p>Уже собираем</p>
          </div>
        </div>
      </div>
    </Teleport>
    <div v-if="loading">loading....</div>
    <div v-else>
      <h1 class="text-4xl font-bold text-[#363842]">
        {{ product?.title }}
      </h1>
      <app-ratings
        :productRatesCount="product.ratesCount"
        :productRating="product.rating"
      />
      <div class="flex flex-col lg:flex-row mt-5 gap-4">
        <div
          class="w-full lg:w-3/5 rounded-2xl border-[1px] border-gray-400 flex justify-center align-center p-10"
        >
          <div class="lg:max-w-[419px] lg:max-h-[514px]">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full self-center"
            />
          </div>
        </div>
        <div class="w-full lg:w-2/5 flex flex-col justify-between">
          <div class="font-base text-[#322F38]">
            <p>
              {{ product.description }}
            </p>
            <div class="mt-4">
              <p class="font-[600]">О товаре</p>
              <div
                class="flex justify-between alig-center border-b-[1px] border-[#E7E7E7] py-3"
              >
                <p class="lg:w-1/3">Страна-изготовитель</p>
                <p class="font-bold lg:w-1/3">
                  {{ product.countryManufacturer }}
                </p>
              </div>
              <div
                class="flex justify-between alig-center border-b-[1px] border-[#E7E7E7] py-3"
              >
                <p class="lg:w-1/3">Материал оправы</p>
                <p class="font-bold lg:w-1/3">
                  {{ product.lenseMaterial }}
                </p>
              </div>
              <div
                class="flex justify-between alig-center border-b-[1px] border-[#E7E7E7] py-3"
              >
                <p class="lg:w-1/3">Материал линзы</p>
                <p class="font-bold lg:w-1/3">
                  {{ product.lenseMaterial }}
                </p>
              </div>
              <div
                class="flex justify-between alig-center border-b-[1px] border-[#E7E7E7] py-3"
              >
                <p class="lg:w-1/3">Ширина линзы, мм</p>
                <p class="font-bold lg:w-1/3">
                  {{ product.lenseWidth }}
                </p>
              </div>
              <div class="flex justify-between alig-center py-3">
                <p class="lg:w-1/3">Разъем</p>
                <p class="font-bold lg:w-1/3">
                  {{ product.connector }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="p-4 mt-10 shadow-[0px_4px_50px_0px_rgba(38,103,255,0.15)] rounded-lg"
          >
            <div class="flex gap-2">
              <h1 class="text-4xl font-medium text-[#322F38]">
                {{ prices.discounted }}
              </h1>
              <h2 class="line-through text-xl text-[#979797] mt-auto">
                {{ prices.old }}
              </h2>
            </div>
            <div class="mt-6 flex gap-4">
              <app-button @click="open = true" class="w-full p-3" type="primary"
                >Купить</app-button
              >
              <app-button class="p-3" type="secondary"
                ><img :src="HeartTransparent" alt="heart"
              /></app-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { countDiscountPrice } from "~/utils/countDiscountPrice";
import HeartTransparent from "~/assets/images/HeartTransparent.svg";
import { reactive, ref } from "vue";
import type { Product } from "~/types/index";
import Success from "~/assets/images/Success.svg";

let loading = ref(false);
let prices = reactive({
  old: "...",
  discounted: "...",
});
let product = reactive({} as Product);
let currId = ref("");
const route = useRoute();
const open = ref(false);

const fetch = async () => {
  const response: Product = await $fetch(
    `https://665801795c36170526468b7c.mockapi.io/api/v1/products/${currId.value}`
  );
  product = response;
  loading.value = false;
};

onMounted(async () => {
  currId.value = route.params.id as string;
  loading.value = true;
  await fetch();
  const { discountedPrice, oldPrice } = await countDiscountPrice(
    product.price,
    product.discount
  );

  prices.old = oldPrice;
  prices.discounted = discountedPrice;
});
</script>

<style scoped>
.dialog {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.dialog__content {
  margin: auto;
  background: #fff;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>
