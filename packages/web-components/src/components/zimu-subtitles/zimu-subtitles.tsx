import { Component, Prop, h, State, Watch, Listen } from '@stencil/core';
import { createDispatcher, Dispatcher, findPlayer, PlayerProps, withComponentRegistry, withPlayerContext } from '@vime/core';
class Disposal {
  constructor(private dispose: (() => void)[] = []) {}

  add(callback: () => void) {
    this.dispose.push(callback);
  }

  empty() {
    this.dispose.forEach(fn => fn());
    this.dispose = [];
  }
}

function listen<T extends Event | UIEvent>(node: EventTarget, event: string, handler: (event: T) => void, options?: boolean | AddEventListenerOptions | EventListenerOptions) {
  node.addEventListener(event, handler as EventListener, options);
  return () => node.removeEventListener(event, handler as EventListener, options);
}

@Component({
  tag: 'zimu-subtitles',
  styleUrl: 'zimu-subtitles.css',
  shadow: true,
})
export class ZimuSubtitles {
  private dispatch!: Dispatcher;

  private sizeDisposal = new Disposal();

  private textDisposal = new Disposal();

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
    console.log('textTrackChange', textTrack);

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
    console.log('rendercurrentcue', cue.text);
    const div = document.createElement('div');
    div.append(cue.getCueAsHTML());
    this.cue = div.innerHTML.trim();
  }

  constructor() {
    withComponentRegistry(this);
    // withControlsCollisionDetection(this);
    withPlayerContext(this, ['isVideoView', 'playbackStarted', 'isControlsActive', 'textTracks', 'currentTextTrack', 'isTextTrackVisible']);
  }

  connectedCallback() {
    this.dispatch = createDispatcher(this);
    this.dispatch('shouldRenderNativeTextTracks', false);
    this.onTextTracksChange();
    this.onPlayerResize();
  }

  disconnectedCallback() {
    this.textDisposal.empty();
    this.sizeDisposal.empty();
    this.dispatch('shouldRenderNativeTextTracks', true);
  }

  private async onPlayerResize() {
    const player = await findPlayer(this);

    if (player == null) return;

    const container = (await player.getContainer()) as HTMLDivElement;

    const resizeObs = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width } = entry.contentRect;
      if (width >= 1360) {
        this.fontSize = 'xl';
      } else if (width >= 1024) {
        this.fontSize = 'lg';
      } else if (width >= 768) {
        this.fontSize = 'md';
      } else {
        this.fontSize = 'sm';
      }
    });

    resizeObs.observe(container);
  }

  @Listen('hover', { capture: true })
  handleHover(ev) {
    console.log('hover', ev);
  }

  render() {
    return (
      <div
        style={{
          transform: `translateY(calc(${this.isControlsActive ? 'var(--vm-controls-height)' : '24px'} * -1))`,
        }}
        class={{
          captions: true,
          enabled: this.isEnabled,
          hidden: this.hidden,
          fontMd: this.fontSize === 'md',
          fontLg: this.fontSize === 'lg',
          fontXl: this.fontSize === 'xl',
          inactive: !this.isTextTrackVisible,
        }}
      >
        <span class="cue">{this.cue}</span>
      </div>
    );
  }
}
