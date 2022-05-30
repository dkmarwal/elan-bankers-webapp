const urlMap = {
    "dev": {
        "EnvName": "dev",
        "ApiList": [
            {
                "Key": "GetWelcomeName",
                "methodType": "POST",
                "Url": "https://fpopbizja4.execute-api.us-east-2.amazonaws.com/dev/oauth/GetWelcomeName"
            },
            {
                "Key": "getSignedUrl",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/getSignedUrl"
            },
            {
                "Key": "getRewardFileHistory",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/getRewardFileHistory"
            },
            {
                "Key": "rewardValidationStatus",
                "methodType": "GET",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/rewardValidationStatus"
            },
            {
                "Key": "rewardsFileErrorData",
                "methodType": "GET",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/rewardsFileErrorData"
            },
            {
                "Key": "totalRewardsByPrmotionID",
                "methodType": "GET",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/totalRewardsByPrmotionID"
            },
            {
                "Key": "RewardStatus",
                "methodType": "GET",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/RewardStatus"
            },
            {
                "Key": "token",
                "methodType": "GET",
                "Url": "https://flfqpgrv3e.execute-api.us-east-2.amazonaws.com/dev/oauth/token"
            },
            {
                "Key": "login",
                "methodType": "POST",
                "Url": "https://flfqpgrv3e.execute-api.us-east-2.amazonaws.com/dev/oauth/login"
            },
            {
                "Key": "self",
                "methodType": "GET",
                "Url": "https://flfqpgrv3e.execute-api.us-east-2.amazonaws.com/dev/oauth/self"
            },
            {
                "Key": "updatePassword",
                "methodType": "PUT",
                "Url": "https://flfqpgrv3e.execute-api.us-east-2.amazonaws.com/dev/oauth/updatePassword"
            },
            {
                "Key": "AdminSupportTicketList",
                "methodType": "POST",
                "Url": "https://a1kw2el16a.execute-api.us-east-2.amazonaws.com/dev/AdminSupportTicketList"
            },
            {
                "Key": "UpdateSupportTicketStatus",
                "methodType": "POST",
                "Url": "https://a1kw2el16a.execute-api.us-east-2.amazonaws.com/dev/UpdateSupportTicketStatus"
            },
            {
                "Key": "CreateUpdateBankAccountDetails",
                "methodType": "POST",
                "Url": "https://m5mphetdw3.execute-api.us-east-2.amazonaws.com/dev/CreateUpdateBankAccountDetails"
            },
            {
                "Key": "BankAccountDetailsById",
                "methodType": "POST",
                "Url": "https://m5mphetdw3.execute-api.us-east-2.amazonaws.com/dev/BankAccountDetailsById"
            },
            {
                "Key": "UpdateStatusBankAccountDetails",
                "methodType": "POST",
                "Url": "https://m5mphetdw3.execute-api.us-east-2.amazonaws.com/dev/UpdateStatusBankAccountDetails"
            },
            {
                "Key": "GetAccountType",
                "methodType": "GET",
                "Url": "https://m5mphetdw3.execute-api.us-east-2.amazonaws.com/dev/GetAccountType"
            },
            {
                "Key": "GetPaymentMethod",
                "methodType": "GET",
                "Url": "https://m5mphetdw3.execute-api.us-east-2.amazonaws.com/dev/GetPaymentMethod"
            },
            {
                "Key": "MaskBankAccountNumber",
                "methodType": "POST",
                "Url": "https://m5mphetdw3.execute-api.us-east-2.amazonaws.com/dev/MaskBankAccountNumber"
            },
            {
                "Key": "GetPaymentMethodByClientId",
                "methodType": "POST",
                "Url": "https://m5mphetdw3.execute-api.us-east-2.amazonaws.com/dev/GetPaymentMethodByClientId"
            },
            {
                "Key": "PaymentList",
                "methodType": "POST",
                "Url": "https://2b86uzt5uf.execute-api.us-east-2.amazonaws.com/dev/PaymentList"
            },
            {
                "Key": "TrackingRedeemRewards",
                "methodType": "POST",
                "Url": "https://2b86uzt5uf.execute-api.us-east-2.amazonaws.com/dev/TrackingRedeemRewards"
            },
            {
                "Key": "RewardsOverview",
                "methodType": "POST",
                "Url": "https://2b86uzt5uf.execute-api.us-east-2.amazonaws.com/dev/RewardsOverview"
            },
            {
                "Key": "RedeemListRewards",
                "methodType": "POST",
                "Url": "https://o5cl0a5tte.execute-api.us-east-2.amazonaws.com/dev/RedeemListRewards"
            },
            {
                "Key": "updateRewardStatus",
                "methodType": "POST",
                "Url": "https://o5cl0a5tte.execute-api.us-east-2.amazonaws.com/dev/updateRewardStatus"
            },
            {
                "Key": "cashInSsoLogin",
                "methodType": "POST",
                "Url": "https://g6d9rvnp3h.execute-api.us-east-2.amazonaws.com/dev/cashInSsoLogin"
            },
            {
                "Key": "stringenryption",
                "methodType": "POST",
                "Url": "https://9ewmy65xs0.execute-api.us-east-2.amazonaws.com/dev/stringenryption"
            },
            {
                "Key": "stringDecryption",
                "methodType": "GET",
                "Url": "https://9ewmy65xs0.execute-api.us-east-2.amazonaws.com/dev/stringDecryption"
            },
            {
                "Key": "SupportTicketList",
                "methodType": "POST",
                "Url": "https://i944e76373.execute-api.us-east-2.amazonaws.com/dev/SupportTicketList"
            },
            {
                "Key": "CreateSupportTicket",
                "methodType": "GET",
                "Url": "https://i944e76373.execute-api.us-east-2.amazonaws.com/dev/CreateSupportTicket"
            },
            {
                "Key": "UpdateSupportTicketData",
                "methodType": "POST",
                "Url": "https://i944e76373.execute-api.us-east-2.amazonaws.com/dev/UpdateSupportTicketData"
            },
            {
                "Key": "SupportTicketDetails",
                "methodType": "POST",
                "Url": "https://i944e76373.execute-api.us-east-2.amazonaws.com/dev/SupportTicketDetails"
            },
            {
                "Key": "SupportTicketCategoryType",
                "methodType": "GET",
                "Url": "https://i944e76373.execute-api.us-east-2.amazonaws.com/dev/SupportTicketCategoryType"
            },
            {
                "Key": "SupportTicketStatus",
                "methodType": "GET",
                "Url": "https://i944e76373.execute-api.us-east-2.amazonaws.com/dev/SupportTicketStatus"
            },
            {
                "Key": "generateNACHA",
                "methodType": "GET",
                "Url": "https://qiwh07jkq2.execute-api.us-east-2.amazonaws.com/dev/generateNACHA"
            },
            {
                "Key": "readReturnConfirmFileResponse",
                "methodType": "GET",
                "Url": "https://qiwh07jkq2.execute-api.us-east-2.amazonaws.com/dev/readReturnConfirmFileResponse"
            },
            {
                "Key": "MarkAchPaymentSuccessful",
                "methodType": "GET",
                "Url": "https://qiwh07jkq2.execute-api.us-east-2.amazonaws.com/dev/MarkAchPaymentSuccessful"
            },
            {
                "Key": "PromotionBar",
                "methodType": "POST",
                "Url": "https://ksk0k2hpn2.execute-api.us-east-2.amazonaws.com/dev/PromotionBar"
            },
            {
                "Key": "PromotionDetailOverview",
                "methodType": "POST",
                "Url": "https://ksk0k2hpn2.execute-api.us-east-2.amazonaws.com/dev/PromotionDetailOverview"
            },
            {
                "Key": "PromotionFundOverView",
                "methodType": "GET",
                "Url": "https://ksk0k2hpn2.execute-api.us-east-2.amazonaws.com/dev/PromotionFundOverView"
            },
            {
                "Key": "PromotionRewardExpire",
                "methodType": "GET",
                "Url": "https://ksk0k2hpn2.execute-api.us-east-2.amazonaws.com/dev/PromotionRewardExpire"
            },
            {
                "Key": "PromotionStatus",
                "methodType": "GET",
                "Url": "https://ksk0k2hpn2.execute-api.us-east-2.amazonaws.com/dev/PromotionStatus"
            },
            {
                "Key": "createpromotion",
                "methodType": "GET",
                "Url": "https://ksk0k2hpn2.execute-api.us-east-2.amazonaws.com/dev/CreatePromotion"
            },
            {
                "Key": "getpromotion",
                "methodType": "POST",
                "Url": "https://ksk0k2hpn2.execute-api.us-east-2.amazonaws.com/dev/GetPromotion"
            },
            {
                "Key": "getpromotionbyid",
                "methodType": "POST",
                "Url": "https://ksk0k2hpn2.execute-api.us-east-2.amazonaws.com/dev/GetPromotionbyId"
            },
            {
                "Key": "updatepromotion",
                "methodType": "POST",
                "Url": "https://ksk0k2hpn2.execute-api.us-east-2.amazonaws.com/dev/UpdatePromotion"
            },
            {
                "Key": "updatepromotionstatus",
                "methodType": "POST",
                "Url": "https://ksk0k2hpn2.execute-api.us-east-2.amazonaws.com/dev/UpdatePromotionStatus"
            },
            {
                "Key": "CreateAdminUser",
                "methodType": "POST",
                "Url": "https://c2wkm22v0l.execute-api.us-east-2.amazonaws.com/dev/CreateAdminUser"
            },
            {
                "Key": "GetAllUsers",
                "methodType": "POST",
                "Url": "https://c2wkm22v0l.execute-api.us-east-2.amazonaws.com/dev/GetAllUsers"
            },
            {
                "Key": "GetClaimsByUserId",
                "methodType": "POST",
                "Url": "https://c2wkm22v0l.execute-api.us-east-2.amazonaws.com/dev/GetClaimsByUserId"
            },
            {
                "Key": "GetUserPermissionById",
                "methodType": "POST",
                "Url": "https://c2wkm22v0l.execute-api.us-east-2.amazonaws.com/dev/GetUserPermissionById"
            },
            {
                "Key": "GetUserTypes",
                "methodType": "POST",
                "Url": "https://c2wkm22v0l.execute-api.us-east-2.amazonaws.com/dev/GetUserTypes"
            },
            {
                "Key": "UpdateUserActionItem",
                "methodType": "POST",
                "Url": "https://c2wkm22v0l.execute-api.us-east-2.amazonaws.com/dev/UpdateUserActionItem"
            },
            {
                "Key": "UpdateUserDetails",
                "methodType": "POST",
                "Url": "https://c2wkm22v0l.execute-api.us-east-2.amazonaws.com/dev/UpdateUserDetails"
            },
            {
                "Key": "UpdateUserPermission",
                "methodType": "POST",
                "Url": "https://c2wkm22v0l.execute-api.us-east-2.amazonaws.com/dev/UpdateUserPermissions"
            },
            {
                "Key": "approverejectrewardfile",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/ApproveRejectRewardFile"
            },
            {
                "Key": "rewarduploadfiledata",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/RewardUploadFileData"
            },
            {
                "Key": "getrewardslist",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/GetRewardsList"
            },
            {
                "Key": "checkAdminSession",
                "methodType": "GET",
                "Url": "https://n6epdrf9ff.execute-api.us-east-2.amazonaws.com/dev/oauth/checkAdminSession"
            },
            {
                "Key": "checkBankerSession",
                "methodType": "GET",
                "Url": "https://4nhq4xzj4b.execute-api.us-east-2.amazonaws.com/dev/oauth/checkBankerSession"
            },
            {
                "Key": "bankerSelfDetails",
                "methodType": "GET",
                "Url": "https://fpopbizja4.execute-api.us-east-2.amazonaws.com/dev/oauth/bankerSelfDetails"
            },
            {
                "Key": "bankerToken",
                "methodType": "GET",
                "Url": "https://fpopbizja4.execute-api.us-east-2.amazonaws.com/dev/oauth/bankerToken"
            },
            {
                "Key": "getreconciliationreport",
                "methodType": "POST",
                "Url": "https://r109q2tdwe.execute-api.us-east-2.amazonaws.com/dev/GetReconciliationReport"
            },
            {
                "Key": "getoutstandingreport",
                "methodType": "POST",
                "Url": "https://r109q2tdwe.execute-api.us-east-2.amazonaws.com/dev/GetOutstandingReport"
            },
            {
                "Key": "getpromotionreport",
                "methodType": "POST",
                "Url": "https://r109q2tdwe.execute-api.us-east-2.amazonaws.com/dev/GetPromotionReport"
            },
            {
                "Key": "RewardsRedeemRewardsOverview",
                "methodType": "GET",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/RewardsRedeemRewardsOverview"
            },
            {
                "Key": "getRewardDetailsByID",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/getRewardDetailsByID"
            },
            {
                "Key": "RewardsTrackingRedeemRewards",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/RewardsTrackingRedeemRewards"
            },
            {
                "Key": "ReinitiateRewards",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/ReinitiateRewards"
            },
            {
                "Key": "GetW9ConfigurationDate",
                "methodType": "POST",
                "Url": "https://67mg7zoi5i.execute-api.us-east-2.amazonaws.com/dev/GetW9RenewDate"
            },
            {
                "Key": "UpdateW9ConfigurationDate",
                "methodType": "POST",
                "Url": "https://67mg7zoi5i.execute-api.us-east-2.amazonaws.com/dev/UpdateW9RenewDate"
            },
            {
                "Key": "DeleteRewardsDetails",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/DeleteRewardsDetails"
            },
            {
                "Key": "GetW9SubmissionDate",
                "methodType": "POST",
                "Url": "https://67mg7zoi5i.execute-api.us-east-2.amazonaws.com/dev/GetW9SubmissionDate"
            },
            {
                "Key": "UpdateW9SubmissionDate",
                "methodType": "POST",
                "Url": "https://67mg7zoi5i.execute-api.us-east-2.amazonaws.com/dev/UpdateW9SubmissionDate"
            },
            {
                "Key": "getSignedUrlFromS3",
                "methodType": "POST",
                "Url": "https://hrdtg9q4zf.execute-api.us-east-2.amazonaws.com/dev/getSignedUrlFromS3"
            },
            {
                "Key": "sweepstakeuploadfiledata",
                "methodType": "POST",
                "Url": "https://hrdtg9q4zf.execute-api.us-east-2.amazonaws.com/dev/SweepStakeUploadFileData"
            },
            {
                "Key": "getSweepStakeFileList",
                "methodType": "POST",
                "Url": "https://hrdtg9q4zf.execute-api.us-east-2.amazonaws.com/dev/getSweepStakeFileList"
            },
            {
                "Key": "totalSweepstackByPrmotionID",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/totalRewardsByPrmotionID"
            },
            {
                "Key": "getSweepStakeValidationStatus",
                "methodType": "POST",
                "Url": "https://hrdtg9q4zf.execute-api.us-east-2.amazonaws.com/dev/getSweepStakeValidationStatus"
            },
            {
                "Key": "getSweepStakeFileErrorData",
                "methodType": "POST",
                "Url": "https://hrdtg9q4zf.execute-api.us-east-2.amazonaws.com/dev/getSweepStakeFileErrorData"
            },
            {
                "Key": "getSweepStakeDetailsByID",
                "methodType": "POST",
                "Url": "https://hrdtg9q4zf.execute-api.us-east-2.amazonaws.com/dev/getSweepStakeDetailsByID"
            },
            {
                "Key": "GetRewardType",
                "methodType": "POST",
                "Url": "https://gk3yemhto1.execute-api.us-east-2.amazonaws.com/dev/GetRewardType"
            },
            {
                "Key": "W9AdminTaxGird",
                "methodType": "POST",
                "Url": "https://fc0vrlwfaj.execute-api.us-east-2.amazonaws.com/dev/W9AdminTaxGird"
            },
            {
                "Key": "W9AdimDashBoard",
                "methodType": "POST",
                "Url": "https://fc0vrlwfaj.execute-api.us-east-2.amazonaws.com/dev/W9AdimDashBoard"
            },
            {
                "Key": "W9GetYear",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/W9GetYear"
            },
            {
                "Key": "W9GetFormForAdmin",
                "methodType": "POST",
                "Url": "https://fc0vrlwfaj.execute-api.us-east-2.amazonaws.com/dev/W9GetFormForAdmin"
            },
            {
                "Key": "W9AdminFillOutFormData",
                "methodType": "POST",
                "Url": "https://fc0vrlwfaj.execute-api.us-east-2.amazonaws.com/dev/W9AdminFillOutFormData"
            },
            {
                "Key": "W9AdminUpdateTaxFormData",
                "methodType": "POST",
                "Url": "https://fc0vrlwfaj.execute-api.us-east-2.amazonaws.com/dev/W9AdminUpdateTaxFormData"
            },
            {
                "Key": "W9InsertUpdateTaxFormData",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/W9InsertUpdateTaxFormData"
            },
            {
                "Key": "getSignedUrlForRewardDownloadTemplate",
                "methodType": "GET",
                "Url": "https://sw4nav0qol.execute-api.us-east-2.amazonaws.com/dev/RewardTemplate"
            }, {
                "Key": "W9CheckFormExists",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/W9CheckFormExists"
            },
            {
                "Key": "W9CheckSSNExists",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/W9CheckSSNExists"
            },
            {
                "Key": "W9MergeUser",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/W9MergeUser"
            },
            {
                "Key": "W9GetFormForBanker",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/W9GetFormForBanker"
            },
            {
                "Key": "W9SaveDraftTaxFormData",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/W9SaveDraftTaxFormData"
            },
            {
                "Key": "W9TaxationHistory",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/W9TaxationHistory"
            },
            {
                "Key": "BankerCheckW9ResubmitOrNot",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/BankerCheckW9ResubmitOrNot"
            },
            {
                "Key": "BankerUpdateW9FormReviewed",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/BankerUpdateW9FormReviewed"
            },
            {
                "Key": "BankerResbmitTaxFormData",
                "methodType": "POST",
                "Url": "https://6olhz2nce6.execute-api.us-east-2.amazonaws.com/dev/BankerResbmitTaxFormData"
            },
            {
                "Key": "getTotalSweepStakeByPrmotionId",
                "methodType": "POST",
                "Url": "https://hrdtg9q4zf.execute-api.us-east-2.amazonaws.com/dev/getTotalSweepStakeByPrmotionId"
            },
            {
                "Key": "getSignedUrlForSweepStakeTemplate",
                "methodType": "GET",
                "Url": "https://sw4nav0qol.execute-api.us-east-2.amazonaws.com/dev/SweepStakeTemplate"
            },
            {
                "Key": "getSignedUrlForW9FormDownloadTemplate",
                "methodType": "GET",
                "Url": "https://sw4nav0qol.execute-api.us-east-2.amazonaws.com/dev/W9FormTemplate"
            },
            {
                "Key": "getmergedreport",
                "methodType": "POST",
                "Url": "https://r109q2tdwe.execute-api.us-east-2.amazonaws.com/dev/GetUserMergeReport"
            },
            {
                "Key": "TaxResourceDownloadTemplate",
                "methodType": "GET",
                "Url": "https://sw4nav0qol.execute-api.us-east-2.amazonaws.com/dev/TaxResourceTemplate"
            },
            {
                "Key": "getCodeWiseClientConfig",
                "methodType": "POST",
                "Url": "https://wj0yq02ibj.execute-api.us-east-2.amazonaws.com/dev/getCodeWiseClientConfig"
            },
            {
                "Key": "getAllClientConfigs",
                "methodType": "GET",
                "Url": "https://wj0yq02ibj.execute-api.us-east-2.amazonaws.com/dev/getAllClientConfigs"
            },
            {
                "Key": "getBankerCodeWiseClientConfig",
                "methodType": "POST",
                "Url": "https://ma4pjac42i.execute-api.us-east-2.amazonaws.com/dev/getBankerCodeWiseClientConfig"
            },
            {
                "Key": "getBankerAllClientConfigs",
                "methodType": "GET",
                "Url": "https://ma4pjac42i.execute-api.us-east-2.amazonaws.com/dev/getBankerAllClientConfigs"
            },
            {
                "Key": "TrackBankerRewardsConsolidated",
                "methodType": "POST",
                "Url": "https://f4yijshnvg.execute-api.us-east-2.amazonaws.com/dev/TrackBankerRewardsConsolidated"
            },
            {
                "Key": "ViewBankerRewards",
                "methodType": "POST",
                "Url": "https://f4yijshnvg.execute-api.us-east-2.amazonaws.com/dev/ViewBankerRewards"
            },
            {
                "Key": "TrackBankerRewardsDownload",
                "methodType": "POST",
                "Url": "https://f4yijshnvg.execute-api.us-east-2.amazonaws.com/dev/TrackBankerRewardsDownload"
            },
            {
                "Key": "TrackBankerRewards",
                "methodType": "POST",
                "Url": "https://f4yijshnvg.execute-api.us-east-2.amazonaws.com/dev/TrackBankerRewards"
            },
            {
                "Key": "TrackBankerRewardsDownloadConsolidated",
                "methodType": "POST",
                "Url": "https://f4yijshnvg.execute-api.us-east-2.amazonaws.com/dev/DownloadConsolidated"
            }
        ]

    },
    "uat": {
        "EnvName": "uat",
        "ApiList":       [
            {
                "Key": "GetWelcomeName",
                "methodType": "POST",
                "Url": "https://1z4vlq9hn2.execute-api.us-east-2.amazonaws.com/uat/oauth/GetWelcomeName"
            },
            {
                "Key": "getSignedUrl",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/getSignedUrl"
            },
            {
                "Key": "getRewardFileHistory",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/getRewardFileHistory"
            },
            {
                "Key": "rewardValidationStatus",
                "methodType": "GET",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/rewardValidationStatus"
            },
            {
                "Key": "rewardsFileErrorData",
                "methodType": "GET",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/rewardsFileErrorData"
            },
            {
                "Key": "totalRewardsByPrmotionID",
                "methodType": "GET",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/totalRewardsByPrmotionID"
            },
            {
                "Key": "RewardStatus",
                "methodType": "GET",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/RewardStatus"
            },
            {
                "Key": "token",
                "methodType": "GET",
                "Url": "https://78428hac4l.execute-api.us-east-2.amazonaws.com/uat/oauth/token"
            },
            {
                "Key": "login",
                "methodType": "POST",
                "Url": "https://78428hac4l.execute-api.us-east-2.amazonaws.com/uat/oauth/login"
            },
            {
                "Key": "self",
                "methodType": "GET",
                "Url": "https://78428hac4l.execute-api.us-east-2.amazonaws.com/uat/oauth/self"
            },
            {
                "Key": "updatePassword",
                "methodType": "PUT",
                "Url": "https://78428hac4l.execute-api.us-east-2.amazonaws.com/uat/oauth/updatePassword"
            },
            {
                "Key": "AdminSupportTicketList",
                "methodType": "POST",
                "Url": "https://3yz65oawf3.execute-api.us-east-2.amazonaws.com/uat/AdminSupportTicketList"
            },
            {
                "Key": "UpdateSupportTicketStatus",
                "methodType": "POST",
                "Url": "https://3yz65oawf3.execute-api.us-east-2.amazonaws.com/uat/UpdateSupportTicketStatus"
            },
            {
                "Key": "CreateUpdateBankAccountDetails",
                "methodType": "POST",
                "Url": "https://9qa5cyysxc.execute-api.us-east-2.amazonaws.com/uat/CreateUpdateBankAccountDetails"
            },
            {
                "Key": "BankAccountDetailsById",
                "methodType": "POST",
                "Url": "https://9qa5cyysxc.execute-api.us-east-2.amazonaws.com/uat/BankAccountDetailsById"
            },
            {
                "Key": "UpdateStatusBankAccountDetails",
                "methodType": "POST",
                "Url": "https://9qa5cyysxc.execute-api.us-east-2.amazonaws.com/uat/UpdateStatusBankAccountDetails"
            },
            {
                "Key": "GetAccountType",
                "methodType": "GET",
                "Url": "https://9qa5cyysxc.execute-api.us-east-2.amazonaws.com/uat/GetAccountType"
            },
            {
                "Key": "GetPaymentMethod",
                "methodType": "GET",
                "Url": "https://9qa5cyysxc.execute-api.us-east-2.amazonaws.com/uat/GetPaymentMethod"
            },
            {
                "Key": "MaskBankAccountNumber",
                "methodType": "POST",
                "Url": "https://9qa5cyysxc.execute-api.us-east-2.amazonaws.com/uat/MaskBankAccountNumber"
            },
            {
                "Key": "GetPaymentMethodByClientId",
                "methodType": "POST",
                "Url": "https://9qa5cyysxc.execute-api.us-east-2.amazonaws.com/uat/GetPaymentMethodByClientId"
            },
            {
                "Key": "PaymentList",
                "methodType": "POST",
                "Url": "https://31jbts0aji.execute-api.us-east-2.amazonaws.com/uat/PaymentList"
            },
            {
                "Key": "TrackingRedeemRewards",
                "methodType": "POST",
                "Url": "https://31jbts0aji.execute-api.us-east-2.amazonaws.com/uat/TrackingRedeemRewards"
            },
            {
                "Key": "RewardsOverview",
                "methodType": "POST",
                "Url": "https://31jbts0aji.execute-api.us-east-2.amazonaws.com/uat/RewardsOverview"
            },
            {
                "Key": "RedeemListRewards",
                "methodType": "POST",
                "Url": "https://07zh65cq13.execute-api.us-east-2.amazonaws.com/uat/RedeemListRewards"
            },
            {
                "Key": "updateRewardStatus",
                "methodType": "POST",
                "Url": "https://07zh65cq13.execute-api.us-east-2.amazonaws.com/uat/updateRewardStatus"
            },
            {
                "Key": "cashInSsoLogin",
                "methodType": "POST",
                "Url": "https://e9bxly4mii.execute-api.us-east-2.amazonaws.com/uat/cashInSsoLogin"
            },
            {
                "Key": "stringenryption",
                "methodType": "POST",
                "Url": "https://9ewmy65xs0.execute-api.us-east-2.amazonaws.com/uat/stringenryption"
            },
            {
                "Key": "stringDecryption",
                "methodType": "GET",
                "Url": "https://9ewmy65xs0.execute-api.us-east-2.amazonaws.com/uat/stringDecryption"
            },
            {
                "Key": "SupportTicketList",
                "methodType": "POST",
                "Url": "https://rbpghlt61i.execute-api.us-east-2.amazonaws.com/uat/SupportTicketList"
            },
            {
                "Key": "CreateSupportTicket",
                "methodType": "GET",
                "Url": "https://rbpghlt61i.execute-api.us-east-2.amazonaws.com/uat/CreateSupportTicket"
            },
            {
                "Key": "UpdateSupportTicketData",
                "methodType": "POST",
                "Url": "https://rbpghlt61i.execute-api.us-east-2.amazonaws.com/uat/UpdateSupportTicketData"
            },
            {
                "Key": "SupportTicketDetails",
                "methodType": "POST",
                "Url": "https://rbpghlt61i.execute-api.us-east-2.amazonaws.com/uat/SupportTicketDetails"
            },
            {
                "Key": "SupportTicketCategoryType",
                "methodType": "GET",
                "Url": "https://rbpghlt61i.execute-api.us-east-2.amazonaws.com/uat/SupportTicketCategoryType"
            },
            {
                "Key": "SupportTicketStatus",
                "methodType": "GET",
                "Url": "https://rbpghlt61i.execute-api.us-east-2.amazonaws.com/uat/SupportTicketStatus"
            },
            {
                "Key": "generateNACHA",
                "methodType": "GET",
                "Url": "https://qiwh07jkq2.execute-api.us-east-2.amazonaws.com/uat/generateNACHA"
            },
            {
                "Key": "readReturnConfirmFileResponse",
                "methodType": "GET",
                "Url": "https://qiwh07jkq2.execute-api.us-east-2.amazonaws.com/uat/readReturnConfirmFileResponse"
            },
            {
                "Key": "MarkAchPaymentSuccessful",
                "methodType": "GET",
                "Url": "https://qiwh07jkq2.execute-api.us-east-2.amazonaws.com/uat/MarkAchPaymentSuccessful"
            },
            {
                "Key": "PromotionBar",
                "methodType": "POST",
                "Url": "https://1rsfpz1rn9.execute-api.us-east-2.amazonaws.com/uat/PromotionBar"
            },
            {
                "Key": "PromotionDetailOverview",
                "methodType": "POST",
                "Url": "https://1rsfpz1rn9.execute-api.us-east-2.amazonaws.com/uat/PromotionDetailOverview"
            },
            {
                "Key": "PromotionFundOverView",
                "methodType": "GET",
                "Url": "https://1rsfpz1rn9.execute-api.us-east-2.amazonaws.com/uat/PromotionFundOverView"
            },
            {
                "Key": "PromotionRewardExpire",
                "methodType": "GET",
                "Url": "https://1rsfpz1rn9.execute-api.us-east-2.amazonaws.com/uat/PromotionRewardExpire"
            },
            {
                "Key": "PromotionStatus",
                "methodType": "GET",
                "Url": "https://1rsfpz1rn9.execute-api.us-east-2.amazonaws.com/uat/PromotionStatus"
            },
            {
                "Key": "createpromotion",
                "methodType": "GET",
                "Url": "https://1rsfpz1rn9.execute-api.us-east-2.amazonaws.com/uat/CreatePromotion"
            },
            {
                "Key": "getpromotion",
                "methodType": "POST",
                "Url": "https://1rsfpz1rn9.execute-api.us-east-2.amazonaws.com/uat/GetPromotion"
            },
            {
                "Key": "getpromotionbyid",
                "methodType": "POST",
                "Url": "https://1rsfpz1rn9.execute-api.us-east-2.amazonaws.com/uat/GetPromotionbyId"
            },
            {
                "Key": "updatepromotion",
                "methodType": "POST",
                "Url": "https://1rsfpz1rn9.execute-api.us-east-2.amazonaws.com/uat/UpdatePromotion"
            },
            {
                "Key": "updatepromotionstatus",
                "methodType": "POST",
                "Url": "https://1rsfpz1rn9.execute-api.us-east-2.amazonaws.com/uat/UpdatePromotionStatus"
            },
            {
                "Key": "CreateAdminUser",
                "methodType": "POST",
                "Url": "https://lod4zncq75.execute-api.us-east-2.amazonaws.com/uat/CreateAdminUser"
            },
            {
                "Key": "GetAllUsers",
                "methodType": "POST",
                "Url": "https://lod4zncq75.execute-api.us-east-2.amazonaws.com/uat/GetAllUsers"
            },
            {
                "Key": "GetClaimsByUserId",
                "methodType": "POST",
                "Url": "https://lod4zncq75.execute-api.us-east-2.amazonaws.com/uat/GetClaimsByUserId"
            },
            {
                "Key": "GetUserPermissionById",
                "methodType": "POST",
                "Url": "https://lod4zncq75.execute-api.us-east-2.amazonaws.com/uat/GetUserPermissionById"
            },
            {
                "Key": "GetUserTypes",
                "methodType": "POST",
                "Url": "https://lod4zncq75.execute-api.us-east-2.amazonaws.com/uat/GetUserTypes"
            },
            {
                "Key": "UpdateUserActionItem",
                "methodType": "POST",
                "Url": "https://lod4zncq75.execute-api.us-east-2.amazonaws.com/uat/UpdateUserActionItem"
            },
            {
                "Key": "UpdateUserDetails",
                "methodType": "POST",
                "Url": "https://lod4zncq75.execute-api.us-east-2.amazonaws.com/uat/UpdateUserDetails"
            },
            {
                "Key": "UpdateUserPermission",
                "methodType": "POST",
                "Url": "https://lod4zncq75.execute-api.us-east-2.amazonaws.com/uat/UpdateUserPermissions"
            },
            {
                "Key": "approverejectrewardfile",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/ApproveRejectRewardFile"
            },
            {
                "Key": "rewarduploadfiledata",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/RewardUploadFileData"
            },
            {
                "Key": "getrewardslist",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/GetRewardsList"
            },
            {
                "Key": "checkAdminSession",
                "methodType": "GET",
                "Url": "https://o48i31tbwl.execute-api.us-east-2.amazonaws.com/uat/oauth/checkAdminSession"
            },
            {
                "Key": "checkBankerSession",
                "methodType": "GET",
                "Url": "https://xxdw9uul11.execute-api.us-east-2.amazonaws.com/uat/oauth/checkBankerSession"
            },
            {
                "Key": "bankerSelfDetails",
                "methodType": "GET",
                "Url": "https://1z4vlq9hn2.execute-api.us-east-2.amazonaws.com/uat/oauth/bankerSelfDetails"
            },
            {
                "Key": "bankerToken",
                "methodType": "GET",
                "Url": "https://1z4vlq9hn2.execute-api.us-east-2.amazonaws.com/uat/oauth/bankerToken"
            },
            {
                "Key": "getreconciliationreport",
                "methodType": "POST",
                "Url": "https://cm38iaxnc5.execute-api.us-east-2.amazonaws.com/uat/GetReconciliationReport"
            },
            {
                "Key": "getoutstandingreport",
                "methodType": "POST",
                "Url": "https://cm38iaxnc5.execute-api.us-east-2.amazonaws.com/uat/GetOutstandingReport"
            },
            {
                "Key": "getpromotionreport",
                "methodType": "POST",
                "Url": "https://cm38iaxnc5.execute-api.us-east-2.amazonaws.com/uat/GetPromotionReport"
            },
            {
                "Key": "RewardsRedeemRewardsOverview",
                "methodType": "GET",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/RewardsRedeemRewardsOverview"
            },
            {
                "Key": "getRewardDetailsByID",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/getRewardDetailsByID"
            },
            {
                "Key": "RewardsTrackingRedeemRewards",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/RewardsTrackingRedeemRewards"
            },
            {
                "Key": "ReinitiateRewards",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/ReinitiateRewards"
            },
            {
                "Key": "GetW9ConfigurationDate",
                "methodType": "POST",
                "Url": "https://pveuyuvjxj.execute-api.us-east-2.amazonaws.com/uat/GetW9RenewDate"
            },
            {
                "Key": "UpdateW9ConfigurationDate",
                "methodType": "POST",
                "Url": "https://pveuyuvjxj.execute-api.us-east-2.amazonaws.com/uat/UpdateW9RenewDate"
            },
            {
                "Key": "DeleteRewardsDetails",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/DeleteRewardsDetails"
            },
            {
                "Key": "GetW9SubmissionDate",
                "methodType": "POST",
                "Url": "https://pveuyuvjxj.execute-api.us-east-2.amazonaws.com/uat/GetW9SubmissionDate"
            },
            {
                "Key": "UpdateW9SubmissionDate",
                "methodType": "POST",
                "Url": "https://pveuyuvjxj.execute-api.us-east-2.amazonaws.com/uat/UpdateW9SubmissionDate"
            },
            {
                "Key": "getSignedUrlFromS3",
                "methodType": "POST",
                "Url": "https://mm12lpw1ck.execute-api.us-east-2.amazonaws.com/uat/getSignedUrlFromS3"
            },
            {
                "Key": "sweepstakeuploadfiledata",
                "methodType": "POST",
                "Url": "https://mm12lpw1ck.execute-api.us-east-2.amazonaws.com/uat/SweepStakeUploadFileData"
            },
            {
                "Key": "getSweepStakeFileList",
                "methodType": "POST",
                "Url": "https://mm12lpw1ck.execute-api.us-east-2.amazonaws.com/uat/getSweepStakeFileList"
            },
            {
                "Key": "totalSweepstackByPrmotionID",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/totalRewardsByPrmotionID"
            },
            {
                "Key": "getSweepStakeValidationStatus",
                "methodType": "POST",
                "Url": "https://mm12lpw1ck.execute-api.us-east-2.amazonaws.com/uat/getSweepStakeValidationStatus"
            },
            {
                "Key": "getSweepStakeFileErrorData",
                "methodType": "POST",
                "Url": "https://mm12lpw1ck.execute-api.us-east-2.amazonaws.com/uat/getSweepStakeFileErrorData"
            },
            {
                "Key": "getSweepStakeDetailsByID",
                "methodType": "POST",
                "Url": "https://mm12lpw1ck.execute-api.us-east-2.amazonaws.com/uat/getSweepStakeDetailsByID"
            },
            {
                "Key": "GetRewardType",
                "methodType": "POST",
                "Url": "https://oxvcudgz1i.execute-api.us-east-2.amazonaws.com/uat/GetRewardType"
            },
            {
                "Key": "W9AdminTaxGird",
                "methodType": "POST",
                "Url": "https://p3jk4wq0d6.execute-api.us-east-2.amazonaws.com/uat/W9AdminTaxGird"
            },
            {
                "Key": "W9AdimDashBoard",
                "methodType": "POST",
                "Url": "https://p3jk4wq0d6.execute-api.us-east-2.amazonaws.com/uat/W9AdimDashBoard"
            },
            {
                "Key": "W9GetYear",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/W9GetYear"
            },
            {
                "Key": "W9GetFormForAdmin",
                "methodType": "POST",
                "Url": "https://p3jk4wq0d6.execute-api.us-east-2.amazonaws.com/uat/W9GetFormForAdmin"
            },
            {
                "Key": "W9AdminFillOutFormData",
                "methodType": "POST",
                "Url": "https://p3jk4wq0d6.execute-api.us-east-2.amazonaws.com/uat/W9AdminFillOutFormData"
            },
            {
                "Key": "W9AdminUpdateTaxFormData",
                "methodType": "POST",
                "Url": "https://p3jk4wq0d6.execute-api.us-east-2.amazonaws.com/uat/W9AdminUpdateTaxFormData"
            },
            {
                "Key": "W9InsertUpdateTaxFormData",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/W9InsertUpdateTaxFormData"
            },
            {
                "Key": "getSignedUrlForRewardDownloadTemplate",
                "methodType": "GET",
                "Url": "https://mm1tsa09th.execute-api.us-east-2.amazonaws.com/uat/RewardTemplate"
            },
			{
                "Key": "W9CheckFormExists",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/W9CheckFormExists"
            },
            {
                "Key": "W9CheckSSNExists",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/W9CheckSSNExists"
            },
            {
                "Key": "W9MergeUser",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/W9MergeUser"
            },
            {
                "Key": "W9GetFormForBanker",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/W9GetFormForBanker"
            },
            {
                "Key": "W9SaveDraftTaxFormData",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/W9SaveDraftTaxFormData"
            },
            {
                "Key": "W9TaxationHistory",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/W9TaxationHistory"
            },
            {
                "Key": "BankerCheckW9ResubmitOrNot",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/BankerCheckW9ResubmitOrNot"
            },
            {
                "Key": "BankerUpdateW9FormReviewed",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/BankerUpdateW9FormReviewed"
            },
            {
                "Key": "BankerResbmitTaxFormData",
                "methodType": "POST",
                "Url": "https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/BankerResbmitTaxFormData"
            },
            {
                "Key": "getTotalSweepStakeByPrmotionId",
                "methodType": "POST",
                "Url": "https://mm12lpw1ck.execute-api.us-east-2.amazonaws.com/uat/getTotalSweepStakeByPrmotionId"
            },
            {
                "Key": "getSignedUrlForSweepStakeTemplate",
                "methodType": "GET",
                "Url": "https://mm1tsa09th.execute-api.us-east-2.amazonaws.com/uat/SweepStakeTemplate"
            },
            {
                "Key": "getSignedUrlForW9FormDownloadTemplate",
                "methodType": "GET",
                "Url": "https://mm1tsa09th.execute-api.us-east-2.amazonaws.com/uat/W9FormTemplate"
            },
            {
                "Key": "getmergedreport",
                "methodType": "POST",
                "Url": "https://cm38iaxnc5.execute-api.us-east-2.amazonaws.com/uat/GetUserMergeReport"
            },
            {
                "Key": "TaxResourceDownloadTemplate",
                "methodType": "GET",
                "Url": "https://mm1tsa09th.execute-api.us-east-2.amazonaws.com/uat/TaxResourceTemplate"
            },
            {
                "Key": "getCodeWiseClientConfig",
                "methodType": "POST",
                "Url": "https://qm4dpat2c7.execute-api.us-east-2.amazonaws.com/uat/getCodeWiseClientConfig"
            },
            {
                "Key": "getAllClientConfigs",
                "methodType": "GET",
                "Url": "https://qm4dpat2c7.execute-api.us-east-2.amazonaws.com/uat/getAllClientConfigs"
            },
            {
                "Key": "getBankerCodeWiseClientConfig",
                "methodType": "POST",
                "Url": "https://3yoay0c269.execute-api.us-east-2.amazonaws.com/uat/getBankerCodeWiseClientConfig"
            },
            {
                "Key": "getBankerAllClientConfigs",
                "methodType": "GET",
                "Url": "https://3yoay0c269.execute-api.us-east-2.amazonaws.com/uat/getBankerAllClientConfigs"
            },
            {
                "Key": "TrackBankerRewardsConsolidated",
                "methodType": "POST",
                "Url": "https://1tzc7yb7e0.execute-api.us-east-2.amazonaws.com/uat/TrackBankerRewardsConsolidated"
            },
            {
                "Key": "ViewBankerRewards",
                "methodType": "POST",
                "Url": "https://1tzc7yb7e0.execute-api.us-east-2.amazonaws.com/uat/ViewBankerRewards"
            },
            {
                "Key": "TrackBankerRewardsDownload",
                "methodType": "POST",
                "Url": "https://1tzc7yb7e0.execute-api.us-east-2.amazonaws.com/uat/TrackBankerRewardsDownload"
            },
            {
                "Key": "TrackBankerRewards",
                "methodType": "POST",
                "Url": "https://1tzc7yb7e0.execute-api.us-east-2.amazonaws.com/uat/TrackBankerRewards"
            },
            {
                "Key": "TrackBankerRewardsDownloadConsolidated",
                "methodType": "POST",
                "Url": "https://1tzc7yb7e0.execute-api.us-east-2.amazonaws.com/uat/DownloadConsolidated"
            }
        ]
    },
    "dr": {
        "EnvName": "dr",
        "ApiList": [
            {
                "Key": "GetWelcomeName",
                "methodType": "POST",
                "Url": "https://j0lbsapfr1.execute-api.us-east-1.amazonaws.com/dr/getwelcomename"
            },
            {
                "Key": "token",
                "methodType": "GET",
                "Url": "https://hacx4u4sd1.execute-api.us-east-1.amazonaws.com/dr/oauth/token"
            },
            {
                "Key": "login",
                "methodType": "POST",
                "Url": "https://hacx4u4sd1.execute-api.us-east-1.amazonaws.com/dr/oauth/login"
            },
            {
                "Key": "self",
                "methodType": "GET",
                "Url": "https://hacx4u4sd1.execute-api.us-east-1.amazonaws.com/dr/oauth/self"
            },
            {
                "Key": "updatePassword",
                "methodType": "PUT",
                "Url": "https://hacx4u4sd1.execute-api.us-east-1.amazonaws.com/dr/oauth/updatePassword"
            },
            {
                "Key": "AdminSupportTicketList",
                "methodType": "POST",
                "Url": "https://4ws71hjlkg.execute-api.us-east-1.amazonaws.com/dr/AdminSupportTicketList"
            },
            {
                "Key": "UpdateSupportTicketStatus",
                "methodType": "POST",
                "Url": "https://4ws71hjlkg.execute-api.us-east-1.amazonaws.com/dr/UpdateSupportTicketStatus"
            },
            {
                "Key": "CreateUpdateBankAccountDetails",
                "methodType": "POST",
                "Url": "https://l5mwdacs64.execute-api.us-east-1.amazonaws.com/dr/CreateUpdateBankAccountDetails"
            },
            {
                "Key": "BankAccountDetailsById",
                "methodType": "POST",
                "Url": "https://l5mwdacs64.execute-api.us-east-1.amazonaws.com/dr/BankAccountDetailsById"
            },
            {
                "Key": "UpdateStatusBankAccountDetails",
                "methodType": "POST",
                "Url": "https://l5mwdacs64.execute-api.us-east-1.amazonaws.com/dr/UpdateStatusBankAccountDetails"
            },
            {
                "Key": "GetAccountType",
                "methodType": "POST",
                "Url": "https://l5mwdacs64.execute-api.us-east-1.amazonaws.com/dr/GetAccountType"
            },
            {
                "Key": "GetPaymentMethod",
                "methodType": "GET",
                "Url": "https://l5mwdacs64.execute-api.us-east-1.amazonaws.com/dr/GetPaymentMethod"
            },
            {
                "Key": "MaskBankAccountNumber",
                "methodType": "GET",
                "Url": "https://l5mwdacs64.execute-api.us-east-1.amazonaws.com/dr/MaskBankAccountNumber"
            },
            {
                "Key": "GetPaymentMethodByClientId",
                "methodType": "GET",
                "Url": "https://l5mwdacs64.execute-api.us-east-1.amazonaws.com/dr/GetPaymentMethodByClientId"
            },
            {
                "Key": "PaymentList",
                "methodType": "POST",
                "Url": "https://w40ith325h.execute-api.us-east-1.amazonaws.com/dr/PaymentList"
            },
            {
                "Key": "TrackingRedeemRewards",
                "methodType": "POST",
                "Url": "https://w40ith325h.execute-api.us-east-1.amazonaws.com/dr/TrackingRedeemRewards"
            },
            {
                "Key": "RewardsOverview",
                "methodType": "POST",
                "Url": "https://w40ith325h.execute-api.us-east-1.amazonaws.com/dr/RewardsOverview"
            },
            {
                "Key": "RedeemListRewards",
                "methodType": "POST",
                "Url": "https://i9mgm3j3id.execute-api.us-east-1.amazonaws.com/dr/RedeemListRewards"
            },
            {
                "Key": "updateRewardStatus",
                "methodType": "POST",
                "Url": "https://i9mgm3j3id.execute-api.us-east-1.amazonaws.com/dr/updateRewardStatus"
            },
            {
                "Key": "cashInSsoLogin",
                "methodType": "POST",
                "Url": "https://ml5demf131.execute-api.us-east-1.amazonaws.com/dr/cashInSsoLogin"
            },
            {
                "Key": "stringenryption",
                "methodType": "POST",
                "Url": "https://ml5demf131.execute-api.us-east-1.amazonaws.com/dr/stringenryption"
            },
            {
                "Key": "stringDecryption",
                "methodType": "GET",
                "Url": "https://ml5demf131.execute-api.us-east-1.amazonaws.com/dr/stringDecryption"
            },
            {
                "Key": "SupportTicketList",
                "methodType": "POST",
                "Url": "https://x0gdn3zaf1.execute-api.us-east-1.amazonaws.com/dr/SupportTicketList"
            },
            {
                "Key": "CreateSupportTicket",
                "methodType": "GET",
                "Url": "https://x0gdn3zaf1.execute-api.us-east-1.amazonaws.com/dr/CreateSupportTicket"
            },
            {
                "Key": "UpdateSupportTicketData",
                "methodType": "POST",
                "Url": "https://x0gdn3zaf1.execute-api.us-east-1.amazonaws.com/dr/UpdateSupportTicketData"
            },
            {
                "Key": "SupportTicketDetails",
                "methodType": "POST",
                "Url": "https://x0gdn3zaf1.execute-api.us-east-1.amazonaws.com/dr/SupportTicketDetails"
            },
            {
                "Key": "SupportTicketCategoryType",
                "methodType": "GET",
                "Url": "https://x0gdn3zaf1.execute-api.us-east-1.amazonaws.com/dr/SupportTicketCategoryType"
            },
            {
                "Key": "SupportTicketStatus",
                "methodType": "GET",
                "Url": "https://x0gdn3zaf1.execute-api.us-east-1.amazonaws.com/dr/SupportTicketStatus"
            },
            {
                "Key": "generateNACHA",
                "methodType": "GET",
                "Url": "https://eiw9f9bthd.execute-api.us-east-1.amazonaws.com/dr/generateNACHA"
            },
            {
                "Key": "readReturnConfirmFileResponse",
                "methodType": "GET",
                "Url": "https://eiw9f9bthd.execute-api.us-east-1.amazonaws.com/dr/readReturnConfirmFileResponse"
            },
            {
                "Key": "MarkAchPaymentSuccessful",
                "methodType": "GET",
                "Url": "https://eiw9f9bthd.execute-api.us-east-1.amazonaws.com/dr/MarkAchPaymentSuccessful"
            },
            {
                "Key": "PromotionBar",
                "methodType": "GET",
                "Url": "https://mwtw6mlo29.execute-api.us-east-1.amazonaws.com/dr/PromotionBar"
            },
            {
                "Key": "PromotionDetailOverview",
                "methodType": "POST",
                "Url": "https://mwtw6mlo29.execute-api.us-east-1.amazonaws.com/dr/PromotionDetailOverview"
            },
            {
                "Key": "PromotionFundOverView",
                "methodType": "POST",
                "Url": "https://mwtw6mlo29.execute-api.us-east-1.amazonaws.com/dr/PromotionFundOverView"
            },
            {
                "Key": "PromotionRewardExpire",
                "methodType": "GET",
                "Url": "https://mwtw6mlo29.execute-api.us-east-1.amazonaws.com/dr/PromotionRewardExpire"
            },
            {
                "Key": "PromotionStatus",
                "methodType": "GET",
                "Url": "https://mwtw6mlo29.execute-api.us-east-1.amazonaws.com/dr/PromotionStatus"
            },
            {
                "Key": "getRewardFileHistory",
                "methodType": "POST",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/getRewardFileHistory"
            },
            {
                "Key": "getSignedUrl",
                "methodType": "POST",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/getSignedUrl"
            },
            {
                "Key": "rewardsFileErrorData",
                "methodType": "GET",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/rewardsFileErrorData"
            },
            {
                "Key": "rewardValidationStatus",
                "methodType": "GET",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/rewardValidationStatus"
            },
            {
                "Key": "totalRewardsByPrmotionID",
                "methodType": "GET",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/totalRewardsByPrmotionID"
            },
            {
                "Key": "RewardStatus",
                "methodType": "GET",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/RewardStatus"
            },
            {
                "Key": "CreateAdminUser",
                "methodType": "POST",
                "Url": "https://2clvxdasq3.execute-api.us-east-1.amazonaws.com/dr/createadminuser"
            },
            {
                "Key": "GetAllUsers",
                "methodType": "POST",
                "Url": "https://2clvxdasq3.execute-api.us-east-1.amazonaws.com/dr/getallusers"
            },
            {
                "Key": "GetClaimsByUserId",
                "methodType": "POST",
                "Url": "https://2clvxdasq3.execute-api.us-east-1.amazonaws.com/dr/getclaimsbyuserid"
            },
            {
                "Key": "GetUserPermissionById",
                "methodType": "POST",
                "Url": "https://2clvxdasq3.execute-api.us-east-1.amazonaws.com/dr/getuserpermissionbyid"
            },
            {
                "Key": "GetUserTypes",
                "methodType": "POST",
                "Url": "https://2clvxdasq3.execute-api.us-east-1.amazonaws.com/dr/getusertypes"
            },
            {
                "Key": "UpdateUserActionItem",
                "methodType": "POST",
                "Url": "https://2clvxdasq3.execute-api.us-east-1.amazonaws.com/dr/updateuseractionitem"
            },
            {
                "Key": "UpdateUserDetails",
                "methodType": "POST",
                "Url": "https://2clvxdasq3.execute-api.us-east-1.amazonaws.com/dr/updateuserdetails"
            },
            {
                "Key": "UpdateUserPermission",
                "methodType": "POST",
                "Url": "https://2clvxdasq3.execute-api.us-east-1.amazonaws.com/dr/updateuserpermission"
            },
            {
                "Key": "createpromotion",
                "methodType": "GET",
                "Url": "https://9jo8h9gyya.execute-api.us-east-1.amazonaws.com/dr/createpromotion"
            },
            {
                "Key": "getpromotion",
                "methodType": "POST",
                "Url": "https://9jo8h9gyya.execute-api.us-east-1.amazonaws.com/dr/getpromotion"
            },
            {
                "Key": "getpromotionbyid",
                "methodType": "POST",
                "Url": "https://9jo8h9gyya.execute-api.us-east-1.amazonaws.com/dr/getpromotionbyid"
            },
            {
                "Key": "updatepromotion",
                "methodType": "POST",
                "Url": "https://9jo8h9gyya.execute-api.us-east-1.amazonaws.com/dr/updatepromotion"
            },
            {
                "Key": "updatepromotionstatus",
                "methodType": "POST",
                "Url": "https://9jo8h9gyya.execute-api.us-east-1.amazonaws.com/dr/updatepromotionstatus"
            },
            {
                "Key": "approverejectrewardfile",
                "methodType": "POST",
                "Url": "https://wzhebsg0qj.execute-api.us-east-1.amazonaws.com/dr/approverejectrewardfile"
            },
            {
                "Key": "getrewardslist",
                "methodType": "POST",
                "Url": "https://wzhebsg0qj.execute-api.us-east-1.amazonaws.com/dr/getrewardslist"
            },
            {
                "Key": "rewarduploadfiledata",
                "methodType": "POST",
                "Url": "https://wzhebsg0qj.execute-api.us-east-1.amazonaws.com/dr/rewarduploadfiledata"
            },
            {
                "Key": "checkAdminSession",
                "methodType": "GET",
                "Url": "https://j95iwgz9zl.execute-api.us-east-1.amazonaws.com/dr/oauth/checkAdminSession"
            },
            {
                "Key": "checkBankerSession",
                "methodType": "GET",
                "Url": "https://yp515ikyn6.execute-api.us-east-1.amazonaws.com/dr/oauth/checkBankerSession"
            },
            {
                "Key": "bankerSelfDetails",
                "methodType": "GET",
                "Url": "https://s5yohgzbac.execute-api.us-east-1.amazonaws.com/dr/oauth/bankerSelfDetails"
            },
            {
                "Key": "bankerToken",
                "methodType": "GET",
                "Url": "https://s5yohgzbac.execute-api.us-east-1.amazonaws.com/dr/oauth/bankerToken"
            },
            {
                "Key": "TrackBankerRewards",
                "methodType": "POST",
                "Url": "https://eqs7g81uze.execute-api.us-east-1.amazonaws.com/dr/TrackBankerRewards"
            },
            {
                "Key": "getpromotionreport",
                "methodType": "POST",
                "Url": "https://3empi3hz48.execute-api.us-east-1.amazonaws.com/dr/getpromotionreport"
            },
            {
                "Key": "getoutstandingreport",
                "methodType": "POST",
                "Url": "https://3empi3hz48.execute-api.us-east-1.amazonaws.com/dr/getoutstandingreport"
            },
            {
                "Key": "getreconciliationreport",
                "methodType": "POST",
                "Url": "https://3empi3hz48.execute-api.us-east-1.amazonaws.com/dr/getreconciliationreport"
            },
            {
                "Key": "RewardsRedeemRewardsOverview",
                "methodType": "GET",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/RewardsRedeemRewardsOverview"
            },
            {
                "Key": "getRewardDetailsByID",
                "methodType": "POST",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/getRewardDetailsByID"
            },
            {
                "Key": "RewardsTrackingRedeemRewards",
                "methodType": "POST",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/RewardsTrackingRedeemRewards"
            },
            {
                "Key": "ReinitiateRewards",
                "methodType": "POST",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/ReinitiateRewards"
            },
            {
                "Key": "GetW9ConfigurationDate",
                "methodType": "POST",
                "Url": "https://d2b0r0toie.execute-api.us-east-1.amazonaws.com/dr/GetW9ConfigurationDate"
            },
            {
                "Key": "UpdateW9ConfigurationDate",
                "methodType": "POST",
                "Url": "https://d2b0r0toie.execute-api.us-east-1.amazonaws.com/dr/UpdateW9ConfigurationDate"
            },
            {
                "Key": "DeleteRewardsDetails",
                "methodType": "POST",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/DeleteRewardsDetails"
            },
            {
                "Key": "GetW9SubmissionDate",
                "methodType": "POST",
                "Url": "https://d2b0r0toie.execute-api.us-east-1.amazonaws.com/dr/GetW9SubmissionDate"
            },
            {
                "Key": "UpdateW9SubmissionDate",
                "methodType": "POST",
                "Url": "https://d2b0r0toie.execute-api.us-east-1.amazonaws.com/dr/UpdateW9SubmissionDate"
            },
            {
                "Key": "getSignedUrlFromS3",
                "methodType": "POST",
                "Url": "https://7r1gu5r5f1.execute-api.us-east-1.amazonaws.com/dr/getSignedUrlFromS3"
            },
            {
                "Key": "sweepstakeuploadfiledata",
                "methodType": "POST",
                "Url": "https://gxd24m046d.execute-api.us-east-1.amazonaws.com/dr/sweepstakeuploadfiledata"
            },
            {
                "Key": "getSweepStakeFileList",
                "methodType": "POST",
                "Url": "https://7r1gu5r5f1.execute-api.us-east-1.amazonaws.com/dr/getSweepStakeFileList"
            },
            {
                "Key": "getTotalSweepStakeByPrmotionId",
                "methodType": "POST",
                "Url": "https://7r1gu5r5f1.execute-api.us-east-1.amazonaws.com/dr/getTotalSweepStakeByPrmotionId"
            },
            {
                "Key": "getSweepStakeValidationStatus",
                "methodType": "POST",
                "Url": "https://7r1gu5r5f1.execute-api.us-east-1.amazonaws.com/dr/getSweepStakeValidationStatus"
            },
            {
                "Key": "getSweepStakeFileErrorData",
                "methodType": "POST",
                "Url": "https://7r1gu5r5f1.execute-api.us-east-1.amazonaws.com/dr/getSweepStakeFileErrorData"
            },
            {
                "Key": "getSweepStakeDetailsByID",
                "methodType": "POST",
                "Url": "https://7r1gu5r5f1.execute-api.us-east-1.amazonaws.com/dr/getSweepStakeDetailsByID"
            },
            {
                "Key": "GetRewardType",
                "methodType": "POST",
                "Url": "https://vtw3leugfk.execute-api.us-east-1.amazonaws.com/dr/GetRewardType"
            },
            {
                "Key": "W9AdminTaxGird",
                "methodType": "POST",
                "Url": "https://ld5w6s4zw7.execute-api.us-east-1.amazonaws.com/dr/W9AdminTaxGird"
            },
            {
                "Key": "W9AdimDashBoard",
                "methodType": "POST",
                "Url": "https://ld5w6s4zw7.execute-api.us-east-1.amazonaws.com/dr/W9AdimDashBoard"
            },
            {
                "Key": "W9GetYear",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/W9GetYear"
            },
            {
                "Key": "W9GetFormForAdmin",
                "methodType": "POST",
                "Url": "https://ld5w6s4zw7.execute-api.us-east-1.amazonaws.com/dr/W9GetFormForAdmin"
            },
            {
                "Key": "W9AdminFillOutFormData",
                "methodType": "POST",
                "Url": "https://ld5w6s4zw7.execute-api.us-east-1.amazonaws.com/dr/W9AdminFillOutFormData"
            },
            {
                "Key": "W9AdminUpdateTaxFormData",
                "methodType": "POST",
                "Url": "https://ld5w6s4zw7.execute-api.us-east-1.amazonaws.com/dr/W9AdminUpdateTaxFormData"
            },
            {
                "Key": "W9InsertUpdateTaxFormData",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/W9InsertUpdateTaxFormData"
            },
            {
                "Key": "W9CheckFormExists",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/W9CheckFormExists"
            },
            {
                "Key": "W9CheckSSNExists",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/W9CheckSSNExists"
            },
            {
                "Key": "W9MergeUser",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/W9MergeUser"
            },
            {
                "Key": "W9GetFormForBanker",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/W9GetFormForBanker"
            },
            {
                "Key": "W9SaveDraftTaxFormData",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/W9SaveDraftTaxFormData"
            },
            {
                "Key": "W9TaxationHistory",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/W9TaxationHistory"
            },
            {
                "Key": "getSignedUrlForRewardDownloadTemplate",
                "methodType": "GET",
                "Url": "https://zk985etdw3.execute-api.us-east-1.amazonaws.com/dr/getSignedUrlForRewardDownloadTemplate"
            },
            {
                "Key": "BankerCheckW9ResubmitOrNot",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/BankerCheckW9ResubmitOrNot"
            },
            {
                "Key": "BankerUpdateW9FormReviewed",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/BankerUpdateW9FormReviewed"
            },
            {
                "Key": "BankerResbmitTaxFormData",
                "methodType": "POST",
                "Url": "https://saexcisczl.execute-api.us-east-1.amazonaws.com/dr/BankerResbmitTaxFormData"
            },
            {
                "Key": "getSignedUrlForSweepStakeTemplate",
                "methodType": "GET",
                "Url": "https://zk985etdw3.execute-api.us-east-1.amazonaws.com/dr/getSignedUrlForSweepStakeTemplate"
            },
            {
                "Key": "getSignedUrlForW9FormDownloadTemplate",
                "methodType": "GET",
                "Url": "https://zk985etdw3.execute-api.us-east-1.amazonaws.com/dr/getSignedUrlForW9FormDownloadTemplate"
            }

        ]
    },
    "prod": {
        "EnvName": "prod",
        "ApiList": [
            {
                "Key": "GetWelcomeName",
                "methodType": "POST",
                "Url": "https://bhesutkdvf.execute-api.us-east-2.amazonaws.com/prod/oauth/GetWelcomeName"
            },
            {
                "Key": "getSignedUrl",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/getSignedUrl"
            },
            {
                "Key": "getRewardFileHistory",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/getRewardFileHistory"
            },
            {
                "Key": "rewardValidationStatus",
                "methodType": "GET",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/rewardValidationStatus"
            },
            {
                "Key": "rewardsFileErrorData",
                "methodType": "GET",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/rewardsFileErrorData"
            },
            {
                "Key": "totalRewardsByPrmotionID",
                "methodType": "GET",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/totalRewardsByPrmotionID"
            },
            {
                "Key": "RewardStatus",
                "methodType": "GET",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/RewardStatus"
            },
            {
                "Key": "token",
                "methodType": "GET",
                "Url": "https://8c20qhnae5.execute-api.us-east-2.amazonaws.com/prod/oauth/token"
            },
            {
                "Key": "login",
                "methodType": "POST",
                "Url": "https://8c20qhnae5.execute-api.us-east-2.amazonaws.com/prod/oauth/login"
            },
            {
                "Key": "self",
                "methodType": "GET",
                "Url": "https://8c20qhnae5.execute-api.us-east-2.amazonaws.com/prod/oauth/self"
            },
            {
                "Key": "updatePassword",
                "methodType": "PUT",
                "Url": "https://8c20qhnae5.execute-api.us-east-2.amazonaws.com/prod/oauth/updatePassword"
            },
            {
                "Key": "AdminSupportTicketList",
                "methodType": "POST",
                "Url": "https://0g9lzipsy0.execute-api.us-east-2.amazonaws.com/prod/AdminSupportTicketList"
            },
            {
                "Key": "UpdateSupportTicketStatus",
                "methodType": "POST",
                "Url": "https://0g9lzipsy0.execute-api.us-east-2.amazonaws.com/prod/UpdateSupportTicketStatus"
            },
            {
                "Key": "CreateUpdateBankAccountDetails",
                "methodType": "POST",
                "Url": "https://fu4fiyt471.execute-api.us-east-2.amazonaws.com/prod/CreateUpdateBankAccountDetails"
            },
            {
                "Key": "BankAccountDetailsById",
                "methodType": "POST",
                "Url": "https://fu4fiyt471.execute-api.us-east-2.amazonaws.com/prod/BankAccountDetailsById"
            },
            {
                "Key": "UpdateStatusBankAccountDetails",
                "methodType": "POST",
                "Url": "https://fu4fiyt471.execute-api.us-east-2.amazonaws.com/prod/UpdateStatusBankAccountDetails"
            },
            {
                "Key": "GetAccountType",
                "methodType": "GET",
                "Url": "https://fu4fiyt471.execute-api.us-east-2.amazonaws.com/prod/GetAccountType"
            },
            {
                "Key": "GetPaymentMethod",
                "methodType": "GET",
                "Url": "https://fu4fiyt471.execute-api.us-east-2.amazonaws.com/prod/GetPaymentMethod"
            },
            {
                "Key": "MaskBankAccountNumber",
                "methodType": "POST",
                "Url": "https://fu4fiyt471.execute-api.us-east-2.amazonaws.com/prod/MaskBankAccountNumber"
            },
            {
                "Key": "GetPaymentMethodByClientId",
                "methodType": "POST",
                "Url": "https://fu4fiyt471.execute-api.us-east-2.amazonaws.com/prod/GetPaymentMethodByClientId"
            },
            {
                "Key": "PaymentList",
                "methodType": "POST",
                "Url": "https://ctw34u0nk1.execute-api.us-east-2.amazonaws.com/prod/PaymentList"
            },
            {
                "Key": "TrackingRedeemRewards",
                "methodType": "POST",
                "Url": "https://ctw34u0nk1.execute-api.us-east-2.amazonaws.com/prod/TrackingRedeemRewards"
            },
            {
                "Key": "RewardsOverview",
                "methodType": "POST",
                "Url": "https://ctw34u0nk1.execute-api.us-east-2.amazonaws.com/prod/RewardsOverview"
            },
            {
                "Key": "RedeemListRewards",
                "methodType": "POST",
                "Url": "https://j670t7lwz7.execute-api.us-east-2.amazonaws.com/prod/RedeemListRewards"
            },
            {
                "Key": "updateRewardStatus",
                "methodType": "POST",
                "Url": "https://j670t7lwz7.execute-api.us-east-2.amazonaws.com/prod/updateRewardStatus"
            },
            {
                "Key": "cashInSsoLogin",
                "methodType": "POST",
                "Url": "https://wdfg7fhtb2.execute-api.us-east-2.amazonaws.com/prod/cashInSsoLogin"
            },
            {
                "Key": "stringenryption",
                "methodType": "POST",
                "Url": "https://9ewmy65xs0.execute-api.us-east-2.amazonaws.com/prod/stringenryption"
            },
            {
                "Key": "stringDecryption",
                "methodType": "GET",
                "Url": "https://9ewmy65xs0.execute-api.us-east-2.amazonaws.com/prod/stringDecryption"
            },
            {
                "Key": "SupportTicketList",
                "methodType": "POST",
                "Url": "https://flavhs1rx1.execute-api.us-east-2.amazonaws.com/prod/SupportTicketList"
            },
            {
                "Key": "CreateSupportTicket",
                "methodType": "GET",
                "Url": "https://flavhs1rx1.execute-api.us-east-2.amazonaws.com/prod/CreateSupportTicket"
            },
            {
                "Key": "UpdateSupportTicketData",
                "methodType": "POST",
                "Url": "https://flavhs1rx1.execute-api.us-east-2.amazonaws.com/prod/UpdateSupportTicketData"
            },
            {
                "Key": "SupportTicketDetails",
                "methodType": "POST",
                "Url": "https://flavhs1rx1.execute-api.us-east-2.amazonaws.com/prod/SupportTicketDetails"
            },
            {
                "Key": "SupportTicketCategoryType",
                "methodType": "GET",
                "Url": "https://flavhs1rx1.execute-api.us-east-2.amazonaws.com/prod/SupportTicketCategoryType"
            },
            {
                "Key": "SupportTicketStatus",
                "methodType": "GET",
                "Url": "https://flavhs1rx1.execute-api.us-east-2.amazonaws.com/prod/SupportTicketStatus"
            },
            {
                "Key": "generateNACHA",
                "methodType": "GET",
                "Url": "https://qiwh07jkq2.execute-api.us-east-2.amazonaws.com/prod/generateNACHA"
            },
            {
                "Key": "readReturnConfirmFileResponse",
                "methodType": "GET",
                "Url": "https://qiwh07jkq2.execute-api.us-east-2.amazonaws.com/prod/readReturnConfirmFileResponse"
            },
            {
                "Key": "MarkAchPaymentSuccessful",
                "methodType": "GET",
                "Url": "https://qiwh07jkq2.execute-api.us-east-2.amazonaws.com/prod/MarkAchPaymentSuccessful"
            },
            {
                "Key": "PromotionBar",
                "methodType": "POST",
                "Url": "https://vbeecs6n66.execute-api.us-east-2.amazonaws.com/prod/PromotionBar"
            },
            {
                "Key": "PromotionDetailOverview",
                "methodType": "POST",
                "Url": "https://vbeecs6n66.execute-api.us-east-2.amazonaws.com/prod/PromotionDetailOverview"
            },
            {
                "Key": "PromotionFundOverView",
                "methodType": "GET",
                "Url": "https://vbeecs6n66.execute-api.us-east-2.amazonaws.com/prod/PromotionFundOverView"
            },
            {
                "Key": "PromotionRewardExpire",
                "methodType": "GET",
                "Url": "https://vbeecs6n66.execute-api.us-east-2.amazonaws.com/prod/PromotionRewardExpire"
            },
            {
                "Key": "PromotionStatus",
                "methodType": "GET",
                "Url": "https://vbeecs6n66.execute-api.us-east-2.amazonaws.com/prod/PromotionStatus"
            },
            {
                "Key": "createpromotion",
                "methodType": "GET",
                "Url": "https://vbeecs6n66.execute-api.us-east-2.amazonaws.com/prod/CreatePromotion"
            },
            {
                "Key": "getpromotion",
                "methodType": "POST",
                "Url": "https://vbeecs6n66.execute-api.us-east-2.amazonaws.com/prod/GetPromotion"
            },
            {
                "Key": "getpromotionbyid",
                "methodType": "POST",
                "Url": "https://vbeecs6n66.execute-api.us-east-2.amazonaws.com/prod/GetPromotionbyId"
            },
            {
                "Key": "updatepromotion",
                "methodType": "POST",
                "Url": "https://vbeecs6n66.execute-api.us-east-2.amazonaws.com/prod/UpdatePromotion"
            },
            {
                "Key": "updatepromotionstatus",
                "methodType": "POST",
                "Url": "https://vbeecs6n66.execute-api.us-east-2.amazonaws.com/prod/UpdatePromotionStatus"
            },
            {
                "Key": "CreateAdminUser",
                "methodType": "POST",
                "Url": "https://gec5rgxasg.execute-api.us-east-2.amazonaws.com/prod/CreateAdminUser"
            },
            {
                "Key": "GetAllUsers",
                "methodType": "POST",
                "Url": "https://gec5rgxasg.execute-api.us-east-2.amazonaws.com/prod/GetAllUsers"
            },
            {
                "Key": "GetClaimsByUserId",
                "methodType": "POST",
                "Url": "https://gec5rgxasg.execute-api.us-east-2.amazonaws.com/prod/GetClaimsByUserId"
            },
            {
                "Key": "GetUserPermissionById",
                "methodType": "POST",
                "Url": "https://gec5rgxasg.execute-api.us-east-2.amazonaws.com/prod/GetUserPermissionById"
            },
            {
                "Key": "GetUserTypes",
                "methodType": "POST",
                "Url": "https://gec5rgxasg.execute-api.us-east-2.amazonaws.com/prod/GetUserTypes"
            },
            {
                "Key": "UpdateUserActionItem",
                "methodType": "POST",
                "Url": "https://gec5rgxasg.execute-api.us-east-2.amazonaws.com/prod/UpdateUserActionItem"
            },
            {
                "Key": "UpdateUserDetails",
                "methodType": "POST",
                "Url": "https://gec5rgxasg.execute-api.us-east-2.amazonaws.com/prod/UpdateUserDetails"
            },
            {
                "Key": "UpdateUserPermission",
                "methodType": "POST",
                "Url": "https://gec5rgxasg.execute-api.us-east-2.amazonaws.com/prod/UpdateUserPermissions"
            },
            {
                "Key": "approverejectrewardfile",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/ApproveRejectRewardFile"
            },
            {
                "Key": "rewarduploadfiledata",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/RewardUploadFileData"
            },
            {
                "Key": "getrewardslist",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/GetRewardsList"
            },
            {
                "Key": "checkAdminSession",
                "methodType": "GET",
                "Url": "https://pjdd2zms9h.execute-api.us-east-2.amazonaws.com/prod/oauth/checkAdminSession"
            },
            {
                "Key": "checkBankerSession",
                "methodType": "GET",
                "Url": "https://s0ska9ergk.execute-api.us-east-2.amazonaws.com/prod/oauth/checkBankerSession"
            },
            {
                "Key": "bankerSelfDetails",
                "methodType": "GET",
                "Url": "https://bhesutkdvf.execute-api.us-east-2.amazonaws.com/prod/oauth/bankerSelfDetails"
            },
            {
                "Key": "bankerToken",
                "methodType": "GET",
                "Url": "https://bhesutkdvf.execute-api.us-east-2.amazonaws.com/prod/oauth/bankerToken"
            },
            {
                "Key": "RewardsRedeemRewardsOverview",
                "methodType": "GET",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/RewardsRedeemRewardsOverview"
            },
            {
                "Key": "getRewardDetailsByID",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/getRewardDetailsByID"
            },
            {
                "Key": "RewardsTrackingRedeemRewards",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/RewardsTrackingRedeemRewards"
            },
            {
                "Key": "ReinitiateRewards",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/ReinitiateRewards"
            },
            {
                "Key": "GetW9ConfigurationDate",
                "methodType": "POST",
                "Url": "https://0swx3xbkhh.execute-api.us-east-2.amazonaws.com/prod/GetW9RenewDate"
            },
            {
                "Key": "UpdateW9ConfigurationDate",
                "methodType": "POST",
                "Url": "https://0swx3xbkhh.execute-api.us-east-2.amazonaws.com/prod/UpdateW9RenewDate"
            },
            {
                "Key": "DeleteRewardsDetails",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/DeleteRewardsDetails"
            },
            {
                "Key": "GetW9SubmissionDate",
                "methodType": "POST",
                "Url": "https://0swx3xbkhh.execute-api.us-east-2.amazonaws.com/prod/GetW9SubmissionDate"
            },
            {
                "Key": "UpdateW9SubmissionDate",
                "methodType": "POST",
                "Url": "https://0swx3xbkhh.execute-api.us-east-2.amazonaws.com/prod/UpdateW9SubDate"
            },
            {
                "Key": "getSignedUrlFromS3",
                "methodType": "POST",
                "Url": "https://a1xywz1yog.execute-api.us-east-2.amazonaws.com/prod/getSignedUrlFromS3"
            },
            {
                "Key": "sweepstakeuploadfiledata",
                "methodType": "POST",
                "Url": "https://a1xywz1yog.execute-api.us-east-2.amazonaws.com/prod/SweepStakeUploadFileData"
            },
            {
                "Key": "getSweepStakeFileList",
                "methodType": "POST",
                "Url": "https://a1xywz1yog.execute-api.us-east-2.amazonaws.com/prod/getSweepStakeFileList"
            },
            {
                "Key": "totalSweepstackByPrmotionID",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/totalRewardsByPrmotionID"
            },
            {
                "Key": "getSweepStakeValidationStatus",
                "methodType": "POST",
                "Url": "https://a1xywz1yog.execute-api.us-east-2.amazonaws.com/prod/getSweepStakeValidationStatus"
            },
            {
                "Key": "getSweepStakeFileErrorData",
                "methodType": "POST",
                "Url": "https://a1xywz1yog.execute-api.us-east-2.amazonaws.com/prod/getSweepStakeFileErrorData"
            },
            {
                "Key": "getSweepStakeDetailsByID",
                "methodType": "POST",
                "Url": "https://a1xywz1yog.execute-api.us-east-2.amazonaws.com/prod/getSweepStakeDetailsByID"
            },
            {
                "Key": "GetRewardType",
                "methodType": "POST",
                "Url": "https://kdhpabjj16.execute-api.us-east-2.amazonaws.com/prod/GetRewardType"
            },
            {
                "Key": "W9AdminTaxGird",
                "methodType": "POST",
                "Url": "https://gh07uga6m9.execute-api.us-east-2.amazonaws.com/prod/W9AdminTaxGird"
            },
            {
                "Key": "W9AdimDashBoard",
                "methodType": "POST",
                "Url": "https://gh07uga6m9.execute-api.us-east-2.amazonaws.com/prod/W9AdimDashBoard"
            },
            {
                "Key": "W9GetYear",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/W9GetYear"
            },
            {
                "Key": "W9GetFormForAdmin",
                "methodType": "POST",
                "Url": "https://gh07uga6m9.execute-api.us-east-2.amazonaws.com/prod/W9GetFormForAdmin"
            },
            {
                "Key": "W9AdminFillOutFormData",
                "methodType": "POST",
                "Url": "https://gh07uga6m9.execute-api.us-east-2.amazonaws.com/prod/W9AdminFillOutFormData"
            },
            {
                "Key": "W9AdminUpdateTaxFormData",
                "methodType": "POST",
                "Url": "https://gh07uga6m9.execute-api.us-east-2.amazonaws.com/prod/W9AdminUpdateTaxFormData"
            },
            {
                "Key": "W9InsertUpdateTaxFormData",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/W9InsertUpdateTaxFormData"
            },
            {
                "Key": "getSignedUrlForRewardDownloadTemplate",
                "methodType": "GET",
                "Url": "https://tom98bapoe.execute-api.us-east-2.amazonaws.com/prod/RewardTemplate"
            },
			{
                "Key": "W9CheckFormExists",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/W9CheckFormExists"
            },
            {
                "Key": "W9CheckSSNExists",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/W9CheckSSNExists"
            },
            {
                "Key": "W9MergeUser",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/W9MergeUser"
            },
            {
                "Key": "W9GetFormForBanker",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/W9GetFormForBanker"
            },
            {
                "Key": "W9SaveDraftTaxFormData",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/W9SaveDraftTaxFormData"
            },
            {
                "Key": "W9TaxationHistory",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/W9TaxationHistory"
            },
            {
                "Key": "BankerCheckW9ResubmitOrNot",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/BankerCheckW9ResubmitOrNot"
            },
            {
                "Key": "BankerUpdateW9FormReviewed",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/BankerUpdateW9FormReviewed"
            },
            {
                "Key": "BankerResbmitTaxFormData",
                "methodType": "POST",
                "Url": "https://ir82ak2t61.execute-api.us-east-2.amazonaws.com/prod/BankerResbmitTaxFormData"
            },
            {
                "Key": "getTotalSweepStakeByPrmotionId",
                "methodType": "POST",
                "Url": "https://a1xywz1yog.execute-api.us-east-2.amazonaws.com/prod/getTotalSwsByPromoId"
            },
            {
                "Key": "getSignedUrlForSweepStakeTemplate",
                "methodType": "GET",
                "Url": "https://tom98bapoe.execute-api.us-east-2.amazonaws.com/prod/SweepStakeTemplate"
            },
            {
                "Key": "getSignedUrlForW9FormDownloadTemplate",
                "methodType": "GET",
                "Url": "https://tom98bapoe.execute-api.us-east-2.amazonaws.com/prod/W9FormTemplate"
            },
            {
                "Key": "TaxResourceDownloadTemplate",
                "methodType": "GET",
                "Url": "https://tom98bapoe.execute-api.us-east-2.amazonaws.com/prod/TaxResourceTemplate"
            },
            {
                "Key": "getCodeWiseClientConfig",
                "methodType": "POST",
                "Url": "https://5oyt041ewf.execute-api.us-east-2.amazonaws.com/prod/getCodeWiseClientConfig"
            },
            {
                "Key": "getAllClientConfigs",
                "methodType": "GET",
                "Url": "https://5oyt041ewf.execute-api.us-east-2.amazonaws.com/prod/getAllClientConfigs"
            },
            {
                "Key": "getBankerCodeWiseClientConfig",
                "methodType": "POST",
                "Url": "https://0sa2mqwo29.execute-api.us-east-2.amazonaws.com/prod/getBankerCodeWiseClientConfig"
            },
            {
                "Key": "getBankerAllClientConfigs",
                "methodType": "GET",
                "Url": "https://0sa2mqwo29.execute-api.us-east-2.amazonaws.com/prod/getBankerAllClientConfigs"
            },
            {
                "Key": "TrackBankerRewardsConsolidated",
                "methodType": "POST",
                "Url": "https://p0u4rp14ce.execute-api.us-east-2.amazonaws.com/prod/TrackBankerRewardsConsolidated"
            },
            {
                "Key": "ViewBankerRewards",
                "methodType": "POST",
                "Url": "https://p0u4rp14ce.execute-api.us-east-2.amazonaws.com/prod/ViewBankerRewards"
            },
            {
                "Key": "TrackBankerRewardsDownload",
                "methodType": "POST",
                "Url": "https://p0u4rp14ce.execute-api.us-east-2.amazonaws.com/prod/TrackBankerRewardsDownload"
            },
            {
                "Key": "TrackBankerRewards",
                "methodType": "POST",
                "Url": "https://p0u4rp14ce.execute-api.us-east-2.amazonaws.com/prod/TrackBankerRewards"
            },
            {
                "Key": "TrackBankerRewardsDownloadConsolidated",
                "methodType": "POST",
                "Url": "https://p0u4rp14ce.execute-api.us-east-2.amazonaws.com/prod/DownloadConsolidated"
            },
			{
                "Key": "getreconciliationreport",
                "methodType": "POST",
                "Url": "https://b9fswjjl58.execute-api.us-east-2.amazonaws.com/prod/GetReconciliationReport"
            },
            {
                "Key": "getoutstandingreport",
                "methodType": "POST",
                "Url": "https://b9fswjjl58.execute-api.us-east-2.amazonaws.com/prod/GetOutstandingReport"
            },
            {
                "Key": "getpromotionreport",
                "methodType": "POST",
                "Url": "https://b9fswjjl58.execute-api.us-east-2.amazonaws.com/prod/GetPromotionReport"
            },
			{
                "Key": "getmergedreport",
                "methodType": "POST",
                "Url": "https://b9fswjjl58.execute-api.us-east-2.amazonaws.com/prod/GetUserMergeReport"
            },
			{
                "Key": "GetAllFAQsList",
                "methodType": "POST",
                "Url": "https://9qtv0mavbh.execute-api.us-east-2.amazonaws.com/prod/GetAllFAQsList"
            }
        ]
    }


}

export default urlMap