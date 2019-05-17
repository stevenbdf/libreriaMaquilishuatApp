import RNFetchBlob from 'react-native-fetch-blob';

//Function to check if string is in JSON formatt
const isJSONString = (string) => {
    try {
        if (string != "[]") {
            JSON.parse(string);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

/**
 * Function to post data with fetch-blob
 * @param {string} apiURL 
 * @param {array} data must contain { name: 'field': data: 'data'}
 */
const postData = async (apiURL, data = null) => {
    const resp = await RNFetchBlob.fetch('POST', `http://192.168.1.7/libreria-maquilishuat/core/api/${apiURL}`, {
        Authorization: "Bearer access-token",
    }, data)
        .catch((err) => {
            console.log(err);
        })
    if (isJSONString(resp.data)) {
        const objectResponse = JSON.parse(resp.data);
        if (objectResponse.status == 1) {
            return ({ status: 1, data: objectResponse.dataset });
        } else {
            return ({ status: 0, exception: objectResponse.exception });
        }
    } else {
        return ({ status: 0, exception: 'Error al realizar peticion' });
    }

}

export default {
    postData
}