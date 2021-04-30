import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

function TrainingsCalendar () {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  let trainingEvents = [];
  //let trainingsTable = [];

  if (trainings.length > 0) {
    trainings.forEach(function(item) {
      trainingEvents.push({
        'title': `${item.activity}: ${item.customer.firstname}  ${item.customer.lastname}`, 
        'allDay': false, 
        'start': new Date(
          moment(item.date).format('YYYY'), 
          moment(item.date).format('MM') - 1,
          moment(item.date).format('DD'), 
          moment(item.date).format('HH'),
          moment(item.date).format('mm'),
        ), 
        'end': new Date(
          moment(item.date).format('YYYY'), 
          moment(item.date).format('MM') - 1, 
          moment(item.date).format('DD'), 
          moment(item.date).clone().add(item.duration, 'minutes').format('HH'), 
          moment(item.date).clone().add(item.duration, 'minutes').format('mm')
        )
        })
    });
  }
  
  /*if (trainings.length > 0) {
    trainings.forEach(function(item) {
      trainingsTable.push({
        activity: item.activity,
        customer: `${item.customer.firstname} ${item.customer.lastname}`,
        time: {
          year: moment(item.date).format('YYYY'),
          month: moment(item.date).format('MM'),
          day: moment(item.date).format('DD'),
          startHours: moment(item.date).format('HH'),
          startMinutes: moment(item.date).format('mm'),
          endHours: moment(item.date).clone().add(item.duration, 'minutes').format('HH'),
          endMinutes: moment(item.date).clone().add(item.duration, 'minutes').format('mm')
        }
      })
    });
  }
  
  trainingsTable.forEach(function(item) {
    trainingEvents.push({
      'title': `${item.activity} ${item.customer}`, 
      'allDay': false, 
      'start': new Date(
        item.time.year, 
        item.time.month - 1, 
        item.time.day, 
        item.time.startHours, 
        item.time.startMinutes
      ), 
      'end': new Date(
        item.time.year, 
        item.time.month - 1, 
        item.time.day, 
        item.time.endHours, 
        item.time.endMinutes
      )
      })
  });*/
  
  return (
  <div>
    <Calendar
      localizer={localizer}
      events={trainingEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
  )
}

export default TrainingsCalendar;


/*<div>



{
          'title': 'My event',
          'allDay': false,
          'start': new Date(2021, 0, 1, 10, 0), // 10.00 AM
          'end': new Date(2021, 0, 1, 14, 0), // 2.00 PM 
        },
        {
          'title': 'Gym',
          'allDay': false,
          'start': new Date(2021, 3, 1, 10, 0), // 10.00 AM
          'end': new Date(2021, 3, 1, 14, 0), // 2.00 PM 
        },
        {
          'title': 'Spinning',
          'allDay': false,
          'start': new Date(2021, 3, 1, 14, 0), // 10.00 AM
          'end': new Date(2021, 3, 1, 16, 0), // 2.00 PM 
        }


      <Calendar
        localizer={localizer}
        //events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>*/