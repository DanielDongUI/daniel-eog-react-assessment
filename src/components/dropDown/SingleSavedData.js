import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteSave} from "../../store/actions/dataActions"

const useStyles = makeStyles({
    container: {
        height: '32vh',
        width: '15vw',
        backgroundColor:"rgb(160,220,250,0.2)",
        padding:"10px",
        borderRadius: '10px',
        padding:"5px",
        alignItems: "center"    
    },
  });

const SingleSavedData = (props) => {
    const styles = useStyles() 
    const realTime = new Date(props.data.name).toLocaleTimeString()
return (
    <div >
         <div className={styles.container}>
            <h4>{realTime}</h4>
            <p>FlareTemp: {props.data.flareTemp} F</p>
            <p>WaterTemp: {props.data.waterTemp} F</p>
            <p>CasingPressure: {props.data.casingPressure} PSI</p>
            <p>OilTemp: {props.data.oilTemp} F</p>
            <p>TubingPressure: {props.data.tubingPressure} PSI</p>
            <p>InjValveOpen: {props.data.injValveOpen} %</p>
        </div>
    </div>)
}
const mapStatetoProps = state =>{
    return {
    }
  }
  
  const mapDispatchToProps = dispatch =>
        bindActionCreators({
            deleteSave
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(SingleSavedData);