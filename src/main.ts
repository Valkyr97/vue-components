import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";
import config from './formkit.config'
import App from "./App.vue";
import "./tailwind.css";

createApp(App).use(plugin, defaultConfig(config)).mount("#app");
