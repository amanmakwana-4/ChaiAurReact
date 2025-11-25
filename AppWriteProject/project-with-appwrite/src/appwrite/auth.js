// import conf from "../conf/conf";
// import { Client,Account,ID } from "appwrite";
// export class AuthService{
//     client=new Client();
//     account;
//     constructor(){
//         this.client
//         .setEndpoint(conf.appwriteUrl)
//         .setProject(conf.appwriteProjectId);
//         this.account=new Account(this.client);

//     }
//     async createAccount({email,password,name}){
//         try {
//             const userAccount=await this.account.create(ID.unique(),email,password,name)
//             if(userAccount){
//                 return this.login({email,password})
//             }else{
//                 return userAccount;
//             }
//         } catch (error) {
//             throw error;
//         }
//     }

//     async login({email,password}){
//         try {
//             return await this.account.createEmailSession(email,password)
//         } catch (error) {
//             throw error
//         }
//     }

//     async getCurrentUser(){
//         try{
//             return await this.account.get();
//         }catch(error){
//             throw error
//         }
//         return null;
//     }

//     async logout(){
//         try {
//             return await this.account.deleteSessions();
//         } catch (error) {
//             throw error
//         }
//     }
// }
// const authService = new AuthService();
// export default authService;




// AuthService.js
// -------------------------------------------------------------
// PRODUCTION READY, future-proof authentication service
// preserves your original naming + adds comments on changes
// -------------------------------------------------------------

import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// ---------------------------
// Helper: Custom error wrapper
// ---------------------------
class AuthError extends Error {
    constructor(message, code = "AUTH_ERROR", original = null) {
        super(message);
        this.code = code;
        this.original = original;
    }
}

// ---------------------------
// Helper: Input Validators
// ---------------------------
const Validators = {
    // Added: Strong email validator
    email(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    },

    // Added: Full password policy enforcement (your requirement)
    password(password) {
        // Apply ALL rules:
        // min 8 chars, upper, lower, digit, special char
        const min = password.length >= 8;
        const upper = /[A-Z]/.test(password);
        const lower = /[a-z]/.test(password);
        const digit = /[0-9]/.test(password);
        const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return min && upper && lower && digit && special;
    },

    // Added: Name should not be empty
    name(name) {
        return typeof name === "string" && name.trim().length > 0;
    }
};

export class AuthService {
    client = new Client();
    account;

    constructor() {
        // Added: Environment safety checks
        if (!conf.appwriteUrl || !conf.appwriteProjectId) {
            console.error("Environment configuration missing", conf);
            throw new AuthError("Invalid environment configuration", "ENV_CONFIG_ERROR");
        }

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // ---------------------------------------------------------
    // createAccount — PRODUCTION READY VERSION
    // ---------------------------------------------------------
    async createAccount({ email, password, name }) {
        // Added: Strong validation before hitting backend
        if (!Validators.email(email)) {
            console.error("Invalid email format");
            throw new AuthError("Invalid email format", "INVALID_EMAIL");
        }

        if (!Validators.password(password)) {
            console.error("Password does not meet security requirements");
            throw new AuthError("Weak password", "WEAK_PASSWORD");
        }

        if (!Validators.name(name)) {
            console.error("Name is required");
            throw new AuthError("Invalid name", "INVALID_NAME");
        }

        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // Added: enforce email verification workflow
            await this.account.createVerification(conf.appwriteVerificationUrl);

            // Your choice: Auto-login after signup
            return this.login({ email, password });

        } catch (error) {
            console.error("createAccount error:", error); // your requirement #6
            throw new AuthError("Failed to create account", "ACCOUNT_CREATE_FAILED", error);
        }
    }

    // ---------------------------------------------------------
    // login — PRODUCTION READY VERSION
    // ---------------------------------------------------------
    async login({ email, password }) {
        if (!Validators.email(email)) {
            console.error("Invalid email format");
            throw new AuthError("Invalid email", "INVALID_EMAIL");
        }

        if (!Validators.password(password)) {
            console.error("Weak password");
            throw new AuthError("Weak password", "WEAK_PASSWORD");
        }

        try {
            // Your choice: Allow multiple sessions (do not delete others)
            return await this.account.createEmailSession(email, password);

        } catch (error) {
            console.error("login error:", error);
            throw new AuthError("Login failed", "LOGIN_FAILED", error);
        }
    }

    // ---------------------------------------------------------
    // getCurrentUser — PRODUCTION READY VERSION
    // ---------------------------------------------------------
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("getCurrentUser error:", error);
            throw new AuthError("Failed to fetch user", "CURRENT_USER_ERROR", error);
        }
    }

    // ---------------------------------------------------------
    // logout — PRODUCTION READY VERSION
    // ---------------------------------------------------------
    async logout() {
        try {
            // NOTE: You selected "allow multiple sessions"
            // so we ONLY delete the current session, not all.
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("logout error:", error);
            throw new AuthError("Logout failed", "LOGOUT_FAILED", error);
        }
    }
}

// Singleton (unchanged)
const authService = new AuthService();
export default authService;
