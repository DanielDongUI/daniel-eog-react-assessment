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

  }
  
  
  const dataReducer = (state = initialState, action) =>{
    //console.log("action.id: "+ action.id)
    //console.log("action.payload: "+ action.payload)
    //console.log(state.mylist[0].title)
      switch (action.type) {
            case 'STORE_SUBSCRIPTION':
                //console.log(action.payload.object.at)
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
            case 'UPDATE_CHAR' :
                // console.log(action.payload.object.at)
                // if( action.payload.name === "flareTemp" && action.payload.object.at !== state.flareTemp[state.flareTemp.length-1].at) {
                //     let newArray = JSON.parse(JSON.stringify(state.flareTemp));
                //     newArray.push({at:action.payload.object.at,value: action.payload.object.value});
                //     newArray.shift();
                //     console.log(newArray)
                //      return {
                //          ...state,
                //          flareTemp : newArray
                //      }
                // }
                
                return {
                ...state,
                //flareTemp : action.payload.name === "flareTemp" && action.payload.object.at !== state.flareTemp[state.flareTemp.length-1].at ?  : state.flareTemp,
                waterTemp: action.payload.name  === "waterTemp" ? action.payload.array  : state.waterTemp,
                casingPressure: action.payload.name  === "casingPressure" ? action.payload.array  : state.casingPressure,
                oilTemp: action.payload.name  === "oilTemp" ? action.payload.array  : state.oilTemp,
                tubingPressure: action.payload.name  === "tubingPressure" ? action.payload.array  : state.tubingPressure,
                injValveOpen: action.payload.name  === "injValveOpen" ? action.payload.array  : state.injValveOpen,
                
                }    

          default:
              return state
      }
  }
  
  export default dataReducer;
  
