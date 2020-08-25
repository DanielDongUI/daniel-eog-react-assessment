import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleSavedData from "./SingleSavedData"
import line from "./line.png"

const useStyles = makeStyles({
    container: {
        height: '35vh',
        display: "flex",
        justifyContent : "space-evenly",
        alignItems: "center",
        backgroundColor:"rgb(0,0,0,0.05)",
    },
    StatuBar: {
        position: "relative", 
        width: "85vw",
        height: "2vh",
        left:"7.5vw",
        cursor: "pointer",
        '&:hover': {
            boxShadow: '3px 3px 3px black',
        },
    },
    StatuBarOpen :{
        display: "block",
        position: "absolute", 
        width: "85vw",
        height: "2vh",
        top:"34vh",
        left:"7.5vw",
        cursor: "pointer",
        '&:hover': {
            boxShadow: '3px 3px 3px black',
        },
    }
  });

const DropDownBar = (props) =>{
    const styles = useStyles();
    const [dropDownStatus, setStatus] = useState(false) // set drop bar status
    const handleOnClick = () =>{
        setStatus(!dropDownStatus)
    }
    const dropBarRender = () =>{
        if(dropDownStatus){
            return (<div className={styles.container} >
                {props.savedData.map((item,index)=>{
                    return <SingleSavedData key={index} data={item}/>
                })}
                <img 
                onClick={handleOnClick} 
                className={styles.StatuBarOpen} 
                src={line} 
                alt="StatuBar"
                />
            </div>)
        }else{
            return (
                <img 
                onClick={handleOnClick} 
                className={styles.StatuBar} 
                src={line} 
                alt="StatuBar"
                />
            )
        }
    }
    return (
        <div>
            {dropBarRender()}
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
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(DropDownBar);