import { Wrapper } from '@/components/wrapper';
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import {AuthProvider} from '../components/auth'
import {useEffect} from 'react'
import { useRouter } from "next/router";

export default function App({ Component, pageProps }){
  let router = useRouter()

  useEffect(() => { 
    let token;
    token = localStorage.getItem("token");
    token = JSON.parse(token);

    if (!token?.email) 
      router.push("/");

    if (!token?.email && router.pathname == "/register") 
      router.push("/register");

    if (token?.email && router.pathname == "/") 
      router.push("/products");
  }, []);


  if(Component.getLayout){
    return Component.getLayout(<Component {...pageProps}/>)
  }

  return (
        <AuthProvider>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </AuthProvider>
  );
}
