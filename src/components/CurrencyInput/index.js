import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import "./styles.scss";

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const CurrencyInput = ({ maskOptions, ...inputProps }) => {
    const currencyMask = createNumberMask({
        ...defaultMaskOptions,
        ...maskOptions,
    })

    const onChange = (event) => {
        this.props.onChange(event);
    };

  return (
     <div className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth">
         <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl currency-mask">
             <MaskedInput mask={currencyMask} {...inputProps} className="MuiInputBase-input MuiOutlinedInput-input" />
         </div>
     </div>
  )
}

CurrencyInput.defaultProps = {
  inputMode: 'numeric',
  maskOptions: {},
}

CurrencyInput.propTypes = {
  inputmode: PropTypes.string,
  maskOptions: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    includeThousandsSeparator: PropTypes.bool,
    thousandsSeparatorSymbol: PropTypes.string,
    allowDecimal: PropTypes.bool,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.string,
    requireDecimal: PropTypes.bool,
    allowNegative: PropTypes.bool,
    allowLeadingZeroes: PropTypes.bool,
    integerLimit: PropTypes.number,
  }),
}

export default CurrencyInput;