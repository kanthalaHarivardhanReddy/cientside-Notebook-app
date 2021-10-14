import React,{useContext} from 'react'
import alertContext from '../Context/alert/alertcontext';

const Alert = () => {
    const context = useContext(alertContext);
    const {alert}=context;
    console.log(alert)
    const capitalize=(word)=>{
        let lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
    return (
        <div style={{height:'40px'}}>
            {alert && < div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alert.type)}</strong>:{alert.msg}
            </div> }
        </div>
    )
};

export default Alert;
