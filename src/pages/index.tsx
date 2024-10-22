'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

type User = {
  email: string;
  picture?: any;
};

let loginURL = 'http://localhost:9000/api/v1/auth/google/url';
let fetchURL = 'http://localhost:9000/auth/user';
let logoutURL = 'http://localhost:9000/api/v1/auth/logout';

export default function Home() {
  // const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  // const fetchUser = async () => {
  //   try {
  //     const res = await fetch('http://localhost:9000/auth/user', {
  //       headers:{
  //         'Content-Type': 'application/json',
  //         'X-CSRF-Token': 'token',
  //       },
        // credentials: 'include',
  //     });
  //     if (res.ok) {
  //       const userData = await res.json();
  //       console.log(userData);
  //       setUser(userData);
  //     }
  //   } catch (error) {
  //     setUser(null);
  //   }
  // };

  const handleLogin = async () => {
    try {
      const res = await fetch(loginURL, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'X-CSRF-Token': 'token',
        },
        credentials: 'include',
      });
      console.log(res);
      if (res.ok) {
        const { url } = await res.json();
        // console.log(url);
        // console.log(res);
        router.push(url);
      }
    } catch (error) {
      console.log(error);
      // setUser(null);
    }
  };

  const handleLogout = async () => {
    const res = await fetch(logoutURL, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
        'X-CSRF-Token': 'token',
      },
      // credentials: 'include',
    });
    if (res.ok) {
      // setUser(null);
      router.push('/');
    }
  };

  const handleRegister = async () => {
    try {
      // const res = await fetch("http://localhost:9000/api/v1/auth/google/signup-url?magiclink-id=01J9S5R5QXAW5H8ZS8KTCM2P13", {
      // const res = await fetch("http://localhost:9000/api/v1/auth/google/signup-url", {
      const res = await fetch("http://localhost:9000/api/v1/auth/google/signup-url?magiclink-id=01J9K7WYBA5NTFYT123J3N7BPN", {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'X-CSRF-Token': 'token',
        },
        credentials: 'include',
      });
      console.log(res);
      if (res.ok) {
        const { url } = await res.json();
        router.push(url);
      }
    } catch (error) {
      console.log(error);
      // setUser(null);
    }
  };

  return (
    <div>
      <h1>Welcome to OpenID Connect Example</h1>
      {/* {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <Image src={user.picture} alt="Profile" width={100} height={100} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : ( */}
        <button onClick={handleLogin}>Login with Google</button>
        <br />
        <button onClick={handleRegister}>Register with Google</button>
      {/* )} */}
    </div>
  );
}
