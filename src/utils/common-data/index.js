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
  // '11.jpg',
  // '12.jpg',
  // '13.jpg',
  // '14.jpg',
  // '15.jpg',
  // '16.jpg',
  // '17.jpg',
  // '18.jpg',
  // '19.jpg',
  // '20.jpg',
  // '21.jpg',
  // '22.jpg',
  // '23.jpg',
  // '24.jpg',
  // '25.jpg',
  // '26.jpg',
  // '27.jpg',
  // '28.jpg',
  // '29.jpg',
  // '30.jpg',
  // '31.jpg'
];

const HR_DOMAIN = "http://dev-twedu.southeastasia.cloudapp.azure.com:5007";
const HR_TOKEN_AUTHORIZE =  `${HR_DOMAIN}/NhanVien/DangNhap/ChungThuc`;
const HR_GET_USER_LOGIN = `${HR_DOMAIN}/NhanVien/DangNhap/ThongTinDangNhap`;
const HR_LOGOUT = `${HR_DOMAIN}/NhanVien/DangXuat`;

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
  HR_DOMAIN,
  HR_TOKEN_AUTHORIZE,
  HR_GET_USER_LOGIN,
  HR_LOGOUT
}