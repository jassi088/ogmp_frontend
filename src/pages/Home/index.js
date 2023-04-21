import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetLoader } from '../../redux/slices/loaderSlice';
import { GetProducts } from '../../apiCalls/products';
import { message } from 'antd';
import Filters from './Filters';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector(state => state?.users);


  const [products, setProduct] = useState([]);
  const [filters, setFilters] = useState({
    status: 'approved',
    category: [],
    age: [],
  });
  const [showFilters, setShowFilters] = useState(false);


  // search States
  const [searchQ, setSearchQ] = useState('');

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
      } else {
        setProduct(response.data);
        message.info(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };


  useEffect(() => {
    getData();
  }, [filters]);



  return (
    <div className='flex gap-5'>


      {/* Filters sidebar */}
      {showFilters && <Filters showFilters={showFilters} setShowFilters={setShowFilters} filters={filters} setFilters={setFilters} />}


      {/* products section */}
      <div className='flex flex-col gap-5 w-full'>

        {/* Filter icon and search */}
        <div className="flex items-center gap-5">
          {!showFilters && <i className="ri-equalizer-line text-xl cursor-pointer" onClick={() => setShowFilters(true)}></i>}

          <div className='flex justify-center items-center border border-solid border-gray-300 rounded w-full px-5 h-12'>
            <input type="text" placeholder='Search products' className='no-outline' value={searchQ} onChange={(e) => setSearchQ(e.target.value)} />
          </div>

        </div>

        {/* Products */}
        <div className={`grid grid-cols-2 ${showFilters ? 'xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-6'} gap-4`}>
          {
            products && products?.filter((item) => {
              return searchQ.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchQ);
            })?.map((item) => {
              return (

                <div className='border border-solid border-gray-300 rounded flex flex-col gap-2 pb-3 cursor-pointer' key={item._id} onClick={() => navigate(`/product/${item._id}`)}>

                  <img src={item.images[0]} alt={item.name} className='w-full object-cover h-40 p-2' />


                  <div className="px-2 flex flex-col gap-1">
                    <h1 className="text-lg font-semibold">{item.name}</h1>
                    <p className="text-sm">{item.description.slice(0, 25) + (item.description.length > 25 ? "...." : "")}</p>
                    <hr className='opacity-40 my-2' />
                    <span>$ {item.price}</span>
                  </div>

                </div>

              )
            })
          }
        </div>
      </div>

    </div >
  )
}

export default Home;