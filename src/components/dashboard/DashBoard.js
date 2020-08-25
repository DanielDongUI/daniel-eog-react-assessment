import { useQuery } from "@apollo/client"
import React, {useEffect} from 'react'
import { getMultipleMeasurementsQuery} from "../../store/query/queries"
import {storeChar} from '../../store/actions/dataActions'
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ToggleBtn from "../button/ToggleBtn"
import Chart from "../chart/Chart"
import DropDownBar from "../dropDown/DropDownBar"


const DashBoard = props => {
  //set the time to 30 min before
  let MS_PER_MINUTE = 60000;
  const afterT = new Date(props.lastInjValveOpen.at - 30 * MS_PER_MINUTE);
  const after = afterT.valueOf() 
  const input = [
    {
      metricName: "flareTemp",
      after: after,
    },
    {
      metricName: "waterTemp",
      after: after,
    },
    {
      metricName: "casingPressure",
      after: after,
    },
    {
      metricName: "oilTemp",
      after: after,
    },
    {
      metricName: "tubingPressure",
      after: after,
    },
    {
      metricName: "injValveOpen",
        after: after,
    }
  ];
  const { data, error, loading} = useQuery(getMultipleMeasurementsQuery, {variables : {
    input
  } } )

  if(loading) {
    //console.log(loading)
    //return <div>loading...</div>
  }
  if (error) {
    console.log(error)
    //return <div>error! {error.message}</div>
  }

  useEffect(() => {
    if (data){
      data.getMultipleMeasurements.forEach(item=>{
        props.storeChar(item.measurements,item.metric)
      })
    }
  }, [data])
        
    const  renderChar =  () =>{
      if(props.flareTemp !==null && props.lastFlareTemp !== null){
        if(props.lastFlareTemp.at !== props.flareTemp[props.flareTemp.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.flareTemp));
          newArray.push(props.lastFlareTemp);
          newArray.shift();
          props.storeChar(newArray,"flareTemp")
        }
        if(props.lastWaterTemp.at !== props.waterTemp[props.waterTemp.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.waterTemp));
          newArray.push(props.lastWaterTemp);
          newArray.shift();
          props.storeChar(newArray,"waterTemp")
        }
        if(props.lastCasingPressure.at !== props.casingPressure[props.casingPressure.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.casingPressure));
          newArray.push(props.lastCasingPressure);
          newArray.shift();
          props.storeChar(newArray,"casingPressure")
        }
        if(props.lastOilTemp.at !== props.oilTemp[props.oilTemp.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.oilTemp));
          newArray.push(props.lastOilTemp);
          newArray.shift();
          props.storeChar(newArray,"oilTemp")
        }
        if(props.lastTubingPressure.at !== props.tubingPressure[props.tubingPressure.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.tubingPressure));
          newArray.push(props.lastTubingPressure);
          newArray.shift();
          props.storeChar(newArray,"tubingPressure")
        }
        if(props.lastInjValveOpen.at !== props.injValveOpen[props.injValveOpen.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.injValveOpen));
          newArray.push(props.lastInjValveOpen);
          newArray.shift();
          props.storeChar(newArray,"injValveOpen")
        }
      return (<div>
            <DropDownBar />
            <Chart />
            <ToggleBtn />
      </div>)
      }else{
        return <div>Loading...</div>
      }
    }
    return (
        <div>
            {renderChar( )}
        </div>
    )
}

const mapStatetoProps = state =>{
  return {
    flareTemp : state.dataReducer.flareTemp,
    waterTemp :state.dataReducer.waterTemp,
    casingPressure : state.dataReducer.casingPressure,
    oilTemp : state.dataReducer.oilTemp,
    tubingPressure : state.dataReducer.tubingPressure,
    injValveOpen : state.dataReducer.injValveOpen,
    ///////////////
    lastFlareTemp : state.dataReducer.lastFlareTemp,
    lastWaterTemp : state.dataReducer.lastWaterTemp,
    lastCasingPressure: state.dataReducer.lastCasingPressure,
    lastOilTemp:state.dataReducer.lastOilTemp,
    lastTubingPressure:state.dataReducer.lastTubingPressure,
    lastInjValveOpen:state.dataReducer.lastInjValveOpen,

  }
}

const mapDispatchToProps = dispatch =>
      bindActionCreators({
        storeChar
      },dispatch)
  


export default connect(mapStatetoProps,mapDispatchToProps)(DashBoard);
