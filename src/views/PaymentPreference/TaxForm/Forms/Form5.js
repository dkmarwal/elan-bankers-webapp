import React from 'react';

const Form5 =(props) => {

    return(
        <div id="page5">
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
              <span style={{ fontSize: "10pt", fontWeight: "bold" }}>5</span>
            </div>
            <div style={{ clear: "both", width: "100%", fontSize: "8pt" }}>
              <div style={{ float: "left", width: "380px" }}>
                <ol
                  style={{
                    padding: "0px",
                    margin: "5px 0  0 0px",
                    listStyle: "inside decimal"
                  }}
                >
                  <li style={{ paddingBottom: "5px" }}>
                    {" "}
                    <b>
                      {" "}
                      Interest, dividend, and barter exchange accounts opened
                      before 1984 and broker accounts considered active during
                      1983.{" "}
                    </b>{" "}
                    <br /> You must give your correct TIN, but you do not have
                    to sign the certification.
                  </li>
                  <li style={{ paddingBottom: "5px" }}>
                    {" "}
                    <b>
                      {" "}
                      Interest, dividend, broker, and barter exchange accounts
                      opened after 1983 and broker accounts considered inactive
                      during 1983.{" "}
                    </b>{" "}
                    You must sign the certification or backup withholding will
                    apply. If you are subject to backup withholding and you are
                    merely providing your correct TIN to the requester, you must
                    cross out item 2 in the certification before signing the
                    form.{" "}
                  </li>
                  <li style={{ paddingBottom: "5px" }}>
                    {" "}
                    <b> Real estate transactions.</b> You must sign the
                    certification. You may cross out item 2 of the
                    certification.
                  </li>
                  <li style={{ paddingBottom: "5px" }}>
                    {" "}
                    <b>Other payments. </b>You must give your correct TIN, but
                    you do not have to sign the certification unless you have
                    been notified that you have previously given an incorrect
                    TIN. “Other payments” include payments made in the course of
                    the requester’s trade or business for rents, royalties,
                    goods (other than bills for merchandise), medical and health
                    care services (including payments to corporations), payments
                    to a nonemployee for services, payments made in settlement
                    of payment card and third party network transactions,
                    payments to certain fishing boat crew members and fishermen,
                    and gross proceeds paid to attorneys (including payments to
                    corporations).{" "}
                  </li>
                  <li style={{ paddingBottom: "5px" }}>
                    {" "}
                    <b>
                      {" "}
                      Mortgage interest paid by you, acquisition or abandonment
                      of secured property, cancellation of debt, qualified
                      tuition program payments (under section 529), ABLE
                      accounts (under section 529A), IRA, Coverdell ESA, Archer
                      MSA or HSA contributions or distributions, and pension
                      distributions.
                    </b>{" "}
                    You must give your correct TIN, but you do not have to sign
                    the certification.
                  </li>
                </ol>
                <p
                  style={{
                    marginTop: "7px",
                    marginBottom: "0px",
                    fontWeight: "bold",
                    fontSize: "13pt",
                    letterSpacing: "-1px"
                  }}
                >
                  What Name and Number To Give the Requester
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
                          textAlign: "center",
                          width: "189px"
                        }}
                      >
                        For this type of account:
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          fontWeight: "bold",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top",
                          textAlign: "center",
                          width: "190px"
                        }}
                      >
                        Give name and SSN of:
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
                          <ol
                            style={{
                              padding: "0px",
                              margin: "0px 0 0 10px",
                              listStyle: "outside decimal"
                            }}
                          >
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Individual
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Two or more individuals (joint account) other than
                              an account maintained by an FFI
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Two or more U.S. persons (joint account maintained
                              by an FFI)
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Custodial account of a minor (Uniform Gift to
                              Minors Act)
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              a. The usual revocable savings trust (grantor is
                              also trustee) <br />
                              b. So-called trust account that is not a legal or
                              valid trust under state law{" "}
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Sole proprietorship or disregarded entity owned by
                              an individua
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Grantor trust filing under Optional Form 1099
                              Filing Method 1 (see Regulations section
                              1.671-4(b)(2)(i) (A))
                            </li>
                          </ol>
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
                        <ol
                          style={{
                            padding: "0px",
                            margin: "0px 0 0 10px",
                            listStyle: "none"
                          }}
                        >
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            The individual
                          </li>
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            The actual owner of the account or, if combined
                            funds, the first individual on the account{" "}
                            <sup>1</sup>{" "}
                          </li>
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            Each holder of the account{" "}
                          </li>
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            The minor <sup>2</sup>
                          </li>
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            The grantor-trustee<sup>1</sup>
                          </li>
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            The actual owner<sup>1</sup>
                          </li>
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            The owner<sup>3</sup>
                          </li>
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            The grantor<sup>*</sup>
                          </li>
                        </ol>
                      </td>
                    </tr>

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
                          textAlign: "center",
                          width: "189px"
                        }}
                      >
                        For this type of account:
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          fontWeight: "bold",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top",
                          textAlign: "center",
                          width: "190px"
                        }}
                      >
                        Give name and EIN of:
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          borderRight: "1px solid black",

                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top",
                          maxWidth: "1px"
                        }}
                      >
                        <div style={{ clear: "both" }}>
                          <ol
                            style={{
                              padding: "0px",
                              margin: "0px 0 0 10px",
                              listStyle: "outside decimal"
                            }}
                            start="8"
                          >
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Disregarded entity not owned by an individua
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              A valid trust, estate, or pension trust
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Corporation or LLC electing corporate status on
                              Form 8832 or Form 2553
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Association, club, religious, charitable,
                              educational, or other taxexempt organization
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Partnership or multi-member LLC{" "}
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              A broker or registered nominee
                            </li>
                          </ol>
                        </div>
                      </td>
                      <td
                        style={{
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          verticalAlign: "top"
                        }}
                      >
                        <ol
                          style={{
                            padding: "0px",
                            margin: "0px 0 0 10px",
                            listStyle: "none"
                          }}
                        >
                          <li style={{ paddingBottom: "5px" }}> The owner</li>
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            Legal entity<sup>4</sup>{" "}
                          </li>
                          <li style={{ paddingBottom: "15px" }}>
                            {" "}
                            The corporation{" "}
                          </li>
                          <li style={{ paddingBottom: "55px" }}>
                            {" "}
                            The organization
                          </li>
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            The partnership
                          </li>
                          <li style={{ paddingBottom: "5px" }}>
                            {" "}
                            The broker or nominee
                          </li>
                        </ol>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                style={{ float: "left", width: "380px", marginLeft: "20px" }}
              >
                <table
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    borderTop: "solid 1px black",
                    fontSize: "8pt",
                    width: "380px",
                    marginTop: "5px"
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
                          textAlign: "center",
                          width: "189px"
                        }}
                      >
                        For this type of account:
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid black",
                          fontWeight: "bold",
                          paddingLeft: "5px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          verticalAlign: "top",
                          textAlign: "center",
                          width: "190px"
                        }}
                      >
                        Give name and EIN of:
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
                          <ol
                            style={{
                              padding: "0px",
                              margin: "0px 0 0 10px",
                              listStyle: "outside decimal"
                            }}
                            start="14"
                          >
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Account with the Department of Agriculture in the
                              name of a public entity (such as a state or local
                              government, school district, or prison) that
                              receives agricultural program payments
                            </li>
                            <li style={{ paddingBottom: "5px" }}>
                              {" "}
                              Grantor trust filing under the Form 1041 Filing
                              Method or the Optional Form 1099 Filing Method 2
                              (see Regulations section 1.671-4(b)(2)(i)(B))
                            </li>
                          </ol>
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
                        <ol
                          style={{
                            padding: "0px",
                            margin: "0px 0 0 10px",
                            listStyle: "none"
                          }}
                        >
                          <li style={{ paddingBottom: "65px" }}>
                            {" "}
                            The public entity
                          </li>
                          <li style={{ paddingBottom: "5px" }}> The trust</li>
                        </ol>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  {" "}
                  <sup>1</sup>
                  List first and circle the name of the person whose number you
                  furnish. If only one person on a joint account has an SSN,
                  that person’s number must be furnished.
                </p>
                <p>
                  {" "}
                  <sup>2</sup>
                  Circle the minor’s name and furnish the minor’s SSN.
                </p>
                <p>
                  {" "}
                  <sup>3</sup>
                  You must show your individual name and you may also enter your
                  business or DBA name on the “Business name/disregarded entity”
                  name line. You may use either your SSN or EIN (if you have
                  one), but the IRS encourages you to use your SSN.
                </p>
                <p>
                  {" "}
                  <sup>4</sup>
                  List first and circle the name of the trust, estate, or
                  pension trust. (Do not furnish the TIN of the personal
                  representative or trustee unless the legal entity itself is
                  not designated in the account title.) Also see Special rules
                  for partnerships, earlier
                </p>
                <p>
                  <b>*Note:</b> The grantor also must provide a Form W-9 to
                  trustee of trust.
                </p>
                <p>
                  {" "}
                  <b>Note:</b> If no name is circled when more than one name is
                  listed, the number will be considered to be that of the first
                  name listed.
                </p>
                <p
                  style={{
                    marginTop: "7px",
                    marginBottom: "0px",
                    fontWeight: "bold",
                    fontSize: "13pt"
                  }}
                >
                  Secure Your Tax Records From Identity Theft
                </p>
                <p>
                  {" "}
                  Identity theft occurs when someone uses your personal
                  information such as your name, SSN, or other identifying
                  information, without your permission, to commit fraud or other
                  crimes. An identity thief may use your SSN to get a job or may
                  file a tax return using your SSN to receive a refund{" "}
                </p>
                <p>To reduce your risk:</p>
                <ul style={{ margin: "0px 0 0 15px", padding: "0" }}>
                  <li>Protect your SSN,</li>
                  <li>Ensure your employer is protecting your SSN, and</li>
                  <li>Be careful when choosing a tax preparer.</li>
                </ul>

                <p>
                  {" "}
                  If your tax records are affected by identity theft and you
                  receive a notice from the IRS, respond right away to the name
                  and phone number printed on the IRS notice or letter.
                </p>
                <p>
                  {" "}
                  If your tax records are not currently affected by identity
                  theft but you think you are at risk due to a lost or stolen
                  purse or wallet, questionable credit card activity or credit
                  report, contact the IRS Identity Theft Hotline at
                  1-800-908-4490 or submit Form 14039.
                </p>
                <p>
                  {" "}
                  For more information, see Pub. 5027, Identity Theft
                  Information for Taxpayers.
                </p>
                <p>
                  {" "}
                  Victims of identity theft who are experiencing economic harm
                  or a systemic problem, or are seeking help in resolving tax
                  problems that have not been resolved through normal channels,
                  may be eligible for Taxpayer Advocate Service (TAS)
                  assistance. You can reach TAS by calling the TAS toll-free
                  case intake line at 1-877-777-4778 or TTY/TDD 1-800-829-4059.
                </p>
                <p>
                  {" "}
                  <b>
                    {" "}
                    Protect yourself from suspicious emails or phishing schemes.
                    <br />
                  </b>
                  Phishing is the creation and use of email and websites
                  designed to mimic legitimate business emails and websites. The
                  most common act is sending an email to a user falsely claiming
                  to be an established legitimate enterprise in an attempt to
                  scam the user into surrendering private information that will
                  be used for identity theft.
                </p>
              </div>
            </div>
        </div>
    )
}

export default Form5;