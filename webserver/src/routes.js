import path from 'path'
import { Router } from 'express'
import { invokeApi } from './helper'
import config from './config'
import urlMap from './api.js'
const router = new Router()

if(config.isMaintenanceOn){
    router.get('/*', (req, res) => {
        console.log("Maintenance mode");
        res.sendFile(path.resolve(__dirname + '/../build/maintenance.html'))
    })
}

router.get('/login/', async (req, res) => {
    console.log("=================================================");
    console.log("=================================================");
    console.log('Starting Routing.. for login');
    console.log(config.apiRoot)
    console.log(req.path)
    console.log(req.method)

    var url = require('url');
    console.log(req.url);
    var query = req.query.req;
    console.log(query);
    console.log("=================================================");
    console.log("=================================================");

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);

    const urlLambda = 'https://wdfg7fhtb2.execute-api.us-east-2.amazonaws.com/prod/cashInSsoLogin';
    const bodyLambda = { "req": query, "url": fullUrl }
    console.log("========================bodyLambda=========================");
    console.log(bodyLambda);
    console.log("===========================================================");
        
    const response = await invokeApi({ url: urlLambda, method: "post", body: bodyLambda })

    console.log("========================Response=========================");
    console.log(response);
    console.log("===========================================================");

    console.log("========================Source URL=========================");
    console.log(req.url.host)
    console.log("===========================================================");

    let subDomains = bodyLambda.url.split('.')[0];
    let subDomainsUrl = subDomains.substr(7);
    let isClient = "";
    let clientFinancial = "";
    if (subDomainsUrl === "bmw" ) {
        isClient = "BMW";
        clientFinancial = "Group Financial Services";
      } else if (subDomainsUrl ===  "acg") {
        isClient = "ACG";
        clientFinancial = "Card Services";
      } else if (subDomainsUrl === "hd") {
        isClient = "HD";
        clientFinancial = "Financial Services";
      } else {
        isClient = "Elan";
        clientFinancial = "Financial Services";
      }
    if (response.error) {
        res.status(403);
        //res.write(`<html><head></head><body><div>${subDomains}</div></body></html>`);
        res.write(`<html><head></head><body><div id="overlay" style="position: fixed;width: 100%;height: 100%; top:0; left:0;"><div class="backdrop" style="position: absolute; left: 0;right: 0;top: 0;bottom: 0;height: 100%;width: 100%;background: black;z-index:9;opacity: 0.5;"></div><div style="background: url('../static/media/login-bg.b164f405.jpg');width: 50%;height: 100%;z-index: 0;background-repeat: round;position: absolute;"></div><div class="card" style="padding: 10px 10px;display: table;background: white;position: absolute;width: 48%;height: 100%;right: 0;margin: 50px auto;transition: all 0.3s cubic-bezier(.25,.8,.25,1);"><h2 style="padding: 0; margin: 0;">${isClient}</h2><h2 style="color: grey;">${clientFinancial}</h2> </div><div class="popup" style="position: fixed;left: 50%;right: 50%;top: 50%;width: 400px;height: 170px;text-align: center;margin-left: -232px;margin-top: -140px;background: white;padding: 20px 30px;z-index: 10;"><h1>No Rewards available</h1><span style="color: grey;font-size: 18px;">You do not have any rewards available at this time. Rewards are paid in the month following new account activation. You may review this information on the Reporting page of the Credit Card Portal.</span></div></div></body></html>`);
        res.end();
    } else {
        console.log("DataResponse==> ", response);
        const UrlToRedirect = response.redirectBankerURL;
        console.log("UrlToRedirect ==> ",UrlToRedirect);
        res.redirect(UrlToRedirect); 
        //res.sendFile(path.resolve(__dirname + '/../build/index.html'))
    }
})

router.use('/api/', async (req, res) => {
    console.log('Starting Routing..');
    console.log(config.apiRoot)
    console.log(req.path)
    console.log(req.method)
    console.log(req.query)
    const { path, method, headers, body } = req;
    var dataApiList=[];
    var url=''
    var response=''
    if(config.env==='develop')
    {
         dataApiList=urlMap.dev.ApiList;
    }
    else if(config.env==='uat')
    {
         dataApiList=urlMap.uat.ApiList;
    }
    else if(config.env==='dr')
    {
         dataApiList=urlMap.dr.ApiList;
    }
    else if(config.env==='prod')
    {
         dataApiList=urlMap.prod.ApiList;
    }
    if(method==='GET')
    {
        url=dataApiList.filter(d=>d.Key===path.split('/').pop())[0].Url;
        const params=req.query;
        console.log(url);
        
        const { authorization } = headers
        console.log(params)
         response = await invokeApi({ url, method, params, authorization })
    }
    else{
         url=dataApiList.filter(d=>d.Key===path.split('/').pop())[0].Url;
        console.log(url);
        const { params, authorization } = headers
         response = await invokeApi({ url, method, params, body, authorization })
    }
 
   
    if (response.error) {
        res.status(500).json(response)
    } else {
        res.status(200).json(response)
    }
})

router.get('/*', (req, res) => {
    console.log('Starting Routing.. for *');
    res.sendFile(path.resolve(__dirname + '/../build/index.html'))
})

export default router
