import { body } from 'express-validator';

const login = [
    body('userName').exists().withMessage('userName is required').isString().withMessage('userName is not valid'),
    body('password').exists().withMessage('password is required').isString().withMessage('password is not valid')
];

export { login };
