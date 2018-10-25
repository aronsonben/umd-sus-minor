import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';

class CourseFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseData: props.courseData,
            courseFilterStyle: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
    }

    getDepartments() {
        var courseNames = this.state.courseData.map(row =>row['Course']);
        var regex = /([A-Z]{4})\s*\S*\s*([A-Z]{4})*/;
        var courseAcro = courseNames.map(name => {
            let regArr = regex.exec(name);
            if(regArr[2]) {
                return(regArr[1] + ', ' + regArr[2]);
            } else {
                return(regArr[1])
            }
        });
        let others = [];
        courseAcro = courseAcro.map(course => {
            if(course.length > 4) {
                let x = course.split(', ');
                others.push(x[1]);
                return(x[0]);
            }
            return(course);
        });
        courseAcro = courseAcro.concat(others);
        var unique = [...new Set(courseAcro)].sort();
        var depts = [];
        unique.forEach( (value, index) => {
            let tmp = {'value': null, 'label': null}
            tmp.value = value;
            tmp.label = value;
            depts.push(tmp);
        });
        //console.log(depts);
        return depts;
    }

    handleChange(selectionOption) {
        this.setState({ selectedOption: selectionOption });
    }

    handleFilterClick() {
        const { courseFilterStyle } = this.state;
        this.setState({ courseFilterStyle: !courseFilterStyle });
    }

    closeFilter() {
        const { courseFilterStyle } = this.state;
        this.setState({ courseFilterStyle: false });
    }

    render() {
        const { selectedOption, courseFilterStyle } = this.state;
        var departments = this.getDepartments();
        var filterOpen = {
            height: "350px"
        };
        return (
            <div className="course-filter" style={courseFilterStyle ? filterOpen : null} onClick={this.handleFilterClick}>
                <span className="tooltiptext">Click away to reset height</span>
                <Select
                    value={selectedOption}
                    onChange={(selectedOption) => this.props.onChange(selectedOption)}
                    options={departments}
                    isSearchable={true}
                    isMulti={true}
                    onBlur={this.closeFilter}
                    captureMenuScroll={true}
                    blurInputOnSelect={true}
                />
            </div>
        )
    }
}

export default CourseFilter;