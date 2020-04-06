import React from "react";
import './AboutComponent.css';
import AvatarComponent from "../../shared/avatar/AvatarComponent";

export default class AboutComponent extends React.Component {
    render() {
        return (
            <div className='about-container'>
                <div className='creators-title'>Creators </div>
                <div className="Aligner">
                    <div className="Aligner-item">
                       <AvatarComponent src='https://media-exp1.licdn.com/dms/image/C5603AQFRrGHQ2aY1mA/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=HXdc7lORXIh_bB_V4SGkIt-6WNwG3ELCYLHxX2_LPQ4' size={300}/>
                       <div style={{fontSize: '42px'}}>Andrasi Ladislau</div>
                    </div>
                    <div className="Aligner-item">
                        <AvatarComponent src={'https://media-exp1.licdn.com/dms/image/C4D03AQFQ-K2N1ScQUw/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=JGBAWGQVO18_0x8y5_4YqYmXEjUy76fEmvRZyHSYQo4'} size={300}/>
                        <div style={{fontSize: '42px'}}>George Barboi</div>
                    </div>
                </div>
            </div>
        );
    }
}

