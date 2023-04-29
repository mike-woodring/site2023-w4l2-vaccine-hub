const { UnauthorizedError } = require("../utils/errors");

class User {
    static async login(credentials) {
        // Use should submit their email and password. If any fields are
        // missing, throw an error.
        //
        // Lookup the user in the DB by email. If a user is found,
        // compare the submitted password with the password in the DB.
        // If there is a match, return the user. If anything goes wrong,
        // throw an error.
        // 
        throw new UnauthorizedError("Invalid email/password combo");
    }

    static async register(credentials) {
        // User should submit their email, password, and TBD.
        // If any of these fields is missing, throw an error.
        //
        // Make sure no user already exists in the DB with that email.
        // If one does, throw an error.
        //
        // Hash the users's password.
        // Lowercase the user's email.
        //
        // Create a new user in the DB with their info. Return the user.
        //
        
    }
}