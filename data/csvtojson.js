const [
    fs,
    readline
]
    = [
    require('fs'),
    require('readline')
];

const src = fs.createReadStream('cars.csv');
const dest = fs.createWriteStream('cars.js');

const reader = readline.createInterface({
    input: src
});

const data = [];
let isHeader = true;
let headers;

reader.on('line', (line) => {
    if (isHeader) {
        headers = line.split(';');
        isHeader = false;
    }
    else {
        data.push(line.split(';').reduce((obj, val, ind) => {
            obj[headers[ind]] = val;
            return obj;
        }, {}));
    }
});

reader.on('close', () => {
    // console.log('close', JSON.stringify(data));
    dest.write('var data = ' + JSON.stringify(data));
});


