import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";




const SignUp = () => {

    const { register, handleSubmit,
        formState: { errors } } = useForm();
    
    const { createUser } = useContext(AuthContext)

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
    }


    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign up</title>
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
                            <p className="text-center text-lg">
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