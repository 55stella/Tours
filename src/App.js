
import './App.css';
import { useState, useEffect } from 'react';
import Loading from './Loading';


function App() {
const[tours, setTours] = useState([])
const[loading, setloading]= useState(true)
const[readMore, setReadMore] =useState(false)
  const url = 'https://course-api.com/react-tours-project'
 const getTours =()=>{

  setloading(true)
    try{
    let promise = fetch(url)
    promise.then((res)=>
    res.json())
    
    .then((user)=>{
      setloading(false)
      setTours(user)
      
      
    })
  }
    catch(err){
      setloading(false)
    }



 }
  useEffect(()=>{
    getTours()
    
 },[])
 const removeTour =(id)=>{
   let a =tours.filter(item => item.id !==id)
   setTours(a)
 }
 if(loading){
   return( <main>
       <Loading/>
   </main>
   )
 }
 if(tours.length ===0){
   return(
     <main>
       <div className='no-tours'>
         <h3>No tours left</h3>
         <button  onClick={getTours} className='.section p button'>Refresh</button>
         
       </div>
     </main>
   )
 }
  return (
    <div className="App" >
      
      
      <div className='heading'>
        <h1>Our Tours</h1>
      <div></div>
      </div>
      
      {tours.map(tour=>{
        const{id ,image,name,price, info } =tour
        
        return (
        <div key ={id} className='imageTour'>
          <figure>
          <img src={image} alt={name} />
          </figure>
          <section className='section'>
            <div className='details'>
            <h2>
              {name}
            </h2>
            <p>${price}</p>
            </div>
           <p>{readMore ? info: `${info.substring(0,200)}...`}
           <button onClick={()=>setReadMore(!readMore)}>{readMore? 'showless':'showmore'}</button>
           
           </p>
           <button type='button' onClick={()=>removeTour(id)}>Not interested</button>
          </section>
          
        </div>
        )
      })}
      
    
    </div>
  );
}




export default App;
