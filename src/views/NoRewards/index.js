import React from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies(window.document.cookie)

const NoRewards = () => {
    const isClientELAN = cookies.get("client") === "elan";
        const isClientBMW = cookies.get("client") === "bmw";
        const isClientACG = cookies.get("client") === "acg";
        //const clientTitle = isClientELAN ? "ELAN" : isClientBMW ? "BMW" : isClientACG && "ACG";
        //const clientFinancial = isClientACG ? "Card Services" : "Financial Services";
        if(isClientELAN){clientTitle =="ELAN"}
    else if(isClientBMW){clientTitle =="BMW"}
    else if(isClientACG){clientTitle =="ACG"}

    if(isClientELAN){clientFinancial =="Financial Services"}
    else if(isClientBMW){clientFinancial =="Group Financial Services"}
    else if(isClientACG){clientFinancial =="Card Services"}
    
        return (
        <div>
            <div>
                <div id="overlay" style={{ position: "fixed", width: "100%", height: "100%", top: 0, left: 0 }}>
                    <div class="backdrop" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, height: "100%", width: "100%", background: "black", zIndex: 9, opacity: 0.5 }}></div>
                    <div style={{ background: `url('../static/media/login-bg.b164f405.jpg')`, width: "50%", height: "100%", zIndex: 0, backgroundRepeat: "round", position: "absolute" }}>
                    </div><div class="card" style={{ padding: "10px 10px", display: "table", background: "white", position: "absolute", width: "48%", height: "100%", right: 0, margin: "50px auto", transition: "all 0.3s cubic-bezier(.25,.8,.25,1)" }}>
                        <h2 style={{ padding: 0, margin: 0 }}>{clientTitle}</h2><h2 style={{ color: "grey" }}>{clientFinancial}</h2> </div>
                        <div class="popup" style={{ position: "fixed", left: "50%", right: "50%", top: "50%", width: "400px", height: "170px", textAlign: "center", marginLeft: "-232px", marginTop: "-140px", background: "white", padding: "20px 30px", zIndex: "10" }}>
                         <h1>No Rewards available</h1>
                        <span style={{ color: "grey", fontSize: "18px" }}>
                            You do not have any rewards available at this time. Rewards are paid in the month following new account activation. You may review this information on the Reporting page of the Credit Card Portal.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NoRewards;