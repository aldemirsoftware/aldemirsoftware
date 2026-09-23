# Hero spacecraft animation

The existing spacecraft is preserved from `public/images/orbital-horizon.jpg` using the soft SVG mask in `src/assets/orbital-ship-mask.svg`. Its layer floats vertically between -9px and +9px over an eight-second CSS animation. The image and mask share the same cover positioning at every breakpoint. Reduced-motion preferences disable the animation.

The clean background is `public/images/orbital-background.jpg`. It was created with the built-in imagegen tool from `public/images/orbital-horizon.jpg`, then saved as JPEG. The original asset is preserved.

Generation prompt:

> Edit target: the provided website hero image. Create a clean background plate for animation. Remove ONLY the spaceship and its two blue engine exhaust plumes (located on the right, approximately x 920..1600 y 375..555 in the original 1672x941 image), seamlessly inpaint that small area with the same subtle dark navy star field. Preserve absolutely everything else: the exact Earth horizon position, Earth detail, stars, Milky Way, lighting, composition, original 1672:941 aspect ratio and framing. Do not change crop, scale, color grade, or add any objects, ships, text or logos. This will be layered behind the original spaceship at exactly its original coordinates; background alignment is critical. Output just the clean background image. Save the result for use in the local website project.
