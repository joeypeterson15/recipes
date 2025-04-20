import axios from "axios";

axios.defaults.headers.post["Content-Type"] ="application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  
export async function getDishes(value, isSubmit) {
    let endpoint = "/api/search"; // This is relative to your deployed URL
    let params = `?dish=${value}`;
    params += isSubmit ? "&submit=y" : "&submit=n";
    const serverURL = endpoint + params;
        
    const response = await axios.get(serverURL);
    return response.data;
  }