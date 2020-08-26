import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getWeather} from "../../store/query/queries"
import { useQuery } from "@apollo/client"

const useStyles = makeStyles({
    container: {
        position: "absolute",
        height: '15vh',
        width: "35vw",
        top:"30px",
        alignItems: "center",
        backgroundColor:"rgb(255,255,255,0.1)",
    },
  });
  

const Info = (props) =>{
    const styles = useStyles();
    const { data, error, loading} = useQuery(getWeather)
    
    if(loading) {
        //console.log(loading)
        //return <div>oading...</div>
    }
    if (error) {
       console.log(error)
        //return <div>error! {error.message}</div>
    }
    if (data){
        return (
        <div className={styles.container}>
            <p>Location: {data.getWeatherForLocation.locationName}</p>
            <p>Temperature: {data.getWeatherForLocation.temperatureinCelsius} C</p>
            <p>Description: {data.getWeatherForLocation.description}</p>
        </div>
        )
    }
    return (
        <div>
        </div>
    )
}

const mapStatetoProps = state =>{
    return {
      savedData : state.dataReducer.savedData,  
    }
  }
  
  const mapDispatchToProps = dispatch =>
        bindActionCreators({
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(Info);