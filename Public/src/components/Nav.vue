<template>
  <nav id="navbar" class="nav">
     <ul class="nav-list">
       <li>
         <a href="#burgers">Burgers</a>
       </li>
       <li>
         <a href="#bebidas">Bebidas</a>
       </li>
       <li>
         <a href="#porcoes">Porções</a>
       </li>
     </ul>
   </nav>
</template>

<style>
 .nav {
   display: flex;
   justify-content: center;
   position: fixed;
   align-items: center;
   top: 0;
   left: 0;
   height: 100%;
   width: 100px;
   background: var(--main-red);
   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.4);
   z-index: 1;
 }

 .nav-list {
   display: flex;
   flex-direction: column; 
   padding: 2rem;
   height: 100%;
   justify-content: space-between;
 }

 .nav-list a {
   display: block;
   font-size: 2.2rem;
   margin-bottom: 1rem; 
   text-decoration: none; 
   color: var(--main-white); 
   padding: 2rem;
   transition: background 0.3s, color 0.3s; 
 }

 .nav-list a:hover {
   background: var(--main-yellow);
 }
 .nav-list a:active {
   background: var(--main-white);
 }

 @media (max-width: 28.75em) {
  .nav {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.4);
    z-index: 1;
 }

 .nav-list {
   display: flex; 
   padding: 1rem;
   flex-direction: row;
   margin: 0 1rem;
   align-items: center;
 }
 .nav-list a {
   margin: 0 1rem;
   padding: 1.2rem;
 }
 }
</style>
