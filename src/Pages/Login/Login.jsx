import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const Login = () => {

    const [disabled, setDisabled] = useState(true)
  
    const { signIn, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const pass = form.password.value;


        try {
            const user = await signIn(email, pass)
            setUser(user)

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You have logged in successfully.",
                confirmButtonColor: "#43934A"
            });

            // navigate(location?.state ? location.state : "/");
            navigate(from, {replace: true})

        } catch (err) {
            // setErrorMessage(err.message);
            console.log(err);
        }
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;

        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }

    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full md:w-1/2 max-w-sm shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleLogin} className="fieldset">

                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" />

                                <label className="label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Password" />

                                <div><a className="link link-hover">Forgot password?</a></div>

                                <label className="label"><LoadCanvasTemplate /></label>

                                <input onBlur={handleValidateCaptcha}  type="text"  name="captcha" className="input" placeholder="Type the captcha above" />

                               
                                <input disabled={disabled} className="btn btn-neutral mt-4" type="submit" value="Login" />

                            </form>
                            <p className="text-center text-lg">
                                Don't Have An Account?
                                <NavLink to="/signup"
                                    className="text-orange-400 font-bold underline hover:text-orange-300">
                                    Sign up
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;