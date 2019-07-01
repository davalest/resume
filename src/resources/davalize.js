let davalize = ( function(extended) {

    let body, defaults, options,
        audioTemplate, sourceAudioTemplate, imageTemplate,
        audio, image;

// Wrap the require in check for window
    if (typeof document !== `undefined`) {
        body = document.body;

        options = {};

        //--- OPTIONS ---//
        defaults = {
            audioPath: ["//zurb.com/playground/uploads/upload/upload/230/raptor-sound.mp3",
                        "//zurb.com/playground/uploads/upload/upload/231/raptor-sound.ogg"],
            imagePath: "//zurb.com/playground/uploads/upload/upload/224/raptor.png",

            className: "DAVAL",
            animationTime: 2000,
        };

        extend(options, defaults, extended);

        //--- SETUP ---//
        audioTemplate = document.createElement("audio");
        audioTemplate.className = options.className + "-source";

        for (let source in options.audioPath) {
            sourceAudioTemplate = document.createElement("source");
            sourceAudioTemplate.src = options.audioPath[source];
            audioTemplate.appendChild(sourceAudioTemplate)
        }

        imageTemplate = document.createElement("img");
        imageTemplate.className = options.className;
        imageTemplate.src = options.imagePath;

        audio = body.appendChild(audioTemplate);
        image = body.appendChild(imageTemplate);

        image.style.display = "none"
    }

    //--- THE HILARITY ---//
    function go() {
        setTimeout(function() {
            audio.play()
        }, ( options.animationTime / 3 ));

        image.style.display = "block";
        image.classList.add(options.className + "-go");

        setTimeout(function() {
            image.classList.remove(options.className + "-go")
        }, options.animationTime)
    }

    //--- EXTEND (COMMON) ---//
    // Use Object.assign() for EcmaScript 6.
    function extend(out) {
        out = out || {};

        for (let i = 1; i < arguments.length; i++) {
            if (!arguments[i]) {
                continue
            }
            for (let key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    out[key] = arguments[i][key]
                }
            }
        }

        return out
    }

    return { go: go }
} );

//--- USAGE WITH SECS---//
//let yourDAVAL = davalize({
//    audioPath: ['//zurb.com/playground/uploads/upload/upload/230/raptor-sound.mp3',
//        '//zurb.com/playground/uploads/upload/upload/231/raptor-sound.ogg'],
//    imagePath: '//zurb.com/playground/uploads/upload/upload/224/raptor.png',
//});

// setTimeout(yourDAVAL.go, 3000);

//--- USAGE ---//


let myDAVAL, konamiIndex, konamiCode;

myDAVAL = davalize();
konamiIndex = 0;
konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

if (typeof document !== `undefined`) {
    window.addEventListener("keydown", function(event) {
        if (event.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                myDAVAL.go()
            }
        } else {
            konamiIndex = 0
        }
    })
}