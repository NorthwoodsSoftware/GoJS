/*
 *  Copyright (C) 1998-2024 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

class DarkThemeGenerator {
    // Used for cloning a Theme
    // Taken from https://www.geeksforgeeks.org/how-to-deep-clone-an-object-preserve-its-type-with-typescript/#
    static deepClone(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        const res = Array
            .isArray(obj) ? [] : {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                res[key] = this.deepClone(obj[key]);
            }
        }
        return Object.assign(res, obj);
    }
    // Converts a color to its dark mode variant. This function has no side effects
    static convertBrushLike(property, brushLike) {
        // Trivial case of null color
        if (!brushLike)
            return null;
        // Normal case of a color string
        if (typeof brushLike === 'string') {
            return new go.Brush(this.convertColor(property, brushLike));
        }
        // If the brushLike is a Brush, copy it to avoid side effects
        const brush = brushLike.copy();
        // Brush types could be used instead of checking for the existence of properties, but this is more flexible, and ensures all colors in a brush are converted
        // Change the color is there is one
        if (brush.color) {
            brush.color = this.convertColor(property, brush.color);
        }
        // Change the color stops if there are any
        if (brush.colorStops) {
            brush.colorStops = brush.colorStops.map(colorStop => this.convertColor(property, colorStop.value));
        }
        return brush;
    }
    // Converts a color based on property name and the color itself
    static convertColor(property, color) {
        const result = color;
        // If the property matches any of these predefined names, treat them differently.
        // Otherwise, generically convert them
        return result;
    }
    // Recurse through all colors in a themeColor, converting them and applying them to a new object. This function has no side effects
    static convertThemeColor(themeColor, convert) {
        const result = {};
        for (const [property, value] of Object.entries(themeColor)) {
            let convertedValue;
            // Base case of undefined
            if (!value) {
                convertedValue = undefined;
            }
            // Base case of a BrushLike
            else if (typeof value === 'string' || value instanceof go.Brush) {
                convertedValue = convert(value);
            }
            // Base case of an array
            else if (Array.isArray(value)) {
                convertedValue = value.map(color => convert(property, color));
            }
            // Recursive case of ThemeColors
            else {
                convertedValue = this.convertThemeColor(value, convert);
            }
            result[property] = convertedValue;
        }
        return result;
    }
    // Copies a theme and converts it to dark mode. This function has no side effects
    static generateDarkTheme(theme) {
        if (!theme.colors)
            return theme;
        const darkThemeColors = this.convertThemeColor(theme === null || theme === void 0 ? void 0 : theme.colors, this.convertBrushLike);
        const darkTheme = this.deepClone(theme);
        darkTheme.colors = darkThemeColors;
        return darkTheme;
    }
    /**
     * Apply theme bindings to every color related property on any templates associated with a diagram.
     * @param diagram
     * @param theme
     */
    static style(diagram, theme) {
        // Iterate through each type of template
        DarkThemeGenerator.templateIterators.forEach(nextTemplate => {
            const templateMapIterator = nextTemplate(diagram).iterator;
            // Iterate through each template
            templateMapIterator.each(pair => {
                const template = pair.value;
                // Recursively iterate through each object
                this.recurseElements(template, this.applyTheme);
            });
        });
    }
    /**
     * Recursively call a function with all GraphObjects on a Panel
     * @param panel
     * @param func
     */
    static recurseElements(panel, func) {
        const elementIterator = panel.elements.iterator;
        // Base case 1 - Object could have elements but has none
        if (!elementIterator.hasNext())
            func(panel);
        // Iterate through panel's objects and apply function
        elementIterator.each(object => {
            func(object);
            // Recursive case - Object is a panel and may have more objects
            if (object instanceof go.Panel)
                this.recurseElements(object, func);
        });
    }
    /**
     * Add a theme binding to each color-related property on a GraphObject
     * @param element
     */
    static applyTheme(element) {
        // Get the GraphObject's set of color properties
        const properties = DarkThemeGenerator.getColorProperties(element);
        if (properties.size === 0)
            return;
        // Apply the theme to each one
        properties.forEach((property) => {
            // Find the matching theme property
            const value = DarkThemeGenerator.propertyColors.get(property); // Use class name since function is passed anonymously
            if (value)
                element.theme(property, value);
        });
    }
}
/**
 * Predefined functions for accessing a diagrams different template maps
 */
DarkThemeGenerator.templateIterators = new Set([
    diagram => diagram.nodeTemplateMap,
    diagram => diagram.linkTemplateMap,
    diagram => diagram.groupTemplateMap
]);
/**
 * Gets the applicable color properties of a GraphObject.
 * This would have been a Map if not for typeof's incompetence
 * @param element
 */
DarkThemeGenerator.getColorProperties = (element) => {
    if (element instanceof go.Shape)
        return new Set(['fill', 'stroke', 'strokeWidth']);
    if (element instanceof go.TextBlock)
        return new Set(['stroke']);
    if (element instanceof go.Panel)
        return new Set(['isShadowed', 'shadowBlur', 'shadowColor', 'shadowOffset']);
    return new Set();
};
/**
 * TODO: figure out what this can do
 */
DarkThemeGenerator.propertyColors = new Map([
    ['fill', 'red'],
    ['stroke', 'green']
]);
