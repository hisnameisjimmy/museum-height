---
title: Museum Height layout API
description: Calculate nail heights for a vertical stack of frames and get a link to the visual layout.
permalink: /api/
layout: layouts/base.njk
---

# Museum Height layout API

`GET /api/layout` calculates nail heights for one frame or a vertical stack of frames. The API accepts query parameters and returns JSON. Anyone can call it without an API key.

## Query parameters

All measurements use the same unit. Number the frames from top to bottom, starting at 1.

| Parameter | Meaning |
| --- | --- |
| `picture1Height` | Required. The full height of the first frame. |
| `picture1HangingNailHeight` | Required. The distance down from the top of the frame to its hanging point. For a wire, measure it pulled taut as it would be on the wall. |
| `picture1Width` | Optional. The full width of the first frame. Supply a width for every frame to get a visual layout link. |
| `distanceBetween` | Optional. The vertical gap between adjacent frames. Defaults to 4 in the selected unit. |
| `unit` | Optional. Use `inches` for a centerline of 57 inches, or `centimeters` for a centerline of 144 centimeters. Defaults to `inches`. |

Use `picture2Height`, `picture2HangingNailHeight`, and `picture2Width` for the second frame. Continue with consecutive numbers for additional frames.

Measurements are non-negative decimals. Frame height and width must be greater than zero. Each hanging offset must be between zero and its frame height, inclusive. The API rounds measurements to two decimal places.

## Response

`nailHeights` lists the distances from the floor to each nail, in top-to-bottom order and in the requested unit. If all widths are present, `layoutUrl` opens the same layout in the website.

The example uses two frames with a 4-inch gap. The nail heights are 78 inches for the top frame and 49 inches for the bottom frame. [Example request](/api/layout?picture1Height=24&picture1HangingNailHeight=2&picture1Width=18&picture2Height=18&picture2HangingNailHeight=3&picture2Width=14&distanceBetween=4&unit=inches)

```json
{
    "unit": "inches",
    "centerlineHeight": 57,
    "distanceBetween": 4,
    "nailHeights": [78, 49],
    "layoutUrl": "https://museumheight.com/?picture1Height=24&picture1Width=18&picture1HangingNailHeight=2&picture2Height=18&picture2Width=14&picture2HangingNailHeight=3&distanceBetween=4&unit=inches"
}
```

Invalid parameters or a stack that would extend below the floor return HTTP `400`. Requests using another method return HTTP `405`. Both errors include an `error` message in JSON.
