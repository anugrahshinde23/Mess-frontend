import React, { useEffect, useState } from "react";
import { getTodaysMenuApi, setTodaysMenuApi } from "../../services/menu.services";
import { toast } from "react-toastify";

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
        <div className="flex flex-col sm:flex-row gap-5 sm:justify-between w-full">
            <div className="p-10 border ">
                <p className="text-xl font-bold">Breakfast</p>
                <p>Items: </p>
                {getMenu?.menuData?.breakfast?.items.map((item) => (
                    <span>{item}</span>
                ))}
                <p>{getMenu?.menuData?.breakfast?.startTime}</p>
                <p>{getMenu?.menuData?.breakfast?.endTime}</p>
            </div>
            <div className="p-10 border ">
                <p className="text-xl font-bold">Lunch</p>
                <p>Items: </p>
                {getMenu?.menuData?.lunch?.items.map((item) => (
                    <span>{item}</span>
                ))}
                <p>{getMenu?.menuData?.lunch?.startTime}</p>
                <p>{getMenu?.menuData?.lunch?.endTime}</p>
            </div>
            <div className="p-10 border ">
                <p className="text-xl font-bold">Dinner</p>
                <p>Items: </p>
                {getMenu?.menuData?.dinner?.items.map((item) => (
                    <span>{item}</span>
                ))}
                <p>{getMenu?.menuData?.dinner?.startTime}</p>
                <p>{getMenu?.menuData?.dinner?.endTime}</p>
            </div>

            
        </div>
        <div>
                <button onClick={handleUpdateMenu} className="text-white bg-indigo-500 hover:bg-indigo-400 p-2 font-bold text-sm cursor-pointer">Update Menu</button>
            </div>
      </div>
    </>
  );
};

export default Menu;
