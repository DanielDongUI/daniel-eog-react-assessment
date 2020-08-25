import {useSubscription} from '@apollo/react-hooks'
import { useQuery } from "@apollo/client"
import gql from 'graphql-tag'
import React,{useEffect} from 'react'
import {getLastKnownMeasurementQuery, getMetricsQuery, getMultipleMeasurementsQuery, getNewMeasurement} from "../../store/query/queries"
import {storeChar, storeSubscription, updataChar} from '../../store/actions/dataActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const Subscription = (props) => {
    const { data, error ,loading } = useSubscription(getNewMeasurement)

    if(loading) {
        console.log("subloading")
    }
    if (error) {
    console.log("suberror")
    }

    // if(props.flareTemp !==null){
        // let newObject = {
        //     metric: data.newMeasurement.metric,
        //     at: data.newMeasurement.at,
        //     value: data.newMeasurement.value,
        //     unit: data.newMeasurement.unit
        // }
    if(data){
    if(data.newMeasurement.metric === "flareTemp"){
            props.storeSubscription(data.newMeasurement,data.newMeasurement.metric)
            if(props.flareTemp !== null) {
                //props.updataChar(data.newMeasurement,data.newMeasurement.metric)
            }

        }
    }
    if (props.lastFlareTemp!== null){
        return <div>{props.lastFlareTemp.at}</div>
    }
    //}
    
        // if(props.flareTemp !==null){
        //     if(data.newMeasurement.metric === "flareTemp"){
        //         let newArray = JSON.stringify(JSON.parse(props.flareTemp));
        //         newArray.push(newObject);
        //         newArray.shift();
        //         storeChar(newArray,data.newMeasurement.metric)
        //     }
        //     if(data.newMeasurement.metric === "waterTemp"){
        //         let newArray = JSON.stringify(JSON.parse(props.waterTemp));
        //         newArray.push(newObject);
        //         newArray.shift();
        //         storeChar(newArray,data.newMeasurement.metric)
        //     }
        //     if(data.newMeasurement.metric === "casingPressure"){
        //         let newArray = JSON.stringify(JSON.parse(props.casingPressure));
        //         newArray.push(newObject);
        //         newArray.shift();
        //         storeChar(newArray,data.newMeasurement.metric)
        //     }
        //     if(data.newMeasurement.metric === "oilTemp"){
        //         let newArray = JSON.stringify(JSON.parse(props.oilTemp));
        //         newArray.push(newObject);
        //         newArray.shift();
        //         storeChar(newArray,data.newMeasurement.metric)
        //     }
        //     if(data.newMeasurement.metric === "tubingPressure"){
        //         let newArray = JSON.stringify(JSON.parse(props.tubingPressure));
        //         newArray.push(newObject);
        //         newArray.shift();
        //         storeChar(newArray,data.newMeasurement.metric)
        //     }
        //     if(data.newMeasurement.metric === "injValveOpen"){
        //         let newArray = JSON.stringify(JSON.parse(props.injValveOpen));
        //         newArray.push(newObject);
        //         newArray.shift();
        //         storeChar(newArray,data.newMeasurement.metric)
        //     }
        // }
      
    return (
        <div>
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
        storeChar, storeSubscription, updataChar
      },dispatch)
  


export default connect(mapStatetoProps,mapDispatchToProps)(Subscription);
