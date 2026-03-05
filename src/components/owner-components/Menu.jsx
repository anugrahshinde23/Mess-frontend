import React, { useEffect, useState } from "react";
import { getTodaysMenuApi, setTodaysMenuApi } from "../../services/menu.services";
import { toast } from "react-toastify";


// const PEXELS_API_KEY="sqN9Uuyg9ucug1EiiXquuny55IghQcG7YV32gEWdnp5AqN1Wh3Xyvzy7"

const UNSPLASH_API_KEY="DiPvtvT3QnhYWI7JQPKGCaVwX5arg3Ya-QL2CG-iibc"

const Menu = () => {
  const [getMenu, setGetMenu] = useState(null);
  

  const [menu, setMenu] = useState({
    breakfast: {
      items: [],
      startTime: "",
      endTime: "",
    },
    lunch: {
      items: [],
      startTime: "",
      endTime: "",
    },
    dinner: {
      items: [],
      startTime: "",
      endTime: "",
    },
  });

  const [Loading, setLoading] = useState(false);
  const [foodImages, setFoodImages] = useState({})

  const fetchFoodImage = async (foodName) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${foodName}&per_page=1`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
          },
        }
      );
  
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.small;
      }
  
      return null;
    } catch (error) {
      console.error("Error fetching image for", foodName, error);
      return null;
    }
  };

  // Fetch images for all food items
  const fetchAllFoodImages = async (menuData) => {
    const allItems = [
      ...menuData.breakfast.items,
      ...menuData.lunch.items,
      ...menuData.dinner.items,
    ];
    const uniqueItems = [...new Set(allItems)];
    const images = {};
    await Promise.all(
      uniqueItems.map(async (item) => {
        const url = await fetchFoodImage(item);
        if (url) images[item] = url;
      })
    );
    setFoodImages(images);
  };



  const handleUpdateMenu = async () => {
    setMenu(getMenu.menuData)
    setGetMenu(null)
  }

  const handleSetMenu = async (e) => {

    e.preventDefault()

    try {
        setLoading(true)

        const res = await setTodaysMenuApi(menu)
        console.log(res);
        setGetMenu(res)
        toast.success(res.message)
        
    } catch (error) {
        toast.error("Failed to Set the Menu")
    } finally {
        setLoading(false)
    }
  };

  const handleGetMenuData = async () => {
    try {
      setLoading(true);

      const res = await getTodaysMenuApi();
      console.log(res);
      setGetMenu(res);
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to fetch Menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMenuData()
  }, [])

  

  const renderFoodSection = (title, section) => (
    <div className="p-5 bg-indigo-300 rounded-lg flex-1 flex flex-col gap-5 ">
      <div className="flex justify-between w-full items-center ">
      <p className="text-xl font-bold mb-2">{title}</p>
      <p className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
        {section.startTime} - {section.endTime}
      </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        {section.items.map((item) => (
          <div
            key={item}
           className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
          >
            {foodImages[item] ? (
             <img
             src={foodImages[item]}
             alt={item}
             className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
           />
            ) : (
              <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <p className="text-center font-semibold p-2">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  

  if (!getMenu)
    return (
      <>
        <div className="flex flex-col items-center gap-20 p-10">
          <p className="text-2xl text-zinc-400 font-bold">
            You have not set any Menu for your Mess yet
          </p>

        <div className="flex justify-between  w-full">
        <div className="flex flex-col gap-5 ">
            <p className="text-xl font-semibold ">Breakfast</p>
            <p>Items</p>
            <input
              type="text"
              name="breakfast"
              placeholder="Breakfast items (comma separated)"
              className="border p-2"
              value={menu.breakfast.items.join(",")}
              onChange={(e) => setMenu({
                ...menu,
                breakfast : {
                    ...menu.breakfast,
                    items : e.target.value.split(",")
                }
              })}
            />
            <p>Start Time</p>
            <input
              type="time"
              step="60"
              name="startTime"
              placeholder="Enter Start Time"
              className="border p-2"
              value={menu.breakfast.startTime}
              onChange={(e) => setMenu({
                ...menu,
                breakfast : {
                    ...menu.breakfast,
                    startTime : e.target.value
                }
              })}
            />
            <p>End Time</p>
            <input
              type="time"
              step="60"
              name="endTime"
              placeholder="Enter End Time"
              className="border p-2"
              value={menu.breakfast.endTime}
              onChange={(e) => 
                setMenu({
                    ...menu,
                    breakfast : {
                        ...menu.breakfast,
                        endTime : e.target.value
                    }
                })
              }
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-xl font-semibold ">Lunch</p>
            <p>Items</p>
            <input
              type="text"
              
              name="breakfast"
              placeholder="Lunch items (comma separated)"
              className="border p-2"
              value={menu.lunch.items.join(",")}
              onChange={(e) => setMenu({
                ...menu,
                lunch : {
                    ...menu.lunch,
                    items : e.target.value.split(",")
                }
              })}
            />
            <p>Start Time</p>
            <input
              type="time"
              step="60"
              name="startTime"
              placeholder="Enter Start Time"
              className="border p-2"
              value={menu.lunch.startTime}
              onChange={(e) => setMenu({
                ...menu,
                lunch : {
                    ...menu.lunch,
                    startTime : e.target.value
                }
              })}
            />
            <p>End Time</p>
            <input
              type="time"
              step="60"
              name="endTime"
              placeholder="Enter End Time"
              className="border p-2"
              value={menu.lunch.endTime}
              onChange={(e) => setMenu({
                ...menu,
                lunch : {
                    ...menu.lunch,
                    endTime : e.target.value
                }
              })}
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-xl font-semibold ">Dinner</p>
            <p>Items</p>
            <input
              type="text"
              name="breakfast"
              placeholder="Dinner items (comma separated)"
              className="border p-2"
              value={menu.dinner.items.join(",")}
              onChange={(e) => setMenu({
                ...menu,
                dinner : {
                    ...menu.dinner,
                    items : e.target.value.split(",")
                }
              })}
            />
            <p>Start Time</p>
            <input
              type="time"
              step="60"
              name="startTime"
              placeholder="Enter Start Time"
              className="border p-2"
              value={menu.dinner.startTime}
              onChange={(e) => setMenu({
                ...menu,
                dinner : {
                    ...menu.dinner,
                    startTime : e.target.value
                }
              })}
            />
            <p>End Time</p>
            <input
              type="time"
              step="60"
              name="endTime"
              placeholder="Enter End Time"
              className="border p-2"
              value={menu.dinner.endTime}
              onChange={(e) => setMenu({
                ...menu,
                dinner : {
                    ...menu.dinner,
                    endTime : e.target.value
                }
              })}
            />
          </div>
          
        </div>
        <div>
            <button className="bg-indigo-500 hover:bg-indigo-400 text-white p-2 text-sm font-bold cursor-pointer" onClick={handleSetMenu}>{Loading ? "Setting Menu..." : "Set Menu"}</button>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="flex flex-col items-center p-10 gap-20" >
        <div className="flex justify-between  w-full" >
            <p className="text-2xl sm:text-3xl text-indigo-500 font-bold" >Todays Menu</p>
            <p className=" text-xl sm:text-2xl font-bold text-zinc-400">Day: {getMenu?.menuData?.day}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-5 w-full">
        {renderFoodSection("Breakfast", getMenu.menuData.breakfast)}
        {renderFoodSection("Lunch", getMenu.menuData.lunch)}
        {renderFoodSection("Dinner", getMenu.menuData.dinner)}
      </div>
       
        <div>
                <button onClick={handleUpdateMenu} className="text-white bg-indigo-500 hover:bg-indigo-400 p-2 font-bold text-sm cursor-pointer">Update Menu</button>
            </div>
      </div>
    </>
  );
};

export default Menu;
