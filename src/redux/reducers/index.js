import { combineReducers } from 'redux'
import user from './user'
import payments from './payment'
import redeem from './redeem'
import manageAccount from './manage-account';
import support from './support';
import bankers from './bankers';
import taxations from './taxation';
import rewardType from './rewardType';
import clientConfig from './clientConfig';
import faq from './faq';

const reducer = combineReducers({
	user,
	payments,
	redeem,
	manageAccount,
	support,
	bankers,
	taxations,
	rewardType,
	clientConfig,
	faq
})

export default reducer;