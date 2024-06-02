import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  const copyText = (text) => {
    toast('copy to clipboard', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: "Bounce",
    });
    navigator.clipboard.writeText(text)
    // alert('Copy to clipboard " ' + text + ' "');

  }


  const ref = useRef();
  const passwordRef = useRef();
  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eye_cross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password";

    } else {
      ref.current.src = "icons/eye_cross.png"
      passwordRef.current.type = "text";

    }

  }

  const savePassword = () => {
    if (form.site.length>3 && form.username.length>3 && form.password.length>3 ) {
      setPasswordArray([...passwordArray, {...form,id:uuidv4()}])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
      console.log([...passwordArray,form])
  
      setform({ site: "", username: "", password: "" })
      toast('Password saved', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: "Bounce",
      });
  
    }else{
      toast('Error, Please enter valid details', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: "Bounce",
      });
  
    }
   

  }

  const deletePassword = (id) => {
    let c =confirm("Do you really want to delete");
    if (c) {
      console.log("deletePassword with id ", id )
 setPasswordArray(passwordArray.filter(item=>item.id!==id))
 localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
    toast('Password Deleted', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: "Bounce",
    });
 


  }

  const editPassword = (id) => {
    console.log("editPassword with id ", id)
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
  
     }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
      <div className='container mx-auto '>
        <div className='text-white flex flex-col p-4 pt-8 '>
          <div className='mx-auto mb-5 text-black'>
            <div className='logo font-bold text-center text-xl'>
              <span className='text-green-700'>&lt;</span>
              Pass
              <span className='text-green-700'>OP/&gt;</span>
            </div>
            <span>
              Your own Password Manager
            </span>
          </div>
          <div className='flex flex-col text-black gap-8  pt-4'>
            <input value={form.site} onChange={handleChange} className='rounded-full border border-green-400 w-full p-2' placeholder='Enter Website URL' type="text" name="site" id='site' />
            <div className='flex flex-col md:flex-row  justify-between w-full'>
              <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-400 w-full mr-4 p-2' type="text" name="username" id="username" />

              <div className='relative w-1/2'>
                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-400 w-full  p-2' type="password" name="password" id="password" />
                <span className='absolute right-0 px-2' onClick={showPassword}>
                  <img ref={ref} className='w-7 mt-1.5 cursor-pointer' src="icons/eye.png" alt="eye" />
                </span>
              </div>
            </div>

            <button onClick={savePassword} className='flex justify-center items-center bg-green-500 text-black border border-slate-950 hover:bg-green-400 rounded-full w-fit mx-auto px-4 py-1 '>
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover">
              </lord-icon>
              Save Password
            </button>
            <div >
              <div >
                <h1 className='font-bold text-2xl'>Your Passwords</h1>
              </div>
              {passwordArray.length === 0 && <div> No password to show </div>}
              {passwordArray.length != 0 &&
                <table className='table-auto w-full rounded-md mt-6 mb-10
                overflow-hidden  '>
                  <thead className='bg-green-800 text-white text-center'>
                    <tr >
                      <th className='py-2'>Site</th>
                      <th className='py-2'>Username</th>
                      <th className='py-2'>Password</th>
                      <th className='py-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='bg-green-300'>
                    {passwordArray.map((item, index) => {
                      return <tr key={index}>
                        <td className='py-2 border border-white text-center w-32'>{item.site} <button onClick={() => { copyText(item.site) }}><img className='size-5 ml-3' src="icons/copy.png" alt="" /></button>

                        </td>
                        <td className='py-2 border border-white text-center w-32'>{item.username}<button onClick={() => { copyText(item.username) }}><img className='size-5 ml-3' src="icons/copy.png" alt="" /></button></td>
                        <td className='py-2 border border-white text-center w-32'>{item.password}<button onClick={() => { copyText(item.password) }}><img className='size-5 ml-3 ' src="icons/copy.png" alt="" /></button></td>
                        
                        <td className='py-2 border border-white text-center w-32'><button onClick={()=>{editPassword(item.id)}}>
                          <img className='size-7 mx-3' src="icons/edit.png" alt="" />
                          </button><button onClick={()=>{deletePassword(item.id)}} ><lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                        >
                        </lord-icon></button></td>
                      </tr>
                    })}

                  </tbody>
                </table>
              }


            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Manager