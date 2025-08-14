---
title: FAQ
description: Frequently asked questions about museum height or the 57 inch rule
permalink: /faq/
layout: layouts/base.njk
---

# FAQ

## Wait what is this?

It's a simple way to hang art at a really aesthestic height on your wall, specifically 57 inches to the centerline of the piece.

{% img "images/hung-art.jpg", "Art hung at 57 inches" %}

## What do you mean the centerline?

Like, imagine you cut your art in half, at its belly. That's the centerline.

{% img "images/centerline.jpg", "Centerline" %}

## But, why?

It looks real nice. Like, for real. When people visit your house they will think "damn I am jealous of how nice this place looks".

## No but why 57 inches?

The consensus seems to be that 57 inches maps pretty well to the average eye-level-height. For most people it feels like they can scan the room and everything lines up. This satisfies some weird internal need humans have for order and pleasantness.

## I think I'm pretty good at this though.

Man, I hate to break this to you... Most people think "I am just hanging art on the wall, I'll just eyeball it" and it looks terrible. It's kind of a hassle to hang up art in the first place. Don't skimp on this step.

## Why do I need an app for this?

You don't, really. You can do the calculations yourself. If it's just one piece of art, you just do the following:

1. Measure the height of your art and divide it in half (we'll call it divided-art)
2. Measure the distance from the top of the art to the wire (make sure the wire is taught) (we'll call it nail height)
3. Take the divided-art measurement minus the nail-height
4. Add that to 57 inches
5. Put a nail in the wall at that height.

This is really not complicated for a single piece, it's just annoying to do. This is ultimately what you're doing:

{% img "images/hanger-height.jpg", "Wall calculations" %}

That said, if you want to do this for multiple pieces, it's a huge pain in the ass.

## Wait what do you mean the taught wire or nail height thing?

Basically this:
{% img "images/taught-wire.jpg", "Distance from top to taught wire" %}

## I want to understand what this would take for multiple pieces

Yeah, I get it. I did too. This is what you do for two of them. Take a deep breath!

First things first, realize two things:

- We are treating the two pieces as a single "piece" in terms of centerline. So, the height of both pieces plus the space between them is the total "height", and the centerline is that divided by two.
- We need to figure out the nail height for these two pieces based on that centerline

Top painting:

1. Add the heights of both pieces and the gap to get the combined height.
2. Take half of that; this is the offset from the centerline to the top/bottom.
3. From the museum centerline height, subtract that half to land at the bottom of the stack.
4. From that bottom: add the bottom piece’s height, add the gap, then add (top piece height − top piece nail offset). The result is the nail height for the top painting.

nail_top = museum_center − (combined/2) + bottom_height + gap + (top_height − top_nail_offset) ≡ museum_center + (combined/2) − top_nail_offset

Bottom painting:

1. Get the combined stack height: top height + bottom height + gap. → 20 + 50 + 4 = 74.
2. Take half to find the center offset. → 74 / 2 = 37.
3. Find the bottom of the stack: museum centerline − half. → 57 − 37 = 20.
4. From that bottom, go up to the bottom piece’s nail: bottom height − its nail offset. → 50 − 6 = 44.
5. Add them: 20 + 44 = 64.

nail_bottom = museum_center − (combined/2) + (bottom_height − bottom_nail_offset).

So, this is doable! But kind of a hassle. I used to use a spreadsheet for this. For three it gets even crazier.

## Damn ok yeah I don't want to do that

Yeah! Terrible. I did it a handful of times before I created a spreadsheet. I then thought it would be cool to make this app.

You're welcome.
