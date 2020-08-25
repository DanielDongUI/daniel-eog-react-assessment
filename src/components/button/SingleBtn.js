import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {switchBtnStatus} from "../../store/actions/toggleAction"

const useStyles = makeStyles({
    container: {
        width: "10vw",
        height: "10vh",
        background: '#333',
        borderRadius: '10px',
        justifyContent : "space-evenly",
        padding:"5px"
        

    },
  });

const SingleBtn = (props) => {
    const styles = useStyles() 
    console.log(props)

    return (
    <div >
        <div className={styles.container}>

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