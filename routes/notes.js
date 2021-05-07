const { Router } = require('express');
//Controller
const { getAll, getById, create, update, remove } = require('../controllers/notes');
//Middleswares
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router.use(verifyToken);

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;