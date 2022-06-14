const { Router } = require('express');
const { check } = require('express-validator');


const { usersGet, usersDelete, usersPost, usersPut } = require('../controllers/user');


const { roleIsValid, emailIsExisting, existUserById } = require('../helpers/dbValidators');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.get('/', usersGet)
router.put('/:id', [
    check('id', 'Not valid id').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(roleIsValid),
    validateFields
], usersPut)
router.post('/', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password is mandatory and min length 6 chars').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailIsExisting),
    // check('rol', 'Rol not valid').isIn(['ADMIN_ROL','USER_ROL']),
    check('rol').custom(roleIsValid),
    validateFields
], usersPost)
router.delete('/:id', [
    check('id', 'Not valid id').isMongoId(),
    check('id').custom(existUserById),
    validateFields

], usersDelete)

module.exports = router;