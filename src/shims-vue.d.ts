declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const component: ComponentOptions;
  export default component;
}

declare module "vue/types/vue" {
  interface Vue {
    $store: VuexStore;
  }
}
