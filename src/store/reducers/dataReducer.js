const initialState ={
    flareTemp:null,
    waterTemp :null,
    casingPressure: null,
    oilTemp:null,
    tubingPressure:null,
    injValveOpen:null,
    ///////////
    lastFlareTemp:null,
    lastWaterTemp :null,
    lastCasingPressure: null,
    lastOilTemp:null,
    lastTubingPressure:null,
    lastInjValveOpen:null,
    //////////
    savedData:[],
    savedStatus: 0 
  }
  
  
  const dataReducer = (state = initialState, action) =>{
      switch (action.type) {
            case 'STORE_SUBSCRIPTION':
              return {
                  ...state,
                  lastFlareTemp: action.payload.name === "flareTemp" ? action.payload.object : state.lastFlareTemp,
                  lastWaterTemp: action.payload.name  === "waterTemp" ? action.payload.object  : state.lastWaterTemp,
                  lastCasingPressure: action.payload.name  === "casingPressure" ? action.payload.object  : state.lastCasingPressure,
                  lastOilTemp: action.payload.name  === "oilTemp" ? action.payload.object  : state.lastOilTemp,
                  lastTubingPressure: action.payload.name  === "tubingPressure" ? action.payload.object  : state.lastTubingPressure,
                  lastInjValveOpen: action.payload.name  === "injValveOpen" ? action.payload.object  : state.lastInjValveOpen,
              }
            case 'STORE_CHAR' :
              return {
                ...state,
                flareTemp: action.payload.name === "flareTemp" ? action.payload.array : state.flareTemp,
                waterTemp: action.payload.name  === "waterTemp" ? action.payload.array  : state.waterTemp,
                casingPressure: action.payload.name  === "casingPressure" ? action.payload.array  : state.casingPressure,
                oilTemp: action.payload.name  === "oilTemp" ? action.payload.array  : state.oilTemp,
                tubingPressure: action.payload.name  === "tubingPressure" ? action.payload.array  : state.tubingPressure,
                injValveOpen: action.payload.name  === "injValveOpen" ? action.payload.array  : state.injValveOpen,
              }
            case 'DELETE_SAVE':
                console.log("payload",action.payload)
              return {
                ...state,
                savedData: [...state.savedData.filter(item => item !== action.payload)]
              }
            case 'ADD_SAVE' :
                if (state.savedData.length === 6 ) {
                    let newArray = JSON.parse(JSON.stringify(state.savedData))
                    newArray.push(action.payload)
                    newArray.shift()
                    return {
                        ...state,
                        savedData : newArray
                    }
                } 
                return {
                    ...state,
                    savedData : [...state.savedData, action.payload]
              }  
            case 'ADD_SAVED_STATUS' : 
              return {
                  ...state,
                savedStatus : state.savedStatus+1
              }
          default:
              return state
      }
  }
  
  export default dataReducer;
  
