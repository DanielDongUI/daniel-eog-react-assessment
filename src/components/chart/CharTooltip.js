import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';

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
    const styles = useStyles();
    let time = payload.label
    const realTime = new Date(time).toLocaleTimeString()
    let i = 0;
    for (let index = 0; index < payload.flareTemp.length;index++){
        if (payload.flareTemp[index].at === time){
            i = index;
        }
    }


    return (
        <div  className={styles.container}>
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
        flareTemp : state.dataReducer.flareTemp,
        waterTemp :state.dataReducer.waterTemp,
        casingPressure : state.dataReducer.casingPressure,
        oilTemp : state.dataReducer.oilTemp,
        tubingPressure : state.dataReducer.tubingPressure,
        injValveOpen : state.dataReducer.injValveOpen,
        /////////////
        flareTempBtn : state.statusReducer.flareTemp,
        waterTempBtn : state.statusReducer.waterTemp,
        casingPressureBtn : state.statusReducer.casingPressure,
        oilTempBtn : state.statusReducer.oilTemp,
        tubingPressureBtn : state.statusReducer.tubingPressure,
        injValveOpenBtn : state.statusReducer.injValveOpen,
  
    }
  }
  
  const mapDispatchToProps = dispatch =>
        bindActionCreators({
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(CharTooltip);