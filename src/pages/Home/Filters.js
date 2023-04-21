import Divider from '../../components/Divider';

const categories = [
    {
        name: 'Electronics',
        value: 'electronics',
    },
    {
        name: 'Home',
        value: 'home',
    },
    {
        name: 'Fashion',
        value: 'fashion',
    },
    {
        name: 'Sports',
        value: 'sports',
    },
    {
        name: 'Books',
        value: 'books',
    },
];


const ages = [
    {
        name: '0-2 years old',
        value: '0-2',
    },
    {
        name: '3-5 years old',
        value: '3-5',
    },
    {
        name: '6-8 years old',
        value: '6-8',
    },
    {
        name: '9-12 years old',
        value: '9-12',
    },
    {
        name: '13+ years old',
        value: '12-20',
    },
]

const Filters = ({
    showFilters,
    setShowFilters,
    filters,
    setFilters,
}) => {
    return (
        <div className="w-44 flex flex-col mt-1.5">

            <div className="flex justify-between">
                <h1 className="text-xl text-gray-600 select-none">Filters</h1>
                <i className="ri-close-line cursor-pointer text-xl" onClick={() => setShowFilters(false)}></i>
            </div>

            <Divider />

            <div className="flex flex-col gap-1 mt-3 text-sm">
                <h1 className="text-gray-500 text-sm">Categories</h1>
                <div className="flex flex-col">
                    {
                        categories.map((cat) => {
                            return (
                                <div className="flex items-center text-gray-600">
                                    <input
                                        id="category"
                                        type="checkbox"
                                        name='category'
                                        className="max-width mr-2"
                                        checked={filters.category.includes(cat.value)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFilters({ ...filters, category: [...filters.category, cat.value] });
                                            } else {
                                                setFilters({ ...filters, category: filters.category.filter((item) => item !== cat.value) });
                                            }
                                        }}
                                    />
                                    <label className='xs:text-[13px] md:text-base' htmlFor="category">{cat.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


            <div className="flex flex-col gap-1 mt-3 text-sm">
                <h1 className="text-gray-500 text-sm">Age</h1>
                <div className="flex flex-col">
                    {
                        ages.map((a) => {
                            return (
                                <div className="flex items-center text-gray-600">
                                    <input
                                        id="category"
                                        type="checkbox"
                                        name='category'
                                        className="max-width mr-2"
                                        checked={filters.age.includes(a.value)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFilters({ ...filters, age: [...filters.age, a.value] });
                                            } else {
                                                setFilters({ ...filters, age: filters.age.filter((item) => item !== a.value) });
                                            }
                                        }}
                                    />
                                    <label className='xs:text-[13px] md:text-base' htmlFor="category">{a.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Filters;