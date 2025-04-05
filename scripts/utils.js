export function populateNameOptions(nameSuggestions) {
    const nameSelect = document.getElementById("pet-name");
  
    console.log("⛳ nameSelect found?", nameSelect);  // ✅ 콘솔 확인
  
    if (!nameSelect) {
      console.warn("⚠️ No element with id 'pet-name' found!");
      return;
    }
  
    nameSelect.innerHTML = '<option value="">-- Select a pet name --</option>';
  
    nameSuggestions.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      nameSelect.appendChild(option);
    });
  
    console.log("✅ Pet names populated:", nameSuggestions);
  }
  
  
  
  
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
  