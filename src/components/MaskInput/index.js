import React, { Component } from "react";

class MaskInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actualSsn: "",
            maskedSsn: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { value } = this.props;
        const prevValue = "";
        const newValue = ""
        let actual = value || "";
        this.mask(prevValue, newValue, actual);
    }

    handleChange(event) {
        //const { masked } = this.props;
        const prevValue = this.state.maskedSsn;
        //const prevValue = masked;
        const newValue = event.target.value;
        let actual = this.state.actualSsn;
        this.mask(prevValue, newValue, actual)
    }

    mask(prevValue, newValue, actual) {
        console.log("new value", newValue);
        console.log("actual value", actual);
        if (newValue.length > prevValue.length) {
            let newChar = newValue.split("").pop();
            if(!isNaN(newChar))
                actual = `${actual}${newChar}`;
        }
        // backspacing / deleting
        else { console.log("delete");
            const charsRemovedCount = prevValue.length - newValue.length;
            if(newValue.length ==1) {
                actual = newValue;
            } else {
                actual = actual && actual.toString().substr(0, actual.length - charsRemovedCount) || "";
            }
        }
        this.setState({
            actualSsn: actual,
            maskedSsn: this.starredMask(actual)
        });
        this.props.getValue(actual);
    }

    starredMask(ssn) {
        ssn = ssn && ssn.toString();
        let maskedCharsLength = ssn && ssn.length > 4 ? ssn.length - 4 : 0;
        let str = "";
        str = ssn && "*".repeat(maskedCharsLength) + ssn.slice(maskedCharsLength);
        return str;
    }

    render() {
        const { disabled, maxLength, value, autoFocus, id } = this.props;
        let masked = this.starredMask(value);
        return (
            <div>
                <div>
                    <input
                        ref={input => {
                            this.ssnInput = input;
                        }}
                        name="ssn"
                        type="tel"
                        className="MaskedField"
                        value={masked}//masked from props
                        onChange={this.handleChange}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        maxLength={maxLength}
                        id={id}
                    />
                </div>
            </div>
        );
    }
}

export default MaskInput;
