import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)




const MyCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={[
        {
          'title': 'My event',
          'allDay': false,
          'start': new Date(2021, 0, 1, 10, 0), // 10.00 AM
          'end': new Date(2021, 0, 1, 14, 0), // 2.00 PM 
        }
      ]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)

export default MyCalendar;


/*<div>
      <Calendar
        localizer={localizer}
        //events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>*/