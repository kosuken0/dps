document.getElementById("calculateButton").addEventListener("click", function () {
    const resultElement = document.getElementById("result");
    
    try {
        const r1 = parseFloat(document.getElementById("r1").value) || 0;
        const r2 = parseFloat(document.getElementById("r2").value) || 0;
        const d = parseFloat(document.getElementById("d").value) || 0;
        const ph = parseFloat(document.getElementById("ph").value) || 0;
        const pd = parseFloat(document.getElementById("pd").value) || 0;
        const pa = parseFloat(document.getElementById("pa").value) || 0;
        const pr = parseFloat(document.getElementById("pr").value) || 0;
        const rs = parseFloat(document.getElementById("rs").value) || 0;
        const md = parseFloat(document.getElementById("md").value) || 0;
        const ma = parseFloat(document.getElementById("ma").value) || 0;
        const am = parseFloat(document.getElementById("am").value) || 0;
        const bd = parseFloat(document.getElementById("bd").value) || 0;
        const po = parseFloat(document.getElementById("po").value) || 0;
        const tp = parseFloat(document.getElementById("tp").value) || 0;
        const ld = parseFloat(document.getElementById("ld").value) || 0;
        const caseType = document.getElementById("case").value;
        
        console.log("version 80 bajillion");

        let delta_norm, delta_poison, delta_lightn;
        const theta = Math.acos(-1 + ((r1 ** 2 - r2 ** 2 + d ** 2) ** 2) / (2 * d ** 2 * r1 ** 2));
        console.log(`Theta: ${theta}`);

        if (pa >= md) {
            // Use Infinite Hit Calculator
            const delta = (((pd - ma + bd) * am) * (Math.ceil((theta / rs) * 25))) / (2 * Math.PI / rs);
            console.log("Infinite Hit DPS Calculation:");
            console.log(`Theta (Infinite Hit): ${theta}`);
            
            resultElement.textContent = `Infinite Hit DPS: ${delta}`;
            return; // Exit the function early
        }

        console.log("Normal Calculation:");

        const eta = Math.ceil(ph / (md - pa));
        console.log(`Eta: ${eta}`);

        const tau = Math.max(0, ((2 * Math.PI + theta - (rs / (1 / pr))) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - theta / 2);
        console.log(`Tau: ${tau}`);

        switch (caseType) {
            case 'normal':
                {
                    const numr = (pd - ma + bd) * am * eta;
                    console.log(`Numer: ${numr}`);

                    const den1 = (eta * 0.04) / (theta / rs);
                    console.log(`Denominator 1: ${den1}`);

                    const den2 = Math.floor(den1 * ((2 * Math.PI - theta) / rs));
                    console.log(`Denominator 2: ${den2}`);

                    const den3 = den2 + (eta * 0.04);
                    console.log(`Denominator 3: ${den3}`);

                    const den4 = den3 + pr;
                    console.log(`Denominator 4: ${den4}`);

                    const denom = den4 + (tau / rs);
                    console.log(`Denominator (Final): ${denom}`);

                    delta_norm = numr / denom;
                    console.log(`Delta (Normal): ${delta_norm.toFixed(2)}`);

                    break;
                }
            case 'poison':
                {
                    const numr = (pd - ma + bd) * am * eta;
                    console.log(`Numer: ${numr}`);

                    const den1 = (eta * 0.04) / (theta / rs);
                    console.log(`Denominator 1: ${den1}`);

                    const den2 = Math.floor(den1 * ((2 * Math.PI - theta) / rs));
                    console.log(`Denominator 2: ${den2}`);

                    const den3 = den2 + (eta * 0.04);
                    console.log(`Denominator 3: ${den3}`);

                    const den4 = den3 + pr;
                    console.log(`Denominator 4: ${den4}`);

                    const denom = den4 + (tau / rs);
                    console.log(`Denominator (Final): ${denom}`);

                    delta_norm = numr / denom;
                    console.log(`Delta (Normal): ${delta_norm.toFixed(2)}`);

                    const pden = (po / tp) + Math.max(0, ((2 * Math.PI - theta) / rs) - rs);
                    console.log(`Poison Denominator: ${pden}`);

                    delta_poison = tp / pden;
                    console.log(`Delta (Poison): ${delta_poison.toFixed(2)}`);

                    break;
                }
            case 'lightning':
                {
                    const le1 = (2 * Math.PI - (rs / (1 / pr))) / rs;
                    console.log(`Lightning Equation 1: ${le1}`);

                    const le2 = pr + 0.04 + le1;
                    console.log(`Lightning Equation 2: ${le2}`);

                    delta_lightn = (ld * am) / le2;
                    console.log(`Delta (Lightning): ${delta_lightn.toFixed(2)}`);

                    break;
                }
            default:
                throw new Error("Invalid case selected.");
        }

        switch (caseType) {
            case 'normal':
                resultElement.textContent = `Single petal DPS (Normal): ${delta_norm.toFixed(2)}`;
                break;
            case 'poison':
                resultElement.textContent = `Single petal DPS (Normal + Poison): ${(delta_norm + delta_poison).toFixed(2)}`;
                break;
            case 'lightning':
                resultElement.textContent = `Single petal DPS (Lightning): ${delta_lightn.toFixed(2)}`;
                break;
        }
    } catch (e) {
        resultElement.textContent = `Error: ${e.message}`;
    }
});



// fuck you codeminers
