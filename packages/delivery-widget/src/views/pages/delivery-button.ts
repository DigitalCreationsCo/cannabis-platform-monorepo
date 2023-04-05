import fs from 'fs';
import path from 'path';

try {
    const view = fs.readFileSync(path.join(__dirname, './delivery-button.ejs'), 'utf8');
    // ejs.renderFile(view,{})
} catch (error) {
console.log(error)
}