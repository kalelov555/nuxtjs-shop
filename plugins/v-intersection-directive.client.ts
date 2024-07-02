export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("intersection", {
    mounted(el) {
      console.log(el);
    },
  });
});
