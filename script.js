function calculate() {
    const r1 = parseFloat(document.getElementById('r1').value);
    const r2 = parseFloat(document.getElementById('r2').value);
    const d = parseFloat(document.getElementById('d').value);
    const ph = parseFloat(document.getElementById('ph').value);
    const pd = parseFloat(document.getElementById('pd').value);
    const pa = parseFloat(document.getElementById('pa').value);
    const pr = parseFloat(document.getElementById('pr').value);
    const rs = parseFloat(document.getElementById('rs').value);
    const md = parseFloat(document.getElementById('md').value);
    const ma = parseFloat(document.getElementById('ma').value);

    let output = "";

    try {
        if (md - pa <= 0) {
            throw new Error("Division by zero encountered in h_n calculation.");
        }
        const h_n = Math.ceil(ph / (md - pa));
        console.log("hit num:", h_n);
        output += `hit num: ${h_n}\n`;

        const cos_theta = (Math.pow(r1, 2) + Math.pow(d, 2) - Math.pow(r2, 2)) / (2 * r1 * d);
        if (cos_theta < -1 || cos_theta > 1) {
            throw new Error("cos_theta is out of range. Check the input values.");
        }
        const theta = 2 * Math.acos(cos_theta);
        console.log("theta:", theta);
        output += `theta: ${theta}\n`;

        const f_1 = h_n * (pd - ma);
        console.log("total dmg:", f_1);
        output += `total dmg: ${f_1}\n`;

        const term1 = h_n * 0.04 / (theta / rs);
        const floor_term = Math.floor(term1);
        console.log("times it overrotates:", floor_term);
        output += `times it overrotates: ${floor_term}\n`;

        const denominator = (floor_term * ((2 * Math.PI - theta) / rs)) + (h_n * 0.04) + pr;
        console.log("time to break:", denominator);
        output += `time to break: ${denominator}\n`;

        if (denominator <= 0) {
            throw new Error("Division by zero or negative denominator encountered in delta calculation.");
        }

        const delta = f_1 / denominator;
        console.log("Single petal DPS (delta):", delta);
        output += `Single petal DPS (delta): ${delta}\n`;

    } catch (e) {
        console.error(e.message);
        output += `Error: ${e.message}\n`;
    }

    const outputContainer = document.createElement('div');
    outputContainer.className = 'output-box';
    outputContainer.innerText = output;
    document.getElementById("output").innerHTML = ''; // Clear previous output
    document.getElementById("output").appendChild(outputContainer);
}

document.getElementById("calculateButton").addEventListener("click", calculate);
