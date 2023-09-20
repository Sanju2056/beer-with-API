import Image from 'next/image'
import searchIcon from '../../public/search.png'
import { useEffect, useState } from 'react'

interface Beer {
  id: number;
  name: string;
  abv: number;
  image_url: string;
  // Add other properties as needed
}

export default function Home() {
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState<Beer[]>([]); // Specify the type as Beer[]

  useEffect(() => {
    logBeers()
  }, [])

  async function logBeers() {
    try {
      const response = await fetch("https://api.punkapi.com/v2/beers");
      const beers: Beer[] = await response.json();
      setData(beers);
      console.log(beers)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const searchElement = () => {
    const searchedFilterData = data.filter((searchedData) => {
      return searchedData.name.toLowerCase().includes(searchText.toLowerCase())
    })
    setData(searchedFilterData)
  }

  const BeerCard = ({ item }: { item: Beer }) => {
    return (
      <div className='flex flex-col justify-center h-[300px] w-[220px] items-center shadow-md bg-[#211A75] rounded-lg'>
        <Image
          src={item.image_url}
          className='h-[200px] w-[100px] rounded-lg'
          width={120}
          height={150}
          alt='beer pic'
        />
        <p className='text-[#AAAAAA] text-[16px] my-2 text-center'>{item.name}</p>
        <p className='text-[#AAAAAA] text-[12px]'>{item.abv}% ABV</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='h-[80px] w-[80%] flex  bg-[#211A75] rounded-xl justify-between px-4 my-4 items-center'>
        <p className='text-[#fff] text-[18px]'>Home Page</p>
        <div className='h-[50px] w-[30%] flex bg-[#15132B] items-center rounded-lg overflow-hidden px-4 cursor-pointer'>
          <input
            placeholder='Search here'
            className='h-[100%] w-[95%] border-none text-[12px] bg-[#15132B] text-[#AAAAAA] outline-0'
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
          />
          <Image
            alt='image'
            src={searchIcon}
            className='h-[13px] w-[13px]'
            onClick={searchElement}
          />
        </div>
      </div>
      <div className='w-[80%] flex flex-wrap justify-center gap-5'>
        {data.map((item, index) => (
          <BeerCard item={item} key={index} />
        ))}
      </div>
    </div>
  )
}
