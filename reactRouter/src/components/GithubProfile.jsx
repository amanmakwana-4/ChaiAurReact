import { useLoaderData } from "react-router-dom"

const GithubProfile = () => {
    const data = useLoaderData()
    return (
        <>
            <div className="w-full h-screen">
                <h1>GitHub Profile</h1>
                <p>Github Followers: {data.followers}</p>
            </div>
            
        </>
    )
}

export default GithubProfile
