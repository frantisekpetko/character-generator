import React from 'react';
import StarfieldAnimation from 'react-starfield-animation'

const Loader = () => (

    <div className="App">
        <StarfieldAnimation
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'black'
            }}
        />
        <header className="App-header">
            <div className="App-logo loader-wrapper">
                <i className="ra ra-two-dragons ra-5x loader-icon"></i>
            </div>

            <h3>
                Character Generator
            </h3>

        </header>
    </div>

);

export default Loader;