class Shape {
    constructor() {
        this.color = "";
    }

    setColor(color) {
        this.color = color;
    }
}

class Circle extends Shape {
    constructor() {
        super();
        this.radius = 50; // Default radius for the circle
    }

    render() {
        return `<circle cx="100" cy="100" r="${this.radius}" fill="${this.color}" />`;
    }
}

class Triangle extends Shape {
    constructor() {
        super();
        this.sideLength = 50; // Default side length for the triangle
    }

    render() {
        return `<polygon points="100,50 150,100 50,100" fill="${this.color}" />`;
    }
}

class Square extends Shape {
    constructor() {
        super();
        this.sideLength = 50; // Default side length for the square
    }

    render() {
        return `<rect x="75" y="75" width="${this.sideLength}" height="${this.sideLength}" fill="${this.color}" />`;
    }
}