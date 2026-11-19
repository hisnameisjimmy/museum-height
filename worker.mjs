import { calculateLayout, centerlineHeights, defaultDistanceBetween, layoutParams, rounded } from './public/layout.mjs';

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
    Link: '</api/>; rel="service-doc"',
};

function badRequest(error) {
    return Response.json({ error }, { status: 400, headers });
}

function measurement(value) {
    if (value === null || !/^\d*\.?\d+$/.test(value)) {
        return NaN;
    }
    return rounded(Number(value));
}

function calculateResponse(url) {
    const params = url.searchParams;
    const unit = params.get('unit') ?? 'inches';
    if (!Object.hasOwn(centerlineHeights, unit)) {
        return badRequest('unit must be inches or centimeters.');
    }

    const distanceBetween = measurement(params.get('distanceBetween') ?? String(defaultDistanceBetween));
    if (!Number.isFinite(distanceBetween)) {
        return badRequest('distanceBetween must be a non-negative decimal.');
    }

    if (new Set(params.keys()).size !== params.size) {
        return badRequest('Supply each query parameter once.');
    }

    const frameNumbers = new Set();
    for (const name of params.keys()) {
        if (name === 'unit' || name === 'distanceBetween') {
            continue;
        }
        const match = /^picture([1-9]\d*)(Height|Width|HangingNailHeight)$/.exec(name);
        if (!match) {
            return badRequest(`Unknown parameter: ${name}`);
        }
        frameNumbers.add(match[1]);
    }

    if (frameNumbers.size === 0) {
        return badRequest('Supply picture1Height and picture1HangingNailHeight for the first frame.');
    }

    const pictures = [];
    for (let number = 1; number <= frameNumbers.size; number++) {
        if (!frameNumbers.has(String(number))) {
            return badRequest('Number the frames consecutively starting at 1.');
        }

        const prefix = `picture${number}`;
        const height = measurement(params.get(`${prefix}Height`));
        const hangingNailHeight = measurement(params.get(`${prefix}HangingNailHeight`));
        const widthParam = params.get(`${prefix}Width`);
        const width = widthParam === null ? null : measurement(widthParam);

        if (!Number.isFinite(height) || height <= 0) {
            return badRequest(`${prefix}Height must be a positive decimal.`);
        }
        if (!Number.isFinite(hangingNailHeight) || hangingNailHeight > height) {
            return badRequest(`${prefix}HangingNailHeight must be between zero and ${prefix}Height.`);
        }
        if (width !== null && (!Number.isFinite(width) || width <= 0)) {
            return badRequest(`${prefix}Width must be a positive decimal.`);
        }

        pictures.push({ height, hangingNailHeight, width });
    }

    const centerlineHeight = centerlineHeights[unit];
    const { totalHeight, nailHeights } = calculateLayout(pictures, distanceBetween, centerlineHeight);
    if (rounded(totalHeight) > 2 * centerlineHeight) {
        return badRequest('The stack would extend below the floor at this centerline. Reduce the gap or use fewer frames.');
    }

    const result = { unit, centerlineHeight, distanceBetween, nailHeights };
    if (pictures.every(picture => picture.width !== null)) {
        const layoutUrl = new URL('/', url);
        layoutUrl.search = layoutParams(pictures, distanceBetween, unit).toString();
        result.layoutUrl = layoutUrl.href;
    }

    return Response.json(result, { headers });
}

export function handleLayoutRequest(url, method) {
    if (method !== 'GET') {
        return Response.json({ error: 'Use GET for this endpoint.' }, {
            status: 405,
            headers: { ...headers, Allow: 'GET' },
        });
    }
    return calculateResponse(url);
}

export default {
    fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname === '/api/layout') {
            return handleLayoutRequest(url, request.method);
        }
        return env.ASSETS.fetch(request);
    },
};
