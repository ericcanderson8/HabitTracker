'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // ✅ Step 1: Import the router


export default function Page() {
 const router = useRouter(); // ✅ Step 2: Initialize the router


 // ✅ Step 3: Create the submit handler
 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   router.push('/dashboard'); // Redirect to /dashboard
 };


 return (
   <main
     style={{
       minHeight: '100vh',
       backgroundColor: '#fff7f0',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       padding: '2rem',
       fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
     }}
   >
     <div
       style={{
         backgroundColor: '#ffffff',
         padding: '3rem 2.25rem',
         borderRadius: '20px',
         boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
         width: '100%',
         maxWidth: '400px',
         textAlign: 'center',
         border: '1px solid #fcd9b1',
       }}
     >
       {/* Header */}
       <h1
         style={{
           fontSize: '1.75rem',
           fontWeight: 700,
           marginBottom: '0.5rem',
           color: '#cc5803',
         }}
       >
         Welcome Back 👋
       </h1>


       <p
         style={{
           color: '#7c6f5f',
           fontSize: '0.95rem',
           marginBottom: '2rem',
         }}
       >
         Keep going — your next 1-minute habit is just a click away.
       </p>


       {/* ✅ Updated form tag with onSubmit */}
       <form onSubmit={handleSubmit}>
         {/* Email */}
         <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
           <label
             htmlFor="email"
             style={{
               display: 'block',
               marginBottom: '0.5rem',
               fontWeight: 600,
               color: '#6b4f3f',
               fontSize: '0.9rem',
             }}
           >
             Email address
           </label>
           <input
             type="email"
             id="email"
             placeholder="you@example.com"
             style={{
               width: '100%',
               padding: '0.75rem',
               borderRadius: '10px',
               border: '1px solid #e0c3a7',
               fontSize: '1rem',
               outlineColor: '#f97316',
             }}
           />
         </div>


         {/* Password */}
         <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
           <label
             htmlFor="password"
             style={{
               display: 'block',
               marginBottom: '0.5rem',
               fontWeight: 600,
               color: '#6b4f3f',
               fontSize: '0.9rem',
             }}
           >
             Password
           </label>
           <input
             type="password"
             id="password"
             placeholder="••••••••"
             style={{
               width: '100%',
               padding: '0.75rem',
               borderRadius: '10px',
               border: '1px solid #e0c3a7',
               fontSize: '1rem',
               outlineColor: '#f97316',
             }}
           />
         </div>


         {/* Forgot Password */}
         <div
           style={{
             textAlign: 'right',
             marginBottom: '2rem',
           }}
         >
           <a
             href="#"
             style={{
               fontSize: '0.85rem',
               color: '#ea580c',
               textDecoration: 'none',
             }}
           >
             Forgot password?
           </a>
         </div>


         {/* Submit Button */}
         <button
           type="submit"
           style={{
             width: '100%',
             backgroundColor: '#f97316',
             color: '#ffffff',
             padding: '0.75rem',
             fontSize: '1rem',
             fontWeight: 600,
             border: 'none',
             borderRadius: '10px',
             cursor: 'pointer',
             transition: 'background-color 0.2s ease-in-out',
           }}
           onMouseOver={(e) =>
             (e.currentTarget.style.backgroundColor = '#ea580c')
           }
           onMouseOut={(e) =>
             (e.currentTarget.style.backgroundColor = '#f97316')
           }
         >
           Sign In
         </button>
       </form>


       {/* Signup Prompt */}
       <p
         style={{
           marginTop: '2rem',
           fontSize: '0.85rem',
           color: '#7c6f5f',
         }}
       >
         Don’t have an account?{' '}
         <a
           href="#"
           style={{
             color: '#ea580c',
             fontWeight: 500,
             textDecoration: 'none',
           }}
         >
           Sign up
         </a>
       </p>
     </div>
   </main>
 );
}
