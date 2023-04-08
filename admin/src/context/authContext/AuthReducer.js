//Quản lý trạng thái đăng nhập của người dùng

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;

//  "LOGIN_START": hành động bắt đầu đăng nhập, trả về một đối tượng state mới với các giá trị user là null (chưa có người dùng đăng nhập), isFetching là true (đang tải), và error là false (không có lỗi xảy ra).
// "LOGIN_SUCCESS": hành động đăng nhập thành công, trả về một đối tượng state mới với các giá trị user là action.payload (dữ liệu người dùng đăng nhập), isFetching là false (đã tải xong), và error là false (không có lỗi xảy ra).
// "LOGIN_FAILURE": hành động đăng nhập thất bại, trả về một đối tượng state mới với các giá trị user là null, isFetching là false, và error là true (có lỗi xảy ra).
// "LOGOUT": hành động đăng xuất, trả về một đối tượng state mới với các giá trị user là null, isFetching là false, và error là false.
// Trường hợp mặc định: trả về một bản sao của state hiện tại.
// Reducer này được sử dụng để cập nhật trạng thái đăng nhập của người dùng trong ứng dụng React Redux.