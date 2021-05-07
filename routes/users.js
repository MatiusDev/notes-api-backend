const { Router } = require('express');
//Middlewares
const verifyToken = require('../middlewares/verifyToken');

const { getAll, create } = require('../controllers/users');

const router = Router();

router.get('/',  verifyToken, getAll);
router.post('/', create);

// router.use((error, req, res, next) => {
//   const props = Object.values(error.errors)[0];
//   if (props) {
//     const { name, properties } = props;
//     const type = `user_${props.kind}`.toLocaleUpperCase();
//     const newError = {
//       name,
//       type,
//       properties
//     };
//     next(newError);
//   }
//   next(error);
// });

module.exports = router;