import axios from 'axios';
const Category = () => {

  const getCategory = async () => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io/django/MakeBoddari/PickCategory/${categoryId}`,
        method: 'get',
      })
      console.log(response);

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='category'>

      <div className='category1'>
        <button>1</button>
        <button>2</button>
      </div>

      <div className='category2'>
        <button>3</button>
        <button>4</button>

      </div>

      <div className='category3'>
        <button>5</button>
        <button>6</button>
      </div>

      <div className='category4'>
        <button>7</button>
        <button>8</button>

      </div>

    </div>
  )
}

export default Category;