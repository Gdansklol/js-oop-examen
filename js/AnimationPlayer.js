export const AnimationPlayer = {
    getAnimations(species) {
        return {
            eat: {
                repeat: 3,
                duration: 1000,
                frames: [
                    `img/${species}/feed1.png`,
                    `img/${species}/feed2.png`,
                    `img/${species}/feed3.png`,
                    `img/${species}/feed4.png`,
                    `img/${species}/feed5.png`,
                    `img/${species}/feed6.png`,
                    `img/${species}/feed7.png`
                ]
            },
            nap: {
                repeat: 3,
                duration: 1000,
                frames: [
                    `img/${species}/sleep1.png`,
                    `img/${species}/sleep2.png`,
                    `img/${species}/sleep3.png`
                ]
            },
            play: {
                repeat: 3,
                duration: 1000,
                frames: [
                    `img/${species}/play1.png`,
                    `img/${species}/play2.png`,
                    `img/${species}/play3.png`
                ]
            }
        };
    },

    animateImage(imgElement, animation) {
        return new Promise((resolve) => {
            const { frames, repeat, duration } = animation;
            const totalFrames = frames.length;
            const frameDuration = duration / totalFrames;

            let loop = 0;
            let index = 0;

            const showNextFrame = () => {
                imgElement.src = frames[index];
                index++;
                if (index >= totalFrames) {
                    index = 0;
                    loop++;
                }

                if (loop >= repeat) {
                    resolve();
                } else {
                    setTimeout(showNextFrame, frameDuration);
                }
            };

            showNextFrame();
        });
    }
};

console.log('AnimationPlayer loaded');
