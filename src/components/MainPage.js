import React from 'react';
import DashBoard from "./dashboard/DashBoard"
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';



const MainPage = (props) => {
    const conditionRender = () =>{
        if (props.lastInjValveOpen !== null){
        return  <DashBoard />
        }else{
            return <div>loading...</div>
        }
    }

return (
  <div>
    {conditionRender()}
  </div>)
}

const mapStatetoProps = state =>{
  return {
    lastInjValveOpen : state.dataReducer.lastInjValveOpen
  }
}

const mapDispatchToProps = dispatch =>
      bindActionCreators({
      },dispatch)
  


export default connect(mapStatetoProps,mapDispatchToProps)(MainPage);
