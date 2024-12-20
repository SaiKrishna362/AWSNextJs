'use client'
import '../signup/page.css'
import Link from 'next/link'
import { use, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'


export default function SignUp(){

    const [username, setUsername]   =   useState('')
    const [password, setPassword]   =   useState('')
    const [firstname, setFirstname] =   useState('')
    const [lastname, setLastname]   =   useState('')
    const [apiStatus, setApiStatus] =   useState('')
    const [errMsg, setErrMsg]       =   useState('')

    const router = useRouter();

    const onClickSignupButton = async (event) => {
        event.preventDefault()
        setApiStatus('loading')



        // const validateURL = `http://localhost:5000/user/${username}`

        // const validateOptions = {
        //     method : 'GET',
        //     headers: {
        //         "Content-Type": "application/json",
        //       },
            
        // }

        // const validateResponse = await fetch(validateURL,validateOptions)
        // const validateData = await validateResponse.json();

        // const validUser = (validateData.msg === "New User");
        if(firstname !== '' && lastname !== '' && username !== '' && password !== ''){
            const validateURL = `http://localhost:5000/user/${username}`

            const validateOptions = {
                method : 'GET',
                headers: {
                    "Content-Type": "application/json",
                  },
                
            }
    
            const validateResponse = await fetch(validateURL,validateOptions)
            const validateData = await validateResponse.json();
    
            const validUser = (validateData.msg === "New User");
            if(validUser){
                const url = 'http://localhost:5000/signup'
                const userDetails = {
                username    :   username.trim(),
                password,
                lastname    :   lastname.trim(),
                firstname   :   firstname.trim()
                }
                const options = {
                method : 'POST',
                body: JSON.stringify(userDetails),
                headers: {
                    "Content-Type": "application/json",
                        },
                
                }
    
                const response = await fetch(url, options);
                const data = await response.json()
                    if(response.ok){
                        setUsername('')
                        setLastname('')
                        setPassword('')
                        setFirstname('')
                        setApiStatus('success')
                        router.push('/login')
                    }
                    else{
                        setApiStatus('success')
                        setErrMsg(data.err_msg)
                    }
            }else{
                setApiStatus('failure')
                setErrMsg('Username is already taken')
            }
        }
        else{
            setApiStatus('failure')
            setErrMsg('Please enter all the values')
        }
        
        
    }

    const onClickBack = (event) => {
        event.preventDefault()
        router.push('/login')
    }

    const onChangeUsername = (event) =>{        
        setUsername(event.target.value)
    }

    const onChangeFirstname = (event) => {
        
        setFirstname(event.target.value)
    }

    const onChangeLastname = (event) => {
        setLastname(event.target.value)
    }

    const onChangePassword = (event) =>{
        setPassword(event.target.value)
    }

    
    return (
        <>
        {apiStatus !== 'loading' ? 
        <form onSubmit={onClickSignupButton} className="signup-form-main-container">
            <div className='signup-form-sub-container'>
                <div className='signup-form-username-container'>
                    <label htmlFor="inpfirstname">Firstname</label>
                    <input id="inpFirstname" placeholder='firstname' required maxLength={50} value={firstname} onChange={onChangeFirstname} type='text' />
                </div>
                <div className='signup-form-username-container'>
                    <label htmlFor="inpPassword">Lastname</label>
                    <input id="inpLastname" placeholder='lastname' required maxLength={20} value={lastname} onChange={onChangeLastname} type='text'/>
                </div>

                <div className='signup-form-username-container'>
                    <label htmlFor="inpUsername">Username</label>
                    <input id="inpUsername" placeholder='username' required maxLength={50} value={username} onChange={onChangeUsername} type='text' />
                </div>
                <div className='signup-form-password-container'>
                    <label htmlFor="inpPassword">Password</label>
                    <input id="inpPassword" placeholder='password' required maxLength={20} value={password} onChange={onChangePassword} type='password'/>
                </div>
                <div className='signup-form-button-container'>
                    <button onClick={onClickSignupButton}className='signup-form-signup-button'>Sign Up</button>
                    <button onClick={onClickBack} className='signup-form-back-button' >Back</button>
                </div>
                {apiStatus === 'failure' ? <p>{errMsg}</p> : null}
            </div>
        </form> : <h1>Loading</h1>
        }
        </>
    )
}