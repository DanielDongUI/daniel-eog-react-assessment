import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getMetricsQuery} from "../../store/query/queries";
import { useQuery } from "@apollo/client";
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
    const [input, setInput] = useState("") //input field
    const [time,setTime] = useState(0) // input time
    const [show,setShow] = useState(false) //display the search result or not
    const [metrics, setMetrics] = useState([]) // metrics that fetched
    const [suggestionMetrics, setSuggestion] = useState([]) //autoComplete array
    const [result, setResult] = useState({}) //contain the value
    const [info, setInfo] = useState([]) //contain the martic name, unit and time
    //fetch the metric query
    const { data, error, loading} = useQuery(getMetricsQuery)
    if(loading) {
        //console.log(loading...)
    }
    if (error) {
        console.log(error)
    }
    //prevent too many re render
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
    //save the selected suggestion in the input state
    const selectSuggestion = (text) => {
        setInput(text)
        setSuggestion([])
    }
    //click submit
    const handleOnClick=()=>{
        setShow(true)
        if (time >= 30 ) { 
            return <div>time must be in 30 mins</div>
        }
        if (metrics.filter(item=>item===input).length === 0){
            return <div>metric not found</div>
        }
        //base one the input find the result
        let MS_PER_MINUTE = 60000;
        const afterT = new Date(props.lastInjValveOpen.at - time * MS_PER_MINUTE);
        const after = afterT.valueOf() 
        const realTime = new Date(after).toLocaleTimeString()
        if (input === "flareTemp"){
            setInfo(["flareTemp","F",realTime])
            findResult(props.flareTemp,after)
        }
        if (input === "waterTemp"){
            setInfo(["waterTemp","F",realTime])
            findResult(props.waterTemp,after)
        }
        if (input === "casingPressure"){
            setInfo(["casingPressure","F",realTime])
            findResult(props.casingPressure,after)
        }
        if (input === "oilTemp"){
            setInfo(["oilTemp","F",realTime])
            findResult(props.oilTemp,after)
        }
        if (input === "tubingPressure"){
            setInfo(["tubingPressure","F",realTime])
            findResult(props.tubingPressure,after)
        }
        if (input === "injValveOpen"){
            setInfo(["injValveOpen","F",realTime])
            findResult(props.injValveOpen,after)
        }
    }
    const findResult=(array,time)=>{
        let object = array.filter(item=>item.at===time || Math.abs(item.at-time)<1000)[0]
        //let realTime = new Date(object.at).toLocaleTimeString()
        setResult(object)
    }
    const searchResult = ()=>{
        if (show){
            return (
                <div>
                    <h4>{info[2]}</h4>
                    <p>Metric : {info[0]}</p>
                    <p>Value : {result.value} {info[1]}</p>
                </div>)
        }
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
            {searchResult()}
        </div>
    )
}

const mapStatetoProps = state =>{
    return {
        //////////full data
        flareTemp : state.dataReducer.flareTemp,
        waterTemp :state.dataReducer.waterTemp,
        casingPressure : state.dataReducer.casingPressure,
        oilTemp : state.dataReducer.oilTemp,
        tubingPressure : state.dataReducer.tubingPressure,
        injValveOpen : state.dataReducer.injValveOpen,  
        /////////last data
        lastInjValveOpen:state.dataReducer.lastInjValveOpen,

    }
  }
  
  const mapDispatchToProps = dispatch =>
        bindActionCreators({
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(SideBar);