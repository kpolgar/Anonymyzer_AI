import React from 'react';
import './Rank.css';

const Rank = () => {
    return (
        <div className= 'rank-container'> 
            <div className='f3'>
                {'Kinga, your current rank is...' }
            </div>
            <div className="rank-div">
                <div className='f2 rank'>
                    {'#5' }
                </div>
            </div>
           
        </div>
    )
}

export default Rank;