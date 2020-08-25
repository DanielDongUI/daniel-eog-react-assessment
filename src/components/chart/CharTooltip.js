import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSave } from "../../store/actions/dataActions"

const useStyles = makeStyles({
    container: {
        height: '35vh',
        width: '15vw',
        backgroundColor:"rgb(160,220,250,0.7)",
        padding:"10px",
        borderRadius: '10px',

    },
  });
const CharTooltip = (payload) =>{
    const [currentStatus , setStatus] = useState(0) // compare with the counter
    const styles = useStyles();
    let time = payload.label
    const realTime = new Date(time).toLocaleTimeString()
    let i = 0;
    // find the index of the current tooltip in the full data
    for (let index = 0; index < payload.flareTemp.length;index++){
        if (payload.flareTemp[index].at === time){
            i = index;
        }
    }
    //compare with the counter, if condition fit, save the tooltip data in the save list
    if(payload.savedStatus!== currentStatus && payload.active) {
        let tempData = payload.charData.filter((item)=>item.name === time)
        payload.addSave(tempData[0])
        setStatus(payload.savedStatus)
    }
    return (
        <div className={styles.container}>
            <h4>{realTime}</h4>
            <p>FlareTemp: {payload.flareTemp[i].value} F</p>
            <p>WaterTemp: {payload.waterTemp[i].value} F</p>
            <p>CasingPressure: {payload.casingPressure[i].value} PSI</p>
            <p>OilTemp: {payload.oilTemp[i].value} F</p>
            <p>TubingPressure: {payload.tubingPressure[i].value} PSI</p>
            <p>InjValveOpen: {payload.injValveOpen[i].value} %</p>
        </div>
    )
}


const mapStatetoProps = state =>{
    return {
        /////////full data
        flareTemp : state.dataReducer.flareTemp,
        waterTemp :state.dataReducer.waterTemp,
        casingPressure : state.dataReducer.casingPressure,
        oilTemp : state.dataReducer.oilTemp,
        tubingPressure : state.dataReducer.tubingPressure,
        injValveOpen : state.dataReducer.injValveOpen,
        //////////latest data
        flareTempBtn : state.statusReducer.flareTemp,
        waterTempBtn : state.statusReducer.waterTemp,
        casingPressureBtn : state.statusReducer.casingPressure,
        oilTempBtn : state.statusReducer.oilTemp,
        tubingPressureBtn : state.statusReducer.tubingPressure,
        injValveOpenBtn : state.statusReducer.injValveOpen,
        //////////counter
        savedStatus : state.dataReducer.savedStatus
  
    }
  }
  
  const mapDispatchToProps = dispatch =>
        bindActionCreators({
            addSave
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(CharTooltip);