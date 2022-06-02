# Lil game engine particle system

I made a lil thing for my game engine that simulates particles! I think its kind of clever so I wanted to share it. There are a few write-ups of how to use this technique elsewhere, mainly: [https://offscreencanvas.com/issues/001/](https://offscreencanvas.com/issues/001/) but I wanted to jot down my thought process.

## Goals!

* Keep as much processing on the gpu as possible.
* Don't worry about transparency.

## The Parts

The transparency part is easy, I'm just gonna stylistically render everything opaque and use the size of the particles to simulate transparency-ish. I think it looks cool when everything is the same shape and flat shaded.  
The slightly tricky part is simulating things on the gpu. Instead of keeping the positions of each of the particles in regular memory, I can keep those positions in the gpu memory by storing it in a texture. Then, I can render the particles themselves using instanced rendering. Render 4000 spheres, and offset each one by the position texture indexed by the instance id.  
The fun part is using a technique called [gpgpu](https://webgl2fundamentals.org/webgl/lessons/webgl-gpgpu.html) (gp for general purpose) to draw the new positions onto an offscreen texture with the old position texture as input. If I was using WebGL 2, I'd have access to transform feedback stuff, but I am limited to WebGL 1 with regl. The only particle system unique part of that ends up just being a fragment shader where each fragment is one position in the position texture.  
For a firey effect, I add some curl noise and vertical velocity. I also store the remaining 'life' of the particle in the alpha channel, and then use that to change the size of the particles. Once the life reaches zero, I reset the position of the particle. The key thing here is that I also pass the model transformation matrix into this shader. By transforming the particle's starting position by the model matrix, and doing this gpgpu processing at the same transform level as where the particles should show up, they'll get spawned in at that location on the model and then go on to be simulated in world space.  

![particles.png](https://buttondown.s3.amazonaws.com/images/f0c62225-ad43-45a5-ab9e-56217d2626c5.png)

## Upgrades!

I'll probably switch to rendering billboards that write depth values (so i still get 3d spheres) instead of actual sphere meshes.  
I also wanna figure out a cool way to pack all the particle data into a single texture so that I can have multiple systems in a single texture.  
And I need to upgrade my scene graph so that I can "attach" particle systems to parts of meshes (right now i'm just calling drawGraph and then drawParticles right after in the same transform space (which is also what attaching is, but i don't wanna think about it)).