import { body, param } from 'express-validator';

const getBranch = [
    param('branchNumber')
        .exists()
        .withMessage('branchNumber is required')
        .isString()
        .withMessage('branchNumber is not valid')
];

const updateBranch = [
    param('branchNumber')
        .exists()
        .withMessage('branchNumber is required')
        .isString()
        .withMessage('branchNumber is not valid'),
    body('latitude').exists().withMessage('latitude is required').isNumeric().withMessage('latitude is not valid'),
    body('longitude').exists().withMessage('longitude is required').isNumeric().withMessage('longitude is not valid'),
    body('name').exists().withMessage('name is required').isString().withMessage('name is not valid'),
    body('fullAddress')
        .exists()
        .withMessage('fullAddress is required')
        .isString()
        .withMessage('fullAddress is not valid'),
    body('phone').exists().withMessage('phone is required').isString().withMessage('phone is not valid')
];

export { getBranch, updateBranch };
