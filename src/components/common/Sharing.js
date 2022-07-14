import React, { useState } from "react";
import FilterModal from "./FilterModal";
import filter from "../../assets/filter.png";

const Sharing = (props) => {

    const {recommendList, region, themeSelect, priceSelect, setThemeSelect, setPriceSelect } = props;

    const is_List = recommendList ? true : false
    
    const [modal, setModal] = useState(false);

    const onClick = () => {
        setModal(!modal); 
    };

    return (
        <>
        {is_List === true ? 
            <>
            {modal ? <FilterModal onClick={onClick} /> : null} 
            <div className="main-click">
                <div className="main-button">
                {recommendList.map((list,i) =>
                    <button key={i}>#{list}</button>
                )}
                </div>
                <div className="main-filter">
                    <button onClick={onClick}><img src={filter} alt="filter"/></button>
                </div> 
            </div>
            </>
            :
            <>
            { modal ? <FilterModal onClick={onClick} themeSelect={themeSelect} priceSelect={priceSelect} setThemeSelect={setThemeSelect} setPriceSelect={setPriceSelect} /> : null} 
            <div className="category-click">
                <div className="category-button">
                    <button>{region}</button>
                        {themeSelect.map((list) => 
                            <button>{list}</button>
                        )} 
                    {priceSelect ? <button>{priceSelect}</button> : null}
                </div>
                <div className="category-filter">
                    <button onClick={onClick}><img src={filter} alt="filter"/></button>
                </div>
            </div> 
            </>
        }
        </>
    )
}

export default Sharing;