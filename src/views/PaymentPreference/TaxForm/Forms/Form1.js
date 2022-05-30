import React, { useRef } from 'react';
import { OutlinedInput, InputAdornment} from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {useState} from 'react'
const useStyles = makeStyles({
  star: {
    color: '#8b0000',
  },
  hiddenLabel: {
    display:'none',
  }
});

const Form1 =(props) => {
    const classes = useStyles();
    const {handleChange, formData, errors, canEdit, canEditSSN} = props;
    const formcsz = (formData && [formData.City, formData.State, formData.ZipCode].filter(Boolean))||"";
    const csz = (formData && formData.csz) || formcsz.toString();
    const ssnNumber = formData && formData.SSN;
    //console.warn('deepakForm', ssnNumber);
   

    const signatureDate = canEdit ? moment().format("MM/DD/YYYY"): (formData && formData.SignatureDate && moment.utc(formData.SignatureDate).local().format("MM/DD/YYYY") || moment().format("MM/DD/YYYY") );
    //console.log("asdfd",formcsz);

    const ssn1 = useRef(null);
    const ssn2 = useRef(null);
    const ssn3 = useRef(null);
    const ssn4 = useRef(null);
    const ssn5 = useRef(null);
    const ssn6 = useRef(null);
    const ssn7 = useRef(null);
    const ssn8 = useRef(null);
    const ssn9 = useRef(null);

    const ein1 = useRef(null);
    const ein2 = useRef(null);
    const ein3 = useRef(null);
    const ein4 = useRef(null);
    const ein5 = useRef(null);
    const ein6 = useRef(null);
    const ein7 = useRef(null);
    const ein8 = useRef(null);
    const ein9 = useRef(null);
    const [showCszError,setShowCszError]= useState(false)
    const handleBlur = ()=>{
    if(csz.length){
      let len = csz.length
      const val =  csz.substring(len-5, len);
      const cszArray = csz.split(",")
      const cszValue = cszArray[2]
      const cszLengh = cszValue && cszValue.length

      const flagofFifteen  = Number(cszValue)
      const flag = Number(val);
      console.log("val",val,"cszarr",cszArray,"cszVlue",cszValue,"cszlen",cszLengh,"flagof15",flagofFifteen,"flag",flag)
      if(cszLengh <5 || cszLengh>16){
        setShowCszError(true)
        return
      }
      if(isNaN(flag)){
        console.log("inside2")
        setShowCszError(true)
      } 
      if(isNaN(flagofFifteen)){
        console.log("inside3")
        setShowCszError(true)
      } 
      
      
    }
    }
    const handleMove =(refField, field, e, position) => {
        if(isNaN(e.target.value)){
            return false;
        }

        if(field == 'SSN'){
            switch(refField){
                case 'ssn1':
                    ssn2.current.focus();
                break;
                case 'ssn2':
                    ssn3.current.focus();
                break;
                case 'ssn3':
                    ssn4.current.focus();
                break;
                case 'ssn4':
                    ssn5.current.focus();
                break;
                case 'ssn5':
                    ssn6.current.focus();
                break;
                case 'ssn6':
                    ssn7.current.focus();
                break;
                case 'ssn7':
                    ssn8.current.focus();
                break;
                case 'ssn8':
                    ssn9.current.focus();
                break;
                default:
                break;
            }
        } else {
            switch(refField){
                case 'ein1':
                    ein2.current.focus();
                break;
                case 'ein2':
                    ein3.current.focus();
                break;
                case 'ein3':
                    ein4.current.focus();
                break;
                case 'ein4':
                    ein5.current.focus();
                break;
                case 'ein5':
                    ein6.current.focus();
                break;
                case 'ein6':
                    ein7.current.focus();
                break;
                case 'ein7':
                    ein8.current.focus();
                break;
                case 'ein8':
                    ein9.current.focus();
                break;
                default:
                break;
            }
        }
        handleChange(field, e, position);
        //console.log("ref", field)
    }

    const handleLimitedLiability=(field, e)=> {
        const LimitedLiabilityCodes = ['C', 'S', 'P', '']
        if(LimitedLiabilityCodes.indexOf(e.target.value.toUpperCase()) === -1){
            return false;
        }
        handleChange(field, e);
    }

   const handleExemptPayeeCode=(field, e)=> {
        //only 1 to 13
        if( (parseInt(e.target.value)>  0 && parseInt(e.target.value)<14 && !isNaN(e.target.value)) || (e.target.value=="")) {
            handleChange(field, e);
        }
        return false;
    }

   const handleFATCACode=(field, e)=>{
        //only A to M
        const FATCAcodes =['A', 'B', 'C', 'D', 'E','F','G','H','I','J','K','L','M',''];
        if(FATCAcodes.indexOf(e.target.value.toUpperCase()) === -1){
            return false;

        }
        handleChange(field, e);
    }
const returnSSN = (index)=>{
  if(formData && formData.SSN ){
    return formData.SSN[index]
  }
  return ssnNumber ?ssnNumber[index] :""
 
}
    return(
        <div id="page1">
            <div style={{ width: "100%", fontSize: "7pt" }}>
              <div
                style={{
                  float: "left",
                  width: "132px",
                  height: "73px",
                  borderBottom: "2px solid black",
                  borderRight: "2px solid black"
                }}
              >
                <div
                  style={{ clear: "both", position: "relative", bottom: "8px" }}
                >
                  Form{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "27pt",
                      paddingLeft: "8px"
                    }}
                  >
                    W-9
                  </span>
                  <br />
                  (Rev. December 2018)
                  <br />
                  Department of the Treasury
                  <br />
                  Internal Revenue Services
                </div>
              </div>
              <div
                style={{
                  float: "left",
                  height: "73px",
                  width: "512px",
                  borderBottom: "2px solid black",
                  borderRight: "2px solid black",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14pt"
                }}
              >
                <div style={{ clear: "both", marginTop: "5px" }}>
                  Request for Taxpayer
                  <br />
                  Identification Number and Certification
                </div>
                <div style={{ fontSize: "11px", marginTop: "5px" }}>
                  {" "}
                  Go to{" "}
                  <a href="#" style={{ color: "#000", fontStyle: "italic" }}>
                    {" "}
                    www.irs.gov/FormW9
                  </a>{" "}
                  for instructions and the latest information.{" "}
                </div>
              </div>
              <div
                style={{
                  float: "left",
                  height: "73px",
                  borderBottom: "2px solid black",
                  width: "132px",
                  fontSize: "9pt",
                  fontWeight: "bold"
                }}
              >
                <div style={{ paddingTop: "14px", paddingLeft: "8px" }}>
                  Give form to the requester. Do not send to the IRS.
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  float: "left",
                  width: "33px",
                  height: "360px",
                  position: "relative",
                  borderRight: "1px solid black"
                }}
              >
                <p
                  style={{
                    transform: "rotate(-90deg)",
                    fontSize: "8pt",
                    position: "absolute",
                    textAlign: "center",
                    top: "131px",
                    left: "-134px",
                    width: "290px",
                    fontSize: "9pt",
                    filter:
                      "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)"
                  }}
                >
                  {" "}
                  <b> Print or type.</b> <br /> See{" "}
                  <b> Specific Instructions</b> on page 3
                </p>
              </div>
              <div style={{ float: "left", width: "746px" }}>
                <div
                  style={{
                    clear: "both",
                    width: "100%",
                    borderBottom: "1px solid black"
                  }}
                >
                  <div
                    style={{
                      clear: "both",
                      paddingLeft: "6px",
                      fontSize: "7pt"
                    }}
                  >
                    <label for="name"><b>1 </b> Name (as shown on your income tax return). Name is
                    required on this line; do not leave this line blank.<span className={classes.star}>*</span></label>
                  </div>
                  <div style={{ clear: "both", fontSize: "12pt" }}>
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        padding: "5px",
                        boxSizing: "border-box",
                        border: errors && errors.name? "1px solid red": "none",
                        background: "#f1f6f7"
                      }}
                      maxLength="35"
                      disabled={!canEdit}
                      value={formData && formData.Name || ""}
                      onChange={(e) => handleChange('Name', e)}
                      error={formData && formData.Name < 5}
                      id="name"
                      //helperText = {formData && formData.Name > 50 ? "Length should be less than 50":''}
                    />
                  </div>
                </div>
                <div
                  style={{
                    clear: "both",
                    width: "100%",
                    borderBottom: "1px solid black"
                  }}
                >
                  <div
                    style={{
                      clear: "both",
                      paddingLeft: "6px",
                      fontSize: "7pt"
                    }}
                  >
                    <label for="business">
                    <b>2 </b> Business name/disregarded entity name, if
                    different from above<span className={classes.star}>*</span>
                    </label>
                  </div>
                  <div style={{ clear: "both", fontSize: "12pt" }}>
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        padding: "5px",
                        boxSizing: "border-box",
                        border:  errors && errors.businessName? "1px solid red": "none",
                        background: "#f1f6f7"
                      }}
                      maxLength="35"
                      disabled={!canEdit}
                      value={formData && formData.BusinessName || ""}
                      onChange={(e) => handleChange('BusinessName', e)}
                      id="business"
                    />
                  </div>
                </div>
                <div
                  style={{
                    clear: "both",
                    width: "100%",
                    borderBottom: "1px solid black",
                    height: "160px",
                    fontSize: "7pt"
                  }}
                >
                  <div
                    style={{
                      float: "left",
                      width: "520px",
                      borderRight: "1px solid black",
                      border:errors && errors.federalTaxClassificationId? "1px solid red": "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <div style={{ clear: "both", paddingLeft: "6px" }}>
                    <label for="federal">
                      <b>3 </b> Check appropriate box for federal tax
                      classification of the person whose name is entered on line
                      1. Check only <b> one </b> of the following seven boxes.<span className={classes.star}>*</span>
                    </label>
                    </div>
                    <div
                      style={{
                        clear: "both",
                        paddingLeft: "6px",
                        padding: "5px 0 0 6px"                        
                      }}
                    >
                      <label style={{ float: "left" }}>
                        <input disabled={!canEdit} type="checkbox" value="I" checked={formData && formData.FederalTaxClassificationId=="I"?true:false} onChange={(e) => handleChange('FederalTaxClassificationId', e)} style={{ float: "left" }} />
                        <span style={{ float: "left" }}>
                          {" "}
                          Individual/sole proprietor or <br /> single-member LLC{" "}
                        </span>
                      </label>
                      <label style={{ paddingLeft: "15px" }}>
                        <input disabled={!canEdit} type="checkbox" value="C" checked={formData && formData.FederalTaxClassificationId=="C"?true:false} onChange={(e) => handleChange('FederalTaxClassificationId', e)}  /> C Corporation
                      </label>
                      <label style={{ paddingLeft: "15px" }}>
                        <input disabled={!canEdit} type="checkbox" value="S" checked={formData && formData.FederalTaxClassificationId=="S"?true:false} onChange={(e) => handleChange('FederalTaxClassificationId', e)} /> S Corporation
                      </label>
                      <label style={{ paddingLeft: "15px" }}>
                        <input disabled={!canEdit} type="checkbox" value="P" checked={formData && formData.FederalTaxClassificationId=="P"?true:false} onChange={(e) => handleChange('FederalTaxClassificationId', e)} /> Partnership
                      </label>
                      <label style={{ paddingLeft: "15px" }}>
                        <input disabled={!canEdit} type="checkbox" value="T" checked={formData && formData.FederalTaxClassificationId=="T"?true:false} onChange={(e) => handleChange('FederalTaxClassificationId', e)} /> Trust/estate
                      </label>
                    </div>
                    <div
                      className="taxClassification"
                      style={{
                        clear: "both",
                        paddingLeft: "6px",
                        paddingTop: "5px"
                      }}
                    >
                      
                        <input id="limited" disabled={!canEdit} type="checkbox" value="L" checked={formData && formData.FederalTaxClassificationId=="L"?true:false} onChange={(e) => handleChange('FederalTaxClassificationId', e)} />
                        <label for="limited">Limited liability company.
                        Enter the tax classification (C=C Corporation, S=S
                        Corporation, P=partnership){" "}
                        </label>
                        <input
                          style={{
                            width: "30px",
                            border: errors && errors.limitedLiability? "1px solid red": "none",
                            padding: "2px",
                            boxSizing: "border-box",
                            background: "#f1f6f7"
                          }}
                          maxLength="1"
                          disabled={!(canEdit && formData && formData.FederalTaxClassificationId=="L")}
                          value={formData && formData.LimitedLiability || ""}
                          onChange={(e) => handleLimitedLiability('LimitedLiability', e)}
                          id="limited"
                        />
                        
                        <div style={{ padding: "2px 0 0 23px" }}>
                        <label for="note">
                          <b> Note:</b> Check the appropriate box in the line
                          above for the tax classification of the single-member
                          owner. Do not check LLC if the LLC is classified as a
                          single-member LLC that is disregarded from the owner
                          unless the owner of the LLC is another LLC that is not
                          disregarded from the owner for U.S. federal tax
                          purposes. Otherwise, a single-member LLC that is
                          disregarded from the owner should check the
                          appropriate box for the tax classification of its
                          owner.
                          </label>
                        </div>
                      
                    </div>
                    <div
                      className="taxClassification"
                      style={{ clear: "both", paddingLeft: "6px" }}
                    >
                      <label for="other">
                        <input id="other" checked={formData && formData.FederalTaxClassificationId=="O"?true:false} disabled={!canEdit} type="checkbox" value="O" onChange={(e) => handleChange('FederalTaxClassificationId', e)}/> Other (see instructions){" "}
                        </label>
                        <label for="othertext" className="hiddenLabel">Other</label>
                        <input
                          style={{
                            width: "380px",
                            border: errors && errors.othersText? "1px solid red": "none",
                            padding: "2px",
                            boxSizing: "border-box",
                            background: "#f1f6f7"
                          }}
                          maxLength="100"
                          disabled={!(canEdit && formData && formData.FederalTaxClassificationId == "O")}
                          value={formData && formData.OthersText || ""}
                          onChange={(e) => handleChange('OthersText', e)}
                          id="othertext"
                        />
                      
                    </div>
                  </div>
                  <div style={{ float: "left", padding: "2px 0 5px 5px" }}>
                    <div style={{ clear: "both", marginBottom: "10px" }}>
                      <b>4 </b> Exemptions (codes apply only to certain
                      entities, <br />
                      not individuals; see instructions on page 3):
                    </div>
                    <label for="Exempt">
                      Exempt payee code (if any){" "}</label>
                      <input
                        type="text"
                        style={{
                          width: "70px",
                          float: "right",
                          border: errors && errors.exemptPayeeCode? "1px solid red": "none",
                          padding: "2px",
                          marginLeft: "5px",
                          boxSizing: "border-box",
                          background: "#f1f6f7"
                        }}
                        maxLength="2"
                        disabled={!canEdit}
                        value={formData && formData.ExemptPayeeCode || ""}
                        onChange={(e) => handleExemptPayeeCode('ExemptPayeeCode', e)}
                        id="Exempt"
                      />
                    
                  </div>

                  <div
                    style={{
                      float: "left",
                      width: "205px",
                      padding: "2px 0 5px 5px"
                    }}
                  >
                    <label for="FATCA">
                      Exemption from FATCA reporting <br /> code (if any){" "}</label>
                      <input
                        type="text"
                        style={{
                          width: "140px",
                          float: "right",
                          border: errors && errors.FATCACode? "1px solid red": "none",
                          padding: "2px",
                          marginLeft: "5px",
                          boxSizing: "border-box",
                          background: "#f1f6f7"
                        }}
                        maxLength="1"
                        disabled={!canEdit}
                        value={formData && formData.FATCACode || ""}
                        onChange={(e) => handleFATCACode('FATCACode', e)}
                        id="FATCA"
                      />
                  </div>
                </div>
                <div
                  style={{
                    clear: "both",
                    width: "100%",
                    borderBottom: "1px solid black",
                    height: "80px"
                  }}
                >
                  <div
                    style={{
                      float: "left",
                      width: "499px",
                      borderRight: "1px solid black",
                      height: "80px"
                    }}
                  >
                    <div
                      style={{
                        clear: "both",
                        width: "499px",
                        borderBottom: "1px solid black",
                        height: "38px"
                      }}
                    >
                      <div
                        style={{
                          clear: "both",
                          paddingLeft: "6px",
                          fontSize: "7pt"
                        }}
                      >
                        <label for="address">
                        <b>5 </b> Address (number, street, and apt. or suite
                        no.) See instructions.<span className={classes.star}>*</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          padding: "5px",
                          boxSizing: "border-box",
                          border: errors && errors.address1? "1px solid red": "none",
                          background: "#f1f6f7"
                        }}
                        maxLength="100"
                        disabled={!canEdit}
                        value={formData && formData.Address1 || ""}
                        onChange={(e) => handleChange('Address1', e)}
                        id="address"
                      />
                    </div>
                    <div
                      style={{ clear: "both", width: "499px", height: "35px" }}
                    >
                      <div
                        style={{
                          clear: "both",
                          paddingLeft: "6px",
                          fontSize: "7pt"
                        }}
                      >
                        <label for="city">
                        <b>6 </b> City, state, and ZIP code<span className={classes.star}>*</span> (For Ex. Milwaukee,WI,53202)
                        </label>
                      </div>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          padding: "5px",
                          boxSizing: "border-box",
                          border: errors && errors.csz ? "1px solid red": "none",
                          border:showCszError ? "1px solid red":"none",
                          background: "#f1f6f7"
                        }}
                        maxLength="50"
                        disabled={!canEdit}
                        value={csz||""}
                        onChange={(e) => {
                          setShowCszError(false)
                          handleChange('csz', e)}}
                        onBlur={()=>handleBlur(csz)}
                        id="city"
                      />
                    </div>
                  </div>
                  <div style={{ float: "right", width: "246px" }}>
                    <div
                      style={{
                        clear: "both",
                        paddingLeft: "6px",
                        fontSize: "7pt"
                      }}
                    >
                      <label for="Requester">
                      Requester’s name and address (optional)
                      </label>
                    </div>
                    <textarea
                      rows="3"
                      cols="50"
                      name="comment"
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: errors && errors.requestersNameandAddress? "1px solid red": "none",
                        background: "#f1f6f7"
                      }}
                      disabled={!canEdit}
                      value={formData && formData.RequestersNameandAddress || " "}
                      onChange={(e) => handleChange('RequestersNameandAddress', e)}
                      id="Requester"
                    >
                    
                    </textarea>
                  </div>
                </div>
                <div style={{ clear: "both", width: "100%", height: "35px" }}>
                  <div
                    style={{
                      clear: "both",
                      paddingLeft: "6px",
                      fontSize: "7pt"
                    }}
                  >
                    <label for="listaccount">
                    <b>7 </b> List account number(s) here (optional)
                    </label>
                  </div>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "5px",
                      boxSizing: "border-box",
                      border:  errors && errors.listAccountNumber? "1px solid red": "none",
                      background: "#f1f6f7"
                    }}
                    maxLength="40"
                    disabled={!canEdit}
                    value={formData && formData.ListAccountNumber || ""}
                    onChange={(e) => handleChange('ListAccountNumber', e)}
                    id="listaccount"
                  />
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  clear: "both",
                  width: "100%",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  height: "17px"
                }}
              >
                <div
                  className={"partSubheading"}
                  style={{
                    float: "left",
                    backgroundColor: "black",
                    width: "56px",
                    height: "17px",
                    lineHeight: "17px",
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontSize: "10pt",
                    fontWeight: "bold"
                  }}
                >
                  Part I
                </div>
                <div
                  style={{
                    float: "left",
                    paddingLeft: "29px",
                    fontWeight: "bold",
                    fontSize: "10pt"
                  }}
                >
                  Taxpayer Identification Number (TIN)
                </div>
              </div>
              <div style={{ clear: "both", width: "100%", height: "105px" }}>
                <div style={{ width: "536px", float: "left", fontSize: "8pt" }}>
                  <p style={{ marginTop: "4px", marginBottom: "0px" }}>
                    Enter your TIN in the appropriate box. The TIN provided must
                    match the name given on line 1 to avoid backup withholding.
                    For individuals, this is generally your social security
                    number (SSN). However, for a resident alien, sole
                    proprietor, or disregarded entity, see the instructions for
                    Part I, later. For other entities, it is your employer
                    identification number (EIN). If you do not have a number,{" "}
                    <span style={{ fontStyle: "italic" }}>
                      {" "}
                      see How to get a TIN,
                    </span>{" "}
                    later.
                  </p>
                  <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                    <span style={{ fontWeight: "bold" }}>Note.</span> If the
                    account is in more than one name, see the instructions for
                    line 1. Also see{" "}
                    <span style={{ fontStyle: "italic" }}>
                      {" "}
                      What Name and Number To Give the Requester{" "}
                    </span>{" "}
                    for guidelines on whose number to enter.
                  </p>
                </div>
                <div style={{ float: "left" }}>
                  <div style={{ clear: "both" }}>
                    <div
                      style={{
                        clear: "both",
                        width: "242px",
                        border: "1px solid black",
                        borderTop: "none"
                      }}
                    >
                      <span
                        style={{
                          paddingLeft: "6px",
                          fontWeight: "bold",
                          fontSize: "8pt"
                        }}
                      >
                        Social security number <span className={classes.star}>*</span>
                      </span>
                    </div>
                    <div style={{ clear: "both", marginTop: "2px", boxSizing: "border-box", border: errors && errors.ssn? "1px solid red": "none" }}>
                    <label for="ssnone" className="hiddenLabel">SSO One</label>
                      <input
                        type="password"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!(canEdit && canEditSSN)}
                        maxLength="1"
                        value={returnSSN(0)}
                        ref={ssn1}
                        onChange={(e) => handleMove('ssn1', 'SSN', e, 0)}
                        id="ssnone"
                      />
                      <label for="ssntwo" className="hiddenLabel">SSO Two</label>
                      <input
                        type="password"
                        style={{ width: 15, height: 20, margin: 0 }}
                         disabled={!(canEdit && canEditSSN)}
                        maxLength="1"
                        value={returnSSN(1)}
                        ref={ssn2}
                        onChange={(e) => handleMove('ssn2', 'SSN', e, 1)}
                        id="ssntwo"
                      />
                      <label for="ssnthree" className="hiddenLabel">SSO Three</label>
                      <input
                        type="password"
                        style={{ width: 15, height: 20, margin: 0 }}
                         disabled={!(canEdit && canEditSSN)}
                        maxLength="1"
                        ref={ssn3}
                        value={returnSSN(2)}
                        onChange={(e) => handleMove('ssn3', 'SSN', e, 2)}
                        id="ssnthree"
                      />{" "}
                      -{" "}
                      <label for="ssnfour" className="hiddenLabel">SSO Four</label>
                      <input
                        type="password"
                        style={{ width: 15, height: 20, margin: 0 }}
                         disabled={!(canEdit && canEditSSN)}
                        maxLength="1"
                        value={ returnSSN(3)}
                        ref={ssn4}
                        onChange={(e) => handleMove('ssn4', 'SSN', e, 3)}
                        id="ssnfour"
                      />
                      <label for="ssnfive" className="hiddenLabel">SSO Five</label>
                      <input
                        type="password"
                        style={{ width: 15, height: 20, margin: 0 }}
                         disabled={!(canEdit && canEditSSN)}
                        maxLength="1"
                        value={returnSSN(4)}
                        ref={ssn5}
                        onChange={(e) => handleMove('ssn5', 'SSN', e, 4)}
                        id="ssnfive"
                      />{" "}
                      -{" "}
                      <label for="ssnsix" className="hiddenLabel">SSO Six</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!(canEdit && canEditSSN)}
                        maxLength="1"
                        value={returnSSN(5)}
                        ref={ssn6}
                        onChange={(e) => handleMove('ssn6', 'SSN', e, 5)}
                        id="ssnsix"
                      />
                      <label for="ssnseven" className="hiddenLabel">SSO Seven</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                         disabled={!(canEdit && canEditSSN)}
                        maxLength="1"
                        value={returnSSN(6)}
                        ref={ssn7}
                        onChange={(e) => handleMove('ssn7', 'SSN', e, 6)}
                        id="ssnseven"
                      />
                      <label for="ssneight" className="hiddenLabel">SSO Eight</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                         disabled={!(canEdit && canEditSSN)}
                        maxLength="1"
                        value={returnSSN(7)}
                        ref={ssn8}
                        onChange={(e) => handleMove('ssn8', 'SSN', e, 7)}
                        id="ssneight"
                      />
                      <label for="ssnnine" className="hiddenLabel">SSO Nine</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!(canEdit && canEditSSN)}
                        maxLength="1"
                        value={returnSSN(8)}
                        ref={ssn9}
                        onChange={(e) => handleMove('ssn9', 'SSN', e, 8)}
                        id="ssnnine"
                      />
                      <br /> <span style={{fontSize: "12pt"}}> or</span> <br />
                    </div>
                  </div>
                  <div style={{ clear: "both" }}>
                    <div
                      style={{
                        clear: "both",
                        width: "219px",
                        border: "1px solid black"
                      }}
                    >
                      <span
                        style={{
                          paddingLeft: "6px",
                          fontWeight: "bold",
                          fontSize: "8pt"
                        }}
                      >
                        Employer identification number
                      </span>
                    </div>
                    <div style={{ clear: "both", marginTop: "2px", boxSizing: "border-box", border: errors && errors.ein? "1px solid red": "none", }}>
                      <label for="empn1" className="hiddenLabel">EMP NO1</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!canEdit}
                        maxLength="1"
                        value={formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber[0] || ""}
                        ref={ein1}
                        onChange={(e) => handleMove('ein1', 'EmployerIdentificationNumber', e, 0)}
                        id="empn1"
                      />
                      <label for="empn2" className="hiddenLabel">EMP NO2</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!canEdit}
                        maxLength="1"
                        value={formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber[1] || ""}
                        ref={ein2}
                        onChange={(e) => handleMove('ein2', 'EmployerIdentificationNumber', e, 1)}
                        id="empn2"
                      />{" "}
                      -{" "}
                      <label for="empn3" className="hiddenLabel">EMP NO3</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!canEdit}
                        maxLength="1"
                        value={formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber[2] || ""}
                        ref={ein3}
                        onChange={(e) => handleMove('ein3', 'EmployerIdentificationNumber', e, 2)}
                        id="empn3"
                      />
                      <label for="empn4" className="hiddenLabel">EMP NO4</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!canEdit}
                        maxLength="1"
                        value={formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber[3] || ""}
                        ref={ein4}
                        onChange={(e) => handleMove('ein4', 'EmployerIdentificationNumber', e, 3)}
                        id="empn4"
                      />
                      <label for="empn5" className="hiddenLabel">EMP NO5</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!canEdit}
                        maxLength="1"
                        value={formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber[4] || ""}
                        ref={ein5}
                        onChange={(e) => handleMove('ein5', 'EmployerIdentificationNumber', e, 4)}
                        id="empn5"
                      />
                      <label for="empn6" className="hiddenLabel">EMP NO6</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!canEdit}
                        maxLength="1"
                        value={formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber[5] || ""}
                        ref={ein6}
                        onChange={(e) => handleMove('ein6', 'EmployerIdentificationNumber', e, 5)}
                        id="empn6"
                      />
                      <label for="empn7" className="hiddenLabel">EMP NO7</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!canEdit}
                        maxLength="1"
                        value={formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber[6] || ""}
                        ref={ein7}
                        onChange={(e) => handleMove('ein7', 'EmployerIdentificationNumber', e, 6)}
                        id="empn7"
                      />
                      <label for="empn8" className="hiddenLabel">EMP NO8</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!canEdit}
                        maxLength="1"
                        value={formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber[7] || ""}
                        ref={ein8}
                        onChange={(e) => handleMove('ein8', 'EmployerIdentificationNumber', e, 7)}
                        id="empn8"
                      />
                      <label for="empn9" className="hiddenLabel">EMP NO9</label>
                      <input
                        type="text"
                        style={{ width: 15, height: 20, margin: 0 }}
                        disabled={!canEdit}
                        maxLength="1"
                        value={formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber[8] || ""}
                        ref={ein9}
                        onChange={(e) => handleMove('ein9', 'EmployerIdentificationNumber', e, 8)}
                        id="empn9"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  clear: "both",
                  width: "100%",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  height: "17px"
                }}
              >
                <div
                  className={"partSubheading"}
                  style={{
                    float: "left",
                    backgroundColor: "black",
                    width: "56px",
                    height: "17px",
                    lineHeight: "17px",
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontSize: "10pt",
                    fontWeight: "bold"
                  }}
                >
                  Part II
                </div>
                <div
                  style={{
                    float: "left",
                    paddingLeft: "29px",
                    fontWeight: "bold",
                    fontSize: "10pt"
                  }}
                >
                  Certification
                </div>
              </div>
              <div style={{ clear: "both", width: "780px", fontSize: "8pt" }}>
                <p style={{ marginTop: "4px", marginBottom: "0px" }}>
                  Under penalties of perjury, I certify that:
                </p>
                <ol
                  style={{
                    margin: "2px 0 0 10px",
                    padding: 0,
                    lineHeight: "15px"
                  }}
                >
                  <li>
                    The number shown on this form is my correct taxpayer
                    identification number (or I am waiting for a number to be
                    issued to me), and{" "}
                  </li>
                  <li>
                    {" "}
                    I am not subject to backup withholding because: (a) I am
                    exempt from backup withholding, or (b) I have not been
                    notified by the Internal Revenue Service (IRS) that I am
                    subject to backup withholding as a result of a failure to
                    report all interest or dividends, or (c) the IRS has
                    notified me that I am no longer subject to backup
                    withholding; and
                  </li>
                  <li>
                    I am a U.S. citizen or other U.S. person (defined below);
                    and{" "}
                  </li>
                  <li>
                    The FATCA code(s) entered on this form (if any) indicating
                    that I am exempt from FATCA reporting is correct.{" "}
                  </li>
                </ol>

                <p style={{ marginTop: "7px", marginBottom: "2px" }}>
                  <b> Certification instructions.</b> You must cross out item 2
                  above if you have been notified by the IRS that you are
                  currently subject to backup withholding because you have
                  failed to report all interest and dividends on your tax
                  return. For real estate transactions, item 2 does not apply.
                  For mortgage interest paid, acquisition or abandonment of
                  secured property, cancellation of debt, contributions to an
                  individual retirement arrangement (IRA), and generally,
                  payments other than interest and dividends, you are not
                  required to sign the certification, but you must provide your
                  correct TIN. See the instructions for Part II, later.
                </p>
              </div>
              <div
                style={{
                  clear: "both",
                  width: "100%",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  height: "36px"
                }}
              >
                <div
                  style={{
                    float: "left",
                    width: "55px",
                    borderRight: "1px solid black",
                    height: "36px",
                    fontSize: "10pt",
                    fontWeight: "bold"
                  }}
                >
                  Sign
                  <br />
                  Here
                </div>
                <div
                  style={{
                    float: "left",
                    paddingLeft: "10px",
                    fontWeight: "bold",
                    fontSize: "7pt",
                    paddingTop: "5px",
                    width: "450px"
                  }}
                >
                 <div style={{ float: "left", width:"100px" }}>
                   <label for="signature">
                    <b>
                      {" "}
                      Signature of
                      <br />
                      U.S. person <span className={classes.star}>*</span>{" "}
                    </b>
                    </label>
                  </div>
                  <div style={{ float: "left", width:"200px" }}>
                        <input
                        type="text"
                        style={{
                          width: "100%",
                          padding: "5px",
                          boxSizing: "border-box",
                          border: errors && errors.signatureText? "1px solid red": "none",
                          background: "#f1f6f7"
                        }}
                        disabled={!canEdit}
                        value={formData && formData.SignatureText || ""}
                        onChange={(e) => handleChange('SignatureText', e)}
                        id="signature"
                      />
                  </div>
                </div>
                <div
                  style={{
                    float: "left",
                    paddingLeft: "10px",
                    fontWeight: "bold",
                    fontSize: "7pt",
                    paddingTop: "5px"
                  }}
                >
                  <div style={{ float: "left" }}>
                    <b>
                      {" "}
                      <br />
                      {signatureDate}
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ clear: "both", width: "100%", fontSize: "8pt" }}>
              <div style={{ float: "left", width: "380px" }}>
                <p
                  style={{
                    marginTop: "4px",
                    marginBottom: "0px",
                    fontSize: "13pt",
                    fontWeight: "bold"
                  }}
                >
                  General Instructions
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  Section references are to the Internal Revenue Code unless
                  otherwise noted. <br />
                  <b> Future developments. </b> For the latest information about
                  developments related to Form W-9 and its instructions, such as
                  legislation enacted after they were published, go to{" "}
                  <em>www.irs.gov/FormW9.</em>
                </p>

                <p
                  style={{
                    marginTop: "7px",
                    marginBottom: "0px",
                    fontSize: "13pt",
                    fontWeight: "bold"
                  }}
                >
                  Purpose of Form
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  An individual or entity (Form W-9 requester) who is required
                  to file an information return with the IRS must obtain your
                  correct taxpayer identification number (TIN) which may be your
                  social security number (SSN), individual taxpayer
                  identification number (ITIN), adoption taxpayer identification
                  number (ATIN), or employer identification number (EIN), to
                  report on an information return the amount paid to you, or
                  other amount reportable on an information return. Examples of
                  information returns include, but are not limited to, the
                  following.
                </p>
                <ul style={{ margin: "4px 0px 4px 14px", padding: 0 }}>
                  <li> Form 1099-INT (interest earned or paid)</li>
                </ul>
              </div>
              <div
                style={{ float: "left", width: "380px", marginLeft: "20px" }}
              >
                <ul
                  style={{
                    margin: "7px 0 0 14px",
                    padding: 0,
                    lineHeight: "14px"
                  }}
                >
                  <li>
                    {" "}
                    Form 1099-DIV (dividends, including those from stocks or
                    mutual funds)
                  </li>
                  <li>
                    {" "}
                    Form 1099-MISC (various types of income, prizes, awards, or
                    gross proceeds)
                  </li>
                  <li>
                    {" "}
                    Form 1099-B (stock or mutual fund sales and certain other
                    transactions by brokers)
                  </li>
                  <li> Form 1099-S (proceeds from real estate transactions)</li>
                  <li>
                    {" "}
                    Form 1099-K (merchant card and third party network
                    transactions)
                  </li>
                  <li>
                    {" "}
                    Form 1098 (home mortgage interest), 1098-E (student loan
                    interest), 1098-T (tuition)
                  </li>
                  <li> Form 1099-C (canceled debt)</li>
                  <li>
                    {" "}
                    Form 1099-A (acquisition or abandonment of secured property)
                    Use Form W-9 only if you are a U.S. person (including a
                    resident alien), to provide your correct TIN.{" "}
                  </li>
                </ul>
                <p style={{ paddingLeft: "15px" }}>
                  {" "}
                  <em>
                    {" "}
                    If you do not return Form W-9 to the requester with a TIN,
                    you might be subject to backup withholding. See{" "}
                  </em>
                  What is backup withholding, <em> later</em>
                </p>
              </div>
            </div>
         </div>
    )
}

export default Form1;