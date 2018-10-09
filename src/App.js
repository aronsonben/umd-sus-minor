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
            maxWidth: 200,
            filterAll: true
        }, {
            Header: 'Description',
            accessor: 'Description',
            width: 300,
            filterAll: true,
            style: {textAlign: 'left'}
        }, {
            Header: 'CR',
            accessor: 'CR',
            width: 50,
            filterAll: true
        }, {
            Header: 'Offered',
            accessor: 'Offered',
            filterAll: true
        }, {
            Header: 'Prerequisites',
            accessor: 'Prerequisites',
            width: 300,
            filterAll: true
        }, {
            Header: 'Minor',
            accessor: 'Minor',
            width: 90,
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
            }
        }, {
            Header: 'CORE',
            accessor: 'CORE',
            width: 80,
            filterAll: true
        }, {
            Header: 'Gen Ed',
            accessor: 'Gen Ed',
            filterAll: true
        }, {
            Header: 'Major',
            accessor: 'Major',
            width: 75,
            filterAll: true
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