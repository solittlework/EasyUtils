<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    this.LoadGoogleAds()
  },
  methods: {
    LoadGoogleAds() {
      const inlineScript   = document.createElement("script");
      inlineScript.type  = "text/javascript";
      inlineScript.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
      document.getElementById("page-left-ads").appendChild(inlineScript);
    }
  }
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="2" md="2">
        <div id="page-left-ads">
          <ins
            class="adsbygoogle"
            style="display: block"
            data-ad-client="ca-pub-6820137193184877"
            data-ad-slot="4627701605"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </v-col>
      <v-col cols="8" md="8">
        <v-card>
          <v-card-item>
            <div class="page-margin">
              <slot />
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
