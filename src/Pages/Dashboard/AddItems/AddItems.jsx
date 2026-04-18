import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa6";


const AddItems = () => {

    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data)
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
                                {...register('name', {required: true})}
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
                                    {...register('category', {required: true})}
                                    className="select w-full"
                                    defaultValue=""
                                >
                                    <option disabled value="">Select a category</option>
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
                                    {...register('price', {required: true})}
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
                            <input {...register('image', {required: true})} type="file" className="file-input" />
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