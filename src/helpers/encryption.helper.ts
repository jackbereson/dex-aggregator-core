// import bcrypt from 'b'
import bcrypt from 'bcrypt-nodejs';

// const PEPPER = '596a96cc7bf9108cd896f33c44aedc8a';

export class EncryptionHelper {
    constructor() {}

    static genSalt = () => {
        return bcrypt.genSaltSync(1);
    };

    static generatePassword = (data: string, salt: string) => {
        return bcrypt.hashSync(data, salt);
    };

    // static setupPassword = (pepperPassword: string, id: string) => {
    //   const encryptString = crypto.MD5(`${pepperPassword}${id}`).toString();
    //   return encryptString;
    // };

    createPassword = (password: string) => {
        const { genSalt, generatePassword } = EncryptionHelper;
        const salt = genSalt();
        const hassPassword = generatePassword(password, salt);

        return hassPassword;
    };

    comparePassword = (password: string, hassPassword: string) => {
        const result = bcrypt.compareSync(password, hassPassword);

        return result;
    };
}

const encryptionHelper = new EncryptionHelper();

export { encryptionHelper };

// const webInputpass = encryptionHelper.createPepperPassword("fuckyouuuodauosudoausdoausdoausodausoduss");
// console.log('webInputpass', webInputpass);

// const dbHash = encryptionHelper.createPassword(webInputpass, "what_the_hell");
// console.log('dbHash', dbHash);

// const cond = encryptionHelper.comparePassword(webInputpass, "what_the_hell", dbHash);
// console.log('cond', cond);
