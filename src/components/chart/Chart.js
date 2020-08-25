import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';

const useStyles = makeStyles({
    container: {

        height: '83vh',
        minWidth: '1000px',
        background: 'gray',
    },
  });

const Chart = (props) =>{
    const styles = useStyles();
    return (
        <div className={styles.container} >
            
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
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(Chart);