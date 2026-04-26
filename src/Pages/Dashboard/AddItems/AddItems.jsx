import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa6";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data)
        //image upload to imgbb and then get an url

        const imageFile = { image: data.image[0] }

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        if (res.data.success) {
            //now send the menu item data to the server with the image url 
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data);

            if (menuRes.data.insertedId) {
                //show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }

    return (
        <div>
            <SectionTitle heading="add an item" subHeading="What's new?"></SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full space-y-4">

                        {/* Recipe Name */}
                        <div>
                            <label className="label">
                                <span className="label-text">Recipe Name*</span>
                            </label>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Recipe Name"
                                {...register('name', { required: true })}
                                required
                            />
                        </div>

                        <div className="flex gap-6">
                            {/* Category */}
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    {...register('category', { required: true })}
                                    className="select w-full"
                                    defaultValue="default"
                                >
                                    <option disabled value="default">Select a category</option>
                                    <option value="salad">Salad</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="soup">Soup</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>
                            {/* price */}
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Price"
                                    {...register('price', { required: true })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Recipe Details</span>
                            </label>
                            <textarea {...register('recipe')} className="textarea h-24 w-full" placeholder="Bio"></textarea>
                        </div>

                        <div>
                            <input {...register('image', { required: true })} type="file" className="file-input" />
                        </div>


                        <button className="btn btn-neutral">
                            Add Item <FaUtensils></FaUtensils>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddItems;