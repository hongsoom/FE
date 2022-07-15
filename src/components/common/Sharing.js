import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import filter from "../../assets/filter.png";

const Sharing = (props) => {

    const navigate = useNavigate();

    const {recommendList, list, region, themeSelect, priceSelect, setThemeSelect, setPriceSelect } = props;

    const is_List = recommendList ? true : false;
    
    const [modal, setModal] = useState(false);

    const onClick = () => {
        setModal(!modal); 
    };

    return (
        <>
        { modal ? <FilterModal onClick={onClick} region={region} themeSelect={themeSelect} priceSelect={priceSelect} setThemeSelect={setThemeSelect} setPriceSelect={setPriceSelect} /> : null} 
        {is_List === true ? 
            <> 
            <div className="main-click">
                <div className="main-button">
                {recommendList.map((list,i) =>
                    <button key={i} onClick={ () => navigate("/category/" + `${list}`)}>#{list}</button>
                )}
                </div>
                <div className="main-filter">
                    <button onClick={onClick}><img src={filter} alt="filter"/></button>
                </div> 
            </div>
            </>
            :
            <>
            <div className="category-click">
                <div className="category-button">
                    <button>#{list}</button>
                        {themeSelect.map((list, i) => 
                            <button key={i}>#{list}</button>
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