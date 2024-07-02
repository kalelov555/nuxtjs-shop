<template>
  <button :class="className.join(' ')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<"primary" | "secondary" | "transparent">,
    required: true,
  },
});

const className = [
  "rounded-[12px] hover:brightness-125",
  props.type === "primary" && "bg-[#2667FF] text-white",
  props.type === "secondary" && "bg-[#2667FF1F] ",
  props.type === "transparent" && "bg-transparent",
];
</script>

<style></style>
