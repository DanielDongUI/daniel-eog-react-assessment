import {useSubscription} from '@apollo/react-hooks'
import { useQuery } from "@apollo/client"
import gql from 'graphql-tag'
import React from 'react'
import {getLastKnownMeasurementQuery, getMetricsQuery, getMultipleMeasurementsQuery, getNewMeasurement} from "../../store/query/queries"
import {storeChar} from '../../store/actions/dataActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const DashBoard = props => {
    // const { data, error ,loading } = useSubscription(getNewMeasurement)
    // const now = new Date(); // get the time from 30 minutes ago
    // now.setMinutes(now.getMinutes() - 1);
    // const after = now.getTime();
    let input = [
      {
        metricName: "flareTemp",
        //after: after
      },
      // {
      //   metricName: "waterTemp",
      //   //after: after
      // },
      // {
      //     metricName: "casingPressure",
      //     //after: after
      //   },
      //   {
      //     metricName: "oilTemp",
      //     //after: after
      //   },
      //   {
      //     metricName: "tubingPressure",
      //     //after: after
      //   },
      //   {
      //     metricName: "injValveOpen",
      //     //after: after
      //   }
    ];
    const { data, error, loading} = useQuery(getMultipleMeasurementsQuery, {variables : {
      input
    }} )

    if(loading) {
        return <div>loading...</div>
    }
    if (error) {
    return <div>error! {error.message}</div>
    }

    if (data){
      //console.log(data.getMultipleMeasurements)
      data.getMultipleMeasurements.forEach(item=>{
        //console.log("item",item)
        props.storeChar(item.measurements,item.metric)
      })
    }

    
    //console.log(props.flareTemp)
    
    const  renderChar =  () =>{
      if(props.flareTemp !==null && props.lastFlareTemp !== null){
         if(props.lastFlareTemp.at !== props.flareTemp[props.flareTemp.length-1].at) {
                    let newArray =  JSON.parse(JSON.stringify(props.flareTemp));
                    newArray.push({at:props.lastFlareTemp.at, value: props.lastFlareTemp.value});
                    newArray.shift();
                    //props.storeChar(newArray,"flareTemp")
                    //console.log(newArray)
                }
        //console.log(props.flareTemp)
      return (<div>
            <div>flareTemp: {props.flareTemp[0].at} : {props.flareTemp[0].value} , {props.flareTemp[props.flareTemp.length-1].at} : {props.flareTemp[props.flareTemp.length-1].value} </div>
            {/* <div>waterTemp: {props.waterTemp[0].at} : {props.waterTemp[0].value} , {props.waterTemp[props.waterTemp.length-1].at} : {props.waterTemp[props.waterTemp.length-1].value} </div> */}
            {/* <div>casingPressure: {props.casingPressure[0].at} : {props.casingPressure[0].value} , {props.casingPressure[props.casingPressure.length-1].at} : {props.casingPressure[props.casingPressure.length-1].value} </div> */}

      </div>)
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
    lastFlareTemp : state.dataReducer.lastFlareTemp

  }
}

const mapDispatchToProps = dispatch =>
      bindActionCreators({
        storeChar
      },dispatch)
  


export default connect(mapStatetoProps,mapDispatchToProps)(DashBoard);
