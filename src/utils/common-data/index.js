import EN from '../../assets/svgs/flags/en.svg'
import VN from '../../assets/svgs/flags/vn.svg'

const optionLangEN = [
    {
      flag: VN,
      text: 'Vietnamese',
      value: 'vn'
    },
    {
      flag: EN,
      text: 'English',
      value: 'en'
    }
]

const optionLangVN = [
  {
    flag: VN,
    text: 'Tiếng việt',
    value: 'vn'
  },
  {
    flag: EN,
    text: 'Tiếng anh',
    value: 'en'
  }
]

const replyType = [
  { code: 'feedback', name: 'phản hồi'},
  { code: 'recognition', name: 'ghi nhận'},
  { code: 'other', name: 'Khác'}
]

const replyTypeDisplay = {
  feedback: 'Phản hồi',
  recognition: 'Ghi nhận',
  other: 'Khác'
}

const confidenceLevel = [
  { code: 'good', name: 'tốt' },
  { code: 'fine', name: 'ổn' },
  { code: 'notFine', name: 'không ổn' }
]

const confidenceLevelDisplay = {
  fine: 'ổn',
  notFine: 'không ổn',
  good: 'tốt'
}

const checkInStatus = [
  { code: 'done', name: 'Đã check-in' },
  { code: 'waitingCheckIn', name: 'Chưa check-in' }
]

const checkInStatusDisplay = {
  done: { name: 'Đã check-in', color: 'success' },
  waitingCheckIn: { name: 'Chưa check-in', color: 'danger'}
}

const goalStatus = [
  { code: 'new', name: 'Mới' },
  { code: 'inProgress', name: 'Đang thực hiện' },
  { code: 'done', name: 'Hoàn thành' },
  { code: 'cancel', name: 'Hủy' },
]

const goalStatusDisplay = {
  new: { name: 'mới', color: 'info' },
  inProgress: { name: 'thực hiện', color: 'primary'},
  done: { name: 'hoàn thành', color: 'success' },
  cancel: { name: 'hủy', color: 'danger' }
}

const relationshipType = [
  { code: 'previousStep', name: 'Mục tiêu tiếp theo'},
  { code: 'nextStep', name: 'Mục tiêu làm trước'},
  { code: 'sameTime', name: 'Song song'},
]

const relationTypeDisplay = {
  previousStep: 'Mục tiêu tiếp theo',
  nextStep: 'Mục tiêu làm trước',
  sameTime: 'Song song'
}

const visibilityBoard = [
  { code: 'public', name: 'Công khai'},
  { code: 'private', name: 'Riêng tư'}
]

const visibilityBoardDisplay = {
  public: 'Công khai',
  private: 'Riêng tư',
}

const cardGroupStatus = [
  { code: 'lock', name: 'Khóa'},
  { code: 'unlock', name: 'Mở khóa'},
]

const cardGroupStatusDisplay = {
  lock: 'Khóa',
  unlock: 'Mở khóa',
}

const cardStatus = [
  { code: 'toDo', name: 'Sẽ làm', color: "#eb5a46"},
  { code: 'inProgress', name: 'Đang làm', color: "#0079bf"},
  { code: 'done', name: 'Hoàn thành',  color: "#61bd4f"}
]

const cardStatusDisplay = {
  toDo: 'Sẽ làm',
  inProgress: 'Đang làm',
  done: 'Hoàn thành'
}

const labelList = [
  { code: "backend", color: "#61bd4f"},
  { code: "frontend", color: "#f2d600"},
  { code: "design", color: "#eb5a46"},
  { code: "BA", color: "#0079bf"}
];

const permissionList = [
  { code: "admin", name: "Administrator"},
  { code: "user", name: "Nhân viên"}
];


const PERCENT = 'percent';
const STAR = 'star';
const VND = 'vnd';
const DOLA = 'dola';
const TIME = 'time';
const PRODUCT = 'product';

const unit = [
  { code: PERCENT, name: 'Phần trăm', shortName: '%'},
  { code: STAR, name: 'Sao', shortName: '*' },
  { code: VND, name: 'VN đồng', shortName: 'VNĐ'},
  { code: DOLA, name: 'Đô la', shortName: '$'},
  { code: TIME, name: 'Lần', shortName: 'lần'},
  { code: PRODUCT, name: 'Sản phẩm', shortName: 'sp'},
];


const landscapeImages = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg'
];

const HR_DOMAIN = "http://dev-twedu.southeastasia.cloudapp.azure.com:5007";
// const HR_DOMAIN = "https://twg-hr.twgroup.vn";
const HR_TOKEN_AUTHORIZE =  `${HR_DOMAIN}/NhanVien/DangNhap/ChungThuc`;
const HR_GET_USER_LOGIN = `${HR_DOMAIN}/NhanVien/DangNhap/ThongTinDangNhap`;
const HR_LOGOUT = `${HR_DOMAIN}/NhanVien/DangXuat`;
const HR_SET_PERMISSION = `${HR_DOMAIN}/API/UpdateAccessModuleControl`;
const COMPANY_HR_PORT = "TWGROUP";
const KPI_CLIENT_URL = "http://localhost:8080/checkIn";
// const KPI_CLIENT_URL = "https://twg-kpi.twgroup.vn/checkIn";
const COMPANY_KPI = "CO_0001";

export default{
  optionLangEN,
  optionLangVN,
  replyType,
  replyTypeDisplay,
  confidenceLevel,
  confidenceLevelDisplay,
  checkInStatus,
  checkInStatusDisplay,
  goalStatus,
  goalStatusDisplay,
  relationshipType,
  relationTypeDisplay,
  visibilityBoard,
  visibilityBoardDisplay,
  cardGroupStatus,
  cardGroupStatusDisplay,
  cardStatus,
  cardStatusDisplay,
  labelList,
  landscapeImages,
  permissionList,
  unit,
  PERCENT,
  STAR,
  VND,
  DOLA,
  TIME,
  PRODUCT,
  HR_DOMAIN,
  HR_TOKEN_AUTHORIZE,
  HR_GET_USER_LOGIN,
  HR_LOGOUT,
  HR_SET_PERMISSION,
  COMPANY_HR_PORT,
  KPI_CLIENT_URL,
  COMPANY_KPI
}