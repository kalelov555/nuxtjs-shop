import { useHomePageState } from "~/store";

export const useScrollProducts = () => {
  const state = useHomePageState();
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let elem = entry.target;

        if (entry.intersectionRatio >= 0.9) {
          state.filter = { ...state.filter, page: state.filter.page + 1 };
        }
      }
    });
  };

  onMounted(() => {
    let options = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "0px",
      threshold: 1.0,
    };

    let observer = new IntersectionObserver(callback, options);
    let target = document.querySelector("#observer");
    observer.observe(target as Element);
  });
};
