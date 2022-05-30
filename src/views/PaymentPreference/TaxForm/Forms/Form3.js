import React from 'react';

const Form3 =(props) => {

    return(
        <div id="page3">
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
              <span style={{ fontSize: "10pt", fontWeight: "bold" }}>3</span>
            </div>
            <div style={{ clear: "both", width: "100%", fontSize: "8pt" }}>
              <div style={{ float: "left", width: "380px" }}>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  <b>Criminal penalty for falsifying information.</b> Willfully
                  falsifying certifications or affirmations may subject you to
                  criminal penalties including fines and/or imprisonment.
                </p>

                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  <b>Misuse of TINs.</b> If the requester discloses or uses TINs
                  in violation of federal law, the requester may be subject to
                  civil and criminal penalties.
                </p>
                <p
                  style={{
                    marginTop: "7px",
                    marginBottom: "0px",
                    fontWeight: "bold",
                    fontSize: "13pt"
                  }}
                >
                  Specific Instructions
                </p>
                <p style={{ fontSize: "10pt", fontWeight: "bold" }}> Line 1</p>
                <p>
                  {" "}
                  You must enter one of the following on this line;{" "}
                  <b>do not</b> leave this line blank. The name should match the
                  name on your tax return.
                </p>
                <p>
                  {" "}
                  If this Form W-9 is for a joint account (other than an account
                  maintained by a foreign financial institution (FFI)), list
                  first, and then circle, the name of the person or entity whose
                  number you entered in Part I of Form W-9. If you are providing
                  Form W-9 to an FFI to document a joint account, each holder of
                  the account that is a U.S. person must provide a Form W-9.
                </p>

                <ol
                  style={{
                    margin: "2px 0px 0px 10px",
                    padding: "0px",
                    lineHeight: "14px",
                    listStyle: "lower-alpha inside"
                  }}
                >
                  <li style={{ margin: "5px 0" }}>
                    <b>Individual.</b> Generally, enter the name shown on your
                    tax return. If you have changed your last name without
                    informing the Social Security Administration (SSA) of the
                    name change, enter your first name, the last name as shown
                    on your social security card, and your new last name. <br />
                    <b> Note: ITIN applicant:</b> Enter your individual name as
                    it was entered on your Form W-7 application, line 1a. This
                    should also be the same as the name you entered on the Form
                    1040/1040A/1040EZ you filed with your application.
                  </li>
                  <li style={{ margin: "5px 0" }}>
                    {" "}
                    <b>Sole proprietor or single-member LLC.</b> Enter your
                    individual name as shown on your 1040/1040A/1040EZ on line
                    1. You may enter your business, trade, or “doing business
                    as” (DBA) name on line 2.
                  </li>
                  <li style={{ margin: "5px 0" }}>
                    {" "}
                    <b>
                      Partnership, LLC that is not a single-member LLC, C
                      corporation,
                    </b>{" "}
                    or S corporation. Enter the entity's name as shown on the
                    entity's tax return on line 1 and any business, trade, or
                    DBA name on line 2.
                  </li>
                  <li style={{ margin: "5px 0" }}>
                    {" "}
                    <b> Other entities. </b>Enter your name as shown on required
                    U.S. federal tax documents on line 1. This name should match
                    the name shown on the charter or other legal document
                    creating the entity. You may enter any business, trade, or
                    DBA name on line 2.
                  </li>
                  <li style={{ margin: "5px 0" }}>
                    {" "}
                    <b>Disregarded entity.</b> For U.S. federal tax purposes, an
                    entity that is disregarded as an entity separate from its
                    owner is treated as a “disregarded entity.” See Regulations
                    section 301.7701-2(c)(2)(iii). Enter the owner's name on
                    line 1. The name of the entity entered on line 1 should
                    never be a disregarded entity. The name on line 1 should be
                    the name shown on the income tax return on which the income
                    should be reported. For example, if a foreign LLC that is
                    treated as a disregarded entity for U.S. federal tax
                    purposes has a single owner that is a U.S. person, the U.S.
                    owner's name is required to be provided on line 1. If the
                    direct owner of the entity is also a disregarded entity,
                    enter the first owner that is not disregarded for federal
                    tax purposes. Enter the disregarded entity's name on line 2,
                    “Business name/disregarded entity name.” If the owner of the
                    disregarded entity is a foreign person, the owner must
                    complete an appropriate Form W-8 instead of a Form W-9. This
                    is the case even if the foreign person has a U.S. TIN.
                  </li>
                </ol>
                <p
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    margin: "4px 0"
                  }}
                >
                  {" "}
                  Line 2
                </p>
                <p style={{ margin: "0px" }}>
                  {" "}
                  If you have a business name, trade name, DBA name, or
                  disregarded entity name, you may enter it on line 2.
                </p>
                <p
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    margin: "4px 0"
                  }}
                >
                  {" "}
                  Line 3
                </p>
                <p style={{ margin: "0px" }}>
                  {" "}
                  Check the appropriate box on line 3 for the U.S. federal tax
                  classification of the person whose name is entered on line 1.
                  Check only one box on line 3.
                </p>
              </div>
              <div
                style={{ float: "left", width: "380px", marginLeft: "20px" }}
              >
                <table
                  cellPadding={3}
                  cellSpacing={0}
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    borderLeft: "1px solid black",
                    borderRight: "1px solid black",
                    fontSize: "8pt",
                    marginTop: "10px",
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
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top",
                          width: "189px"
                        }}
                      >
                        IF the entity/person on line 1 is <br /> a(n) . . .
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
                        THEN check the box for . . .
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          borderBottom: "1px solid black",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        • Corporation
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        Corporation
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          borderBottom: "1px solid black",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        • Individual
                        <br />
                        • Sole proprietorship, or <br />
                        • Single-member limited liability
                        <br />
                        company (LLC) owned by an individual and disregarded for
                        U.S. federal tax purposes.
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        Individual/sole proprietor or singlemember LLC
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          borderBottom: "1px solid black",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        • LLC treated as a partnership for U.S. federal tax
                        purposes, <br />
                        • LLC that has filed Form 8832 or 2553 to be taxed as a
                        corporation,
                        <br />
                        or <br />• LLC that is disregarded as an entity separate
                        from its owner but the owner is another LLC that is not
                        disregarded for U.S. federal tax purposes.
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        Limited liability company and enter the appropriate tax
                        classification. (P= Partnership; C= C corporation; or S=
                        S corporation)
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          borderRight: "1px solid black",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        • Partnership
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        Partnership
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        • Trust/estate
                      </td>
                      <td
                        style={{
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        Trust/estate
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    margin: "4px 0"
                  }}
                >
                  Line 4, Exemptions
                </p>
                <p>
                  {" "}
                  If you are exempt from backup withholding and/or FATCA
                  reporting, enter in the appropriate space on line 4 any
                  code(s) that may apply to you
                </p>
                <p>
                  {" "}
                  <b>Exempt payee code.</b>
                </p>
                <ol
                  style={{
                    listStyle: "disc inside ",
                    margin: "0",
                    padding: " 0"
                  }}
                >
                  <li>
                    {" "}
                    Generally, individuals (including sole proprietors) are not
                    exempt from backup withholding.
                  </li>
                  <li>
                    {" "}
                    Except as provided below, corporations are exempt from
                    backup withholding for certain payments, including interest
                    and dividends.
                  </li>
                  <li>
                    {" "}
                    Corporations are not exempt from backup withholding for
                    payments made in settlement of payment card or third party
                    network transactions.
                  </li>
                  <li>
                    {" "}
                    Corporations are not exempt from backup withholding with
                    respect to attorneys’ fees or gross proceeds paid to
                    attorneys, and corporations that provide medical or health
                    care services are not exempt with respect to payments
                    reportable on Form 1099-MISC. <br /> The following codes
                    identify payees that are exempt from backup withholding.
                    Enter the appropriate code in the space in line 4.
                  </li>
                </ol>

                <ol
                  style={{
                    listStyle: "decimal inside ",
                    margin: "0",
                    padding: " 0"
                  }}
                >
                  <li>
                    - An organization exempt from tax under section 501(a), any
                    IRA, or a custodial account under section 403(b)(7) if the
                    account satisfies the requirements of section 401(f)(2)
                  </li>

                  <li>
                    —The United States or any of its agencies or
                    instrumentalities
                  </li>
                  <li>
                    — A state, the District of Columbia, a U.S. commonwealth or
                    possession, or any of their political subdivisions or
                    instrumentalities
                  </li>
                  <li>
                    — A foreign government or any of its political subdivisions,
                    agencies, or instrumentalities
                  </li>

                  <li>— A corporation</li>
                  <li>
                    — A dealer in securities or commodities required to register
                    in the United States, the District of Columbia, or a U.S.
                    commonwealth or possession
                  </li>
                  <li>
                    — A futures commission merchant registered with the
                    Commodity Futures Trading Commission
                  </li>
                  <li>—A real estate investment trust </li>
                  <li>
                    —An entity registered at all times during the tax year under
                    the Investment Company Act of 1940
                  </li>
                  <li>
                    — A common trust fund operated by a bank under section
                    584(a)
                  </li>
                  <li>— A financial institution</li>
                  <li>
                    — A middleman known in the investment community as a nominee
                    or custodian
                  </li>
                  <li>
                    — A trust exempt from tax under section 664 or described in
                    section 4947
                  </li>
                </ol>
              </div>
            </div>
        </div>
    )
}

export default Form3;