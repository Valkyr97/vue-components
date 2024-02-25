import { Preview, setup } from "@storybook/vue3";
import {plugin, defaultConfig} from '@formkit/vue'
import config from '@/formkit.config.ts'
import '@/tailwind.css'

setup((app) => {
  app.use(plugin, defaultConfig(config))
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
