

export default class RelativeBody {

    onSetParentRect(rect) {

        this.x = rect.left + rect.width() * this.relX
        this.y = rect.top + rect.height() * this.relY
        this.posture.width = rect.width() * this.relW
        this.posture.height = rect.width() * this.relH

    }

}
