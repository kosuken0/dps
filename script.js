document.getElementById("calculateButton").addEventListener("click", function () {
    const r1 = parseFloat(document.getElementById("r1").value);
    const r2 = parseFloat(document.getElementById("r2").value);
    const d = parseFloat(document.getElementById("d").value);
    const ph = parseFloat(document.getElementById("ph").value);
    const pd = parseFloat(document.getElementById("pd").value);
    const pa = parseFloat(document.getElementById("pa").value);
    const pr = parseFloat(document.getElementById("pr").value);
    const rs = parseFloat(document.getElementById("rs").value);
    const md = parseFloat(document.getElementById("md").value);
    const ma = parseFloat(document.getElementById("ma").value);

    try {
        if (md - pa <= 0) {
            throw new Error("Division by zero encountered in h_n calculation.");
        }
        
        const h_n = Math.ceil(ph / (md - pa));
        const cos_theta = (r1**2 + d**2 - r2**2) / (2 * r1 * d);
        if (cos_theta < -1 || cos_theta > 1) {
            throw new Error("cos_theta is out of range. Check the input values.");
        }
        
        const theta = 2 * Math.acos(cos_theta) * (Math.PI / 180);
        const f_1 = h_n * (pd - ma);
        const term1 = h_n * 0.04 / (theta / rs);
        const floor_term = Math.floor(term1);
        
        const upsilon = rs / (2 * Math.PI - rs / (1 / pr));
        const denominator = (floor_term * ((2 * Math.PI - theta) / rs)) + (h_n * 0.04) + pr + upsilon;
        
        if (denominator <= 0) {
            throw new Error("Division by zero or negative denominator encountered in delta calculation.");
        }
        
        const delta = f_1 / denominator;
        
        // Output the results
        const resultElement = document.getElementById("result");
        resultElement.textContent = `Single petal DPS (delta): ${delta.toFixed(2)}
        \nTheta: ${theta.toFixed(2)}
        \nTotal Damage (f_1): ${f_1.toFixed(2)}
        \nTimes it Overrotates: ${floor_term}
        \nTime to Break (denominator): ${denominator.toFixed(2)}`;
    } catch (e) {
        const resultElement = document.getElementById("result");
        resultElement.textContent = `Error: ${e.message}`;
    }
});
