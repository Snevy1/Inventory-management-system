export async function getData(){
    try {
        const baseUrl = "http://localhost:3000"
        const response = await fetch(`${baseUrl}/api/categories`);
        const data = await response.json();

        return data
        
    } catch (error) {
        console.log(error);
        
    }
}