import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import menu from "./menu.png"
import Info from "./Info"
import SearchBar from "./SearchBar"

const useStyles = makeStyles({
    container: {
        position: "absolute",
        height: '100%',
        width: "35vw",
        alignItems: "center",
        backgroundColor:"rgb(230,230,240,0.6)",
        zIndex:5
    },
    sideBar: {
        position: "absolute", 
        width: "20px",
        height: "20px",
        top: "10px",
        left: "10px",
        cursor: "pointer",
        zIndex:10,
        '&:hover': {
            boxShadow: '2px 2px 2px black',
        },
    },
    sideBarOpen :{
        display: "block",
        position: "absolute", 
        width: "20px",
        height: "20px",
        top: "10px",
        left: "10px",
        cursor: "pointer",
        zIndex:10,
        '&:hover': {
            boxShadow: '2px 2px 2px black',
        },
    }
  });

const SideBar = (props) =>{
    const styles = useStyles();
    const [sideBar, setStatus] = useState(false) // set drop bar status
    const handleOnClick = () =>{
        setStatus(!sideBar)
    }
    const sideBarRender = () =>{
        if(sideBar){
            return (<div className={styles.container} >
                <img onClick={handleOnClick} 
                className={styles.sideBarOpen} 
                src={menu} 
                alt="SideBar"
                />
                <Info />
                <SearchBar />
            </div>)
        }else{
            return (
                <img 
                onClick={handleOnClick} 
                className={styles.sideBar} 
                src={menu} 
                alt="SideBar"
                />
            )
        }
    }
    return (
        <div>
            {sideBarRender()}
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