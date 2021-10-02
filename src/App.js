import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Jutsu } from 'react-jutsu'
import Onboarding from './Onboarding'
import Subjects from './Subjects'
import JitsiPage from './JitsiPage'

/*
 * Primary component that retrieves the page number from storage and sets the rendered page accordingly.
 * Also is the container of all the smaller components.
 *
 * returns: JSX component that is rendered as a complete HTML page
 */
export default function App() {
  //The page number which allows the website to mimic separate pages
  const pageNum = useSelector((state) => state.counter.value)
  
  /*
   * page represents the page data
   * pageNum is the page number the user is on and is stored as a global state
   * switch statement allows us to mimic changing pages
   */
  var page
  switch(pageNum){
	case 0: page = <Onboarding />; break;
	case 1: page = <Subjects />; break;
	case 2: page = <JitsiPage />; break;
	default: page = <>The page could not be found.</>; break;
  }
  return (page)

}

