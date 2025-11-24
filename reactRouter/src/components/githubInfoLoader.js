export const githubInfoLoader = async () => {
    const response = await fetch("https://api.github.com/users/octocat")

    if (!response.ok) {
        throw new Response("Failed to load GitHub data", { status: response.status })
    }

    return response.json()
}
