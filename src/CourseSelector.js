import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';

class CourseSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: 0,
            courses: this.getCourses(props.courseData),
            selected: props.selectedCourses.map(this.displaySelectedCourses),
            selectedOption: null
        }
        this.getCourses = this.getCourses.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displaySelectedCourses = this.displaySelectedCourses.bind(this);
    }

    getCourses(courseData) {
        var courseNames = courseData.map(row =>row['Course']),
            unique = [...new Set(courseNames)].sort(),
            courseCodes = [];
        var courseId = 0;
        unique.forEach( (value, index) => {
            let tmp = {'value': null, 'label': null};
            tmp.value = value;
            tmp.label = value;
            tmp.id = courseId;
            courseCodes.push(tmp);
            courseId = courseId + 1;
        });
        return courseCodes;
    }

    handleChange(selectedOption) {
        this.setState({selectedOption: selectedOption});
    }

    displaySelectedCourses(course) {
        return (
            <li id="courseItem" key={course.id}>{course.value}</li>
        );
    }

    render() {
        var { selectedCourses, addClassToMinor, clearMinor } = this.props;
        var { courses, selected, selectedOption } = this.state;
        //var selectedCourseList = selectedCourses.map(this.displaySelectedCourses);
        return (
          <div>
              <form className="courseSelectForm">
                  <Select
                      id="courseSelect"
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={courses}
                      isSearchable={true}
                  />
                  <button id="selectButton" onClick={(evt) => addClassToMinor(evt, selectedOption)}>Add class</button>
                  <button id="selectButton" style={{backgroundColor: 'indianred', marginLeft: 0}} onClick={(evt) => clearMinor(evt)}>Clear</button>
              </form>
              <div className="selectorDisplay">
                  <div id="requirements">
                      <ul>
                          <li>ANTH/PLCY 301</li>
                          <li>SAT</li>
                          <li>PAI</li>
                          <li>SHD</li>
                          <li>One other form of credits</li>
                          <li>9 credits upper level</li>
                          <li>15 credits total</li>
                      </ul>
                  </div>
                  <div className="selectedCourses">
                      <p>Selected states: </p>
                      <ul id="selectedCourseList">
                        {selectedCourses.map((c) => this.displaySelectedCourses(c))}
                      </ul>
                  </div>
              </div>
          </div>
        );
    }
}

export default CourseSelector;