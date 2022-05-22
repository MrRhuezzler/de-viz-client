const { accentColors } = require('../data/colors');

for (let color of Object.keys(accentColors)) {
    console.log(`.${color}{--accent : "${accentColors[color]}"}`);
}