export const DISTRICT_STATS = require('./json/district_stats3.json');

const A = 0.6;

export function getPaletteRedGreenBlue() {
    return getPaletteCont(0, 240);
}

export function getPaletteCont(h1, h2) {
    return function (p) {
        const h = h1 + Math.round((h2 - h1) * p);
        return 'hsla(' + h + ', 100%, 50%, ' + A + ')';
    };
}

export function getPaletteBlend(h1, h2) {
    const palette1 = getPaletteOnLight(h1);
    const palette2 = getPaletteOnLight(h2);

    return function (p) {
        if (p < 0.5) {
            return palette1(p * 2);
        }
        return palette2((1 - p) * 2);
    };
}

export function getPaletteOnLight(h) {
    return function (p) {
        const l = 50 + Math.round(50 * p);
        return 'hsla(' + h + ', 100%, ' + l + '%, ' + A + ')';
    };
}


export function getColorStyles(data, keyFunc, valueFunc, palette) {
    const valueList = data.map(
        function (datum) {
            const key = keyFunc(datum);
            const value = valueFunc(datum);
            return [value, key];
        }
    ).sort(
        function (a, b) {
            return a[0] < b[0];
        }
    );

    const n = valueList.length;
    let keyToStyleMap = {};
    let valueColorList = [];
    for (let i in valueList) {
        const [value, key] = valueList[i];
        const color = palette(i * 1.0 / n);
        keyToStyleMap[key] = {fill: color};
        valueColorList.push([value, color]);
    }
    return [keyToStyleMap, valueColorList.reverse()];
}

export function getScale(data, keyFunc, valueFunc, scaleFunc) {
    const densityList = data.map(
        function (datum) {
            const value = valueFunc(datum);
            const scale = scaleFunc(datum);
            return value * 1.0 / scale;
        }
    ).sort(
        function (a, b) {
            return a < b;
        }
    );
    const maxDensity = densityList[0];

    let keyToScaleMap = {};
    let valueDimList = [];
    for (let i in data) {
        const datum = data[i];
        const key = keyFunc(datum);
        const value = valueFunc(datum);
        const scale = scaleFunc(datum);
        const density = value * 1.0 / scale;
        keyToScaleMap[key] = density / maxDensity;
        valueDimList.push([value, value * 3 / maxDensity]);
    }

    valueDimList = valueDimList.sort(
        function (a, b) {
            return a[0] - b[0];
        },
    );
    return [keyToScaleMap, valueDimList];

}
