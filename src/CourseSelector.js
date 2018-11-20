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
                  <button id="selectButton" onClick={(evt) => addClassToMinor(evt, selectedOption)}>Add class</button>
                  <Select
                      id="courseSelect"
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={courses}
                      isSearchable={true}
                  />
                  <button id="selectButton" style={{backgroundColor: 'indianred'}} onClick={(evt) => clearMinor(evt)}>Clear</button>
              </form>
              <div id="selectedCourses">
                  <p>Selected states: </p>
                  <ul>
                    {selectedCourses.map((c) => this.displaySelectedCourses(c))}
                  </ul>
              </div>
          </div>
        );
    }
}

export default CourseSelector;