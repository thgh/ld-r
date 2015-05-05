import React from 'react';

class BasicTextareaInput extends React.Component {
    constructor(props) {
        super(props);
        let v = this.props.spec.value;
        if(this.props.spec.isDefault){
            v = this.createDefaultValue(this.props.spec.valueType, this.props.spec.dataType);
        }
        //to initialize value in Property state
        this.props.onDataEdit(v);
        this.state = {value: v};
    }
    getRandomNumber() {
        return Math.round(+new Date() / 1000);
    }
    createDefaultValue(valueType, dataType) {
        if(valueType === 'uri'){
            return 'http://example.com/' + this.getRandomNumber();
        }else{
            return 'exampleValue' + this.getRandomNumber();
        }
    }
    handleChange(event) {
        this.props.onDataEdit(event.target.value);
        this.setState({value: event.target.value});
    }
    render() {
        return (
            <div className="ui">
                <textarea value={this.state.value} onChange={this.handleChange.bind(this)}></textarea>
            </div>
        );
    }
}

export default BasicTextareaInput;