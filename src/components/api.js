import ApiPlatformError from './error/ApiPlatformError'
const API_URL = 'http://127.0.0.1:8000/api'
const API_LOGIN_CHECK = API_URL + '/login_check'
const API_USERS = API_URL + '/users'
const API_GET_USERS = API_URL + '/users/:id'
const API_EXPRESSE = 'http://localhost:5000'
const API_EXPRESSE_USERS= API_EXPRESSE + '/users'
const API_EXPRESSE_FETCH_GROUP= API_EXPRESSE + '/users/usergroups?UserId=:UserId'
const API_EXPRESSE_FETCH_MESSAGE_BY_GROUP= API_EXPRESSE + '/users/message_by_group_id?id=:id'
const API_EXPRESSE_CREATE_MESSAGE= API_EXPRESSE + '/create_messages'
export const login = async (payload) => {
    const body = JSON.stringify(payload)
    let data;
    try {
        const response = await fetch(API_LOGIN_CHECK, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });
        data = await response.json();
        if (response.ok) {
            return data
        }
        throw new ApiPlatformError(data.message, data.status)
    } catch (err) {
      return Promise.reject(err.message ? err.message : data)
    }
}

export const getCurrentUser = async (payload) => {
    const body = JSON.stringify(payload)
    let data;
    const url = API_GET_USERS.replace(':id', payload.uid)
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + payload.token,
            }
        });
        data = await response.json();
        if (response.ok) {
            return data
        }
        throw new ApiPlatformError(data.message? data.message : data.detail, data.status)
    } catch (err) {
      return Promise.reject(err.message ? err.message : data)
    }
}


export const fetchUsersExpresse = async (payload) => {
    let data;
    const url = API_EXPRESSE_USERS
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        data = await response.json();
        if (response.ok) {
            return data
        }
        throw new ApiPlatformError(data.message? data.message : data.detail, data.status)
    } catch (err) {
      return Promise.reject(err.message ? err.message : data)
    }
}

export const fetchGroupExpress = async (payload) => {
    const {UserId} = payload;
    let data;
    const url = API_EXPRESSE_FETCH_GROUP.replace(':UserId', UserId)
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        data = await response.json();
        if (response.ok) {
            return data
        }
        throw new ApiPlatformError(data.message? data.message : data.detail, data.status)
    } catch (err) {
      return Promise.reject(err.message ? err.message : data)
    }
}

export const fetchMessageByGroup = async (payload) => {
    const {id} = payload;
    let data;
    const url = API_EXPRESSE_FETCH_MESSAGE_BY_GROUP.replace(':id', id)
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        data = await response.json();
        if (response.ok) {
            return data
        }
        throw new ApiPlatformError(data.message? data.message : data.detail, data.status)
    } catch (err) {
      return Promise.reject(err.message ? err.message : data)
    }
}

export const createMessage = async (payload) => {
    const {content , GroupId, UserId} = payload;
    let data;
    const body = { "content": content, "GroupId": GroupId,"UserId": UserId }
    const url = API_EXPRESSE_CREATE_MESSAGE
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        });
        data = await response.json();
        if (response.ok) {
            return data
        }
        throw new ApiPlatformError(data.message? data.message : data.detail, data.status)
    } catch (err) {
      return Promise.reject(err.message ? err.message : data)
    }
}
