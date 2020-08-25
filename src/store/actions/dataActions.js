export const storeSubscription = (object,name) => ({
    type: 'STORE_SUBSCRIPTION',
    payload: {object,name}
})

export const storeChar = (array,name) => ({
    type: 'STORE_CHAR',
    payload: {array,name}
})

export const updataChar = (object,name) => ({
    type: 'UPDATE_CHAR',
    payload: {object,name}
})

export const addSave = data => ({
    type: 'ADD_SAVE',
    payload: data
})

export const deleteSave = data => ({
    type: 'DELETE_SAVE',
    payload: data
})

export const addSavedStatus = () => ({
    type: 'ADD_SAVED_STATUS',
    payload: ""
})





