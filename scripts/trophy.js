export function showTrophyCelebration(winnerName) {
    const modal = document.getElementById("trophyModal");
    const messageBox = modal.querySelector(".modal-content");
    messageBox.textContent = `🏆 Hurra! ${winnerName} är den sista Tamagotchin kvar!`;
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  
    [...Array(10)].forEach((_, i) => {
      const muffin = document.createElement("div");
      muffin.classList.add("falling-muffin");
      muffin.textContent = "🧁";
      muffin.style.left = `${Math.random() * 90 + 5}%`;
      muffin.style.animationDelay = `${i * 0.3}s`;
      document.getElementById("falling-muffins-container").appendChild(muffin);
    });
  
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.style.display = "none";
      document.getElementById("falling-muffins-container").innerHTML = "";
    }, 5000);
  }
  