<script setup>
  import LayoutNav from '@/views/Layout/components/LayoutNav.vue';
  import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
  import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
  import LayoutFixed from './components/LayoutFixed.vue';
  import { onMounted } from 'vue';

  import { useCategoryStore } from '@/stores/categoryStore';
  const categoryStore = useCategoryStore()
  onMounted(() => {
    categoryStore.getCategory()
  })
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <router-view></router-view>
  <LayoutFooter />
</template>