document.getElementById("calculateButton").addEventListener("click", function () {
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

    try {
        const theta = 2 * Math.acos((((r1 ** 2 + d ** 2 - r2 ** 2) / (2 * r1 * d))) * (Math.PI / 180));
        const eta = Math.ceil(ph / (md - pa));

        console.log("theta:", theta);
        console.log("eta:", eta);

        let delta_norm, delta_poison, delta_lightn;

        switch (caseType) {
            case 'normal':
                {
                    const numr = (pd - ma + bd) * am * eta;
                    console.log("numr:", numr);
                    const den1 = (eta * 0.04) / (theta / rs);
                    console.log("den1:", den1);
                    const den2 = Math.floor(den1 * ((2 * Math.PI - theta) / rs));
                    console.log("den2:", den2);
                    const den3 = den2 + (eta * 0.04);
                    console.log("den3:", den3);
                    const den4 = den3 + pr;
                    console.log("den4:", den4);
                    const nden = 2 * Math.PI - (rs / (1 / pr));
                    console.log("nden:", nden);
                    const denom = den4 + (nden / rs);
                    console.log("denom:", denom);
                    delta_norm = numr / denom;
                    console.log("delta_norm:", delta_norm);

                    break;
                }
            case 'poison':
                {
                    const numr = (pd - ma + bd) * am * eta;
                    console.log("numr:", numr);
                    const den1 = (eta * 0.04) / (theta / rs);
                    console.log("den1:", den1);
                    const den2 = Math.floor(den1 * ((2 * Math.PI - theta) / rs));
                    console.log("den2:", den2);
                    const den3 = den2 + (eta * 0.04);
                    console.log("den3:", den3);
                    const den4 = den3 + pr;
                    console.log("den4:", den4);
                    const nden = 2 * Math.PI - (rs / (1 / pr));
                    console.log("nden:", nden);
                    const denom = den4 + (nden / rs);
                    console.log("denom:", denom);
                    delta_norm = numr / denom;
                    console.log("delta_norm:", delta_norm);

                    const pden = (po / tp) + Math.max(0, ((2 * Math.PI - theta) / rs) - rs);
                    console.log("pden:", pden);
                    delta_poison = tp / pden;
                    console.log("delta_poison:", delta_poison);

                    break;
                }
            case 'lightning':
                {
                    const le1 = (2 * Math.PI - (rs / (1 / pr))) / rs;
                    console.log("le1:", le1);
                    const le2 = pr + 0.04 + le1;
                    console.log("le2:", le2);
                    delta_lightn = (ld * am) / le2;
                    console.log("delta_lightn:", delta_lightn);

                    break;
                }
            default:
                throw new Error("Invalid case selected.");
        }

        const resultElement = document.getElementById("result");
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
        const resultElement = document.getElementById("result");
        resultElement.textContent = `Error: ${e.message}`;
    }
});
