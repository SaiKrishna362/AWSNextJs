'use client'

import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";


export default function HomePage() {

  const [apiStatus, setApiStatus] = useState('loading')
  const router = useRouter()

  const onPageLoad = () => {
    setApiStatus('loading')
    if(getCookie('jwt_token') === undefined){
      router.push('/login')
    }
    setApiStatus('success')
  }

  useEffect(() => {
    onPageLoad()
  })

  const onClickButton = () => {
    setApiStatus("loading")
    deleteCookie('jwt_token')
    router.push('/login')
    setApiStatus('success')
  }

  const renderAllComponents = () => {
      switch (apiStatus) {
        case 'loading':
          return(
          <div>
            <h1>Loading</h1>
          </div>
          )
          break;
        case  'success':
          return (
          <div>
            <h1>Main Header</h1>
            <button onClick={onClickButton}>Logout</button>
          </div>
          )
          break;
      }
  }

  return (
    <main>
     
        <div>
          {renderAllComponents()}
        </div>
      
    </main>
  );
}
