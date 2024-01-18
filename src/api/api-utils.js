import { getUserProfileInfo } from '../utils/AsyncStorageHelper';


export const getAPI = async (url)=>{
  const userDetails = await getUserProfileInfo();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${userDetails.accessToken}`);
    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };
    return fetch(url, requestOptions).then((response) => {
      return response.json()
    })
}

export const postAPI = async (url, payload)=>{
  const userDetails = await getUserProfileInfo();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${userDetails.accessToken}`);
    var requestOptions = {
      method: 'POST',
      headers: headers,
      redirect: 'follow',
      body: JSON.stringify(payload),
    };
    return fetch(url, requestOptions).then((response) => {
      return response.json()
    })
}

export const putAPI = async (url, payload)=>{
  const userDetails = await getUserProfileInfo();

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${userDetails.accessToken}`);
  var requestOptions = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(payload),
  };
  return fetch(url, requestOptions).then((response) => {
    return response.json()
  })
}