import React from 'react';

const Form4 =(props) => {

    return(
        <div id="page4">
            <div
              style={{
                clear: "both",
                width: "100%",
                textAlign: "center",
                fontSize: "7pt",
                paddingTop: "4px",
                paddingBottom: "4px",
                borderTop: "2px solid black",
                borderBottom: "2px solid black"
              }}
            >
              Page{" "}
              <span style={{ fontSize: "10pt", fontWeight: "bold" }}>4</span>
            </div>
            <div style={{ clear: "both", width: "100%", fontSize: "8pt" }}>
              <div style={{ float: "left", width: "380px" }}>
                <p>
                  The following chart shows types of payments that may be exempt
                  from backup withholding. The chart applies to the exempt
                  payees listed above, 1 through 13.
                </p>

                <table
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    borderTop: "solid 1px black",
                    fontSize: "8pt",
                    width: "380px"
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          borderBottom: "1px solid black",
                          fontWeight: "bold",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top",

                          width: "189px"
                        }}
                      >
                        IF the payment is for . . .
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          fontWeight: "bold",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top",

                          width: "190px"
                        }}
                      >
                        THEN the payment is exempt
                        <br />
                        for . . .
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          borderBottom: "1px solid black",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          maxWidth: "1px"
                        }}
                      >
                        <div style={{ clear: "both" }}>
                          <div>Interest and dividend payments</div>
                        </div>
                      </td>
                      <td
                        style={{
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          borderBottom: "1px solid black"
                        }}
                      >
                        All exempt payees except for 7
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          borderBottom: "1px solid black",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          maxWidth: "1px"
                        }}
                      >
                        <div style={{ clear: "both" }}>
                          <div>Broker transactions</div>
                        </div>
                      </td>
                      <td
                        style={{
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          borderBottom: "1px solid black"
                        }}
                      >
                        Exempt payees 1 through 4 and 6 through 11 and all C
                        corporations. S corporations must not enter an exempt
                        payee code because they are exempt only for sales of
                        noncovered securities acquired prior to 2012.
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          borderBottom: "1px solid black",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          maxWidth: "1px"
                        }}
                      >
                        <div style={{ clear: "both" }}>
                          <div>
                            Barter exchange transactions and patronage dividends
                          </div>
                        </div>
                      </td>
                      <td
                        style={{
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          borderBottom: "1px solid black"
                        }}
                      >
                        Exempt payees 1 through 4
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          borderBottom: "1px solid black",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          maxWidth: "1px"
                        }}
                      >
                        <div style={{ clear: "both" }}>
                          <div>
                            Payments over $600 required to be reported and
                            direct sales over $5,0001
                          </div>
                        </div>
                      </td>
                      <td
                        style={{
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          borderBottom: "1px solid black"
                        }}
                      >
                        Generally, exempt payees 1 through 52
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          borderBottom: "1px solid black",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          maxWidth: "1px"
                        }}
                      >
                        <div style={{ clear: "both" }}>
                          <div>
                            Payments made in settlement of payment card or third
                            party network transactions
                          </div>
                        </div>
                      </td>
                      <td
                        style={{
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          borderBottom: "1px solid black"
                        }}
                      >
                        Exempt payees 1 through 4
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p
                  style={{
                    marginTop: "2px",
                    marginBottom: "0px",
                    fontSize: "7pt"
                  }}
                >
                  <sup>1</sup> See Form 1099-MISC, Miscellaneous Income, and its
                  instructions.
                </p>
                <p
                  style={{
                    marginTop: "2px",
                    marginBottom: "0px",
                    fontSize: "7pt"
                  }}
                >
                  <sup>2</sup> However, the following payments made to a
                  corporation and reportable on Form 1099-MISC are not exempt
                  from backup withholding: medical and health care payments,
                  attorneys’ fees, gross proceeds paid to an attorney reportable
                  under section 6045(f), and payments for services paid by a
                  federal executive agency.
                </p>
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "0px",
                    fontSize: "7pt"
                  }}
                >
                  <b>Exemption from FATCA reporting code.</b> The following
                  codes identify payees that are exempt from reporting under
                  FATCA. These codes apply to persons submitting this form for
                  accounts maintained outside of the United States by certain
                  foreign financial institutions. Therefore, if you are only
                  submitting this form for an account you hold in the United
                  States, you may leave this field blank. Consult with the
                  person requesting this form if you are uncertain if the
                  financial institution is subject to these requirements. A
                  requester may indicate that a code is not required by
                  providing you with a Form W-9 with “Not Applicable” (or any
                  similar indication) written or printed on the line for a FATCA
                  exemption code.
                </p>

                <p style={{ padding: "0px", margin: "5px 0" }}>
                  {" "}
                  A—An organization exempt from tax under section 501(a) or any
                  individual retirement plan as defined in section 7701(a)(37)
                </p>
                <p style={{ padding: "0px", margin: "5px 0" }}>
                  {" "}
                  B—The United States or any of its agencies or
                  instrumentalities
                </p>
                <p style={{ padding: "0px", margin: "5px 0" }}>
                  {" "}
                  C—A state, the District of Columbia, a U.S. commonwealth or
                  possession, or any of their political subdivisions or
                  instrumentalities
                </p>
                <p style={{ padding: "0px", margin: "5px 0" }}>
                  {" "}
                  D—A corporation the stock of which is regularly traded on one
                  or more established securities markets, as described in
                  Regulations section 1.1472-1(c)(1)(i)
                </p>
                <p style={{ padding: "0px", margin: "5px 0" }}>
                  E—A corporation that is a member of the same expanded
                  affiliated group as a corporation described in Regulations
                  section 1.1472-1(c)(1)(i){" "}
                </p>
                <p style={{ padding: "0px", margin: "5px 0" }}>
                  F—A dealer in securities, commodities, or derivative financial
                  instruments (including notional principal contracts, futures,
                  forwards, and options) that is registered as such under the
                  laws of the United States or any state{" "}
                </p>
                <p style={{ padding: "0px", margin: "5px 0" }}>
                  {" "}
                  G—A real estate investment trust
                </p>
                <p style={{ padding: "0px" }}>
                  {" "}
                  H—A regulated investment company as defined in section 851 or
                  an entity registered at all times during the tax year under
                  the Investment Company Act of 1940
                </p>
                <p style={{ padding: "0px", margin: "5px 0" }}>
                  {" "}
                  I—A common trust fund as defined in section 584(a)
                </p>
                <p style={{ padding: "0px", margin: "5px 0" }}>
                  {" "}
                  J—A bank as defined in section 581
                </p>
                <p style={{ padding: "0px", margin: "5px 0" }}> K—A broker </p>
                <p style={{ padding: "0px", margin: "5px 0" }}>
                  {" "}
                  L—A trust exempt from tax under section 664 or described in
                  section 4947(a)(1)
                </p>
              </div>
              <div
                style={{ float: "left", width: "380px", marginLeft: "20px" }}
              >
                <p style={{ padding: "0px", margin: "5px 0" }}>
                  M—A tax exempt trust under a section 403(b) plan or section
                  457(g) plan
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  <b>Note.</b> You may wish to consult with the financial
                  institution requesting this form to determine whether the
                  FATCA code and/or exempt payee code should be completed.
                </p>
                <p
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    margin: "4px 0"
                  }}
                >
                  Line 5
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  Enter your address (number, street, and apartment or suite
                  number). This is where the requester of this Form W-9 will
                  mail your information returns. If this address differs from
                  the one the requester already has on file, write NEW at the
                  top. If a new address is provided, there is still a chance the
                  old address will be used until the payor changes your address
                  in their records.
                </p>
                <p
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    margin: "4px 0"
                  }}
                >
                  Line 6
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  Enter your city, state, and ZIP code
                </p>
                <p
                  style={{
                    marginTop: "7px",
                    marginBottom: "0px",
                    fontWeight: "bold",
                    fontSize: "13pt"
                  }}
                >
                  Part I. Taxpayer Identification Number (TIN)
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  <b>Enter your TIN in the appropriate box. </b> If you are a
                  resident alien and you do not have and are not eligible to get
                  an SSN, your TIN is your IRS individual taxpayer
                  identification number (ITIN). Enter it in the social security
                  number box. If you do not have an ITIN, see How to get a TIN
                  below.{" "}
                </p>{" "}
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  If you are a sole proprietor and you have an EIN, you may
                  enter either your SSN or EIN.
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  {" "}
                  If you are a single-member LLC that is disregarded as an
                  entity separate from its owner, enter the owner’s SSN (or EIN,
                  if the owner has one). Do not enter the disregarded entity’s
                  EIN. If the LLC is classified as a corporation or partnership,
                  enter the entity’s EIN.{" "}
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  {" "}
                  Note: See What Name and Number To Give the Requester, later,
                  for further clarification of name and TIN combinations
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  {" "}
                  How to get a TIN. If you do not have a TIN, apply for one
                  immediately. To apply for an SSN, get Form SS-5, Application
                  for a Social Security Card, from your local SSA office or get
                  this form online at www.SSA.gov. You may also get this form by
                  calling 1-800-772-1213. Use Form W-7, Application for IRS
                  Individual Taxpayer Identification Number, to apply for an
                  ITIN, or Form SS-4, Application for Employer Identification
                  Number, to apply for an EIN. You can apply for an EIN online
                  by accessing the IRS website at www.irs.gov/Businesses and
                  clicking on Employer Identification Number (EIN) under
                  Starting a Business. Go to www.irs.gov/Forms to view,
                  download, or print Form W-7 and/or Form SS-4. Or, you can go
                  to www.irs.gov/OrderForms to place an order and have Form W-7
                  and/or SS-4 mailed to you within 10 business days.{" "}
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  {" "}
                  If you are asked to complete Form W-9 but do not have a TIN,
                  apply for a TIN and write “Applied For” in the space for the
                  TIN, sign and date the form, and give it to the requester. For
                  interest and dividend payments, and certain payments made with
                  respect to readily tradable instruments, generally you will
                  have 60 days to get a TIN and give it to the requester before
                  you are subject to backup withholding on payments. The 60-day
                  rule does not apply to other types of payments. You will be
                  subject to backup withholding on all such payments until you
                  provide your TIN to the requester.{" "}
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  Note: Entering “Applied For” means that you have already
                  applied for a TIN or that you intend to apply for one soon.{" "}
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  {" "}
                  Caution: A disregarded U.S. entity that has a foreign owner
                  must use the appropriate Form W-8.
                </p>
                <p
                  style={{
                    marginTop: "7px",
                    marginBottom: "0px",
                    fontWeight: "bold",
                    fontSize: "13pt"
                  }}
                >
                  Part II. Certification
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  To establish to the withholding agent that you are a U.S.
                  person, or resident alien, sign Form W-9. You may be requested
                  to sign by the withholding agent even if item 1, 4, or 5 below
                  indicates otherwise.
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  {" "}
                  For a joint account, only the person whose TIN is shown in
                  Part I should sign (when required). In the case of a
                  disregarded entity, the person identified on line 1 must sign.
                  Exempt payees, see Exempt payee code, earlier.
                </p>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  {" "}
                  Signature requirements. Complete the certification as
                  indicated in items 1 through 5 below.
                </p>
              </div>
            </div>
      </div>
    )
}

export default Form4;