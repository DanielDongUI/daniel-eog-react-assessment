import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {switchBtnStatus} from "../../store/actions/toggleAction"

const useStyles = makeStyles({
    container: {
        width: "10vw",
        height: "10vh",
        background: 'lightBlue',
        borderRadius: '10px',
        justifyContent : "space-evenly",
        padding:"5px",
        cursor: "pointer"
        
    },
    title: {
        width: "100%",
        display: 'block',
        textAlign: 'center',
    },
    infomation: {
        width: "100%",
        display: 'block',
        textAlign: 'center',
    }
  });

const SingleBtn = (props) => {
    const styles = useStyles() 
    //console.log(props.info.metric)
    let currentBtn = null
    if(props.info.metric === "flareTemp") {
        currentBtn = props.flareTemp
    }
    if(props.info.metric === "waterTemp") {
        currentBtn = props.waterTemp
    }
    if(props.info.metric === "casingPressure") {
        currentBtn = props.casingPressure
    }
    if(props.info.metric === "oilTemp") {
        currentBtn = props.oilTemp
    }
    if(props.info.metric === "tubingPressure") {
        currentBtn = props.tubingPressure
    }
    if(props.info.metric === "injValveOpen") {
        currentBtn = props.injValveOpen
    }
    const handleOnClick = ()=>{
        console.log(props.info.metric)
        props.switchBtnStatus(props.info.metric)
    }

    return (
    <div >
        <div 
        onClick={handleOnClick} 
        className={styles.container}  
        style={{opacity: currentBtn ? '1' : '.2' }}
        >
            <h3 className={styles.title}>
                {props.info.metric}
            </h3>
            <p className={styles.title}>
                {props.info.value} {props.info.unit}
            </p>
        </div>
    </div>)
}

const mapStatetoProps = state =>{
    return {
        flareTemp: state.statusReducer.flareTemp,
        waterTemp : state.statusReducer.waterTemp,
        casingPressure: state.statusReducer.casingPressure,
        oilTemp: state.statusReducer.oilTemp,
        tubingPressure: state.statusReducer.tubingPressure,
        injValveOpen: state.statusReducer.injValveOpen,
    }
  }
  
  const mapDispatchToProps = dispatch =>
        bindActionCreators({
            switchBtnStatus
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(SingleBtn);