import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleBtn from "./SingleBtn"

const useStyles = makeStyles({
    container: {
        height: '15vh',
        display: "flex",
        justifyContent : "space-evenly",
        alignItems: "center"
    },
  });

const ToggleBtn = (props) =>{
    const styles = useStyles();
    return (
        <div className={styles.container} >
          <SingleBtn info = {props.lastFlareTemp} />
          <SingleBtn info = {props.lastWaterTemp} />
          <SingleBtn info = {props.lastCasingPressure} />
          <SingleBtn info = {props.lastOilTemp} />
          <SingleBtn info = {props.lastTubingPressure} />
          <SingleBtn info = {props.lastInjValveOpen} />
        </div>
    )
}

const mapStatetoProps = state =>{
    return {
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
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(ToggleBtn);