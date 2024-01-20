<script setup lang="ts">
import Logo from './assets/logo-transparent-svg.svg';
</script>

<template>
  <div class="header">
    <img :src="Logo" class="logo-image" />
  </div>
  <v-container>
    <v-row>
      <v-col cols="2" md="2"></v-col>

      <v-col cols="8" md="8">
        <v-card>
          <v-card-item>
            <div class="page-margin">
              <h2 class="text-h1">About the Easy Utility</h2>
              <p>
                The EasyUtility is a platform designed to provide users with
                practical tools, services, and information to fulfill specific
                needs or tasks.
              </p>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="2" md="2"></v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.page-margin {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-bottom: 3rem;
}
</style>

<style scoped>
h1 {
  display: block;
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h2 {
  display: block;
  font-size: 28px;
  margin-top: 1.5em;
  margin-bottom: 1.2em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h3 {
  display: block;
  font-size: 1.17em;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h4 {
  display: block;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h5 {
  display: block;
  font-size: 0.83em;
  margin-top: 1.67em;
  margin-bottom: 1.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h6 {
  display: block;
  font-size: 0.67em;
  margin-top: 2.33em;
  margin-bottom: 2.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 2.5rem 2.5rem;
}

.logo-image {
  width: 20rem;
}
</style>
