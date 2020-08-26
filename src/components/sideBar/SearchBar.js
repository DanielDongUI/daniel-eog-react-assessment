import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getMetricsQuery} from "../../store/query/queries"
import { useQuery } from "@apollo/client"
import { debounce } from 'lodash';

const useStyles = makeStyles({
    container: {
        position: "absolute",
        width: "35vw",
        top:"20vh",
        alignItems: "center",
    },
  });


const SideBar = (props) =>{
    const styles = useStyles();
    const [input, setInput] = useState("") 
    const [time,setTime] = useState()
    const [show,setShow] = useState(false)
    const [metrics, setMetrics] = useState([])
    const [suggestionMetrics, setSuggestion] = useState([])
    const { data, error, loading} = useQuery(getMetricsQuery)
    if(loading) {
        //console.log(loading...)
    }
    if (error) {
        console.log(error)
    }
    useEffect(()=>{
        if(data){        
        setMetrics(data.getMetrics)
        }
    },[data])
    if(data){        
    }
    //autocomplete the input field
    const handleInput =(e)=>{
        const value = e.target.value;
        if (value.length < input.length){
            setInput(value)
            withoutDebounceSuggestion(value);
        }else{
            setInput(value)
            debounceSuggestion(value)
        }
    }
    //while delete
    const withoutDebounceSuggestion = (value)=> {
        let suggestion = [];
        let suggestionName = [];
        if (value.length > 0 ){
            //let template = new RegExp(`^${value}`,"i")// template.test(item) two different of autocomplete
            suggestion = metrics.filter(item =>item.toLowerCase().includes(value.toLowerCase()));
        }
        suggestion.forEach(item => suggestionName.push(item))
        suggestionName = suggestionName.sort();
        setSuggestion(suggestionName)
    }
    //while input give 0.5 sec delay
    const debounceSuggestion = debounce((value) => {
        let suggestion = [];
        let suggestionName = [];
        if (value.length > 0 ){
            suggestion = metrics.filter(item =>item.toLowerCase().includes(value.toLowerCase()));
        }
        suggestion.forEach(item => suggestionName.push(item))
        suggestionName = suggestionName.sort();
        setSuggestion(suggestionName)
    },500);
    

    const handleOnClick=()=>{
        console.log(input)
        console.log(time)
    }
    const autoComplete = () => {
        return <ul>
            {suggestionMetrics.map((item,key)=>{
                return <li 
                    key={key} 
                    onClick={() => selectSuggestion(item)}
                    style={{cursor:"pointer"}}
                    >
                    {item}
                    </li>
            })}
        </ul>
    }
    const selectSuggestion = (text) => {
        setInput(text)
        setSuggestion([])
    }

    return (
        <div className={styles.container}>
            <input 
            placeholder="metric name" 
            value = {input}
            onChange={handleInput} 
            style={{margin:"5px"}}
            />
            <input 
            placeholder="how many mins ago" 
            type="number"
            value = {time}
            onChange={(e)=>setTime(e.target.value)} 
            style={{margin:"5px"}}
            />
            <button onClick={handleOnClick}>submit</button>
            {autoComplete()}
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