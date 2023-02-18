import "./style.css";
import "@vime/core/themes/default.css";

import { VmPlayer, VmVideo, VmFile, VmUi } from "@vime/core";

// 1. Manually define them to be as efficient as possible.
customElements.define("vm-player", VmPlayer);
customElements.define("vm-video", VmVideo);
customElements.define("vm-file", VmFile);
customElements.define("vm-ui", VmUi);

// 2. Can't be bothered? Load them all in, may bloat your final bundle size a little.
// defineCustomElements();
