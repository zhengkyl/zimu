/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { PlayerProps } from "@vime/core";
export { PlayerProps } from "@vime/core";
export namespace Components {
    interface ZimuSubtitles {
        "hidden": boolean;
        "isControlsActive": PlayerProps['isControlsActive'];
        "isVideoView": PlayerProps['isVideoView'];
        "playbackStarted": PlayerProps['playbackStarted'];
    }
    interface ZimuVideo {
    }
}
declare global {
    interface HTMLZimuSubtitlesElement extends Components.ZimuSubtitles, HTMLStencilElement {
    }
    var HTMLZimuSubtitlesElement: {
        prototype: HTMLZimuSubtitlesElement;
        new (): HTMLZimuSubtitlesElement;
    };
    interface HTMLZimuVideoElement extends Components.ZimuVideo, HTMLStencilElement {
    }
    var HTMLZimuVideoElement: {
        prototype: HTMLZimuVideoElement;
        new (): HTMLZimuVideoElement;
    };
    interface HTMLElementTagNameMap {
        "zimu-subtitles": HTMLZimuSubtitlesElement;
        "zimu-video": HTMLZimuVideoElement;
    }
}
declare namespace LocalJSX {
    interface ZimuSubtitles {
        "hidden"?: boolean;
        "isControlsActive"?: PlayerProps['isControlsActive'];
        "isVideoView"?: PlayerProps['isVideoView'];
        "playbackStarted"?: PlayerProps['playbackStarted'];
    }
    interface ZimuVideo {
    }
    interface IntrinsicElements {
        "zimu-subtitles": ZimuSubtitles;
        "zimu-video": ZimuVideo;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "zimu-subtitles": LocalJSX.ZimuSubtitles & JSXBase.HTMLAttributes<HTMLZimuSubtitlesElement>;
            "zimu-video": LocalJSX.ZimuVideo & JSXBase.HTMLAttributes<HTMLZimuVideoElement>;
        }
    }
}