import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../components/SocialLogin/SocialLogin";




const SignUp = () => {

    const axiosPublic = useAxiosPublic()

    const { register, handleSubmit, reset,
        formState: { errors } } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext)

    const navigate = useNavigate()

    const onSubmit = data => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {

                        //create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {

                                    console.log('user added to the database');
                                    reset()

                                    Swal.fire({
                                        icon: "success",
                                        title: "Sign up Successful",
                                        text: "User created successfully.",
                                        confirmButtonColor: "#43934A"
                                    });

                                    navigate('/')
                                }
                            })

                    })
                    .catch(error => console.log(error))
            })
    }


    return (
        <>
            <Helmet>
                <title>Meal | Sign up</title>
            </Helmet>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full md:w-1/2 max-w-sm shadow-2xl">
                        <div className="card-body">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="form">


                                <label className="label">Name</label>
                                <input type="text" {...register("name", { required: true })} name="name" className="input" placeholder="Name" />
                                {errors.name && <p className="text-red-600">Name is required</p>}


                                <label className="label">Photo URL</label>
                                <input type="text" {...register("photoURL", { required: true })} className="input" placeholder="photoURL" />
                                {errors.photoURL && <p className="text-red-600">Photo URL is required</p>}


                                <label className="label">Email</label>
                                <input type="email" {...register("email", { required: true })} name="email" className="input" placeholder="Email" />
                                {errors.email && <p className="text-red-600">Email is required</p>}

                                <label className="label">Password</label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
                                })} name="password" className="input" placeholder="Password" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must be  at least one uppercase, one lowercase, one number and one special character</p>}


                                <input className="btn btn-neutral mt-4" type="submit" value="Sign Up" />

                            </form>

                            <SocialLogin></SocialLogin>

                            <p className="px-6 text-center text-lg">
                                Already Have An Account?
                                <NavLink to="/login"
                                    className="text-orange-400 font-bold underline hover:text-orange-300">
                                    Log in
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;