const fs = require('fs');
const inquirer = require('inquirer');

// Define the SVG class with text and shape properties
class SVG {
    constructor() {
        this.text = "";
        this.shape = "";
    }

    setText(text) {
        this.text = text;
    }

    setShape(shape) {
        this.shape = shape;
    }

    generateSVGCode() {
        // Implement this method to generate the SVG code based on the text and shape properties
        // You can use the text and shape properties to create the SVG elements
        // Return the generated SVG code as a string
    }
}

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

                                // Create an instance of the SVG class
                                const svg = new SVG();
                                svg.setText(text);
                                svg.setShape(shape);

                                // Generate the SVG code using the SVG class
                                const svgCode = svg.generateSVGCode();

                                // Save the SVG image to a file
                                saveSVGToFile(svgCode);
                            });
                    });
            });
    })
    .catch(error => {
        console.error('Error:', error);
    });