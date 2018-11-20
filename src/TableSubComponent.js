import React, { Component } from 'react';
import './App.css';

class TableSubComponent extends Component {

    render() {
        var { data } = this.props;
        return (
            <div style={{textAlign: 'left', padding: '0 25px'}}>
                <h3>{data['Course']}</h3>
                <p><b>Description: </b>{data['Description']}</p>
                <p><b>Prerequisites: </b>{data['Prerequisites']}</p>
                <p><b>Credits: </b>{data['CR']}</p>
                <p><b>Offered: </b>{data['Offered']}</p>
                <p><b>Gen Ed: </b>{data['Gen Ed']}</p>
                <p><b>CORE: </b>{data['CORE']}</p>
            </div>
        );
    }
}

export default TableSubComponent;