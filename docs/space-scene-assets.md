# Orbital hero scene

The hero uses a WebGL sphere, with synchronized daytime geography and nighttime city lights. One longitude rotation takes 210 seconds. A procedural aurora fades in and out over a 53-second cycle; CSS meteor trails and a subtle horizon glow use separate, infrequent cycles.

Texture sources, downloaded from the Three.js example assets:

- `public/images/space/earth-day.jpg`: https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg
- `public/images/space/earth-night.png`: https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png

The existing local star field and spacecraft remain in use. The static background is retained when WebGL or image loading fails, the GPU context is lost, or reduced motion is requested. Animation pauses while the hero is outside the viewport or the page is hidden. Rendering is limited to 30 frames per second, 1.5 device pixels per CSS pixel, and an 1800-pixel canvas width.

## Scroll journey Milky Way
- File: `public/images/space/milky-way-eso.jpg`
- Source: https://www.eso.org/public/images/eso0932a/
- Credit: ESO/S. Brunier, CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).
- Adaptations: resized to 3200 pixels, JPEG compression, CSS crop and color overlays.
- Visible linked attribution is included in the footer. Planet illustrations and ocean rays are CSS effects; Earth uses the existing day texture.
