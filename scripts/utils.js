export const imageMap = {
    cat: "tamagochi-1.png",
    dog: "tamagochi-2.png",
    rabbit: "tamagochi-3.png",
    parrot: "tamagochi-4.png",
  };
  
  export const nameSuggestions = [
    "Tamagotchi", "Mametchi", "Kuchipatchi", "Memetchi", "Gozarutchi",
    "Lovelitchi", "Maskutchi", "Nyatchi", "Sebiretchi", "Mimitchi"
  ];
  
  export function logActivity(message, type = "default") {
    const logList = document.getElementById("log-list");
    const logItem = document.createElement("li");
    const time = new Date().toLocaleString();
    logItem.innerHTML = `<strong>[${time}]</strong> ${message}`;
    logItem.classList.add("log-item", type);
    logList.appendChild(logItem);
  }
  
  export function getElapsedTime(startTime) {
    const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
  }
  
  export function populateNameOptions() {
    const nameSelect = document.getElementById("pet-name");
    if (!nameSelect) return;
    nameSelect.innerHTML = '<option value="">-- Select a pet name --</option>';
    nameSuggestions.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      nameSelect.appendChild(option);
    });
  }
  
  
  