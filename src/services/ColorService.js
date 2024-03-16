class ColorService {
    constructor() {}

    setTheme(setColor, themeColor) {
        const arrLettersOfColor = [0, 0, 0]
          
        if (themeColor.length == 6) {
            arrLettersOfColor[0] = parseInt(themeColor[0], 16);
            arrLettersOfColor[1] = parseInt(themeColor[2], 16);
            arrLettersOfColor[2] = parseInt(themeColor[4], 16);
        } else if (themeColor.length == 3) {
            arrLettersOfColor[0] = parseInt(themeColor[0], 16);
            arrLettersOfColor[1] = parseInt(themeColor[1], 16);
            arrLettersOfColor[2] = parseInt(themeColor[2], 16);
        }

        if ((arrLettersOfColor[0] + arrLettersOfColor[1] + arrLettersOfColor[2]) / 3 < 8) {
            setColor({
                color: themeColor,
                textColor: 'ffffff'
            });
        } else {
            setColor({
                color: themeColor,
                textColor: '000000'
            })
        }
    }
    getBorderBottom(color, hight = 2) {
        return `${hight}px solid ${'#' + color}`;
    }
    getColorWithOpacity(value, colorDec = '0, 0, 0') {
        return `rgba(${colorDec}, ${value})`
    }
    getHoverColor(themeColor) {
        let hoverColor = ''

        if (themeColor.length == 6) {
            hoverColor += (parseInt(themeColor[0], 16) < 2) ? (parseInt(themeColor[0], 16) + 2).toString(16) : (parseInt(themeColor[0], 16) -2).toString(16);
            hoverColor += themeColor[1]
            hoverColor += (parseInt(themeColor[2], 16) < 2) ? (parseInt(themeColor[2], 16) + 2).toString(16) : (parseInt(themeColor[2], 16) -2).toString(16);
            hoverColor += themeColor[3]
            hoverColor += (parseInt(themeColor[4], 16) < 2) ? (parseInt(themeColor[4], 16) + 2).toString(16) : (parseInt(themeColor[4], 16) -2).toString(16);
            hoverColor += themeColor[5]
        } else if (themeColor.length == 3) {
            hoverColor += (parseInt(themeColor[0], 16) < 2) ? (parseInt(themeColor[0], 16) + 2).toString(16) : (parseInt(themeColor[0], 16) -2).toString(16);
            hoverColor += (parseInt(themeColor[1], 16) < 2) ? (parseInt(themeColor[1], 16) + 2).toString(16) : (parseInt(themeColor[1], 16) -2).toString(16);
            hoverColor += (parseInt(themeColor[2], 16) < 2) ? (parseInt(themeColor[2], 16) + 2).toString(16) : (parseInt(themeColor[2], 16) -2).toString(16);
        }

        return hoverColor;
    }
    colorValidation(color) {
        return ((/^[a-f0-9]{6}$/iu.test(color)) || (/^[a-f0-9]{3}$/iu.test(color)));
    }
}

module.exports = new ColorService();