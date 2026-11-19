export const centerlineHeights = { inches: 57, centimeters: 144 };
export const defaultDistanceBetween = 4;

export function rounded(number) {
    return Math.round(number * 100) / 100;
}

export function calculateLayout(pictures, distanceBetween, centerlineHeight) {
    const totalHeight = pictures.reduce((sum, picture) => sum + picture.height, 0)
        + Math.max(0, pictures.length - 1) * distanceBetween;
    const nailHeights = new Array(pictures.length);
    let bottom = centerlineHeight - totalHeight / 2;

    for (let index = pictures.length - 1; index >= 0; index--) {
        const { height, hangingNailHeight } = pictures[index];
        nailHeights[index] = rounded(bottom + (height - hangingNailHeight));
        bottom += height + distanceBetween;
    }

    return { totalHeight, nailHeights };
}

export function layoutParams(pictures, distanceBetween, unit) {
    const params = new URLSearchParams();
    pictures.forEach((picture, index) => {
        params.set(`picture${index + 1}Height`, picture.height);
        params.set(`picture${index + 1}Width`, picture.width);
        params.set(`picture${index + 1}HangingNailHeight`, picture.hangingNailHeight);
    });
    params.set('distanceBetween', distanceBetween);
    params.set('unit', unit);
    return params;
}
