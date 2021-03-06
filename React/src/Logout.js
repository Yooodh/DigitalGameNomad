import { useDispatch } from "react-redux";

function Logout() {

    const dispatch = useDispatch();

    const logout = () => {

        dispatch( { type: "logout" } );
        setTimeout( () => {
            window.location.replace("http://digitalgamenomad.cf/");
        }, 500);
    }

    return (
        <li 
            onClick={logout}
        >
            ๋ก๊ทธ์์
        </li>
    )
}

export default Logout;