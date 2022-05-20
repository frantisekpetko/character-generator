const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('./../professions/house.alchymists.json', 'UTF8');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    let arr = [];
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
        arr.push(line);
    }

    fs.writeFileSync('./../professions/house.alchymists.json', JSON.stringify(arr, null, 4), 'UTF8');
}

processLineByLine();