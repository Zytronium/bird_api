document.addEventListener('DOMContentLoaded', () => {
  const override_btn = document.getElementById("override");
  const video = document.createElement("video");
  const body = document.body;

  override_btn.addEventListener("click", async () => {
    // Create video element
    video.src = "/videos/abc.webm";
    video.playsInline = true;
    video.loop = true;
    document.body.appendChild(video);

    // Unmute and show video
    video.style.display = "block";
    video.muted = false;
    video.controls = false;
    document.body.style.cursor = "none";

    // Try to fullscreen video
    await fullscreen_video();

    // Precent right clicks
    document.addEventListener("contextmenu", e => e.preventDefault());

    // Play it
    try {
      await video.play();
      body.style.cursor = "none";
      video.controls = false;
    } catch (err) {
      video.addEventListener("click", async () => {
        await video.play();
        body.style.cursor = "none";
        video.controls = false;
      })
      video.addEventListener("click", async () => {
        await fullscreen_video();
      })
      alert("Your browser blocked autoplay. Click again.");
    }

    video.addEventListener("pause", async () => {
      await video.play();
      video.controls = false;
    })

    // Prevent controls on fullscreen and cursor/right clicks else
    video.addEventListener("fullscreenchange", async e => {
      if (document.fullscreenElement == null) {
        // We are exiting fullscreen
        video.style.pointerEvents = "";
      }
      else {
        // We are entering fullscreen
        video.style.pointerEvents = "none";
      }
    });

    async function fullscreen_video() {
      try {
        // Try to go fullscreen
        if (video.requestFullscreen) {
          await video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          await video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          await video.msRequestFullscreen();
        }
      } catch (e) {
        console.error(e);
        // Fullscreen might fail, continue anyway
      }
    }
  });
});
