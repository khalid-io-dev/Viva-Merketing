import PriceSlider from "./PriceSlider";
export default function SortMenu(){
    const categories = ['Cream', 'Oil', 'Savon', 'Other']
    return (
        <div className="flex flex-col bg-gray-50  text-black ">
            <h1 className="hidden md:block max-w-7xl mx-auto text-center text-2xl">Filters</h1>
            <button
                data-collapse-toggle="filter-sticky"
                type="button"
                className="block md:hidden max-w-7xl mx-auto text-center text-2xl"
                aria-controls="filter-sticky"
                aria-expanded="true"
            >
                <h1 className="block md:hidden max-w-7xl mx-auto text-center text-2xl border border-black w-24">Filters</h1>
            </button>


            <form id="filter-sticky">
            <div className="p-2">
                <div className="flex items-center gap-2 p-3">
                    <h1 className="text-start">Price</h1>
                    <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-arrow-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                    </svg>
                    </button>
                    <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                    </svg>
                    </button>
                </div>

                <div className=" text-black p-1">
                    <div className="flex">
                        <PriceSlider/>
                    </div>

                </div>

                <h1 className="text-start p-3">Category</h1>
                <div className=" text-black pl-5">
                {
                    categories.map((cat, index) => {
                        return (
                            <div key={index}>
                                    <div className="grid grid-cols-2 p-2">
                                        <label>{cat}</label>
                                        <input className="border border-black " type="radio" name="selectedCategory"/>
                                    </div>
                                </div>
                        );
                    })
                }
                </div>
            </div>
                <div className="flex justify-center">
                    <button className="bg-emerald-600 border border-emerald-900 justify-center w-24" type="button">Sort</button>
                </div>
            </form>
            </div>







    )
}