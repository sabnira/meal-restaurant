import { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../../providers/AuthProvider";


const SocialLogin = () => {

    const { signInWithGoogle } = useContext(AuthContext)

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            console.log(result.user);
        })
    }

    return (
        <div className="mx-auto">
            {/* Google */}
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                <FaGoogle></FaGoogle>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;