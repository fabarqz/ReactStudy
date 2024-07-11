import React, { useEffect } from 'react'
import { useState } from 'react'
import { hololiveTalents } from './HololiveTalentList'


const filterByGen = () => {
  
  const [selectedFilters,setSelectedFilters]=useState([]);
  const [filteredTalents,setFilteredTalents]=useState(hololiveTalents);
  let filters =["All Generations","Gen 0","Gen 1","Gen 2","Gamers","Gen 3","Gen 4","Gen 5"];
  
  const handleFilterButtonClick=(selectedCategory)=>{
    if(selectedCategory==="All Generations"){
      setSelectedFilters([]);
    }
    else if(selectedFilters.includes(selectedCategory)){
      let filters=selectedFilters.filter((el)=>el!==selectedCategory);
      setSelectedFilters(filters);
    }else{
      setSelectedFilters([...selectedFilters,selectedCategory])
    }
  };

  useEffect(()=>{
    filterTalents();
  },[selectedFilters]);

  const filterTalents=()=>{
    if(selectedFilters.length>0){
      let tempTalents=selectedFilters.map((selectedCategory)=>{
        let temp=hololiveTalents.filter((talent)=>talent.gen===selectedCategory);
        return temp;
      });
      setFilteredTalents(tempTalents.flat());
    }else{
      setFilteredTalents([...hololiveTalents]);
    }
  };

  return (
    <><div className="button-container">{filters.map((gen,index)=>(
      <button onClick={()=>handleFilterButtonClick(gen)}
      className={`button ${selectedFilters?.includes(gen)?"active":""}`}
      key={`filters=${index}`}>
        {gen}
      </button>
    ))}</div>
      
    <div className="list-container">
      {filteredTalents.map((talent,index)=>(
        <div key={`talent-${index}`} className="talent">
          <p>{talent.name}</p>
        </div>
      ))}
    </div>
    </>
    
  )

}

export default filterByGen