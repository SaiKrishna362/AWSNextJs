'use client'
import '../login/page.css'
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from 'cookies-next'


export default function loginPage(){

    const [username, setUsername]   =   useState('')
    const [password, setPassword]   =   useState('')
    const [apiStatus, setApiStatus] =   useState('')
    const [errMsg, setErrMsg]       =   useState('')

    const router = useRouter();


    const onSuccessLogin = async (jwtToken) => {
        setCookie('jwt_token', jwtToken)
        setUsername('')
        setPassword('')
        setApiStatus('loading')
        await router.push('/')
    }

    const onSubmitForm = async (event) => {
        event.preventDefault()
        setApiStatus('loading')
        const url = 'http://localhost:5000/login'
        const userDetails = {
            username    :   username.trim(),
            password
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
        if(response.ok === true){
            onSuccessLogin(data.jwt_token)
        }
        else{
            setApiStatus('failure')
            setErrMsg(data.err_msg)
        }

    }

    const onChangeUsername = (event) =>{        
        setUsername(event.target.value)
    }

    const onChangePassword = (event) =>{
        setPassword(event.target.value)
    }

    const loadPage = () => {
        getCookie('jwt_token') !== undefined ? router.push('/') : null
    }
    useEffect(() => {
        loadPage();
    })
    
    return (
        <>
        {apiStatus !== 'loading' ? 
        <form onSubmit={onSubmitForm} className="login-form-main-container">
            <div className='login-form-sub-container'>
                <div className='login-form-username-container'>
                    <label htmlFor="inpUsername">Username</label>
                    <input id="inpUsername" placeholder='username' required maxLength={50} value={username} onChange={onChangeUsername} type='text' />
                </div>
                <div className='login-form-password-container'>
                    <label htmlFor="inpPassword">password</label>
                    <input id="inpPassword" placeholder='password' required maxLength={20} value={password} onChange={onChangePassword} type='password'/>
                </div>
                <div className='login-form-signup-forgot-container'>
                    <Link href='./signup'>sign up</Link>
                    <p>Forgot password</p>
                </div>
                <button onClick={onSubmitForm}className='login-form-button'>Login</button>
                {apiStatus === 'failure' ? <p>{errMsg}</p> : <p></p>}
            </div>
        </form> : <h1>Loading</h1>
        }
        </>
    )
}