"use client"

import React, { useEffect } from 'react';

const DashboardPage: React.FC = () => {


  function displayToken(){
    console.log(localStorage.getItem('token'));
  }


  return (
    <div>
      <h1>Bienvenue sur le tableau de bord</h1>
      <p onClick={()=> displayToken()}>Ceci est la page du tableau de bord.</p>
    </div>
  );
}

export default DashboardPage;