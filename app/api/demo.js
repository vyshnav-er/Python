import ApiConstants from './apiConstants';

export default function api(path, params, method, token) {
  let options;
  options = {
    headers: {
      'API-KEY':123456,
    //   Accept: 'application/json',
       'Content-Type': 'application/json',
    //   ...(token && {token: token}),
       Authorization: token,
    },
    method: method,
    ...(params && {body: JSON.stringify(params)}),

  };
  return fetch(ApiConstants.BASE_URL+(params.rgn=='Oman'?ApiConstants.BASE_URL_OMAN:params.rgn=='Demo'?ApiConstants.BASE_URL_DEMO:ApiConstants.BASE_URL_UAE)+ ApiConstants.SUB_URL+ path, options)
    
  .then(resp => {
    const statusCode = resp.status;
    const data = resp.json();
    if(statusCode==401){
      return Promise.all([statusCode]);
    }
    else if(statusCode==404){
      return Promise.all([statusCode]);
    }
    else if(statusCode==204){
      return Promise.all([statusCode]);
    }
    else {
      return Promise.all([statusCode, data]);
    }
    
}    )
    //.then(json => json)
    .catch(error => error);
}







































