// flip.js
// This file contains the logic for simulating a coin flip.

"use strict";

let virginCount = 0; // Counter for the number of flips
let eagleCount = 0; // Counter for the number of flips
let result = ''; // Variable to store the result of the coin flip

// Function to simulate a coin flip
function flipCoin() {
    result = Math.random() < 0.5 ? 'Panna' : 'Orel';
    console.log(`${result}!`);
    return result;
}

// Připojení události kliknutí k tlačítku
document.addEventListener('DOMContentLoaded', () => {
  const virginCountText = document.getElementById("virginCount");
  const eagleCountText = document.getElementById("eagleCount");
  const resultText = document.getElementById("resultText");  
  const circle = document.getElementById("circle");
  const shadow = document.getElementById("shadow");
  const flipButton = document.getElementById("flipButton");
  const checkButton = document.getElementById("checkButton");
  const images = [
      'assets/orel_cropped_2.png', // Obrázek pro "Orel"
      'assets/panna_cropped_2.png' // Obrázek pro "Panna"
  ];

  let angle = 0;
  let previousResult = ''; // Proměnná pro uchování předchozího výsledku
  
  function reliabilityCheck() {
    eagleCount = 0; // Reset počtu "Orel"
    virginCount = 0; // Reset počtu "Panna"
    for (let i = 0; i < 1000; i++) {
        flipCoin();
        if (result === 'Orel') {
            eagleCount++;
            eagleCountText.textContent = eagleCount; // Aktualizace počtu "Orel"
        } else if (result === 'Panna') {
            virginCount++;
            virginCountText.textContent = virginCount; // Aktualizace počtu "Panna"
        }
    }
  }
  // Funkce pro animaci
  function animateCoin() {
    resultText.textContent = ''; // Vymazání textu výsledku
      shadow.style.visibility = 'visible'; // Zobrazení stínu
      const duration = 249.84; // Délka animace v ms
      let steps; // Počet kroků (360° / 5°), 1x 360° je 72 kroků
      if (result === 'Orel' && previousResult === 'Orel') {
            steps = 360; // Počet kroků pro 360°
        } if (result === 'Panna' && previousResult === 'Panna') {
            steps = 360; // Počet kroků pro 360°
        } if (result === 'Orel' && previousResult === 'Panna') {
            steps = 324; // Počet kroků pro 324°
        } if (result === 'Panna' && previousResult === 'Orel') {
            steps = 324; // Počet kroků pro 324°
        } if (result === 'Orel' && previousResult === '') {
            steps = 360; // Výchozí počet kroků pro 360°
        } if (result === 'Panna' && previousResult === '') {
            steps = 324; // Výchozí počet kroků pro 324°
        }

      const interval = duration / steps; // Interval mezi kroky

      let currentStep = 0;

    // Deaktivace tlačítka
    flipButton.disabled = true;

      const animation = setInterval(() => {
          angle = (angle + 5) % 360; // Zvýšení úhlu o 5°

          // Změna obrázku při 90° a 270°
          if (angle === 90 || angle === 270) {
              const index = angle === 90 ? 1 : 0; // 90° = "Panna", 270° = "Orel"
              circle.style.backgroundImage = `url(${images[index]})`;
              circle.style.backgroundSize = 'cover'; // Zajištění pokrytí celého kruhu
              circle.style.backgroundPosition = 'center'; // Vycentrování obrázku
              circle.style.backgroundRepeat = 'no-repeat'; // Zamezení opakování obrázku
          }

          // Nastavení rotace
          circle.style.transform = `rotateX(${angle}deg)`;
          shadow.style.transform = `rotateX(-${angle}deg)`; // Rotace stínu

          //Nastavení pozice
            const parentHeight = circle.parentElement.offsetHeight; // Výška rodičovského prvku
            const currentTopPx = parseFloat(window.getComputedStyle(circle).getPropertyValue('top')); // Hodnota 'top' v pixelech
            const currentTopPercent = (currentTopPx / parentHeight) * 100; // Převod na procenta
            console.log(`Aktuální hodnota coin top: ${currentTopPercent}%`);
            if (currentTopPercent > 5 && currentStep < steps / 2) {
                circle.style.top = currentTopPercent - (70 / steps) + '%';
            } else {
            circle.style.top = currentTopPercent + (70 / steps) + '%';
            }

            //Natavení velikosti coinu
            const currentWidth = parseFloat(window.getComputedStyle(circle).getPropertyValue('width'));
                    //console.log(`Aktuální hodnota width: ${currentWidth}`);
            const currentHeight = parseFloat(window.getComputedStyle(circle).getPropertyValue('height'));
            if (currentStep < steps / 2) {
                circle.style.width = currentWidth + (440 / steps) + 'px';
                circle.style.height = currentHeight + (440 / steps) + 'px';
            } else {
                circle.style.width = currentWidth - (440 / steps) + 'px';
                circle.style.height = currentHeight - (440 / steps) + 'px';
            }

            //Nastavení velikosti stínu
            const currentWidthShadow = parseFloat(window.getComputedStyle(shadow).getPropertyValue('width'));
            const currentHeightShadow = parseFloat(window.getComputedStyle(shadow).getPropertyValue('height'));
                    //console.log(`Aktuální hodnota width: ${currentWidthShadow}`);
            if (currentStep < steps / 2) {
                shadow.style.width = currentWidthShadow + (200 / steps) + 'px';
                shadow.style.height = currentHeightShadow + (200 / steps) + 'px';
            } else {
                shadow.style.width = currentWidthShadow - (200 / steps) + 'px';
                shadow.style.height = currentHeightShadow - (200 / steps) + 'px';
            }

            //Nastavení stínu
            const currentTransparency = parseFloat(window.getComputedStyle(shadow).getPropertyValue('opacity')); // Počáteční průhlednost
            const currentTopPxShadow = parseFloat(window.getComputedStyle(shadow).getPropertyValue('top')); // Počáteční pozice stínu
            const currentTopPercentShadow = (currentTopPxShadow / parentHeight) * 100; // Převod na procenta
                    //console.log(`Aktuální hodnota opacity: ${currentTransparency}`);
            console.log(`Aktuální hodnota shadow top: ${currentTopPercentShadow}%`);
            if (currentStep < steps / 2) {
                shadow.style.opacity = currentTransparency - (0.0035); // Snížení průhlednosti
                //shadow.style.top = currentTopPercentShadow - (2 / steps) + '%'; // Nastavení pozice stínu
            } else {
                shadow.style.opacity = currentTransparency + (0.0035); // Zvětšení průhlednosti
                //shadow.style.top = currentTopPercentShadow + (2 / steps) + '%'; // Nastavení pozice stínu
            }

            // Nastavení rozmazání stínu
            let blur = 0;
            let spread = 0;
            if (currentStep < steps / 2) {
                blur = (10 / (steps / 2)) * currentStep;    // od 0 do 10
                spread = (10 / (steps / 2)) * currentStep;  // od 0 do 10
            } else {
                blur = 10 - (10 / (steps / 2)) * (currentStep - steps / 2);   // zpět na 0
                spread = 10 - (10 / (steps / 2)) * (currentStep - steps / 2); // zpět na 0
            }
            shadow.style.boxShadow = `0px -1px ${blur}px ${spread}px rgb(0, 0, 0)`;

            //Reset
          currentStep++;
          if (currentStep >= steps) {
            resultText.textContent = result; // Zobrazí výsledek po dokončení animace
            if (result === 'Orel') {
                eagleCount++; // Zvětšení počtu "Orel"
                eagleCountText.textContent = eagleCount; // Aktualizace počtu "Orel"
            } if (result === 'Panna') {
                virginCount++; // Zvětšení počtu "Panna"
                virginCountText.textContent = virginCount; // Aktualizace počtu "Panna"
            }
            console.log(result);
            console.log(previousResult);
            if (result === 'Orel' && previousResult === 'Panna') {
                circle.style.rotate = '0deg'; // Nastavení rotace pro "Orel" po "Panna"
            } if (result === 'Panna' && previousResult === 'Orel') {
                circle.style.rotate='180deg'; // Nastavení rotace pro "Panna" po "Orel"
            } if (result === 'Panna' && previousResult === '') {
                circle.style.rotate = '180deg'; // Nastavení rotace pro "Panna" po prvním hodu
            }
            previousResult = result; // Uložení předchozího výsledku
              clearInterval(animation); // Zastavení animace po dokončení
                flipButton.disabled = false; // Aktivace tlačítka po dokončení animace
                circle.style.width = '150px'; // Obnovení šířky
                circle.style.height = '150px'; // Obnovení výšky
                circle.style.top = 'auto'; // Obnovení pozice
                circle.style.bottom = 'auto'; // Obnovení pozice
                shadow.style.top = 'auto'; // Obnovení pozice
                shadow.style.bottom = 'auto'; // Obnovení pozice
                shadow.style.width = '150px'; // Nastavení počáteční šířky stínu
                shadow.style.height = '150px'; // Nastavení počáteční výšky stínu
                shadow.style.boxShadow = '0px -1px 0px 10px rgb(0, 0, 0)'; // Obnovení stínu
                shadow.style.visibility = 'hidden'; // Skrytí stínu
          }
      }, interval);
  }

  // Připojení animace k tlačítku
flipButton.addEventListener('click', flipCoin);
flipButton.addEventListener('click', animateCoin);
checkButton.addEventListener('click', reliabilityCheck);
});