import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user'
import moment from "moment";
import currency from 'currency.js';

export const downloadBankerRewards = async ({ RewardId, PortBu, PromotionName, PortfolioName, LocationCode, OfficerId, OfficerName, RewardEarned, RewardRedeemed, _Date, IAM, PageNo, PageSize, Todate, SortColumn, SortOrder }) => {
    const accessToken = await getAccessToken();
 	try{
 		const response = await axios({
            url: `${config.base_url}/api/TrackBankerRewardsDownloadConsolidated`,
 			//url: `https://xyxctgjuca.execute-api.us-east-2.amazonaws.com/dev/TrackBankerRewardsDownloadConsolidated`,
 			 method: 'POST',
 			headers: {
 				'Content-Type': 'application/json',
 				'Authorization': `${accessToken}`,
 			},
            data: JSON.stringify({
                PortBu: PortBu || "",
                PortfolioName: PortfolioName || "",
                LocationCode: LocationCode || "",
                OfficerId: OfficerId || "",
                OfficerName: OfficerName || "",
                RewardEarned: RewardEarned || "",
                RewardRedeemed: RewardRedeemed || "",
                SortColumn: SortColumn || "Date",
                SortOrder: SortOrder || "",
                Pageno: PageNo || 1,
                Pagesize: PageSize || 10
            })
            })
         const responseBody = await response.data;
         return {
             error: null,
             data: responseBody.Data
         }
 	}catch(error){
 		return {
             error: (error.response && error.response.data.error) || 'Something went wrong!',
             data: []
 		}
 	}
}

export const downloadBankerRewardList = async ({ RewardId, PortBu, PromotionName, PortfolioName, LocationCode, OfficerId, OfficerName, RewardEarned, RewardRedeemed, _Date, IAM, PageNo, PageSize, Todate, SortColumn, SortOrder}) => {
    const accessToken = await getAccessToken();
 	try{
 		const response = await axios({
            url: `${config.base_url}/api/TrackBankerRewardsDownload`,
 			//url: `https://xyxctgjuca.execute-api.us-east-2.amazonaws.com/dev/TrackBankerRewardsDownload`,
 			method: 'POST',
 			headers: {
 				'Content-Type': 'application/json',
 				'Authorization': `${accessToken}`,
 			},
            data: JSON.stringify({
                RewardID: RewardId || 0,
                PortBu: PortBu || "",
                PromotionName: PromotionName || "",
                PortfolioName: PortfolioName || "",
                LocationCode: LocationCode || 0,
                OfficerId: OfficerId || "",
                OfficerName: OfficerName || "",
                RewardEarned: RewardEarned === "" ? "" : currency(RewardEarned).value,
                RewardRedeemed: RewardRedeemed === "" ? "" : currency(RewardRedeemed).value,
                Date: _Date ? moment(_Date).utc().format("YYYY-MM-DD HH:mm:ss") : "",
                lAM: "",
                Todate : Todate ? moment(Todate).utc().format("YYYY-MM-DD HH:mm:ss") : "",
                SortColumn: SortColumn || "Date",
                SortOrder: SortOrder || "DESC",
                Pageno: PageNo || 1,
                Pagesize: PageSize || 10
            })
            })
         const responseBody = await response.data;
         return {
             error: null,
             data: responseBody.Data
         }
 	}catch(error){
 		return {
             error: (error.response && error.response.data.error) || 'Something went wrong!',
             data: []
 		}
 	}
}