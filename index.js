const fs = require('fs');
const inquirer = require('inquirer');

// Function to save the SVG image to a file
function saveSVGToFile(svgCode) {
    fs.writeFile('logo.svg', svgCode, (err) => {
        if (err) {
            console.error('Error saving SVG file:', err);
        } else {
            console.log('SVG file saved as logo.svg');
            console.log('Generated logo.svg');
        }
    });
}

// Prompts for user input
const textPrompt = {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters:'
};

const textColorPrompt = {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (color keyword or hexadecimal number):'
};

const shapePrompt = {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['circle', 'triangle', 'square']
};

const shapeColorPrompt = {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape\'s color (color keyword or hexadecimal number):'
};

// Run the prompts and save the SVG image to a file
inquirer.prompt(textPrompt)
    .then(textAnswers => {
        const text = textAnswers.text;
        return inquirer.prompt(textColorPrompt)
            .then(textColorAnswers => {
                const textColor = textColorAnswers.textColor;
                return inquirer.prompt(shapePrompt)
                    .then(shapeAnswers => {
                        const shape = shapeAnswers.shape;
                        return inquirer.prompt(shapeColorPrompt)
                            .then(shapeColorAnswers => {
                                const shapeColor = shapeColorAnswers.shapeColor;
                                const svgCode = createSVGImage(text, textColor, shape, shapeColor);
                                saveSVGToFile(svgCode);
                            });
                    });
            });
    })
    .catch(error => {
        console.error('Error:', error);
    });


// Function to create SVG image based on user inputs
function createSVGImage(text, textColor, shape, shapeColor) {
    let svgCode = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">`;

    // Add the shape element based on the user's choice
    switch (shape) {
        case 'circle':
            svgCode += new Circle().setColor(shapeColor).render();
            break;
        case 'triangle':
            svgCode += new Triangle().setColor(shapeColor).render();
            break;
        case 'square':
            svgCode += new Square().setColor(shapeColor).render();
            break;
        default:
            console.error('Invalid shape selected');
            return '';
    }

    // Add the text element to the SVG
    svgCode += `<text x="100" y="150" fill="${textColor}" font-size="20" text-anchor="middle">${text}</text>`;

    svgCode += `</svg>`;

    return svgCode;
}

// Run the prompts and save the SVG image to a file
inquirer.prompt(textPrompt)
    .then(textAnswers => {
        const text = textAnswers.text;
        return inquirer.prompt(textColorPrompt)
            .then(textColorAnswers => {
                const textColor = textColorAnswers.textColor;
                return inquirer.prompt(shapePrompt)
                    .then(shapeAnswers => {
                        const shape = shapeAnswers.shape;
                        return inquirer.prompt(shapeColorPrompt)
                            .then(shapeColorAnswers => {
                                const shapeColor = shapeColorAnswers.shapeColor;
                                const svgCode = createSVGImage(text, textColor, shape, shapeColor);
                                saveSVGToFile(svgCode);
                            });
                    });
            });
    })
    .catch(error => {
        console.error('Error:', error);
    });