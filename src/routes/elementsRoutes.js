import express from 'express';
import error from 'http-errors';

const router = express.Router();

const elements = [{ symbol: 'I', name: 'Iaspyx', }, { symbol: 'Ex', name: 'Ewhyx', }, { symbol: 'Ye', name: 'Yefrium', },
                    { symbol: 'Sm', name: 'Smiathil', }, { symbol: 'E', name: 'Eplil', }, { symbol: 'G', name: 'Gloylium', },
                    { symbol: 'Ja', name: 'Jasmalt', }, { symbol: 'Xu', name: 'Xuskian', }, { symbol: 'L', name: 'Lukryx', },
                    { symbol: 'Fr', name: 'Froynyx', }, { symbol: 'K', name: 'Kreotrium', }, { symbol: 'Ve', name: 'Vethyx', },
                    { symbol: 'No', name: 'Nospite', }, { symbol: 'Q', name: 'Qobrium', }, { symbol: 'A', name: 'Awhil', },
                    { symbol: 'Z', name: 'Zuscum', }, { symbol: 'B', name: 'Blierium', }, { symbol: 'Wu', name: 'Wusnyx', }];

class ElementsRoutes {


    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);

    }

    getAll(req, res, next) {
       
    }

    getOne(req, res, next) {
       
    }

    post(req, res, next) {

        
    }
    
    delete(req, res, next) {
     
    }
}
new ElementsRoutes();

export default router;