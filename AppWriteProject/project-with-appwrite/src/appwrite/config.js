import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query} from "appwrite";
export class Service{
    client= new Client();
    datsbases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.datsbases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.datsbases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite Service::createPost::error",error)
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
             return await this.datsbases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
             )    
        } catch (error) {
            console.log('Appwrite service::updatePost::error',error)
        }
    }
    async deletePost(slug){
        try {
            await this.datsbases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log('Appwrite Service Error:: deletepost::error',error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.datsbases.getDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug
            )
        } catch (error) {
            console.log('Appwrite service::getPost::error',error)
            return false
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.datsbases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log('Appwrite Service:: GetPosts::errror',error)
            return false
        }
    }
    //file upload
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite Service::uploadFile::error',error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log('Appwrite service:: delepost ::error',error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.appwriteBucketId,
        fileId
    }
}
const service = new Service();
export default service;