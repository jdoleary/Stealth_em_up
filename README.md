Stealth_em_up
=============


## Next:
  
* Keep buttons from rapid firing actions (like space and shift)
* Option to allow 'easy space' meaning you only have to press space once for an action to occur (not hold it) for unlocking and strangling
* Make droping money a different button than picking it up.
* Disable blooth path
* Improved map design (use tile editor with multiple layers)
* multiple buildings
* (e)Hero Health
* (e)Make loot drop work with score
* Less loot
* crouch and hide behind desks
* Make money drop work
* (e)Guard Backup
* drive car
* pause
* Make Civs avoid restricted areas and wait longer.
* Make guards wait.
* Intimidate

  
## Eventually:
* Fix the load bug where it only loads a portion of the map.
* Loose Focus Markers (highlight the side of the screen red, where the mouse left off)

## Brad Recommends:
* icon for changing weapons
* Different Weapons (Pistol, Silenced Pistol[done], Taser, Melee[done])
* Tutorial Levels (Really work on doing it right, don't just make one for the sake of it)
* ammo
* Turn off laser sight
* cop cars driving by
* health bar
* randomize daytime and nighttime
* incapacitate guards (for time?) (for the challenge of doing it the harder way)
* (h) lights (shoot out lights)
* blood pool when guard is 
* place to dispose bodies (dumpster)
* time clock
* blood splatter (on desks and flood)

## Optimize:
* Anything that doesn't need to have its objective x and y calculated independently should be a part of a parent sprite.  Then the sprite's xy is calculated and all the children aren't.

## Notes:
* SpriteBatch is a super charged display object container
* Setting the CacheAsBitmap flag makes a display object's content (children) be rendered to a texture, and then that texture is drawn.  With CacheAsBitmap on, children's rotation (for example) is excluded.

* Drag code is updated in CodePractice repo.
* You can use different gameLoops for different game states.
