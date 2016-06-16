const {component} = $.cc

/**
 * CellQueueBumpService is responsible for checking the bump condition of the cells in the exit queue.
 */
void
@component('cell-queue-bump-service')
class CellQueueBumpService {
    /**
     * @param {Rx.Observable<Cell[]>} exitCells The stream of the lists of the exit cells
     */
    bump(exitCells) {
        return exitCells.takeWhile(cells => {
            if (cells.length <= 1) {
                return false
            }

            const lastOne = cells.slice(-1)[0]

            if (!lastOne.isEvolved()) {
                return false
            }

            return true
        })
    }
}
