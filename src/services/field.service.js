import {API_URL} from "../common/constants";

const fieldService = async (fieldBuilderData) => {
    const response = await fetch(API_URL, {
        mode: 'no-cors',
        method : 'POST',
        body :JSON.stringify(fieldBuilderData),
        headers : {
            "content-type": "application/json"
        },
        credentials: "include"
    });
    return await response.json();
}

export default fieldService;

