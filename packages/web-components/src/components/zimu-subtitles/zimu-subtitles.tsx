import { Component, Prop, h, State, Watch } from '@stencil/core';
import { PlayerProps } from '@vime/core';

@Component({
  tag: 'zimu-subtitles',
  styleUrl: 'zimu-subtitles.css',
  shadow: true,
})
export class ZimuSubtitles {
  @State() isEnabled = false;

  @State() cue?: string;

  @State() fontSize: 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  @Prop() hidden = false;

  @Watch('isVideoView')
  @Watch('playbackStarted')
  onEnabledChange() {
    this.isEnabled = this.playbackStarted && this.isVideoView;
  }

  /** @internal */
  @Prop() isControlsActive: PlayerProps['isControlsActive'] = false;

  /** @internal */
  @Prop() isVideoView: PlayerProps['isVideoView'] = false;

  /** @internal */
  @Prop() playbackStarted: PlayerProps['playbackStarted'] = false;

  /** @internal */
  @Prop() textTracks: PlayerProps['textTracks'] = [];

  /** @internal */
  @Prop() currentTextTrack: PlayerProps['currentTextTrack'] = -1;

  /** @internal */
  @Prop() isTextTrackVisible: PlayerProps['isTextTrackVisible'] = true;

  @Watch('textTracks')
  @Watch('currentTextTrack')
  onTextTracksChange() {
    const textTrack = this.textTracks[this.currentTextTrack];

    const renderCues = () => {
      const activeCues = Array.from(textTrack.activeCues ?? []);
      this.renderCurrentCue(activeCues[0] as VTTCue);
    };

    this.textDisposal.empty();

    if (textTrack != null) {
      renderCues();
      this.textDisposal.add(listen(textTrack, 'cuechange', renderCues));
    }
  }

  private renderCurrentCue(cue?: VTTCue) {
    if (cue == null) {
      this.cue = '';
      return;
    }

    const div = document.createElement('div');
    div.append(cue.getCueAsHTML());
    this.cue = div.innerHTML.trim();
  }

  // private getText(): string {
  //   return format(this.first, this.middle, this.last);
  // }

  render() {
    return <div>hi</div>;
  }
}
