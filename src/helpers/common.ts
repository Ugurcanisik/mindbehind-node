import bcryptjs from 'bcryptjs';
import * as nanoid from 'nanoid';

const generateRandomString = (length = 12) => nanoid.nanoid(length);

const generateHashForPassword = (password: string) => bcryptjs.hashSync(password, 12);

const checkHash = (input: string, hash: string) => bcryptjs.compareSync(input, hash);

export { generateRandomString, generateHashForPassword, checkHash };
