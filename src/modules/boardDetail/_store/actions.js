import api from '../_api/index';
import _ from "lodash";

const getUserList = async (context, request) => {
    let response = await api.getUserList(request);
    context.commit('SET_USER_LIST', response.data);
};

const getBoardDetail = async (context, request) => {
    let response = await api.getBoardDetail(request);
    context.commit('SET_BOARD_DETAIL', response.data);
    await context.dispatch("getCardOfGroup",response.data);
};

const getCardOfGroup = async (context, request) => {
    if(request && request.cardGroup && request.cardGroup.length){
        let card = {};
        let cardGroup = [];
        for(let i = 0; i < request.cardGroup.length; i++){
            card[request.cardGroup[i].id] = [];
            cardGroup.push(request.cardGroup[i].id);
        }
        context.commit('SET_CARD', { card: card, cardGroup: cardGroup });
        let listCard = await api.getListCard(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize,cardGroup);
        for(let i = 0; i < cardGroup.length; i++){
            let filter = _.filter(listCard.data, o => { return o.cardGroupId === cardGroup[i] });
            card[cardGroup[i]] = _.cloneDeep(filter);
        }
        context.commit('SET_CARD', { card: card, cardGroup: cardGroup });
    }
};


export default {
    getUserList,
    getBoardDetail,
    getCardOfGroup
}