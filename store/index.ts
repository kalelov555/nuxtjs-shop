import type { Product } from "~/types";

type State = {
  products: Product[];
  filter: Filter;
};

type Filter = {
  title: string;
  order: "asc" | "desc" | "";
  orderBy: keyof Product | "";
  page: number;
  limit: 8;
};

export const useHomePageState = defineStore("websiteStore", {
  state: (): State => ({
    products: [],
    filter: {
      title: "",
      order: "",
      orderBy: "",
      page: 1,
      limit: 8,
    },
  }),
  actions: {
    async fetch() {
      let filters = [];
      for (let key in this.filter) {
        let currFilter = this.filter[key as keyof Filter];
        if (!!currFilter) {
          filters.push(`${key}=${currFilter}`);
        }
      }
      const response: Product[] = await $fetch(
        `https://665801795c36170526468b7c.mockapi.io/api/v1/products?${filters.join(
          "&"
        )}`
      );
      this.products = response;
    },
    async fetchMoreProducts() {
      let filters = [];
      for (let key in this.filter) {
        let currFilter = this.filter[key as keyof Filter];
        if (!!currFilter) {
          filters.push(`${key}=${currFilter}`);
        }
      }
      const response: Product[] = await $fetch(
        `https://665801795c36170526468b7c.mockapi.io/api/v1/products?${filters.join(
          "&"
        )}`
      );
      this.products = [...this.products, ...response];
    },
    async fetchProductOnFilterChange() {
      this.filter.page = 1;
      let filters = [];
      for (let key in this.filter) {
        let currFilter = this.filter[key as keyof Filter];
        if (!!currFilter) {
          filters.push(`${key}=${currFilter}`);
        }
      }
      const response: Product[] = await $fetch(
        `https://665801795c36170526468b7c.mockapi.io/api/v1/products?${filters.join(
          "&"
        )}`
      );
      this.products = response;
    },
  },
});
