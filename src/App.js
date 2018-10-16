import React, { Component } from 'react';
import logo from './logo.svg';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import './App.css';
import 'react-table/react-table.css';
import courses from './courses';

class App extends Component {
    constructor(props) {
        super(props);
    }

    getColor(minor) {
        return minor === 'SAT' ? "#00800087" : minor === 'SHD'
                ? "#ffff0080" : minor === 'PAI'
                    ? "#cd5c5c8f" : (minor.includes('SAT') && minor.includes('PAI'))
                        ? "#9a62f3a3" : (minor.includes('SAT') && minor.includes('SHD'))
                            ? "#628ff3a3" : (minor.includes('SHD') && minor.includes('PAI'))
                                ? "#ffb100b5" : "white";
    }

    render() {
        var red = true;
        const columns = [{
            Header: 'Course',
            accessor: 'Course',
            maxWidth: 250,
            filterAll: true
        }, {
            Header: 'Description',
            accessor: 'Description',
            width: 550,
            filterAll: true,
            style: {textAlign: 'left'}
        }, {
            Header: 'CR',
            accessor: 'CR',
            width: 60,
            filterAll: true
        }, {
            Header: 'Offered',
            accessor: 'Offered',
            width: 150,
            filterAll: true
        }, {
            Header: 'Minor',
            accessor: 'Minor',
            width: 100,
            filterAll: true,
            Cell: row => {
                let minor = row.original.Minor;
                return (
                    <div style={{
                        backgroundColor: this.getColor(minor)
                    }}>
                        {row.original.Minor}
                    </div>
                );
            },
            filterMethod: (filter, rows, column) => {
                if(filter.value === "all") {
                    console.log(filter.value);
                    return rows;
                } else {
                    return matchSorter(rows, filter.value, {keys: [column.Header]});
                }
            },
            Filter: ({ filter, onChange }) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : true}
                >
                    <option value="all">Show All</option>
                    <option value="SAT">SAT</option>
                    <option value="SHD">SHD</option>
                    <option value="PAI">PAI</option>
                </select>
        }, {
            Header: 'Gen Ed',
            accessor: 'Gen Ed',
            width: 200,
            filterAll: true
        }, {
            Header: 'Major',
            accessor: 'Major',
            width: 75,
            filterAll: true
        }, {
            Header: 'Expand',
            expander: true,
            width: 70,
            Expander: ({ isExpanded, ...rest }) =>
                <div>
                    {isExpanded
                        ? <span>&#x2299;</span>
                        : <span>&#x2295;</span>}
                </div>,
            style: {
                cursor: "pointer",
                fontSize: 25,
                padding: "0",
                textAlign: "center",
                userSelect: "none"
            }
        }];
        return (
            <div className="App">
                <header className="App-header">
                    <h1>
                        <img src={logo} className="App-logo" alt="logo"/>
                        Welcome
                        <img src={logo} className="App-logo" alt="logo"/>
                    </h1>
                </header>
                <div className="App-body">
                    <h3>Course Table: </h3>
                    <div id="course-table">
                        <ReactTable
                            data={courses}
                            columns={columns}
                            filterable={true}
                            defaultFilterMethod={(filter, rows, column) =>
                                matchSorter(rows, filter.value, {keys: [column.Header]})}
                            SubComponent={row => {
                                const data = row.original;
                                console.log(data);
                                return(
                                    <div style={{textAlign: 'left', padding: '0 25px'}}>
                                        <h3>{data.Course}</h3>
                                        <p><b>Description: </b>{data.Description}</p>
                                        <p><b>Prerequisites: </b>{data['Prerequisites']}</p>
                                        <p><b>Gen Ed: </b>{data['Gen Ed']}</p>
                                        <p><b>CORE: </b>{data['CORE']}</p>
                                    </div>
                                )
                            }}
                            className="-striped -highlight"
                        />
                    </div>
                    <div id="table-info">
                        <p style={{fontSize: '18px'}}><b>Notes:</b></p>
                        <b>*Course approved for more than one category may be used only once to complete minor
                            requirements.< br/>
                            *Please see the Sustainability Studies advisor to determine its best placement in your
                            program. <br/>
                            ~Minor category abbreviations are as follows: SAT is Science and Technology; PAI is Policy
                            and
                            Institutions; SHD is Social and Human Dimensions <br/>
                        </b>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;