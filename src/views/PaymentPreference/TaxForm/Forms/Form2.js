import React from 'react';

const Form2 =(props) => {
    return(
        <div id="page2">
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
              <span style={{ fontSize: "10pt", fontWeight: "bold" }}>2</span>
            </div>
            <div style={{ clear: "both", width: "100%", fontSize: "8pt" }}>
              <div style={{ float: "left", width: "380px" }}>
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  By signing the filled-out form, you:{" "}
                </p>
                <ol style={{ margin: "4px 0px 4px 14px", padding: 0 }}>
                  <li>
                    {" "}
                    Certify that the TIN you are giving is correct (or you are
                    waiting for a number to be issued),
                  </li>
                  <li>
                    {" "}
                    Certify that you are not subject to backup withholding, or
                  </li>
                  <li>
                    {" "}
                    Claim exemption from backup withholding if you are a U.S.
                    exempt payee. If applicable, you are also certifying that as
                    a U.S. person, your allocable share of any partnership
                    income from a U.S. trade or business is not subject to the
                    withholding tax on foreign partners' share of effectively
                    connected income, and{" "}
                  </li>
                  <li>
                    {" "}
                    . Certify that FATCA code(s) entered on this form (if any)
                    indicating that you are exempt from the FATCA reporting, is
                    correct. See What is FATCA reporting, later, for further
                    information.
                  </li>
                </ol>
                <p>
                  {" "}
                  <b> Note:</b> If you are a U.S. person and a requester gives
                  you a form other than Form W-9 to request your TIN, you must
                  use the requester’s form if it is substantially similar to
                  this Form W-9.
                </p>
                <p>
                  {" "}
                  <b> Definition of a U.S. person.</b> For federal tax purposes,
                  you are considered a U.S. person if you are:
                </p>
                <ul style={{ margin: "4px 0px 4px 14px", padding: 0 }}>
                  <li>
                    An individual who is a U.S. citizen or U.S. resident alien;{" "}
                  </li>
                  <li>
                    {" "}
                    A partnership, corporation, company, or association created
                    or organized in the United States or under the laws of the
                    United States;
                  </li>
                  <li> An estate (other than a foreign estate); or</li>
                  <li>
                    {" "}
                    A domestic trust (as defined in Regulations section
                    301.7701-7).{" "}
                  </li>
                </ul>
                <p>
                  {" "}
                  <b> Special rules for partnerships. </b> Partnerships that
                  conduct a trade or business in the United States are generally
                  required to pay a withholding tax under section 1446 on any
                  foreign partners’ share of effectively connected taxable
                  income from such business. Further, in certain cases where a
                  Form W-9 has not been received, the rules under section 1446
                  require a partnership to presume that a partner is a foreign
                  person, and pay the section 1446 withholding tax. Therefore,
                  if you are a U.S. person that is a partner in a partnership
                  conducting a trade or business in the United States, provide
                  Form W-9 to the partnership to establish your U.S. status and
                  avoid section 1446 withholding on your share of partnership
                  income
                </p>
                <p>
                  {" "}
                  In the cases below, the following person must give Form W-9 to
                  the partnership for purposes of establishing its U.S. status
                  and avoiding withholding on its allocable share of net income
                  from the partnership conducting a trade or business in the
                  United States.
                </p>
                <ul style={{ margin: "4px 0px 4px 14px", padding: 0 }}>
                  <li>
                    {" "}
                    In the case of a disregarded entity with a U.S. owner, the
                    U.S. owner of the disregarded entity and not the entity;
                  </li>
                  <li>
                    {" "}
                    In the case of a grantor trust with a U.S. grantor or other
                    U.S. owner, generally, the U.S. grantor or other U.S. owner
                    of the grantor trust and not the trust; and
                  </li>
                  <li>
                    {" "}
                    In the case of a U.S. trust (other than a grantor trust),
                    the U.S. trust (other than a grantor trust) and not the
                    beneficiaries of the trust
                  </li>
                </ul>
                <p>
                  {" "}
                  <b> Foreign person.</b> If you are a foreign person or the
                  U.S. branch of a foreign bank that has elected to be treated
                  as a U.S. person, do not use Form W-9. Instead, use the
                  appropriate Form W-8 or Form 8233 (see Pub. 515, Withholding
                  of Tax on Nonresident Aliens and Foreign Entities).
                </p>

                <p>
                  {" "}
                  <b> Nonresident alien who becomes a resident alien. </b>{" "}
                  Generally, only a nonresident alien individual may use the
                  terms of a tax treaty to reduce or eliminate U.S. tax on
                  certain types of income. However, most tax treaties contain a
                  provision known as a “saving clause.” Exceptions specified in
                  the saving clause may permit an exemption from tax to continue
                  for certain types of income even after the payee has otherwise
                  become a U.S. resident alien for tax purposes.
                </p>
                <p>
                  {" "}
                  If you are a U.S. resident alien who is relying on an
                  exception contained in the saving clause of a tax treaty to
                  claim an exemption from U.S. tax on certain types of income,
                  you must attach a statement to Form W-9 that specifies the
                  following five items.
                </p>
                <ol style={{ margin: "4px 0px 4px 14px", padding: 0 }}>
                  <li>
                    {" "}
                    The treaty country. Generally, this must be the same treaty
                    under which you claimed exemption from tax as a nonresident
                    alien.
                  </li>
                  <li> The treaty article addressing the income.</li>
                  <li>
                    {" "}
                    The article number (or location) in the tax treaty that
                    contains the saving clause and its exceptions.
                  </li>
                  <li>
                    {" "}
                    The type and amount of income that qualifies for the
                    exemption from tax.
                  </li>
                  <li>
                    {" "}
                    Sufficient facts to justify the exemption from tax under the
                    terms of the treaty article.
                  </li>
                </ol>
              </div>
              <div
                style={{ float: "left", width: "380px", marginLeft: "20px" }}
              >
                <p style={{ marginTop: "7px", marginBottom: "0px" }}>
                  <em>
                    {" "}
                    <b> Example. </b>{" "}
                  </em>
                  Article 20 of the U.S.-China income tax treaty allows an
                  exemption from tax for scholarship income received by a
                  Chinese student temporarily present in the United States.
                  Under U.S. law, this student will become a resident alien for
                  tax purposes if his or her stay in the United States exceeds 5
                  calendar years. However, paragraph 2 of the first Protocol to
                  the U.S.-China treaty (dated April 30, 1984) allows the
                  provisions of Article 20 to continue to apply even after the
                  Chinese student becomes a resident alien of the United States.
                  A Chinese student who qualifies for this exception (under
                  paragraph 2 of the first protocol) and is relying on this
                  exception to claim an exemption from tax on his or her
                  scholarship or fellowship income would attach to Form W-9 a
                  statement that includes the information described above to
                  support that exemption
                </p>
                <p>
                  {" "}
                  If you are a nonresident alien or a foreign entity, give the
                  requester the appropriate completed Form W-8 or Form 8233.
                </p>
                <p
                  style={{
                    marginTop: "4px",
                    marginBottom: "0px",
                    fontSize: "13pt",
                    fontWeight: "bold"
                  }}
                >
                  Backup Withholding
                </p>

                <p>
                  {" "}
                  <b> What is backup withholding? </b>Persons making certain
                  payments to you must under certain conditions withhold and pay
                  to the IRS 24% of such payments. This is called “backup
                  withholding.” Payments that may be subject to backup
                  withholding include interest, tax-exempt interest, dividends,
                  broker and barter exchange transactions, rents, royalties,
                  nonemployee pay, payments made in settlement of payment card
                  and third party network transactions, and certain payments
                  from fishing boat operators. Real estate transactions are not
                  subject to backup withholding.{" "}
                </p>
                <p>
                  You will not be subject to backup withholding on payments you
                  receive if you give the requester your correct TIN, make the
                  proper certifications, and report all your taxable interest
                  and dividends on your tax return.
                </p>
                <p>
                  {" "}
                  <b>
                    {" "}
                    Payments you receive will be subject to backup withholding
                    if:{" "}
                  </b>{" "}
                </p>
                <ol
                  style={{
                    margin: "2px 0px 0px 10px",
                    padding: "0px",
                    lineHeight: "15px"
                  }}
                >
                  <li>You do not furnish your TIN to the requester, </li>
                  <li>
                    {" "}
                    You do not certify your TIN when required (see the
                    instructions for Part II for details),
                  </li>
                  <li>
                    {" "}
                    The IRS tells the requester that you furnished an incorrect
                    TIN,
                  </li>
                  <li>
                    {" "}
                    The IRS tells you that you are subject to backup withholding
                    because you did not report all your interest and dividends
                    on your tax return (for reportable interest and dividends
                    only), or
                  </li>
                  <li>
                    {" "}
                    You do not certify to the requester that you are not subject
                    to backup withholding under 4 above (for reportable interest
                    and dividend accounts opened after 1983 only).
                  </li>
                </ol>
                <p>
                  {" "}
                  Certain payees and payments are exempt from backup
                  withholding. See Exempt payee code, later, and the separate
                  Instructions for the Requester of Form W-9 for more
                  information.{" "}
                </p>
                <p> Also see Special rules for partnerships, earlier.</p>

                <p
                  style={{
                    marginTop: "4px",
                    marginBottom: "0px",
                    fontSize: "13pt",
                    fontWeight: "bold"
                  }}
                >
                  What is FATCA Reporting?
                </p>
                <p>
                  {" "}
                  The Foreign Account Tax Compliance Act (FATCA) requires a
                  participating foreign financial institution to report all
                  United States account holders that are specified United States
                  persons. Certain payees are exempt from FATCA reporting. See
                  Exemption from FATCA reporting code, later, and the
                  Instructions for the Requester of Form W-9 for more
                  information.
                </p>

                <p
                  style={{
                    marginTop: "4px",
                    marginBottom: "0px",
                    fontSize: "13pt",
                    fontWeight: "bold"
                  }}
                >
                  Updating Your Information
                </p>
                <p>
                  {" "}
                  You must provide updated information to any person to whom you
                  claimed to be an exempt payee if you are no longer an exempt
                  payee and anticipate receiving reportable payments in the
                  future from this person. For example, you may need to provide
                  updated information if you are a C corporation that elects to
                  be an S corporation, or if you no longer are tax exempt. In
                  addition, you must furnish a new Form W-9 if the name or TIN
                  changes for the account; for example, if the grantor of a
                  grantor trust dies.
                </p>

                <p
                  style={{
                    marginTop: "4px",
                    marginBottom: "0px",
                    fontSize: "13pt",
                    fontWeight: "bold"
                  }}
                >
                  Penalties
                </p>
                <p>
                  {" "}
                  <b>Failure to furnish TIN. </b> If you fail to furnish your
                  correct TIN to a requester, you are subject to a penalty of
                  $50 for each such failure unless your failure is due to
                  reasonable cause and not to willful neglect.
                </p>
                <p>
                  {" "}
                  <b>
                    Civil penalty for false information with respect to
                    withholding.{" "}
                  </b>{" "}
                  If you make a false statement with no reasonable basis that
                  results in no backup withholding, you are subject to a $500
                  penalty.
                </p>
              </div>
            </div>
        </div>
    )
}

export default Form2;