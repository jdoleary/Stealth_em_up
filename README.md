Stealth_em_up
=============

## How to run
./local_server_for_testing.bat

## Todo
- raycasting problem is due to the offset, but the offset is necessary to properly sort the points

## Optimize:
* Anything that doesn't need to have its objective x and y calculated independently should be a part of a parent sprite.  Then the sprite's xy is calculated and all the children aren't.
* Increase the usuable size of maps by turning off .visible for cells not in view?

## Notes:
* SpriteBatch is a super charged display object container
* Setting the CacheAsBitmap flag makes a display object's content (children) be rendered to a texture, and then that texture is drawn.  With CacheAsBitmap on, children's rotation (for example) is excluded.

* Drag code is updated in CodePractice repo.
* You can use different gameLoops for different game states.

## Terms:
- `LOS` Line of Sight (fog of war)
    - The starburst is what is used to calculate the LOS shade
- `True Point` is the point that the ray is sent to, but the end of the raycast may go beyond it
