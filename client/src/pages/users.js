import { useEffect, useState } from "react";
import Axios from "axios";

export const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [clickedUserId, setClickedUserId] = useState(null);
  const [isEditMode,setIsEditMode]=useState(false);
  const [updatedUser,setUpdateduser]=useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await Axios.get("http://localhost:3008/api/user");
        setUsers(data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [users]);

  const handleClick=(user)=>{
    setIsEditMode(!isEditMode);
    setClickedUserId(null);
    if(!isEditMode){ 
        users.map((userr) => {
          if (userr._id === user._id) {
            console.log("iam here");
            setUpdateduser(userr);
            console.log(updatedUser);
          }
        });
        setClickedUserId(user._id);
    }
    if(isEditMode){
        const updateUser=async()=>{
            try{
                const {data}=await Axios.put(`http://localhost:3008/api/user/${user._id}`,{updatedUser});
                setUsers(data.users);
            }catch(err){
                console.log(err)
            }
        }

        updateUser();
    }
  }

  const handleEdit=(e,user)=>{
    console.log(e.target);
    setUpdateduser((prevdata)=>{
        return {...prevdata,[e.target.name]:e.target.value}
    })
    console.log(updatedUser);
  }

  return (
    <>
      <h1>User Info</h1>
      <thead>
        <th>Name</th>
        <th>password</th>
        <th>City</th>
        <th>DOB</th>
      </thead>
      <tbody>
        {users.map((user) => {
           //setUpdateduser(user);
          return (
            <>
              <tr>
                {clickedUserId === user._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={updatedUser.name}
                        onChange={(e) => handleEdit(e, user)}
                      />
                    </td>
                    <td>
                      <input
                        type="password"
                        name="password"
                        value={updatedUser.password}
                        onChange={(e) => handleEdit(e, user)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="city"
                        value={updatedUser.city}
                        onChange={(e) => handleEdit(e, user)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="DOB"
                        value={updatedUser.DOB.split("T")[0]}
                        onChange={(e) => handleEdit(e, user)}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.password}</td>
                    <td>{user.city}</td>
                    <td>{user.DOB}</td>
                  </>
                )}
                <button onClick={() => handleClick(user)}>
                  {user._id === clickedUserId ? "SAVE" : "EDIT"}
                </button>
              </tr>
            </>
          );
        })}
      </tbody>
    </>
  );
};
