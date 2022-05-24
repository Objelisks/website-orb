hi hello! im going to talk about what im working on!

today: it is my js game engine

# js game engine

its mostly built around [regl](http://regl.party/)  
i made a simple shader and wrote a thing to render [gltf](https://raw.githubusercontent.com/KhronosGroup/glTF/main/specification/2.0/figures/gltfOverview-2.0.0b.png) files  
that all currently looks like this:

![gltf.png](https://buttondown.s3.amazonaws.com/images/6959ea9a-a9f0-410d-94b7-5b5734a35f98.png)

and now im working on input tracking!

## input tracking

i gotta track the mouse so that you can make games, because games are Interactive  
in order to click on things in the scene, we gotta take the mouse position and place it into the game scene  
then, we shoot out an invisible laser in the direction the camera is facing and see if it hits anything  
i started with some code from one of my previous projects, trains game
```javascript
  const rect = canvas.getBoundingClientRect()
  const clipCoordinates = [
      (2 * (mouseState.x - rect.x)) / rect.width - 1,
      1 - (2 * (mouseState.y - rect.y)) / rect.height,
      -1,
      1]
  const inverseView = mat4.invert([], context.view)
  const inverseProjection = mat4.invert([], context.projection)
  const cameraRayA = vec4.transformMat4([], clipCoordinates, inverseProjection)
  const cameraRay = [cameraRayA[0], cameraRayA[1], -1, 0]
  const rayWorldA = vec4.transformMat4([], cameraRay, inverseView)
  const rayWorld = vec3.normalize([], [rayWorldA[0], rayWorldA[1], rayWorldA[2]])
```
we're taking the mouse screen position and turning it into device normalized coordinates or clip coordinates  
this mostly just means taking a pixel position like `(300, 200)` and making it fit into `[-1, 1]` for x and y (and then putting it into a vec4 for easier math later)  
the clip coordinate is the position on the screen, but we need this to be in world space  
so we use the view projection (the matrix that transforms an object into the view of the camera as if it were at the origin) and apply that to the clip coordinates  
and then also apply the view matrix (the matrix that transforms the camera into its position) so that when we render from the perspective of the camera, the mouse ray is in front of it (instead of in front of the origin)  
the result `rayWorld` is the laser we can shoot into the scene, starting from the camera

I used an existing library `ray-aabb` to do the actual intersection logic, and I just collide the ray with a big box to represent the ground
```javascript
const mouseDir = getMouseRay(mouseState, context)
const mouseRay = createRay(context.eye, mouseDir)
const collisionDist = mouseRay.intersects([[-20, -1, -20], [20, 0, 20]])
const collision = vec3.add([], vec3.scale([], mouseDir, collisionDist), context.eye)
```
and now we have a collision position that i can place an object at!

clicking on objects in the scene is a little trickier, because we might have lots of objects and we don't necessarily want to raycast against every triangle on every object (that would be a lot of work)  
so next up is to add some kind of [spatial partitioning](https://en.wikipedia.org/wiki/Space_partitioning) data structure and keep all the objects in there so that we can test against a small set of them

## spatial partitioning

in trains game i used an [rbush](https://github.com/mourner/rbush), mostly because it sounded funny to put a bunch of trains in a bush, but its also a fairly good choice because the trains were all running around in 2d and the rbush lets you quickly get all of the things that are immediately around you in 2d

for this engine, i want to support 3d raycasts and maybe a simplified collision system for a few primitive shapes (i want to avoid having to use a heavy pre-made physics library like ammo.js)  
right now im looking at either [rbush-3d](https://github.com/Eronana/rbush-3d), which is an extension of rbush, or implementing a [ball tree](https://en.wikipedia.org/wiki/Ball_tree), for obvious reasons of it being funny (important) and because i think if all the raycasting and collision is based on spheres, the engine will have an interesting, unique gamefeel  
it is very important to me to not spend a lot of time on the physics, because that can end up being a very deep hole that no one has really found a perfect solution to. i also want the physics to feel like those ps1 shaders that have the vertices jumping all around because of weird floating point precision