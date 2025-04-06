export const AnimationPlayer = {
    animateImage(imgElement, frames, repeat = 3, duration = 1000) {
      return new Promise((resolve) => {
        const totalFrames = frames.length;
        const frameDuration = duration / totalFrames;
        let index = 0;
        let loop = 0;
  
        const next = () => {
          imgElement.src = frames[index];
          index = (index + 1) % totalFrames;
          if (index === 0) loop++;
          if (loop < repeat) {
            setTimeout(next, frameDuration);
          } else {
            resolve();
          }
        };
        next();
      });
    }
  };
  