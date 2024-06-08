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
        const theta = 2 * Math.acos(((r1 ** 2 + d ** 2 - r2 ** 2) / (2 * r1 * d))) * (Math.PI / 180);
        const eta = Math.ceil(ph / (md - pa));

        let delta_norm, delta_poison, delta_lightn;

        switch (caseType) {
            case 'normal':
                {
                    const numr = (pd - ma + bd) * am * eta;
                    const den1 = (eta * 0.04) / (theta / rs);
                    const den2 = Math.floor(den1 * ((2 * Math.PI - theta) / rs));
                    const den3 = den2 + (eta * 0.04);
                    const den4 = den3 + pr;
                    const nden = 2 * Math.PI - (rs / (1 / pr));
                    const denom = den4 + (nden / rs);
                    delta_norm = numr / denom;
                    break;
                }
            case 'poison':
                {
                    const numr = (pd - ma + bd) * am * eta;
                    const den1 = (eta * 0.04) / (theta / rs);
                    const den2 = Math.floor(den1 * ((2 * Math.PI - theta) / rs));
                    const den3 = den2 + (eta * 0.04);
                    const den4 = den3 + pr;
                    const nden = 2 * Math.PI - (rs / (1 / pr));
                    const denom = den4 + (nden / rs);
                    delta_norm = numr / denom;

                    const pden = (po / tp) + Math.max(0, ((2 * Math.PI - theta) / rs) - rs);
                    delta_poison = tp / pden;
                    break;
                }
            case 'lightning':
                {
                    const le1 = (2 * Math.PI - (rs / (1 / pr))) / rs;
                    const le2 = pr + 0.04 + le1;
                    delta_lightn = (ld * am) / le2;
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
