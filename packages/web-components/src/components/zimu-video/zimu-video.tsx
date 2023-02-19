import { Component, Host, h } from '@stencil/core';
import '@vime/core';
// import '../zimu-subtitles/zimu-subtitles';

@Component({
  tag: 'zimu-video',
  styleUrl: 'zimu-video.css',
  shadow: true,
})
export class ZimuVideo {
  render() {
    return (
      <Host>
        <vm-player controls>
          <vm-video crossOrigin="" poster="https://media.vimejs.com/poster.png">
            {/* These are passed directly to the underlying HTML5 `<video>` element. */}
            {/* Why `data-src`? Lazy loading, you can always use `src` if you prefer.  */}
            <source data-src="https://media.vimejs.com/720p.mp4" type="video/mp4" />
            <track default kind="subtitles" src="https://media.vimejs.com/subs/english.vtt" srclang="en" label="English" />
          </vm-video>
          <vm-ui>
            <zimu-subtitles />
            {/* <vm-captions /> */}
            {/* <vm-default-controls /> */}
          </vm-ui>
        </vm-player>
      </Host>
    );
  }
}
