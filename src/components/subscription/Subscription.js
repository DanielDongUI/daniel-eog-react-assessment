import {useSubscription} from '@apollo/react-hooks'
import React from 'react'
import {getNewMeasurement} from "../../store/query/queries"
import {storeSubscription} from '../../store/actions/dataActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const Subscription = (props) => {
    //fetch the latest data
    const { data, error ,loading } = useSubscription(getNewMeasurement)
    if(loading) {
        console.log("subloading")
    }
    if (error) {
        console.log("suberror")
    }
    if(data){
        props.storeSubscription(data.newMeasurement,data.newMeasurement.metric)
    }
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
        storeSubscription
      },dispatch)
  


export default connect(mapStatetoProps,mapDispatchToProps)(Subscription);
