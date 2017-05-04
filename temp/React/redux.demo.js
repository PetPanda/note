import { Provider ,connect} from 'react-redux';
import {Component,PropTypes} from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux'

class Counter extends Component {
    render(){
        const {value , onIncrease}  = this.props;
        return (
            <div className="content">
                <span>{value}</span>                        
                <button onClick={onIncrease}>Increase</button>
            </div>
        )
    }
}

Counter.PropTypes = {
    value: PropTypes.number.isRequired,
    onIncrease: PropTypes.func.isRequired
}

//action

const increaseAction = {
    type: 'increase'
}

//reducer

const counter = (state = {count:0},action) => {
    const count = state.count;
    switch(action.type){
        case 'increase': 
            return {count: count+1}
        default: 
            return state
    }
}

//store

const store = createStore(counter);


//map rudux state to component props
const mapStateToProps = (state, ownProps) => {
    return {
        vaule: state.vaule
    }
}
    
//map redux action to component props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIncrease: () => {
            dispatch(counter)
        }
    }
}
// Connect Component
const App = connect({
    mapDispatchToProps,
    mapStateToProp

})(Counter);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)