import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import menu from "./menu.png"
import Info from "./Info"

const useStyles = makeStyles({
    container: {
        position: "absolute",
        height: '20vh',
        width: "35vw",
        alignItems: "center",
        backgroundColor:"rgb(255,155,81,0.6)",
    },
  });


const SideBar = (props) =>{
    const styles = useStyles();
    const [input, setInput] = useState("") 
    const [time,setTime] = useState()

    const handleOnClick=()=>{
        console.log(input)
        console.log(time)
    }
    return (
        <div className={styles.container}>
            <input 
            placeholder="metric name" 
            value = {input}
            onChange={()=>setInput(e.target.value)} 
            />
            <input 
            placeholder="how many minutes before?(max:30min)" 
            type="number"
            value = {time}
            onChange={()=>setInput(e.target.value)} 
            />
            <button onClick={handleOnClick}>submit</button>
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
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(SideBar);