<template>
  <div>
    <div class="filters border-black border-[1px] rounded-xl w-full px-4 pt-2">
      <div class="flex flex-wrap gap-4 lg:gap-8 h-full">
        <div>
          <p>Сортировать:</p>
        </div>
        <div class="flex gap-2 lg:gap-3 h-full flex-wrap">
          <p
            class="pb-2 border-b-2 hover:border-b-[#2667FF] hover:text-[#2667FF] cursor-pointer"
            :class="{
              'border-b-[#2667FF] text-[#2667FF]': containsObjectKeysAndValues(
                route.query,
                item.triggerValues
              ),
              'border-b-transparent text-black': !containsObjectKeysAndValues(
                route.query,
                item.triggerValues
              ),
            }"
            :key="item.id"
            v-for="item in filterItems"
            @click="handleClick(item.triggerValues)"
          >
            {{ item.label }}
          </p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
      <product-card
        @click="handleNavigate(product.id)"
        class="cursor-pointer hover:shadow-2xl hover:border-gray-300 border-black border-[1px] rounded-2xl"
        :product="product"
        v-for="product in computedProducts"
        :key="product.id"
      />
    </div>
    <div class="h-10" id="observer"></div>
  </div>
</template>

<script setup lang="ts">
import { useHomePageState } from "~/store/index";
import { computed } from "vue";
import type { Product } from "~/types";
import { containsObjectKeysAndValues } from "~/utils/containsObjectKeysAndValues";
import { storeToRefs } from "pinia";
import { useScrollProducts } from "~/hooks/useScrollProducts";

type TriggerValues = {
  order: "asc" | "desc";
  orderBy: keyof Product;
};

type FilterItems = {
  id: number;
  label: string;
  triggerValues: TriggerValues;
};

const route = useRoute();
const router = useRouter();

const filterItems: FilterItems[] = [
  {
    id: 1,
    label: "По популярности",
    triggerValues: {
      order: "desc",
      orderBy: "rating",
    },
  },
  {
    id: 2,
    label: "Сначала подешевле",
    triggerValues: {
      order: "asc",
      orderBy: "price",
    },
  },
  {
    id: 3,
    label: "Сначала подороже",
    triggerValues: {
      order: "desc",
      orderBy: "price",
    },
  },
  {
    id: 4,
    label: "Сначала новое",
    triggerValues: {
      order: "asc",
      orderBy: "createdAt",
    },
  },
  {
    id: 5,
    label: "По алфавиту",
    triggerValues: {
      order: "asc",
      orderBy: "title",
    },
  },
];

const state = useHomePageState();

const { filter } = storeToRefs(state);

useScrollProducts();

const handleNavigate = async (id: string) => {
  await navigateTo(`/products/${id}`);
};

const handleClick = async (triggerValues: TriggerValues) => {
  state.filter = { ...state.filter, ...triggerValues };
  router.push({ path: "/", query: { ...route.query, ...triggerValues } });
  await state.fetchProductOnFilterChange();
};

const computedProducts = computed(() => {
  return [...state.products];
});

watch(filter, async () => {
  if (state.filter.page > 1) {
    await state.fetchMoreProducts();
  } else await state.fetch();
});

onMounted(async () => {
  state.filter = {
    ...state.filter,
    ...route.query,
  };
  await callOnce(state.fetch);
});
</script>

<style></style>
