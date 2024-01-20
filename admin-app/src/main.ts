import './styles.css';
import { createVuetify } from 'vuetify';

import { createApp } from 'vue';
import App from './app/App.vue';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
const app = createApp(App);
const vuetify = createVuetify({
    components,
    directives
  })

app.use(vuetify)
app.mount('#root');
