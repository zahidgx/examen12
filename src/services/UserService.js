const BASE_URL = "https://3.137.174.238/"

export async function getAllUsers(params) {
    const response = await fetch(BASE_URL+ 'users/')
    return response.json();   
}