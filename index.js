const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Define the SVG class with text, shape, and color properties
class SVG {
    constructor() {
        this.text = "";
        this.shape = "";
        this.color = "";
    }

    setText(text) {
        this.text = text;
    }

    setShape(shape) {
        this.shape = shape;
    }

    setColor(color) {
        this.color = color;
    }

    generateSVGCode() {
        // Generate the SVG code based on the text, shape, and color properties
        const svgCode = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <${this.shape} cx="100" cy="100" r="100" stroke="green" stroke-width="4" fill=${this.color} />
            <text x="100" y="100" fill="black">${this.text}</text>
        </svg>`;

        return svgCode;
    }
}

// Function to save the SVG image to a file in the logo.svg folder
function saveSVGToFile(svgCode) {
    const folderPath = path.join(__dirname, 'logo.svg');
    const filePath = path.join(folderPath, 'logo.svg');

    fs.mkdirSync(folderPath, { recursive: true }); // Create the folder if it doesn't exist

    fs.writeFile(filePath, svgCode, (err) => {
        if (err) {
            console.error('Error saving SVG file:', err);
        } else {
            console.log('SVG file saved as logo.svg in logo.svg folder');
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

// Run the prompts for user input
inquirer.prompt(textPrompt)
    .then(textAnswers => {
        const text = textAnswers.text;

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

        inquirer.prompt(textColorPrompt)
            .then(textColorAnswers => {
                const textColor = textColorAnswers.textColor;

                inquirer.prompt(shapePrompt)
                    .then(shapeAnswers => {
                        const shape = shapeAnswers.shape;

                        inquirer.prompt(shapeColorPrompt)
                            .then(shapeColorAnswers => {
                                const shapeColor = shapeColorAnswers.shapeColor;
                                shape.setColor(shapeColor);
                                const svg = new SVG();
                                svg.setText(text);
                                svg.setShape(shape);

                                // Generate the SVG code using the SVG class
                                const svgCode = svg.generateSVGCode();

                                // Save the SVG file to the logo.svg folder
                                saveSVGToFile(svgCode);
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })
    .catch(error => {
        console.error('Error:', error);
    });