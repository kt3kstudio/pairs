import {traits} from 'traits-decorator'
import {DirStateImageMap, Image} from 'spn'
import Sprite from './sprite'

@traits(Sprite)
export default class StaticSprite {

    /**
     * Returns the only image of the sprite.
     * @return {string}
     */
    image() {}

    /**
     * Initialize the dir state image map.
     */
    initDirStateImage() {

        this.dirStateImage = new DirStateImageMap()
        this.dirStateImage.addImageByDirState(new Image(this.image()), 'down', 'default')

    }

}
