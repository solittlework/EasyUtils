<script setup lang="ts">
import Page from './BasePage.vue';
import JSONValidator from './JSONValidator.vue';
import Logo from './assets/logo/logo-transparent-svg.svg';
</script>

<template>
  <div class="header">
    <img :src="Logo" class="logo-image" />
  </div>
  <Page title="tools"> <JSONValidator></JSONValidator> </Page>
</template>

<style scoped>
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 2.5rem 2.5rem;
}
.logo-image {
  width: 20rem;
}
</style>
