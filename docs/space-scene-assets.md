# Orbital hero scene

The hero uses a WebGL sphere, with synchronized daytime geography and nighttime city lights. One longitude rotation takes 210 seconds. A procedural aurora fades in and out over a 53-second cycle; CSS meteor trails and a subtle horizon glow use separate, infrequent cycles.

Texture sources, downloaded from the Three.js example assets:

- `public/images/space/earth-day.jpg`: https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg
- `public/images/space/earth-night.png`: https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png

The existing local star field and spacecraft remain in use. The static background is retained when WebGL or image loading fails, the GPU context is lost, or reduced motion is requested. Animation pauses while the hero is outside the viewport or the page is hidden. Rendering is limited to 30 frames per second, 1.5 device pixels per CSS pixel, and an 1800-pixel canvas width.
