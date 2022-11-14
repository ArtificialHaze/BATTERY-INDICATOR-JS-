initializeBattery();

function initializeBattery() {
  const batteryLiquid = document.querySelector(".battery__liquid");
  const batteryStatus = document.querySelector(".battery__status");
  const batteryPercentage = document.querySelector(".battery__percentage");

  navigator.getBattery().then((battery) => {
    updateBattery = () => {
      let level = Math.floor(battery.level * 100);
      batteryPercentage.innerHTML = level + "%";

      batteryLiquid.style.height = `${parseInt(battery.level * 100)}%`;

      if (level === 100) {
        batteryStatus.innerHTML =
          "Full battery<i class='ri-battery-2-fill green-color'></i>";
        batteryLiquid.style.height = "103%";
      } else if (level <= 25 && !battery.charging) {
        batteryStatus.innerHTML = `Low Battery <i class="ri-plug-line"></i>`;
      } else if (battery.charging) {
        batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
      } else {
        batteryStatus.innerHTML = "";
      }
      if (level <= 25) {
        batteryLiquid.classList.add("gradient-color-red");
        batteryLiquid.classList.remove(
          "gradient-color-yellow",
          "gradient-color-orange",
          "gradient-color-green"
        );
      } else if (level <= 50) {
        batteryLiquid.classList.add("gradient-color-orange");
        batteryLiquid.classList.remove(
          "gradient-color-yellow",
          "gradient-color-red",
          "gradient-color-green"
        );
      } else if (level <= 75) {
        batteryLiquid.classList.add("gradient-color-yellow");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-red",
          "gradient-color-green"
        );
      } else {
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-red",
          "gradient-color-yellow"
        );
      }
    };

    updateBattery();

    battery.addEventListener("chanrgingchange", () => {
      updateBattery();
    });

    battery.addEventListener("levelchange", () => {
      updateBattery();
    });
  });
}
