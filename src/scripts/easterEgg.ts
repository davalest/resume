import konamize from "@davalest/konamize/bare";
import raptorImage from "../assets/raptor.webp?url";
import raptorSoundM4a from "../assets/raptor.m4a?url";
import raptorSoundOgg from "../assets/raptor.ogg?url";

export const enableEasterEgg = (): void => {
    konamize({
        imageSrc: raptorImage,
        audioSrc: [raptorSoundM4a, raptorSoundOgg],
        injectStyles: false,
        volume: 0.4,
    });
};
