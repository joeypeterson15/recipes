import axios from "axios";

axios.defaults.headers.post["Content-Type"] ="application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const SERVER_URI = "http://localhost:3000";
  
export async function getDishes(value, isSubmit) {
    let endpoint = "/search";
    let params = `?dish=${value}`;
    params += isSubmit ? "&submit=y": "&submit=n";
    const serverURL = SERVER_URI + endpoint + params;
    
    const response = await axios.get(serverURL);
    return response.data;
}