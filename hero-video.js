(function () {
  const video = document.getElementById("hero-video");
  const play = document.querySelector(".media__play");
  if (!video || !play) return;

  function hasSource() {
    return Boolean(video.currentSrc || video.src || video.querySelector("source"));
  }

  function syncReadyClass() {
    if (hasSource() && video.readyState >= 2) {
      video.classList.add("is-ready");
    }
  }

  syncReadyClass();
  video.addEventListener("loadeddata", () => {
    syncReadyClass();
    video.play().catch(() => { });
  });

  play.addEventListener("click", async () => {
    if (!hasSource()) return;
    try {
      await video.play();
      play.classList.add("is-hidden");
      play.setAttribute("aria-label", "Pause video");
    } catch {
      /* autoplay blocked or no data */
    }
  });

  video.addEventListener("pause", () => {
    play.classList.remove("is-hidden");
    play.setAttribute("aria-label", "Play video");
  });

  video.addEventListener("play", () => {
    play.classList.add("is-hidden");
  });

  video.addEventListener("click", () => {
    if (!hasSource() || video.paused) return;
    video.pause();
  });
})();
