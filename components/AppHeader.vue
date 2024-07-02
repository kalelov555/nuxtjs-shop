<template>
  <div class="flex justify-center items-center py-4 bg-[#2667FF] gap-8">
    <h1 class="hidden md:block text-4xl font-bold text-white">Test.kz</h1>
    <div class="flex items-center justify-center gap-6">
      <form @submit.prevent="formOnSubmit">
        <div class="flex bg-white rounded-full h-full">
          <input
            name="title"
            class="rounded-full h-full p-4 lg:min-w-[600px] min-w-full"
          />
          <app-button type="transparent"
            ><img :src="Search" alt="search"
          /></app-button>
        </div>
      </form>
      <div class="flex items-center gap-3">
        <app-button type="transparent"
          ><img :src="HeartWhite" alt="heart white"
        /></app-button>
        <app-button type="transparent"
          ><img :src="Cart" alt="cart"
        /></app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from "~/assets/images/Search.svg";
import HeartWhite from "~/assets/images/HeartWhite.svg";
import Cart from "~/assets/images/CartWhite.svg";
import { useHomePageState } from "~/store";
const state = useHomePageState();
const router = useRouter();
const route = useRoute();
const formOnSubmit = async (event: any) => {
  const formDataRes = new FormData(event.target);
  const formData = Object.fromEntries(formDataRes);
  if (state.filter.title !== formData.title) {
    state.filter = { ...state.filter, ...formData };
    router.push({ path: "/", query: { ...route.query, ...formData } });
    await state.fetchProductOnFilterChange();
  }
};
</script>

<style></style>
