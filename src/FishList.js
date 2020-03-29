import React from 'react';
import './FishList.css'


class FishList extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name) {
        this.props.addFish(name)
    }
    render(){
        const fishList = this.props.fishList
        const importAll = r => {
            let images = {};
            r.keys().map((item) => { return images[item.replace('./', '')] = r(item); });
            return images;
        };
        const images = importAll(require.context('./images', false, /\.(png)$/));
        
        const getFishImg = (name) => {
            const source = name + ".png"
            return <img src={images[source]} key={name} width="50px" caption={name} alt={name}/>;
        };

        return (
            <>
                <div className="FishHeader" />
                <div className="FishList">
                    <ul>
                        {fishList.map(fish => {
                            return (
                                <li key={fish[0]} style={this.props.caughtFish.includes(fish[0])? {} : {opacity:0.65}}>
                                    <figure
                                        onClick={() => this.handleChange(fish[0])}
                                        style={this.props.caughtFish.includes(fish[0])? {backgroundColor: '#d8e8a9'} : {backgroundColor: '#ebabb9'}}
                                    >
                                        {getFishImg(fish[0])}
                                        <figcaption>{fish[0]}</figcaption>
                                    </figure>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </>
        );
    }
}

export default FishList;