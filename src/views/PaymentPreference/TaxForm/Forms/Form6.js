import React from 'react';

const Form6 =(props) => {

    return(
        <div id="page6">
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
              <span style={{ fontSize: "10pt", fontWeight: "bold" }}>6</span>
            </div>
            <div style={{ clear: "both", width: "100%", fontSize: "8pt" }}>
              <div style={{ float: "left", width: "380px" }}>
                <p>
                  The IRS does not initiate contacts with taxpayers via emails.
                  Also, the IRS does not request personal detailed information
                  through email or ask taxpayers for the PIN numbers, passwords,
                  or similar secret access information for their credit card,
                  bank, or other financial accounts
                </p>

                <p style={{ marginTop: "2px", marginBottom: "0px" }}>
                  forward this message to phishing@irs.gov. You may also report
                  misuse of the IRS name, logo, or other IRS property to the
                  Treasury Inspector General for Tax Administration (TIGTA) at
                  1-800-366-4484. You can forward suspicious emails to the
                  Federal Trade Commission at
                </p>
                <p style={{ marginTop: "2px", marginBottom: "0px" }}>
                  forward suspicious emails to the Federal Trade Commission at
                  spam@uce.gov or report them at www.ftc.gov/complaint. You can
                  contact the FTC at www.ftc.gov/idtheft or 877-IDTHEFT
                  (877-438-4338). If you have been the victim of identity theft,
                  see www.IdentityTheft.gov and Pub. 5027.
                </p>
                <p style={{ marginTop: "5px", marginBottom: "0px" }}>
                  Visit www.irs.gov/IdentityTheft to learn more about identity
                  theft and how to reduce your risk.
                </p>
              </div>
              <div
                style={{ float: "left", width: "380px", marginLeft: "20px" }}
              >
                <p
                  style={{
                    marginTop: "7px",
                    marginBottom: "0px",
                    fontWeight: "bold",
                    fontSize: "13pt"
                  }}
                >
                  Privacy Act Notice
                </p>

                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  Section 6109 of the Internal Revenue Code requires you to
                  provide your correct TIN to persons (including federal
                  agencies) who are required to file information returns with
                  the IRS to report interest, dividends, or certain other income
                  paid to you; mortgage interest you paid; the acquisition or
                  abandonment of secured property; the cancellation of debt; or
                  contributions you made to an IRA, Archer MSA, or HSA. The
                  person collecting this form uses the information on the form
                  to file information returns with the IRS, reporting the above
                  information. Routine uses of this information include giving
                  it to the Department of Justice for civil and criminal
                  litigation and to cities, states, the District of Columbia,
                  and U.S. commonwealths and possessions for use in
                  administering their laws. The information also may be
                  disclosed to other countries under a treaty, to federal and
                  state agencies to enforce civil and criminal laws, or to
                  federal law enforcement and intelligence agencies to combat
                  terrorism. You must provide your TIN whether or not you are
                  required to file a tax return. Under section 3406, payers must
                  generally withhold a percentage of taxable interest, dividend,
                  and certain other payments to a payee who does not give a TIN
                  to the payer. Certain penalties may also apply for providing
                  false or fraudulent information.
                </p>
              </div>
            </div>
        </div>
    )
}

export default Form6;