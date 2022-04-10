import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { store } from "./state/store";

loadFonts();
const app = createApp(App);
app.use(store);
app.use(vuetify).mount("#app");
