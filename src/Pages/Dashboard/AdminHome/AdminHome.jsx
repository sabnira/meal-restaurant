import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";


const AdminHome = () => {

    const { user } = useContext(AuthContext);

    return (
        <div>
            <h2 className="text3xl">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
        </div>
    );
};

export default AdminHome;