let total = 200;
let pageThrown = [0,1,2];
let start = 1; // can be any even number

function check() {
    let thrownSheets = new Set();

    for (let i = 0; i < pageThrown.length; i++) {
        let page = pageThrown[i];

        let sheet = Math.floor((page - start) / 2);

        if (sheet >= 0 && page >= start && page < total) {
            thrownSheets.add(sheet);
        }
    }

    console.log("Total thrown sheets (pages):", thrownSheets.size);
}

check();
