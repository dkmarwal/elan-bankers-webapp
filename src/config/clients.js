const clientConfig = [
    {
        clientKey:"elan",
        faviconUrl: "",
        pageTitle: "Elan Financial Services | Admin Portal",
        description: "Elan Financial Services",
        keywords: "Elan Financial Services",
        loginLogo: "~/assets/images/elan/elan-logo.png",
        headerLogo: ["logo1 url", "logo2 url", "logo url"],
        alt :"ELAN",
        promotion :{
            lblExpiredAccount: "Expired Account",
            lblExpiredAmount: "Expired Amount",
            listHeader:["Promo ID",
                "Promotion Name", 
                "Fulfillment Date", 
                "Expiration Date",
                "Funds", 
                "Created Date", 
                "Modified Date", 
                "Promotion Status",
            ],
            filters:{
                lblPromoId: "Promo ID",
                lblPromoName: "Promotion Name",
                lblExpDate: "Expiration Date",
                lblFullDate: "Fulfillment Date",
                lblFund: "Funds",
                lblStatus: "Promotion Status",
            },
            detailView :{
                lblOffAsso: "Officers Associated",
                lblExpRewards: "Expired Rewards",
            }
        },
        redeem :{
            lblOEID:"OEID"
        }

    },
    {
        clientKey:"bmw",
        faviconUrl: "",
        pageTitle: "BMW Group Financial services | Admin Portal",
        description: "BMW Group Financial services",
        keywords: "BMW Group Financial services",
        loginLogo: "~/assets/images/bmw/elan-logo.png",
        headerLogo: ["logo1 url", "logo2 url", "logo url"],
        alt: "BMW",
        promotion :{
            lblExpiredAccount: "Unclaimed Account",
            lblExpiredAmount: "Unclaimed Amount",
            listHeader:["Promo ID",
                "Promotion Name", 
                "Fulfillment Date", 
                "Closed Date",
                "Funds", 
                "Created Date", 
                "Modified Date", 
                "Promotion Status",
            ],
            filters:{
                lblPromoId: "Promo ID",
                lblPromoName: "Promotion Name",
                lblExpDate: "Closed Date",
                lblFullDate: "Fulfillment Date",
                lblFund: "Funds",
                lblStatus: "Promotion Status",
            },
            detailView :{
                lblOffAsso: "Officers Associated",
                lblExpRewards: "Unclaimed Rewards",
            }
        },
        redeem :{
            lblOEID:"DEMS"
        }
    },
];

export const getClientInfoFromConfig = (clientKey) => {
    if (clientKey){
        const client = clientConfig.find(k => k.clientKey==clientKey) || null;
        return client;
    } else {
        return null;
    }
}