import { useState } from "react";
import isEmty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import CustommerAPI from "../../services/API/CustomerAPI";
import { useNavigate } from "react-router-dom";
import token from "../../services/utils/setToken";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
const Auth = () => {
    const [account, setaccount] = useState({ Email: "" });
    const navigate = useNavigate();
    const changeInputValue = (e) => {
        setaccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };
    const [validated, setValidated] = useState("");
    const [notify, setNotify] = useState();
    const handelSubmit = async (event) => {
        const isvalidated = validatedAll();
        if (!isvalidated) {
            event.preventDefault();
            return;
        }

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        event.preventDefault();
        const response = await CustommerAPI.NewPassword(account);
        setNotify(() => {
            if (response) {
                if (!response.success) {
                    return { show: true, success: false, message: response.message, error: response.error };
                }
                if (response.error.length > 0) {
                    return { show: true, success: false, message: response.message, error: response.error };
                }
                if (response.success && response.error.length === 0) {
                    return { show: false, success: true, message: response.message, error: response.error };
                }
            }

            return { show: true, success: false, message: "Có lỗi xảy ra, vui lòng thử lại" };
        });
        const data = response.data[0];
        if (response) {
            if (response.success && response.error.length === 0) {
                if (data.token) {
                    token.setAuthToken(data.token);
                    localStorage.setItem("USER_NAME", data.HoTen);
                    navigate("../Login");
                }
            }
        }
    };
    const validatedAll = () => {
        const nsg = {};
        //Kiểm tra email
        if (!isEmail(account.Email)) {
            nsg.Email = "Không đúng định dạng email";
        }
        if (isEmty(account.Email)) {
            nsg.Email = "Vui lòng nhập email";
        }
        setValidated(nsg);
        if (Object.keys(nsg).length > 0) {
            return false;
        }
        return true;
    };

    return (
        <div className="py-20">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm  mx-auto ">
                <form>
                    <div className="form-group mb-6">
                        <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 text-gray-700">
                            Email Nhận Mật Khẩu Mới
                        </label>
                        <input
                            type="email"
                            name="Email"
                            onChange={changeInputValue}
                            className="form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" className="block mt-1 text-xs text-gray-600">
                            Chúng tôi sẽ không bao giờ chia sẽ Email này với bất kỳ ai
                        </small>
                        <p style={{ color: "red" }}>{validated.Email}</p>
                    </div>

                    <button
                        type="submit"
                        onClick={handelSubmit}
                        className="
                            px-6
                            py-2.5
                            bg-blue-600
                            text-white
                            font-medium
                            text-xs
                            leading-tight
                            uppercase
                            rounded
                            shadow-md
                            hover:bg-blue-700 hover:shadow-lg
                            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-blue-800 active:shadow-lg
                            transition
                            duration-150
                            ease-in-out"
                    >
                        Gửi mail
                    </button>
                </form>
            </div>
            {notify && (
                <ToastContainer position="top-end" className="p-3">
                    <Toast bg="danger" onClose={() => setNotify({ ...notify, show: false })} show={notify.show} delay={4000} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Thông báo</strong>
                            <small className="text-muted">vừa xong</small>
                        </Toast.Header>
                        <Toast.Body>
                            <h5 className="notify-message">{notify.message}</h5>
                            {notify.error.length > 0 &&
                                notify.error.map((item, index) => {
                                    return (
                                        <div key={index} className="notify-error">
                                            {item}
                                        </div>
                                    );
                                })}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </div>
    );
};

export default Auth;
