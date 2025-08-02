// Shortened temperature conversion script
function unitName(short) {
    switch (short) {
        case "C": return "Celsius";
        case "F": return "Fahrenheit";
        case "K": return "Kelvin";
        case "R": return "Rankine";
        default: return "";
    }
}
// Function to convert temperatures
function convert() {
    const tempInput = document.getElementById("tempInput");
    const fromSelect = document.getElementById("fromUnit");
    const toSelect = document.getElementById("toUnit");
    const result = document.getElementById("result");

    const temp = parseFloat(tempInput.value);
    const fromUnit = fromSelect.value;
    const toUnit = toSelect.value;

    // Check for negative temperatures in Kelvin
    if (fromUnit === "K" && temp < 0) {
        result.textContent = "🚫 Kelvin cannot be negative.";
        return;
    }
    
    if (isNaN(temp)) {
        result.textContent = "Please enter a valid temperature.";
        return;
    }

    // If the same units are selected, automatically change the toUnit
    if (fromUnit === toUnit) {
        const options = Array.from(toSelect.options).map(opt => opt.value);
        const newToUnit = options.find(opt => opt !== fromUnit) || fromUnit;
        toSelect.value = newToUnit;
    }

    // Get the current toUnit again
    const currentToUnit = toSelect.value;

    let convertedTemp;

    if (fromUnit === "C") {
        if (currentToUnit === "F") {
            convertedTemp = (temp * 9 / 5) + 32;
        } else if (currentToUnit === "K") {
            convertedTemp = temp + 273.15;
        } else if (currentToUnit === "R") {
            convertedTemp = (temp * 9 / 5) + 491.67;
        }
    } else if (fromUnit === "F") {
        if (currentToUnit === "C") {
            convertedTemp = (temp - 32) * 5 / 9;
        } else if (currentToUnit === "K") {
            convertedTemp = (temp - 32) * 5 / 9 + 273.15;
        } else if (currentToUnit === "R") {
            convertedTemp = temp + 459.67;
        }
    } else if (fromUnit === "K") {
        if (currentToUnit === "C") {
            convertedTemp = temp - 273.15;
        } else if (currentToUnit === "F") {
            convertedTemp = (temp - 273.15) * 9 / 5 + 32;
        } else if (currentToUnit === "R") {
            convertedTemp = temp * 9 / 5;
        }
    } else if (fromUnit === "R") {
        if (currentToUnit === "C") {
            convertedTemp = (temp - 491.67) * 5 / 9;
        } else if (currentToUnit === "F") {
            convertedTemp = temp - 459.67;
        } else if (currentToUnit === "K") {
            convertedTemp = temp * 5 / 9;
        }
    }

    if (convertedTemp === undefined) {
        result.textContent = "Error: Please select different units.";
        return;
    }

    result.textContent = `Result: ${convertedTemp.toFixed(2)}° ${unitName(currentToUnit)}`;
}

// Swap button functionality and update result
document.getElementById("swapBtn").addEventListener("click", () => {
    const fromSelect = document.getElementById("fromUnit");
    const toSelect = document.getElementById("toUnit");

    const tempValue = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tempValue;

    convert();
});

// Function to synchronize units
function syncUnits(changedSelect, otherSelect) {
    if (changedSelect.value === otherSelect.value) {
        const options = Array.from(otherSelect.options).map(opt => opt.value);
        const newUnit = options.find(opt => opt !== changedSelect.value) || changedSelect.value;
        otherSelect.value = newUnit;
    }
}

// Event listeners
document.getElementById("fromUnit").addEventListener("change", () => {
    syncUnits(document.getElementById("fromUnit"), document.getElementById("toUnit"));
    convert();
});
document.getElementById("toUnit").addEventListener("change", () => {
    syncUnits(document.getElementById("toUnit"), document.getElementById("fromUnit"));
    convert();
});

/* // If you want to convert instantly while typing in the input:
document.getElementById("tempInput").addEventListener("input", () => {
    convert();
}); */
