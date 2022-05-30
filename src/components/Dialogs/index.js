import React from 'react';
import { Button, Grid, Box, DialogTitle, Dialog, DialogActions, DialogContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getColorCodeByClientCode } from "~/services/config/index";
import './styles.scss';
import { connect } from 'react-redux'


class _ConfirmDialog extends React.Component {
    render() {
        const { title, message, onConfirm, onCancel, cancelLabel, okLabel, isIconVisible } = this.props;
        const { configs } = this.props.clientConfig;
        let buttonPrimaryColor = getColorCodeByClientCode(configs, "C00015");
        let buttonSecondaryColor = getColorCodeByClientCode(configs, "C00019");
        let buttonPrimartTextColor = getColorCodeByClientCode(configs, "C00020");
        return (
            <div id="mainDialogs">
                <Dialog
                    open={true}
                    onClose={onCancel}
                    >

                    <Box py={6} px={6}>
                    { isIconVisible ? 
                                <div style={{display: 'flex', justifyContent:'center'}}> <img alt="success" alignItems="center" src={require('~/assets/images/success-alert.png')} width="48" height="48" /></div>
                                : null
                            }
                        {title && <DialogTitle className="dialogTitle">{title}</DialogTitle>}
                        <DialogContent>
                            <div className="dialogContent">{message}</div>
                        </DialogContent>
                    </Box>
                    <Box display="flex" flexGrow={1} justifyContent="center" alignItems="center">
                        <Button variant="contained" className="noBtn" fullWidth={true} onClick={onCancel} style={{ color: `${buttonPrimartTextColor}`, backgroundColor: buttonSecondaryColor }} color={`${buttonSecondaryColor}`}>
                            {cancelLabel ? cancelLabel : 'No'}
                    </Button>
                        <Button variant="contained" className="yesBtn" fullWidth={true} onClick={onConfirm} style={{ color: `${buttonPrimartTextColor}`, backgroundColor: buttonPrimaryColor }} color={`${buttonPrimaryColor}`} autoFocus>
                        {okLabel ? okLabel : 'Yes'}
                    </Button>
                    </Box>
                </Dialog>
            </div>
        );
    }
}


class _AlertDialog extends React.Component {
    render() {
        const { dialogClassName = "", title, message, confirmText, onConfirm, px, py, clickOutsideToClose, show = true, success = false, showCancelBtn = false, onClose, btnDisabled = btnDisabled ? btnDisabled : false, outsideClick,
            showContinueBtn = false, onContinue, continueText, redeemDisabled } = this.props;
        const { configs } = this.props.clientConfig;
        let buttonPrimaryColor = getColorCodeByClientCode(configs, "C00015");
        let buttonSecondaryColor = getColorCodeByClientCode(configs, "C00019");
        let buttonPrimartTextColor = getColorCodeByClientCode(configs, "C00020");
        return (
            <Dialog
                open={true}
                onClose={() => !outsideClick && (clickOutsideToClose || clickOutsideToClose === undefined) ? onConfirm() : null}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={`${dialogClassName || ""} AlertDialog`}
            >
                <Box py={py || 6} px={px || 6}>
                    {onClose ? (
                        <IconButton aria-label="close" className="closeButton" onClick={() => onClose()}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                    {success ? <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                        <img alt="success" alignItems="center" src={require('~/assets/images/success-alert.png')} width="48" height="48" />
                    </Box> : null}
                    {confirmText && confirmText == 'DISMISS' ? <h1 className="error-header">Oops!</h1> : null}
                    {title && <DialogTitle className="alert-dialog-title">{title}</DialogTitle>}
                    {(message || this.props.children) && (
                        <DialogContent className="alert-dialog-message">
                            {message && <Box color="primary.main" mb={2}>{message}</Box>}
                            {this.props.children && this.props.children}
                        </DialogContent>
                    )}
                    {show ? <DialogActions className="alert-dialog-action">
                        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                            {showCancelBtn ? <Button style={{ color: `${buttonPrimartTextColor}`, backgroundColor: buttonSecondaryColor }} color={`${buttonSecondaryColor}`} variant="contained" className="redeem-btn" onClick={clickOutsideToClose} >
                                Cancel
                    </Button> : null}
                            {showContinueBtn ? <Button style={{ color: `${buttonPrimartTextColor}`, backgroundColor: buttonPrimaryColor }} color={`${buttonPrimaryColor}`} variant="contained" className="redeem-btn" onClick={onContinue} >
                                {continueText ? continueText : 'Continue'}
                            </Button> : null}
                            <Button color={`${buttonPrimaryColor}`} disabled={btnDisabled === true || redeemDisabled === true ? true : false} style={btnDisabled === true || redeemDisabled === true ? { opacity: 0.5, color: `${buttonPrimartTextColor}`, backgroundColor: buttonPrimaryColor } : undefined} variant="contained" onClick={onConfirm} autoFocus>
                                {confirmText ? confirmText : 'OK'}
                            </Button>
                        </Box>
                    </DialogActions> : null}
                </Box>
            </Dialog>
        );
    }
}

export let AlertDialog = connect(state => ({ ...state.clientConfig }))(_AlertDialog);
export let ConfirmDialog = connect(state => ({ ...state.clientConfig }))(_ConfirmDialog);