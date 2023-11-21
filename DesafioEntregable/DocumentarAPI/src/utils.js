import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import { fakerES as faker } from '@faker-js/faker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

export const generateProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        code: faker.string.alpha({ length: 5}),
        status: faker.datatype.boolean(),
        category: faker.commerce.department(),
        thumbnails: [
            {
                url: faker.image.url(),
                alt: faker.commerce.productName()
            },
            {
                url: faker.image.url(),
                alt: faker.commerce.productName()
            },
            {
                url: faker.image.url(),
                alt: faker.commerce.productName()
            }
        ],
    }
}

export default __dirname;