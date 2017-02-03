import util from '../lib/util';
import Command from './base';
import consts from '../consts';

const {moduleNames} = consts;
const {MAIN, IMAGE_LOADER, FLIP, ROTATION, FILTER} = moduleNames;
export default function (){
    return new Command({
        /**
         * @param {object.<string, Component>} moduleMap - Components injection
         * @returns {Promise}
         * @ignore
         */
        execute(moduleMap) {
            return new Promise((resolve, reject) => {
                const canvas = moduleMap[MAIN].getCanvas();
                const objs = canvas.getObjects();

                // Slice: "canvas.clear()" clears the objects array, So shallow copy the array
                this.store = objs.slice();
                if (this.store.length) {
                    objs.slice().forEach(obj => {
                        obj.remove();
                    });
                    resolve();
                } else {
                    reject();
                }
            });
        },
        /**
         * @param {object.<string, Component>} moduleMap - Components injection
         * @returns {Promise}
         * @ignore
         */
        undo(moduleMap) {
            const canvas = moduleMap[MAIN].getCanvas();
            const canvasContext = canvas;

            canvas.add.apply(canvasContext, this.store);

            return Promise.resolve();
        }
    });
}