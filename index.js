const fs = require('fs');
const inquirer = require('inquirer');

// Function to save the SVG image to a file
function saveSVGToFile(svgCode) {
    fs.writeFile('logo.svg', svgCode, (err) => {
        if (err) {
            console.error('Error saving SVG file:', err);
        } else {
            console.log('SVG file saved as logo.svg');
        }
    });
}

// Prompts for user input
const textPrompt = {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters:'
};

const colorPrompt = {
    type: 'input',
    name: 'color',
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
    name: 'color',
    message: 'Enter the shape\'s color (color keyword or hexadecimal number):'
};

// Run the prompts and save the SVG image to a file
inquirer.prompt(textPrompt)
    .then(answers => {
        const text = answers.text;
        return inquirer.prompt(colorPrompt)
            .then(colorAnswers => {
                const textColor = colorAnswers.color;
                return inquirer.prompt(shapePrompt)
                    .then(shapeAnswers => {
                        const shape = shapeAnswers.shape;
                        return inquirer.prompt(shapeColorPrompt)
                            .then(shapeColorAnswers => {
                                const shapeColor = shapeColorAnswers.color;
                                const svgCode = createSVGImage(text, textColor, shape, shapeColor);
                                saveSVGToFile(svgCode);
                            });
                    });
            });
    })
    .catch(error => {
        console.error('Error:', error);
    });

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