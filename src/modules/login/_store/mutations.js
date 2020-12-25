const SET_TOKEN = (state, messages) => {
  state.token = messages.token;
  state.currentUser = messages.user;
  localStorage.setItem("token", state.token);
  localStorage.setItem("userId", state.currentUser.id);
  localStorage.setItem("expireTime", new Date().getTime() + 3600000);
};

const SET_COMPANIES_OF_USER = (state, messages) => {
  state.companiesOfUser = messages;
}

const SET_COMPANY_DETAILS = (state, messages) => {
  state.companyDetails = messages;
}

const SET_COMPANY = (state, messages) => {
  state.companyId = messages;
  localStorage.setItem('companyId', state.companyId);
}

const LOG_OUT = (state) => {
  state.token = null;
  state.currentUser = null;
  state.companyId = null;
  state.companiesOfUser = [];
}

const SET_MODULES_LIST = (state, messages) => {
  state.modules = messages;
  localStorage.setItem('modules', JSON.stringify(state.modules));
};

export default {
  SET_TOKEN,
  SET_COMPANIES_OF_USER,
  SET_COMPANY,
  SET_COMPANY_DETAILS,
  SET_MODULES_LIST,
  LOG_OUT
}
