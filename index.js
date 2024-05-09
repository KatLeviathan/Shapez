const inquirer = require('inquirer');
const { SVG } = require('@svgdotjs/svg.js');

// Function to create an SVG image based on user input
function createSVGImage(text, textColor, shape, shapeColor) {
    // Create an SVG.js instance
    const svg = SVG().size(300, 200);

    // Add text element with user input text and color
    svg.text(text).font({ size: 48 }).fill(textColor).move(10, 40);

    // Add shape based on user input
    if (shape === 'circle') {
        svg.circle(50).fill(shapeColor).move(150, 100);
    } else if (shape === 'triangle') {
        svg.polygon('150,50 250,150 50,150').fill(shapeColor);
    } else if (shape === 'square') {
        svg.rect(100, 100).fill(shapeColor).move(100, 50);
    }

    // Output the SVG code
    console.log(svg.svg());
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

// Run the prompts
inquirer.prompt(textPrompt)
    .then(answers => {
        const text = answers.text;
        return inquirer.prompt(colorPrompt);
    })
    .then(answers => {
        const textColor = answers.color;
        return inquirer.prompt(shapePrompt);
    })
    .then(answers => {
        const shape = answers.shape;
        return inquirer.prompt(shapeColorPrompt);
    })
    .then(answers => {
        const shapeColor = answers.color;
        createSVGImage(text, textColor, shape, shapeColor);
    })
    .catch(error => {
        console.error('Error:', error);
    });