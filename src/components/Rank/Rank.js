import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {
    return (
        <div className= 'rank-container'> 
            <div className='f3'>
                {`${name} , your current entry count is...`}
            </div>
            <div className="rank-div">
                <div className='f2 rank'>
                    {entries}
                </div>
            </div>
           
        </div>
    )
}

export default Rank;