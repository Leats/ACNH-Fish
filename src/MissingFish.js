import React from 'react';
import { Label } from 'semantic-ui-react'
import './MissingFish.css'

class MissingFish extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentHour: new Date().getHours()
        }
    }

    componentDidMount(){
        this.interval = setInterval(() => this.setState({ currentHour: new Date().getHours() }), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        const isCatchable = (fish) => {
            const start = fish[2]
            const end = fish[3]
            if(start > this.props.month && end > this.props.month && start > end){
                return true;
            } else if (start > this.props.month && end > this.props.month) {
                return false
            } else if (start > this.props.month && end < this.props.month){
                return false
            } else if (start < this.props.month && end < this.props.month){
                return false
            } else {
                return true
            }
        }

        const convert12to24 = time => {
            let [hour, modifier] = time.split(' ');
            if (hour === '12' && modifier === 'PM') {
                hour = '00';
            }
            if (modifier === 'PM') {
                hour = parseInt(hour, 10) + 12;
            }
            return hour
        }

        const rightTime = fish => {
            if (fish[5] === "All day") {return true}
            const times = fish[5].split(" & ")
            let catchable = false
            times.forEach(time => {
                let [start, end] = time.split(" - ")
                start = convert12to24(start)
                end = convert12to24(end)
                if (start < end) {
                    if (this.state.currentHour >= start && this.state.currentHour < end) {catchable = true}
                } else {
                    if (this.state.currentHour >= start || this.state.currentHour < end) {catchable = true}
                }
            })
            return catchable
        }

        const sortFish = (array, n) => {
            // n is either 2 for startMonth or 3 for endMonth
            return array.sort((a, b) => a[n] - b[n]) 
            
        }

        const splitFish = (array, isValid) => {
            let matched = [],
                unmatched = [];
            for (let i=0; i < array.length; i++){
              (isValid(array[i]) ? matched : unmatched).push(array[i]);
            }
            return [sortFish(matched, 3), sortFish(unmatched, 2)];
        };
          
        const [catchableFish, nonCatchableFish] = splitFish(this.props.fishList, isCatchable);

        const numberToMonth = (number) => {
            let month = 'Month'
            switch(number){
                case 1:
                    month = 'January'
                    break;
                case 2:
                    month = 'February'
                    break;
                case 3:
                    month = 'March'
                    break;
                case 4:
                    month = 'April'
                    break;
                case 5:
                    month = 'May'
                    break;
                case 6:
                    month = 'June'
                    break;
                case 7:
                    month = 'July'
                    break;
                case 8:
                    month = 'August'
                    break;
                case 9:
                    month = 'September'
                    break;
                case 10:
                    month = 'October'
                    break;                
                case 11:
                    month = 'November'
                    break;
                case 12:
                    month = 'December'
                    break;
                default:
                    month = 'Not Available'
                    break;
            }
            return month
        }

        const listElements = (fish) => {
            if (!this.props.caughtFish.includes(fish[0])){
                return(
                    <li key={fish[0]}>
                        <ul className="InnerList">
                            <li><div className="FishWrap"><b>{fish[0]}</b></div></li>
                            <li><div className="FishWrapWhere">{fish[1]} <div style={{fontSize: 12, color: 'grey'}}>(size {fish[4]})</div></div></li>
                            <li><div className="FishWrapMonth">{numberToMonth(fish[2])} - {numberToMonth(fish[3])}
                                <div style={{fontSize: 12, color: 'grey'}}>{fish[5]}</div></div>
                            </li>
                            <li><div className="FishWrap">
                                {isCatchable(fish) && (<Label color={rightTime(fish) ? "green" : "yellow"} horizontal>Catchable</Label>)}
                                {!isCatchable(fish) && (<Label color="grey" horizontal>Not catchable</Label>)}
                            </div></li>
                        </ul>
                    </li>
                )
            }
        }

        return (
            <div className="MissingFish">
                <ul className="MissingList">
                    {catchableFish.map(fish => {return listElements(fish)})}
                    {nonCatchableFish.map(fish => {return listElements(fish)})}
                </ul>
            </div>
        );
    }
}

export default MissingFish;