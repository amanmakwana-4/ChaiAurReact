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
    // Strong email validator
    email(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    },

    // Full password policy
    password(password) {
        const min = password.length >= 8;
        const upper = /[A-Z]/.test(password);
        const lower = /[a-z]/.test(password);
        const digit = /[0-9]/.test(password);
        const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return min && upper && lower && digit && special;
    },

    // Name must not be empty
    name(name) {
        return typeof name === "string" && name.trim().length > 0;
    }
};

export class AuthService {
    client = new Client();
    account;

    constructor() {
        // Environment safety checks
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
        // Strong validation
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

            // Email verification removed (you requested removal)

            // Auto-login after signup
            return this.login({ email, password });

        } catch (error) {
            console.error("createAccount error:", error);
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
            // Multiple sessions allowed
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
            // Multiple sessions allowed → delete only current session
            return await this.account.deleteSession("current");
        } catch (error) {
            console.error("logout error:", error);
            throw new AuthError("Logout failed", "LOGOUT_FAILED", error);
        }
    }
}

// Singleton (unchanged)
const authService = new AuthService();
export default authService;

