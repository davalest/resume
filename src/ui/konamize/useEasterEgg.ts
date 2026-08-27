import {useKonamize} from "@davalest/konamize/react/bare";
import {raptorImage, raptorSoundM4a, raptorSoundOgg} from "@assets";

export const useEasterEgg = (): void => {
    useKonamize({
        imageSrc: raptorImage,
        audioSrc: [raptorSoundM4a, raptorSoundOgg],
        injectStyles: false,
        volume: 0.4,
    });
};
