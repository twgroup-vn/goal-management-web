import commonData from "../common-data";

const getModulesHRLinkApi = (maNhanVien) => {
    const link = `${commonData.HR_DOMAIN}/API/GetAccessModuleControl/${maNhanVien}/${commonData.COMPANY_HR_PORT}`;
    return link;
};

export default{
    getModulesHRLinkApi
}