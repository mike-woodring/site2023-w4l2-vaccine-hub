const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequest, UnauthorizedError, BadRequestError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
    static async login(credentials) {
        console.log({
            "context": "login",
            "credentials": credentials
        });

        // Use should submit their email and password. If any fields are
        // missing, throw an error.
        //
        const requiredFields = ["email", "password"];

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });

        // Lookup the user in the DB by email. If not found, return a failure.
        //
        const existingUser = await User.fetchUserByEmail(credentials.email);

        // If a user is found, compare the submitted password with the password in the DB
        // using the hashing scheme we've designed. If there is a match, return the user.
        //
        if (existingUser) {
            console.log({
                "context": "login/after fetchUserByEmail",
                "existingUser": existingUser
            });
               
            const isValid = await bcrypt.compare(credentials.password, existingUser.password);

            if (isValid) {
                return User._createPublicUser(existingUser);
            }
        }

        // If anything goes wrong, throw an error.
        //
        throw new UnauthorizedError("Invalid email/password combo");
    }

    static async register(credentials) {
        console.log({
            "context": "register",
            "credentials": credentials
        });

        // User should submit their email, password, and TBD.
        // If any of these fields is missing, throw an error.
        //
        const requiredFields = ["email", "password", "first_name", "last_name"];

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });

        // Make sure no user already exists in the DB with that email.
        // If one does, throw an error.
        //
        const existingUser = await User.fetchUserByEmail(credentials.email);

        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }

        // Hash the users's password.
        //
        const hashedPassword = await User.hashPassword(credentials.password);

        // Lowercase the user's email.
        //
        const lowerEmail = credentials.email.toLowerCase();

        // Create a new user in the DB with their info. Return the user.
        //
        console.log({
            "context": "register",
            "lowerEmail": lowerEmail,
            "password": credentials.password,
            "hashedPassword": hashedPassword,
            "first_name": credentials.first_name,
            "last_name": credentials.last_name
        });

        const result = await db.query(
            `INSERT INTO users (
                email,
                password,
                first_name,
                last_name
            )
            VALUES (
                $1,
                $2,
                $3,
                $4
            )
            RETURNING *;`,
            [
                lowerEmail,
                hashedPassword,
                credentials.first_name,
                credentials.last_name
            ]
        );

        const user = result.rows[0];

        return User._createPublicUser(user);
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided.");
        }

        const query = `SELECT * FROM users WHERE email = $1;`;
        const result = await db.query(query, [email.toLowerCase()]);
        const user = result.rows[0];

        console.log({
            "context": "fetchUserByEmail",
            "query": query,
            "user": user
        });

        return user;
    }

    static async hashPassword(clearTextPassword) {
        const result = await bcrypt.hash(clearTextPassword, BCRYPT_WORK_FACTOR);
        
        console.log({
            "context": "hashPassword",
            "clearTextPassword": clearTextPassword,
            "result": result
        });

        return result;
    }

    static _createPublicUser(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    }
}

module.exports = User;