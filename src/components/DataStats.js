import React, {useState, useEffect} from "react";
import installed from '../assets/download.svg';
import uninstall from '../assets/intent-request-uninstall.svg';
import aliveChurnData from '../assets/user-activity.svg';
import aliveAppUser from '../assets/user-check.svg';
import churnRate from '../assets/user-data.svg';
import activeInstall from '../assets/install-outline-badged.svg';

const DataStats = () => {

    const [statData, setStatData] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const result = await fetch(`https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate=2022-07-01&todate=2022-07-14`);
            const data = await result.json();
            setStatData(data.data);
          }
          fetchData();
    }, []);

    return (
        <div className="data-stats">
            <div className="stat-component">
                <div className="img-container">
                    <img src={installed} alt="stat-logo"></img>
                </div>
                <div className="stats">
                    <div className="stat-data">{statData.totalInstall}</div>
                    <div className="stat-title">App Installed</div>
                </div>
            </div>
            <div className="stat-component">
                <div className="img-container">
                    <img src={activeInstall} alt="stat-logo"></img>
                </div>
                <div className="stats">
                    <div className="stat-data">{statData.activeinstall}</div>
                    <div className="stat-title">Active Installs</div>
                </div>
            </div>
            <div className="stat-component">
                <div className="img-container">
                    <img src={churnRate} alt="stat-logo"></img>
                </div>
                <div className="stats">
                    <div className="stat-data">{statData.churn}</div>
                    <div className="stat-title">Churn Rate</div>
                </div>
            </div>
            <div className="stat-component">
                <div className="img-container">
                    <img src={uninstall} alt="stat-logo"></img>
                </div>
                <div className="stats">
                    <div className="stat-data">{statData.totaluninstall}</div>
                    <div className="stat-title">App Uninstalled</div>
                </div>
            </div>
            <div className="stat-component">
                <div className="img-container">
                    <img src={aliveAppUser} alt="stat-logo"></img>
                </div>
                <div className="stats">
                    <div className="stat-data">{statData.aliveappusers}</div>
                    <div className="stat-title">Alive App Users</div>
                </div>
            </div>
            <div className="stat-component">
                <div className="img-container">
                    <img src={aliveChurnData} alt="stat-logo"></img>
                </div>
                <div className="stats">
                    <div className="stat-data">{statData.alivechurn}</div>
                    <div className="stat-title">Alive Churn Rate</div>
                </div>
            </div>
        </div>
    );
}

export default DataStats;