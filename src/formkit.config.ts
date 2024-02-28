import { defaultConfig } from "@formkit/vue";
import { list, checkbox, text, password, textarea } from "@formkit/icons";
import { createAutoHeightTextareaPlugin } from "@formkit/addons";
import { rootClasses } from "./formkit.theme";

export default defaultConfig({
  plugins: [
    createAutoHeightTextareaPlugin()
  ],
  config: {
    rootClasses,
  },
  icons: {
    list,
    checkbox,
    text,
    password,
    textarea,
  },
});
